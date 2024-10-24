'use client'

import '@mantine/dates/styles.css';
import { useState } from 'react';
import {Stepper, Button, Group } from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import {z} from 'zod';
import {ReservationSubmissionSchema} from '@/schemas/reservation_submission_schema';
import {ReservationSummary} from '../../../components/reservations/new/ReservationSummary';
import ValidationError from '../../../components/reservations/new/ValidationError';
import ReservationStep from '../../../components/reservations/new/ReservationSteps';
import dayjs from 'dayjs';

type ReservationSubmissionSchema = z.infer<typeof ReservationSubmissionSchema>;

const mockNodes = [
    { id: '1', nodeName: 'slurm-slave1' },
    { id: '2', nodeName: 'slurm-slave2' },
    { id: '3', nodeName: 'slurm-slave3' },
    { id: '4', nodeName: 'slurm-slave4' },
    { id: '5', nodeName: 'slurm-slave5' },
];

const partitions = [
    {name: 'broadwell-booked'},
    {name: 'cascadelake-booked'},
    {name: 'epito-booked'},
    {name: 'gracehopper-booked'},
];

//  TODO: replace with actual users
const currentUser = 'scontald';
const users = [
    {name: 'lbosio'}
]

export default function NewReservationForm() {
    const [active, setActive] = useState(0);
    const [validationError, setValidationError] = useState<string | null>(null);

    const form = useForm({
        initialValues: {
            name: '',
            start_time: new Date(),
            end_time: new Date(),
            users: [currentUser] as string[],
            // NodeCnt: 0,
            nodes: [] as string[],
            // partition: '',
        },
        validate: {
            // NodeCnt: (value, values) => {
            //     if (values.nodes.length === 0 && value <= 0) {
            //         return "Node count is required if no nodes are specified.";
            //     }
            //     return null; // No error
            // },
            name: (value) => value.trim().length > 0 ? null : "Name is required",
            start_time: (value) => (value instanceof Date && !isNaN(value.getTime())) ? null : "Start time is required",
            end_time: (value, values) => {
                const startTime = values.start_time;
                const endTime = value;
                if (endTime < startTime) {
                  return "End time must be after or equal to the start time.";
                }
                return null;
              },
            },
          });
            
    const onSubmit = async (values: ReservationSubmissionSchema) => {
        try {
            await ReservationSubmissionSchema.parseAsync(values);
            const formattedData = {
                start_time: dayjs(values.start_time).format('YYYY-MM-DDTHH:mm:ss'),
                end_time:dayjs(values.end_time).format('YYYY-MM-DDTHH:mm:ss'),
                name: values.name,
                users: values.users.join(','),
                nodes: values.nodes? values.nodes.join(',') : [],
                // partition: values.partition,
            };
            const jsonData = JSON.stringify(formattedData, null, 2);
            console.log("Submitted Data:", jsonData);
            setValidationError(null);
        } catch (error) {
            console.error("Validation Error:", error);
            setValidationError('There was an error while submitting the form.');
        }
    };

    return (
        <>
        <ValidationError validationError={validationError} setValidationError={setValidationError} />

        <Stepper active={active} mt="xl">
            <Stepper.Step label="New reservation" description="Select resources and users access" icon={<IconCalendar style={{ width: 20, height: 20 }} />}>
            <ReservationStep form={form} users={users} mockNodes={mockNodes}/>
            </Stepper.Step>
            <Stepper.Completed>
            Completed! Form values:
            <ReservationSummary reservation={form.values} />
            </Stepper.Completed>
        </Stepper >

            <Group justify="flex-end" mt="xl">
                {active !== 0 && (
                    <Button variant="default" onClick={() => setActive((current) => (current > 0 ? current - 1 : current))}>
                        Back
                    </Button>
                )}

                {active !== 3 && (
                    <Button onClick={() => {
                        const errorMessages = form.validate();
                        const endTimeError = errorMessages.errors.end_time;

                        if (endTimeError) {
                            setValidationError(typeof endTimeError === 'string' ? endTimeError : String(endTimeError));
                          } else {
                            setValidationError(null);
                            if (active === 2) {
                              onSubmit(form.values);
                            } else {
                              setActive((current) => (current < 2 ? current + 1 : current));
                            }
                          }
                    }}>
                        Done
                    </Button>
                )}
            </Group>
        </>
    );
}
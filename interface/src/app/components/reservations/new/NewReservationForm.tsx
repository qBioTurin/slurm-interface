import '@mantine/dates/styles.css';
import { useState } from 'react';
import { DateInput } from '@mantine/dates';
import {Stepper, Button, Group, TextInput, NumberInput, MultiSelect, rem, Alert } from '@mantine/core';
import { IconCalendar, IconAlertCircle } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useForm } from '@mantine/form';
import {z} from 'zod';
import {ReservationSubmissionSchema} from '@/schemas/reservation_submission_schema';
import {ReservationSummary} from './ReservationSummary';

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
                start_time: values.start_time.toISOString(),
                end_time: values.end_time.toISOString(),
                name: values.name,
                users: values.users.join(','),
                nodes: values.nodes? values.nodes.join(',') : [],
                // partition: values.partition,
            };
            console.log("Submitted Data:", formattedData);
            setValidationError(null);
        } catch (error) {
            console.error("Validation Error:", error);
            setValidationError('There was an error while submitting the form.');
        }
    };

    return (
        <>

{validationError && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Validation Error"
          color="red"
          withCloseButton
          closeButtonLabel="Close alert"
          onClose={() => setValidationError(null)}
          mt="md"
        >
          {validationError}
        </Alert>
      )}
            <Stepper active={active} mt="xl">
                <Stepper.Step label="New reservation" 
                    description= "Select resources and users access"
                    icon={<IconCalendar style={{ width: rem(20), height: rem(20) }} />}
                >

                    <TextInput
                        label="Reservation Name"
                        placeholder="Name"
                        mt="md"
                        {...form.getInputProps('name')}
                    />

                    <DateInput
                        label="Start Time"
                        valueFormat="DD/MM/YYYY HH:mm:ss"
                        placeholder="Start Time"
                        {...form.getInputProps('start_time')}
                        dateParser={(s) => dayjs(s, "DD/MM/YYYY HH:mm:ss").toDate()}
                        mt="md"
                    />

                    <DateInput
                        label="End Time"
                        valueFormat="DD/MM/YYYY HH:mm:ss"
                        placeholder="End Time"
                        {...form.getInputProps('end_time')}
                        dateParser={(s) => dayjs(s, "DD/MM/YYYY HH:mm:ss").toDate()}
                        mt="md"
                    />

                    <MultiSelect
                        data={users.map((user) => user.name)}
                        label="Select Additional Users"
                        placeholder="Add users"
                        mt="md"
                        searchable
                        value={form.values.users}
                        onChange={(selectedUsers) => {
                            const uniqueUsers = Array.from(new Set([currentUser, ...selectedUsers]));
                            form.setFieldValue('users', uniqueUsers);
                        }}
                    />

                    <MultiSelect
                        data={mockNodes.map((node) => node.nodeName)}
                        label="Nodes"
                        placeholder="Select nodes"
                        mt="md"
                        searchable
                        value={form.values.nodes}
                        onChange={(value) => form.setFieldValue('nodes', value)}

                    />

                    {/* <NumberInput
                        label="Node Count"
                        {...form.getInputProps('NodeCnt')}
                        min={0}
                        max={200} // arbitrary value
                        mt="md"
                    /> */}

                    {/* <MultiSelect
                        data={partitions.map((partition) => partition.name)}
                        label="Partitions"
                        placeholder="Select partition"
                        mt="md"
                        searchable
                        value={form.values.nodes}
                        onChange={(value) => form.setFieldValue('partition', value[0])}
                        maxValues={1}
                    /> */}

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
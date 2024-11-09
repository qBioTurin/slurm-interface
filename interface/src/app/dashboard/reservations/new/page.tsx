'use client'

import '@mantine/dates/styles.css';
import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { z } from 'zod';
import { ReservationSubmissionSchema } from '@/schemas/reservation_submission_schema';
import { ReservationSummary, ReservationStep, ValidationError } from '@/components';
import { usePostData } from '@/hooks';
// import Credit from '../../../components/reservations/new/Credits'; // CREDITS VALIDATION

import dayjs from 'dayjs';

type ReservationSubmissionSchema = z.infer<typeof ReservationSubmissionSchema>;

// const partitions = [
//     { name: 'broadwell-booked' },
//     { name: 'cascadelake-booked' },
//     { name: 'epito-booked' },
//     { name: 'gracehopper-booked' },
// ];

const currentUser = 'scontald';

const getCurrentDateAtMidnight = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

const calculateDurationMinutes = (start: Date, end: Date) => {
    return Math.max(0, (end.getTime() - start.getTime()) / 60000);
};

export default function NewReservationForm() {
    const [active, setActive] = useState(0);
    const [validationError, setValidationError] = useState<string | null>(null);
    const { data, error, loading, callPost } = usePostData('reservations');
    // const [userCredits, setUserCredits] = useState(100.0); // CREDITS VALIDATION
    // const [hasInsufficientCredits, setHasInsufficientCredits] = useState(false); // CREDITS VALIDATION

    const form = useForm({
        initialValues: {
            name: '',
            start_time: getCurrentDateAtMidnight(),
            end_time: getCurrentDateAtMidnight(),
            users: [currentUser] as string[],
            nodes: '' as string,
        },
        validate: {
            name: (value) => value.trim().length > 0 ? null : "Name is required",
            start_time: (value) => {
                const nowPlusOneMinute = new Date(Date.now() + 1 * 60000);

                if (value instanceof Date && !isNaN(value.getTime())) {
                    if (value < nowPlusOneMinute) {
                        return "Start time must be at least 1 minute from the current time.";
                    }
                    return null;
                }
                return "Start time is required";
            },
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
        // CREDITS VALIDATION
        // if (hasInsufficientCredits) {
        //     setValidationError("Insufficient credits for this reservation.");
        //     return;
        // }

        try {
            await ReservationSubmissionSchema.parseAsync(values);
            const formattedData = {
                start_time: dayjs(values.start_time).format('YYYY-MM-DDTHH:mm:ss'),
                end_time: dayjs(values.end_time).format('YYYY-MM-DDTHH:mm:ss'),
                name: values.name,
                users: values.users,
                nodes: values.nodes ? values.nodes.split(',').map((node: string) => node.trim()).filter((node: string) => node.length > 0) : [],
            };
            const jsonData = JSON.stringify(formattedData, null, 2);
            setValidationError(null);
            try {
                await callPost(jsonData);
            } catch (error) {
                console.error("Error submitting reservation:", error);
                setValidationError('There was an error while submitting the form.');
            }
        } catch (error) {
            console.error("Validation Error:", error);
            setValidationError('There was an error while submitting the form.');
        }
    };

    return (
        <>
            <ValidationError validationError={validationError} setValidationError={setValidationError} />

            {/* CREDITS VALIDATION */}
            {/* <Credit
                userCredits={userCredits}
                durationMinutes={calculateDurationMinutes(form.values.start_time, form.values.end_time)}
                onInsufficientCredits={setHasInsufficientCredits}
            /> */}

            <Stepper active={active} mt="xl">
                <Stepper.Step label="New reservation" description="Select resources and users access" icon={<IconCalendar style={{ width: 20, height: 20 }} />}>
                    <ReservationStep form={form} />
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

                        const allErrors = [
                            errorMessages.errors.name,
                            errorMessages.errors.start_time,
                            errorMessages.errors.end_time
                        ].filter(Boolean) as string[];

                        if (allErrors.length > 0) {
                            setValidationError(allErrors.join(', '));
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
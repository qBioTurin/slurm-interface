'use client'
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import { useState, useEffect } from 'react';
import { Stepper, Button, Group, rem } from '@mantine/core';
import { IconCalendar, IconX, IconCheck } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { z } from 'zod';
import { ReservationSubmissionSchema } from '@/schemas/reservation_submission_schema';
import { ReservationSummary, ReservationStep } from '@/components';
import { usePostData } from '@/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';

type ReservationSubmissionSchema = z.infer<typeof ReservationSubmissionSchema>;

// PROD PARTITIONS
const partitions = [
    { name: 'broadwell-booked' },
    { name: 'cascadelake-booked' },
    { name: 'epito-booked' },
    { name: 'gracehopper-booked' },
];

// TEST PARTITIONS
// const partitions = [
//     { name: 'broadwell' },
// ];

const currentUser = process.env.CURRENT_USER || ""; // TODO: get current user from the session
const getCurrentDateAtMidnight = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export default function NewReservationForm() {
    const router = useRouter();
    const [active, setActive] = useState(0);
    const { data, error, loading, callPost } = usePostData('reservations');
    const searchParams = useSearchParams();

    useEffect(() => {
        const nodes = searchParams.getAll('nodes');
        form.setFieldValue('nodes', nodes.join(','));
    }, [searchParams]);

    const form = useForm({
        initialValues: {
            name: '',
            start_time: getCurrentDateAtMidnight(),
            end_time: getCurrentDateAtMidnight(),
            users: currentUser,
            nodes: '' as string,
            node_cnt: undefined,
            partition: undefined,
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
                if (endTime <= startTime) {
                    return "End time must be after the start time.";
                }
                return null;
            },
            node_cnt: (value, values) => {
                if (value !== undefined && values.partition === undefined) {
                    return "If 'node_cnt' is initialized, 'partition' must also be initialized.";
                }
                if (values.nodes === '' && (!values.node_cnt || !values.partition)) {
                    return "You must set either 'nodes' or both 'node_cnt' and 'partition'.";
                }
                return null;
            },
            partition: (value, values) => {
                if (value === undefined && values.node_cnt !== undefined) {
                    return "If 'node_cnt' is initialized, 'partition' must also be initialized.";
                }
                if (values.nodes === '' && (!values.node_cnt || !values.partition)) {
                    return "You must set either 'nodes' or both 'node_cnt' and 'partition'.";
                }
                return null;
            },
            nodes: (value, values) => {
                if (value === '' && (!values.node_cnt || !values.partition)) {
                    return "You must set either 'nodes' or both 'node_cnt' and 'partition'.";
                }
                return null;
            }
        },
    });

    const onSubmit = async (values: ReservationSubmissionSchema) => {

        try {
            await ReservationSubmissionSchema.parseAsync(values);
            let formattedData = {};

            if (values.nodes === '') {
                formattedData = {
                    start_time: dayjs(values.start_time).format('YYYY-MM-DDTHH:mm:ss'),
                    end_time: dayjs(values.end_time).format('YYYY-MM-DDTHH:mm:ss'),
                    name: values.name,
                    users: values.users,
                    node_cnt: values.node_cnt,
                    partition: values.partition
                };
            } else if (values.node_cnt === undefined || values.partition === undefined) {
                formattedData = {
                    start_time: dayjs(values.start_time).format('YYYY-MM-DDTHH:mm:ss'),
                    end_time: dayjs(values.end_time).format('YYYY-MM-DDTHH:mm:ss'),
                    name: values.name,
                    users: values.users,
                    nodes: values.nodes,
                };
            } else {
                formattedData = {
                    start_time: dayjs(values.start_time).format('YYYY-MM-DDTHH:mm:ss'),
                    end_time: dayjs(values.end_time).format('YYYY-MM-DDTHH:mm:ss'),
                    name: values.name,
                    users: values.users,
                    nodes: values.nodes,
                    node_cnt: values.node_cnt,
                    partition: values.partition
                };
            }

            const jsonData = JSON.stringify(formattedData, null, 2);
            console.log(jsonData); //debug

            await callPost(jsonData);
            notifications.show({
                color: 'teal',
                icon: <><IconCheck style={{ width: rem(18), height: rem(18), }} /></>,
                title: 'Reservation submitted',
                message: 'Your reservation has been successfully submitted.',
                autoClose: 5000,
            });

        } catch (error: any) {
            notifications.show({
                color: 'red',
                icon: <IconX style={{ width: rem(18), height: rem(18), }} />,
                title: 'Reservation submission failed',
                message: error.message || 'An unexpected error occurred. Please try again later.',
                autoClose: 10000,
            });
        } finally {
            router.push('/dashboard/reservations');
        }
    };

    return (
        <>

            <Stepper active={active} mt="xl">
                <Stepper.Step label="New reservation" description="Select resources" icon={<IconCalendar style={{ width: 20, height: 20 }} />}>
                    <ReservationStep form={form} partitions={partitions} />
                </Stepper.Step>
                <Stepper.Completed>
                    Review your submission details below:
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
                        const errorMessages = form.validate().errors;

                        if (Object.keys(errorMessages).length === 0) {
                            if (active === 1) {
                                onSubmit(form.values);
                            } else {
                                setActive((current) => (current < 1 ? current + 1 : current));
                            }
                        } else {
                            console.log("Errors found, active:", active);
                        }
                    }}>
                        Done
                    </Button>
                )}
            </Group>
        </>
    );

}
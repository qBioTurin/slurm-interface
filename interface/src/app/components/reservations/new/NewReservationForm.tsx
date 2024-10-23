import '@mantine/dates/styles.css';
import { useState } from 'react';
import { DateInput } from '@mantine/dates';
import {Stepper, Button, Group, TextInput, TagsInput, NumberInput, MultiSelect, Code, rem } from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useForm } from '@mantine/form';
import {z} from 'zod';
import {ReservationSubmissionSchema} from '@/schemas/reservation_submission_schema';

type ReservationSubmissionSchema = z.infer<typeof ReservationSubmissionSchema>;

const mockNodes = [
    { id: '1', nodeName: 'slurm-slave1' },
    { id: '2', nodeName: 'slurm-slave2' },
    { id: '3', nodeName: 'slurm-slave3' },
    { id: '4', nodeName: 'slurm-slave4' },
    { id: '5', nodeName: 'slurm-slave5' },
];

export default function NewReservationForm() {
    const [active, setActive] = useState(0);
    
    const form = useForm({
        initialValues: {
            name: '',
            start_time: new Date(),
            end_time: new Date(),
            users: [] as string[],
            // NodeCnt: 0,
            nodes: [] as string[],
            PartitionName: '',
        },
        validate: {
            name: (value) => value.trim().length > 0 ? null : "Name is required",
            start_time: (value) => value instanceof Date ? null : "Start time is required",
            end_time: (value) => value instanceof Date ? null : "End time is required",
            // NodeCnt: (value, values) => {
            //     if (values.nodes.length === 0 && value <= 0) {
            //         return "Node count is required if no nodes are specified.";
            //     }
            //     return null; // No error
            // },
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
            };
            console.log("Submitted Data:", formattedData);
        } catch (error) {
            console.error("Validation Error:", error);
        }
    };

    return (
        <>
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

                    <TagsInput
                        value={form.values.users}
                        onChange={(value) => form.setFieldValue('users', value)}
                        label="Users"
                        mt="md"
                        clearable
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

                    <TextInput
                        {...form.getInputProps('PartitionName')}
                        label="Partition Name"
                        placeholder="Partition Name"
                        mt="md"   
                    />

                </Stepper.Step>

                <Stepper.Completed>
                    Completed! Form values:
                    <Code block mt="xl">
                        {JSON.stringify(form.values, null, 2)}
                    </Code>
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
                        if (active === 2) {
                            onSubmit(form.values);
                        } else {
                            setActive((current) => (current < 2 ? current + 1 : current));
                        }
                    }}>
                        Done
                    </Button>
                )}
            </Group>
        </>
    );
}
import '@mantine/dates/styles.css';
import { useState } from 'react';
import { mockNodes } from '../../../../../utils/models/mock';
import { DateInput, TimeInput } from '@mantine/dates';
import { Stepper, Button, Group, TextInput, TagsInput, NumberInput, MultiSelect, Code, rem } from '@mantine/core';
import { IconCalendar, Icon } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useForm, SubmitHandler } from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {ReservationSubmissionSchema} from '@/schemas/reservation_submission_schema';

type ReservationSubmissionSchema = z.infer<typeof ReservationSubmissionSchema>;

export default function NewReservationForm() {
    const [active, setActive] = useState(0);
    // const [additionalFields, setAdditionalFields] = useState<{ id: number; field1: string; field2: string }[]>([]);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ReservationSubmissionSchema>({
        resolver: zodResolver(ReservationSubmissionSchema),
        defaultValues: {
            name: '',
            StartTime: new Date(),
            EndTime: new Date(),
            Users: [],
            NodeCnt: 0,
            Nodes: [],
            PartitionName: '',
        }
    });

    const validateTimes = (startTime: Date, endTime: Date) => {
        const errors: Record<string, string> = {};

        if (endTime < startTime) {
            errors.EndTime = "End time must be greater than or equal to Start time.";
        } else if (dayjs(endTime).isSame(startTime, 'day') && endTime <= startTime) {
            errors.EndTime = "If the dates are the same, end time must be greater than start time.";
        }

        return errors;
    };

    const onSubmit: SubmitHandler<ReservationSubmissionSchema> = (data) => {
        const timeErrors = validateTimes(data.StartTime, data.EndTime);

        if (Object.keys(timeErrors).length > 0) {
            return;
        }
        console.log("Submitted Data:", data);
    };


    const nextStep = () =>
        setActive((current) => {
            if (Object.keys(errors).length > 0) {
                return current;
            }
            return current < 2 ? current + 1 : current;
        });

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    return (
        <>
            <Stepper active={active} mt="xl">
                <Stepper.Step label="New reservation" description=
                    "Select resources and users access"
                    icon={<IconCalendar style={{ width: rem(20), height: rem(20) }} />}
                >

                    <TextInput
                        {...register('name')}
                        label="Reservation Name"
                        placeholder="Name"
                        mt="md"
                        error={errors.name?.message}
                    />

                    <DateInput
                        label="Start Time"
                        valueFormat="DD/MM/YYYY HH:mm:ss"
                        placeholder="Start Time"
                        {...register('StartTime')}
                        error={errors.StartTime?.message}
                        withAsterisk
                        onChange={(date) => {
                            if (date) {
                                setValue('StartTime', date);
                            }
                        }}
                        dateParser={(s) => dayjs(s, "DD/MM/YYYY HH:mm:ss").toDate()}
                    />

                    <DateInput
                        label="End Time"
                        valueFormat="DD/MM/YYYY HH:mm:ss"
                        placeholder="End Time"
                        {...register('EndTime')}
                        error={errors.EndTime?.message}
                        withAsterisk
                        onChange={(date) => {
                            if (date) {
                                setValue('EndTime', date);
                            }
                        }}
                        dateParser={(s) => dayjs(s, "DD/MM/YYYY HH:mm:ss").toDate()}
                        mt="md"
                    />

                    <TagsInput
                        value={watch('Users') || []}
                        onChange={(value) => setValue('Users', value as [string, ...string[]])}
                        label="Users"
                        mt="md"
                        clearable
                        error={errors.Users?.message}
                    />

                    <MultiSelect
                        data={mockNodes.map((node) => node.nodeName)}
                        label="Nodes"
                        placeholder="Select nodes"
                        mt="md"
                        searchable
                        value={watch('Nodes')}
                        onChange={(value) => setValue('Nodes', value)}
                        error={errors.Nodes?.message}
                    />

                    <NumberInput
                        label="Node Count"
                        {...register('NodeCnt', { valueAsNumber: true })}
                        min={0}
                        max={200} // arbitrary value
                        mt="md"
                        error={errors.NodeCnt?.message}
                        value={watch('NodeCnt') ?? 0}
                        onChange={(value) => {
                            if (typeof value === 'number') {
                                setValue('NodeCnt', value);
                            } else {
                                setValue('NodeCnt', 0);
                            }
                        }}
                    />

                    <TextInput
                        {...register('PartitionName')}
                        label="Partition Name"
                        placeholder="Partition Name"
                        mt="md" 
                        error={errors.PartitionName?.message}    
                    />

                </Stepper.Step>

                <Stepper.Completed>
                    Completed! Form values:
                    <Code block mt="xl">
                        {JSON.stringify(watch(), null, 2)}
                    </Code>
                </Stepper.Completed>
            </Stepper >

            <Group justify="flex-end" mt="xl">
                {active !== 0 && (
                    <Button variant="default" onClick={prevStep}>
                        Back
                    </Button>
                )}
                
                {active !== 3 && (
                    <Button onClick={handleSubmit(onSubmit)}>
                        Done
                    </Button>
                )}
            </Group>
        </>
    );
}
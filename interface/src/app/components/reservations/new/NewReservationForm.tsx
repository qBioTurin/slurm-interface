import '@mantine/dates/styles.css';
import { useState } from 'react';
import { mockNodes } from '../../../../../utils/models/mock';
import { DateInput, TimeInput } from '@mantine/dates';
import { Stepper, Button, Group, TextInput, TagsInput, NumberInput, MultiSelect, Code, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCalendar, Icon } from '@tabler/icons-react';
import dayjs from 'dayjs';




export default function NewReservationForm() {
    const [active, setActive] = useState(0);
    const [additionalFields, setAdditionalFields] = useState<{ id: number; field1: string; field2: string }[]>([]);


    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            StartTime: new Date(),
            EndTime: new Date(),
            Users: new Array<string>(),
            NodeCnt: 0,
            Nodes: new Array<string>(),
            PartitionName: '',
        },

        validate: (values) => {
            return {};
        },


    });

    const addFields = () => {
        setAdditionalFields((prev) => [
            ...prev,
            { id: prev.length, field1: '', field2: '' },
        ]);
    };

    const handleFieldChange = (id: number, field: 'field1' | 'field2', value: string) => {
        setAdditionalFields((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const nextStep = () =>
        setActive((current) => {
            if (form.validate().hasErrors) {
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
                        {...form.getInputProps('name')}
                        label="Reservation Name"
                        placeholder="Name"
                        mt="md"
                    />

                    <DateInput
                        {...form.getInputProps('StartTime')}
                        label="Start Time"
                        valueFormat="DD/MM/YYYY HH:mm:ss"
                        placeholder="Start Time"
                        mt="md"
                        withAsterisk
                        dateParser={(s) =>
                            dayjs(s, "DD/MM/YYYY HH:mm:ss").toDate().getTime()
                                ? dayjs(s, "DD/MM/YYYY HH:mm:ss").toDate()
                                : new Date(s)
                        }
                    />
                    <DateInput
                        {...form.getInputProps('EndTime')}
                        valueFormat="DD/MM/YYYY HH:mm:ss"
                        label="End Time"
                        placeholder="End Time"
                        dateParser={(s) =>
                            dayjs(s, "DD/MM/YYYY HH:mm:ss",).toDate().getTime()
                                ? dayjs(s, "DD/MM/YYYY HH:mm:ss").toDate()
                                : new Date(s)
                        }
                        mt="md"
                    />


                    <TagsInput
                        {...form.getInputProps('Users')}
                        label="Users"
                        mt="md"
                        clearable
                    />


                    <MultiSelect
                        {...form.getInputProps('Nodes')}
                        data={mockNodes.map((node) => node.nodeName)}
                        label="Nodes"
                        placeholder="Select nodes"
                        mt="md"
                        searchable
                    />

                    <NumberInput
                        {...form.getInputProps('NodeCnt')}
                        label="Node Count"
                        min={0}
                        mt="md"
                    />

                    <TextInput
                        {...form.getInputProps('PartitionName')}
                        label="Partition Name"
                        placeholder="Partition Name"
                        mt="md" />


                    {additionalFields.map((field) => (

                        <Group key={field.id} mt="md" grow>
                            <TextInput
                                {...form.getInputProps(field.field1)}
                                key={form.key('field1')}
                                label="Option"
                                value={field.field1}
                                onChange={(event) => handleFieldChange(field.id, 'field1', event.currentTarget.value)}
                                placeholder="Option"
                            />
                            <TextInput
                                {...form.getInputProps(field.field2)}
                                key={form.key('field2')}
                                label="Value"
                                value={field.field2}
                                onChange={(event) => handleFieldChange(field.id, 'field2', event.currentTarget.value)}
                                placeholder="Value"
                            />
                        </Group>
                    ))}

                    <Button onClick={addFields} mt="md">
                        Add Fields
                    </Button>


                </Stepper.Step>

                <Stepper.Completed>
                    Completed! Form values:
                    <Code block mt="xl">
                        {JSON.stringify(form.getValues(), null, 2)}
                    </Code>
                </Stepper.Completed>
            </Stepper >

            <Group justify="flex-end" mt="xl">
                {active !== 0 && (
                    <Button variant="default" onClick={prevStep}>
                        Back
                    </Button>
                )}
                {active !== 3 && <Button onClick={nextStep}>Done</Button>}
            </Group>
        </>
    );
}
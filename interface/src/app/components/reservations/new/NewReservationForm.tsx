import { useState } from 'react';
import { mockNodes } from '../../../../../utils/models/mock';
import { Stepper, Button, Group, TextInput, TagsInput, NumberInput, MultiSelect, Code } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function NewReservationForm() {
    const [active, setActive] = useState(0);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            StartTime: new Date(),
            EndTime: new Date(),
            Duration: '',
            Users: new Array<string>(),
            Groups: new Array<string>(),
            Accounts: new Array<string>(),
            NodeCnt: 0,
            Nodes: new Array<string>(),
            CoreCnt: 0,
            PartitionName: '',
            Licenses: '',
            Features: '',
            Flags: new Array<string>(),
            BurstBuffer: '',
        },

        validate: (values) => {
            return {};
        },
    });

    const nextStep = () =>
        setActive((current) => {
            if (form.validate().hasErrors) {
                return current;
            }
            return current < 3 ? current + 1 : current;
        });

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    return (
        <>
            <Stepper active={active}>
                <Stepper.Step label="Permissions" description=
                    "Select users/groups or accounts">

                    <TagsInput
                        {...form.getInputProps('Users')}
                        label="Users"
                        mt="md"
                        clearable
                    />

                    <TagsInput
                        {...form.getInputProps('Groups')}
                        label="Groups"
                        mt="md"
                        clearable
                    />

                    <MultiSelect
                        {...form.getInputProps('Accounts')}
                        data={['biology', 'physics']}
                        label="Accounts"
                        mt="md"
                        multiple
                    />
                </Stepper.Step>
                <Stepper.Step label="Resource allocation" description="
                    Select resources for your reservation">

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

                    <NumberInput
                        {...form.getInputProps('CoreCnt')}
                        label="Core Count"
                        min={0}
                        mt="md"

                    />

                    <TextInput
                        {...form.getInputProps('PartitionName')}
                        label="Partition Name"
                        placeholder="Partition Name"
                        mt="md" />
                </Stepper.Step>



                <Stepper.Step label="Optional specifications" description="
                    Select flag, features, etc.
                ">
                    <TextInput
                        {...form.getInputProps('name')}
                        label="Reservation Name"
                        placeholder="Name"
                        mt="md"
                    />
                    <TextInput
                        label="Licenses"
                        placeholder="Licenses"
                        key={form.key('licenses')}
                        {...form.getInputProps('licenses')}
                        mt="md"
                    />
                    <TextInput
                        mt="md"
                        label="Features"
                        placeholder="Features"
                        key={form.key('features')}
                        {...form.getInputProps('features')}
                    />
                    <TagsInput
                        {...form.getInputProps('Flags')}
                        label="Flags"
                        placeholder='e.g. MAINT'
                        mt="md"
                        clearable
                    />
                    <TextInput
                        {...form.getInputProps('BurstBuffer')}
                        label="Burst Buffer"
                        placeholder="Burst Buffer"
                        mt="md"
                    />
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
                {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
            </Group>
        </>
    );
}
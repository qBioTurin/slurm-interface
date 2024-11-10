'use client';

import { Text, TextInput, Button, Code, Group, MultiSelect, Modal, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateTimePicker } from '@mantine/dates';
import { ReservationSchema, SlurmReservationResponseSchema } from '@/schemas/reservation_schema';
import { useState, useEffect } from 'react';
import styles from './ReservationForm.module.css';
import { useDisclosure } from '@mantine/hooks';
import { useFetchData } from '@/hooks';
import '@mantine/dates/styles.css';
import dayjs from 'dayjs';
import { z } from 'zod';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { LoadingPage } from '@/components';


type Reservation = z.infer<typeof ReservationSchema>;

interface EditReservationProps {
    params: {
        reservationName: string;
    };
}

dayjs.extend(customParseFormat);

const mockNodes = [
    { id: '1', nodeName: 'slurm-slave1' },
    { id: '2', nodeName: 'slurm-slave2' },
    { id: '3', nodeName: 'slurm-slave3' },
    { id: '4', nodeName: 'slurm-slave4' },
    { id: '5', nodeName: 'slurm-slave5' },
];

const users = [
    { name: 'scontald' },
    { name: 'lbosio' }
]

const getNodeNames = (nodes: string) => {
    const partition = nodes.split('[');
    const nodeName = partition[0];
    const nodeRange = partition[1].split(']')[0];
    console.log("Node Range: ", nodeRange);
    console.log("Node Name: ", nodeName);
    const startRange = nodeRange.split('-')[0];
    const endRange = nodeRange.split('-')[1];

    // Get all numbers in the range
    const numbers = [];
    for (let i = parseInt(startRange); i <= parseInt(endRange); i++) {
        numbers.push(i);
    }

    // Compose node names
    const nodeNames = numbers.map((nodeNumber) => nodeName + nodeNumber);
    return nodeNames;
}


export default function EditReservation({ params }: EditReservationProps) {
    const { reservationName } = params;
    const [reservation, setReservation] = useState<Reservation | null>(null);
    const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null);
    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { data, error } = useFetchData(`reservation/${reservationName}`, SlurmReservationResponseSchema);
    const form = useForm(
        {
            initialValues: {
                name: '',
                start_time: new Date(),
                end_time: new Date(),
                users: [] as string[],
                nodes: [] as string[]
            },
            validate: {
            },
        });

    useEffect(() => {
        setLoading(true);
        if (data) {
            setReservation(data[0]);

            form.setValues({
                name: data[0].name,
                start_time: new Date(data[0].start_time.number * 1000),
                end_time: new Date(data[0].end_time.number * 1000),
                users: data[0].users.split(',') as string[],
                nodes: getNodeNames(data[0].node_list),
            });

        }
        setLoading(false);

    }, [data]);

    if (!reservation) {
        return <LoadingPage />;
    } else if (!reservation && !loading) {
        return <Text>Reservation not found</Text>;
    }

    return (
        <form onSubmit={form.onSubmit(setSubmittedValues)}>
            <TextInput
                {...form.getInputProps('name')}
                label="Reservation Name"
                placeholder="Name"
                disabled
            />

            <DateTimePicker
                label="Start Time"
                valueFormat="YYYY-MM-DDTHH:mm:ss"
                value={form.values.start_time.getTime() === new Date(0).getTime() ? null : form.values.start_time}
                placeholder="Start Time"
                {...form.getInputProps('start_time')}
                onChange={(value) => {
                    if (value)
                        form.setFieldValue('start_time', value);
                }}
                mt="md"
            />

            <DateTimePicker
                label="End Time"
                valueFormat="YYYY-MM-DDTHH:mm:ss"
                value={form.values.end_time.getTime() === new Date(0).getTime() ? null : form.values.end_time}
                placeholder="End Time"
                {...form.getInputProps('end_time')}
                onChange={(value) => {
                    if (value)
                        form.setFieldValue('end_time', value);
                }}
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
                    const uniqueUsers = Array.from(new Set([...selectedUsers, users[0].name]));
                    form.setFieldValue('users', uniqueUsers);
                }}
            />

            <MultiSelect
                {...form.getInputProps('nodes')}
                data={mockNodes.map((node) => node.nodeName)}
                label="Nodes"
                placeholder="Select nodes"
                mt="md"
                searchable
                value={form.values.nodes}
            />

            <Flex
                gap="md"
                justify="flex-start"
                align="flex-start"
                direction="row"
                wrap="wrap"
                mt="md"
            >
            </Flex>

            <Group justify="space-between" mt='lg'>
                <Button type="submit" className={styles.submitButton}>
                    Submit
                </Button>
                <Button color="rgba(219, 13, 13, 1)" onClick={open}>Delete</Button>

            </Group>

            <Modal opened={opened} onClose={close} title="Are you sure you want to delete this reservation?">
                <Group justify="end">
                    <Button onClick={close}>Cancel</Button>
                    <Button color="rgba(219, 13, 13, 1)" onClick={close}>Delete</Button>
                </Group>
            </Modal>


            {/* <Text mt="md">Form values:</Text>
            <Code block>{JSON.stringify(form.values, null, 2)}</Code>

            <Text mt="md">Submitted values:</Text>
            <Code block>{submittedValues ? JSON.stringify(submittedValues, null, 2) : '–'}</Code> */}
        </form>
    );
}
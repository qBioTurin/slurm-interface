'use client';

import { Text, TextInput, NumberInput, Button, Code, Group, MultiSelect, TagsInput, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { Reservation, Node } from '../../../../../utils/models/models';
import { mockNodes, mockReservations } from '../../../../../utils/models/mock';
import { useState, useEffect } from 'react';
import styles from './ReservationForm.module.css';
import { useDisclosure } from '@mantine/hooks';
import '@mantine/dates/styles.css';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

interface EditReservationProps {
    params: {
        reservationName: string;
    };
}

dayjs.extend(customParseFormat);


export default function EditReservation({ params }: EditReservationProps) {
    const { reservationName } = params;
    const [reservation, setReservation] = useState<Reservation | null>(null);
    const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null);
    const [opened, { open, close }] = useDisclosure(false);

    const form = useForm({
        initialValues: {
            name: '',
            StartTime: new Date(),
            EndTime: new Date(),
            Duration: '',
            Users: new Array<string>(),
            Accounts: new Array<string>(),
            Nodes: new Array<string>(),
            NodeCnt: 0,
        },
        validate: {
        },
    });

    useEffect(() => {
        const foundReservation = mockReservations.find((r) => r.ReservationName === reservationName);
        setReservation(foundReservation || null);
    }, [reservationName]);

    useEffect(() => {
        if (reservation) {
            form.setValues({
                name: reservation.ReservationName,
                StartTime: reservation.StartTime,
                EndTime: reservation.EndTime,
                Duration: reservation.Duration,
                Users: reservation.Users,
                Accounts: reservation.Accounts,
                Nodes: reservation.Nodes.map((node) => node.NodeID),
                NodeCnt: reservation.NodeCnt,
            });
        }
    }, [reservation]);


    if (!reservation) {
        return <Text>Loading reservation details...</Text>;
    }

    return (
        <form onSubmit={form.onSubmit(setSubmittedValues)}>
            <TextInput
                {...form.getInputProps('name')}
                label="Reservation Name"
                placeholder="Name"
                disabled
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
                withAsterisk
            />

            <TagsInput
                {...form.getInputProps('Users')}
                label="Users"
                defaultValue={reservation.Users}
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

            <MultiSelect
                {...form.getInputProps('Nodes')}
                data={mockNodes.map((node) => node.NodeID)}
                label="Nodes"
                placeholder="Select nodes"
                mt="md"
                searchable
            />
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

            <Text mt="md">Form values:</Text>
            <Code block>{JSON.stringify(form.values, null, 2)}</Code>

            <Text mt="md">Submitted values:</Text>
            <Code block>{submittedValues ? JSON.stringify(submittedValues, null, 2) : '–'}</Code>
        </form>
    );
}
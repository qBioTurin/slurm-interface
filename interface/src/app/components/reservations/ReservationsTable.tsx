'use client';

import { useEffect, useState } from 'react';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import { Table, Pill, TextInput, Button, Switch, Group, Badge, Flex, rem, UnstyledButton, Text, Center, ScrollArea, keys } from '@mantine/core';
import styles from './Reservations.module.css';
import { ReservationSchema } from "../../schemas/reservation_schema";
import { NumberSetInfiniteSchema } from "../../schemas/common_schema";
import { formatDate, formatDuration } from '../../../../utils/datetime';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { z } from 'zod';

type Reservation = z.infer<typeof ReservationSchema>;

interface ThProps {
    children: React.ReactNode;
    reversed?: boolean;
    sorted?: boolean;
    onSort?(): void;
}

interface ReservationTableProps {
    reservations: Reservation[];
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    if (!onSort) {
        return (
            <Table.Th className={styles.th}>
                <Text fw={700} fz="sm" >
                    {children}
                </Text>
            </Table.Th>
        );
    }
    return (
        <Table.Th className={styles.th}>
            <UnstyledButton onClick={onSort} className={styles.control}>
                <Group justify="space-between">
                    <Text fw={700} fz="sm">
                        {children}
                    </Text>
                    <Center className={styles.icon}>
                        <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </Center>
                </Group>
            </UnstyledButton>
        </Table.Th>
    );
}

function filterData(data: Reservation[], search: string): Reservation[] {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        keys(data[0]).some((key) => {
            if (key == 'node_count' || key == 'core_count') {
                return String(item[key]).toLowerCase().includes(query);
            } else if (key == 'name' || key == 'partition') {
                return item[key]?.toLowerCase().includes(query);
            } else if (key == 'users') {
                return item[key]?.toLowerCase().includes(query);
            } else if (key == 'node_list') {
                return item[key]?.toLowerCase().includes(query);
            } else if (key == 'start_time' || key == 'end_time') {
                return formatDate(item[key].number).toLowerCase().includes(query);
            } else {
                return item[key].toLocaleString().toLowerCase().includes(query);
            }
        }
        )
    );
}

function sortData(
    data: Reservation[],
    payload: { sortBy: keyof Reservation | null; reversed: boolean; search: string }
): Reservation[] {
    const { sortBy, reversed } = payload;

    if (!sortBy) {
        return filterData(data, payload.search);
    }

    const sortedData = data.slice().sort((a, b) => {
        let comparison = 0;

        if (sortBy === 'name' || sortBy === 'users' || sortBy === 'node_list' || sortBy === 'partition') {
            comparison = a[sortBy].localeCompare(b[sortBy]);
        } else if (sortBy === 'start_time' || sortBy === 'end_time' || sortBy == 'watts') {
            const aTime = a[sortBy].number || 0;
            const bTime = b[sortBy].number || 0;
            comparison = aTime - bTime;
        } else if (sortBy == 'purge_completed') {
            comparison = a[sortBy].time.number - b[sortBy].time.number;
        } else if (sortBy === 'node_count' || sortBy === 'core_count' || sortBy === 'max_start_delay') {
            comparison = a[sortBy] - b[sortBy];
        } else if (sortBy === 'flags' || sortBy == 'core_specializations') {
            comparison = a[sortBy].length - b[sortBy].length;
        }

        return reversed ? -comparison : comparison;
    });

    return filterData(sortedData, payload.search);
}

export const ReservationTable: FC<ReservationTableProps> = ({ reservations }) => {
    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState<Reservation[]>(reservations);
    const [sortBy, setSortBy] = useState<keyof Reservation | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const router = useRouter();

    const handleRowClick = (reservationName: string) => {
        router.push(`/dashboard/reservations/${reservationName}`);
    };

    const setSorting = (field: keyof Reservation) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(reservations, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(reservations, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    const ths = (
        <Table.Tr>
            <Th sorted={sortBy === 'name'} reversed={reverseSortDirection} onSort={() => setSorting('name')}>
                Name
            </Th>
            <Th>Users</Th>
            <Th sorted={sortBy === 'node_count'} reversed={reverseSortDirection} onSort={() => setSorting('node_count')}>
                N. nodes
            </Th>
            <Th>Nodes</Th>
            <Th sorted={sortBy === 'start_time'} reversed={reverseSortDirection} onSort={() => setSorting('start_time')}>
                Start time
            </Th>
            <Th sorted={sortBy === 'end_time'} reversed={reverseSortDirection} onSort={() => setSorting('end_time')}>
                End time
            </Th>
        </Table.Tr>
    );

    const rows = sortedData.map((row) => (
        <Table.Tr key={row.name} onClick={() => handleRowClick(row.name)}>
            <Table.Td>{row.name}</Table.Td>
            <Table.Td>{row.users}</Table.Td>
            <Table.Td>{row.node_count}</Table.Td>
            <Table.Td>{row.node_list}</Table.Td>
            <Table.Td>{formatDate(row.start_time.number)}</Table.Td>
            <Table.Td>{formatDate(row.end_time.number)}</Table.Td>
        </Table.Tr>
    ));

    useEffect(() => {
        setSortedData(sortData(reservations, { sortBy, reversed: reverseSortDirection, search }));
    }, [reservations]);


    return (

        <div className={styles.container}>
            <ScrollArea>
                <Group justify="end">
                    <TextInput
                        placeholder="Search by any field"
                        mb="md"
                        leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                        value={search}
                        onChange={handleSearchChange}
                    />

                    <Button
                        mb="md"
                        onClick={() => router.push('/dashboard/reservations/new')}
                        color="blue"
                        className={styles.addButton}
                    >
                        New reservation
                    </Button>
                </Group>
                <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} className={styles.table} highlightOnHover>
                    <Table.Thead>{ths}</Table.Thead>
                    <Table.Tbody>
                        {rows.length > 0 ? (
                            rows
                        ) : (
                            <Table.Tr>
                                <Table.Td colSpan={6} >
                                    <Text fw={500} ta="center">
                                        No reservations found
                                    </Text>
                                </Table.Td>
                            </Table.Tr>
                        )}
                    </Table.Tbody>
                </Table>
            </ScrollArea>
        </div >
    );
}


export default ReservationTable;
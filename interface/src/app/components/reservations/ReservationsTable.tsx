'use client';

import { useState } from 'react';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import { Table, Pill, TextInput, Button, Switch, Group, Badge, Flex, rem, UnstyledButton, Text, Center, ScrollArea, keys } from '@mantine/core';
import styles from './Reservations.module.css';
import { Reservation, Node } from '../../../../utils/models/models';
import { mockReservations } from '../../../../utils/models/mock';
import { useRouter } from 'next/navigation';


interface ThProps {
    children: React.ReactNode;
    reversed?: boolean;
    sorted?: boolean;
    onSort?(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    if (!onSort) {
        return (
            <Table.Th className={styles.th}>
                <Text>
                    {children}
                </Text>
            </Table.Th>
        );
    }
    return (
        <Table.Th className={styles.th}>
            <UnstyledButton onClick={onSort} className={styles.control}>
                <Group justify="space-between">
                    <Text fw={500} fz="sm">
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
            if (key == 'NodeCnt' || key == 'CoreCnt') {
                return String(item[key]).toLowerCase().includes(query);
            } else if (key == 'StartTime' || key == 'EndTime') {
                return item[key].toUTCString().toLowerCase().includes(query);
            } else if (key == 'ReservationName' || key == 'Duration' || key == 'PartitionName' || key == 'Licenses' || key == 'Features' || key == 'BurstBuffer') {
                return item[key]?.toLowerCase().includes(query);
            } else if (key == 'Users' || key == 'Accounts' || key == 'Groups') {
                return item[key]?.some((value) => value.toLowerCase().includes(query));
            } else if (key == 'Nodes') {
                return item[key]?.some((node) => node.nodeName.toLowerCase().includes(query));
            }
        })
    );
}

function sortData(
    data: Reservation[],
    payload: { sortBy: keyof Reservation | null; reversed: boolean; search: string }
): Reservation[] {
    const { sortBy } = payload;

    if (!sortBy) {
        return filterData(data, payload.search);
    }

    return filterData(
        [...data].sort((a, b) => {
            if (sortBy === 'StartTime' || sortBy === 'EndTime') {
                const dateA = new Date(a[sortBy]);
                const dateB = new Date(b[sortBy]);
                if (payload.reversed) {
                    return dateB.getTime() - dateA.getTime();
                } else {
                    return dateA.getTime() - dateB.getTime();
                }
            } else if (sortBy === 'NodeCnt') {
                const nodeCntA = a.NodeCnt ?? -1;
                const nodeCntB = b.NodeCnt ?? -1;
                if (payload.reversed) {
                    return nodeCntB - nodeCntA;
                } else {
                    return nodeCntA - nodeCntB;
                }
            } else {
                if (payload.reversed) {
                    return b[sortBy].toString().localeCompare(a[sortBy].toString());
                } else {
                    return a[sortBy].toString().localeCompare(b[sortBy].toString());
                }
            }
        }),
        payload.search
    );

}


export default function ReservationsTableSort() {
    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState<Reservation[]>(mockReservations);
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
        setSortedData(sortData(mockReservations, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(mockReservations, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    const ths = (
        <Table.Tr>
            <Th
                sorted={sortBy === 'ReservationName'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('ReservationName')}
            >
                Name
            </Th>
            <Th>
                Users
            </Th>
            <Th
                sorted={sortBy === 'NodeCnt'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('NodeCnt')}
            >
                N. nodes
            </Th>
            <Th>
                Nodes
            </Th>
            <Th
                sorted={sortBy === 'StartTime'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('StartTime')}
            >
                Start time
            </Th>
            <Th
                sorted={sortBy === 'EndTime'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('EndTime')}
            >
                End time
            </Th>

        </Table.Tr>
    );

    const rows = sortedData.map((row) => (
        <Table.Tr key={row.ReservationName} onClick={() => handleRowClick(row.ReservationName)}>
            <Table.Td>{row.ReservationName}</Table.Td>
            <Table.Td>
                {row.Users?.map((user) => (
                    <Pill key={user} mr='0.5em' mb='0.5em' >
                        {user}
                    </Pill>
                ))}</Table.Td>
            <Table.Td>{row.NodeCnt}</Table.Td>
            <Table.Td>{row.Nodes?.map((node) => (
                <Pill key={node?.nodeName} mr='0.5em' mb='0.5em'>{node?.nodeName}</Pill>))}</Table.Td>
            <Table.Td>{row.StartTime.toLocaleString()}</Table.Td>
            <Table.Td>{row.EndTime.toLocaleString()}</Table.Td>
        </Table.Tr>
    ));


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
                                <Table.Td colSpan={3}>
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
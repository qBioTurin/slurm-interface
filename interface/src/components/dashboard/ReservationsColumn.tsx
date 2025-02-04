import React, { useState, useEffect } from 'react';
import { ReservationSchema } from '@/schemas/reservation_schema';
import { z } from 'zod';
import { Table, ScrollArea } from '@mantine/core';
import styles from './JobColumns.module.css';
import { formatDate } from '@/utils/datetime';

type Reservation = z.infer<typeof ReservationSchema>;

interface ReservationsColumnProps {
    reservations: Reservation[];
}

const ReservationsColumn: React.FC<ReservationsColumnProps> = ({ reservations }) => {
    const [sortedData, setSortedData] = useState<Reservation[]>(reservations);

    useEffect(() => {
        setSortedData(reservations);
    }, [reservations]);

    const rows = sortedData.map((row) => (
        <Table.Tr key={row.name}>
            <Table.Td>{row.name}</Table.Td>
            <Table.Td>{row.users}</Table.Td>
            <Table.Td>{row.node_count}</Table.Td>
            <Table.Td>{row.node_list}</Table.Td>
            <Table.Td>{formatDate(row.start_time.number)}</Table.Td>
            <Table.Td>{formatDate(row.end_time.number)}</Table.Td>
        </Table.Tr>
    ));

    return (
        <div className={styles.column}>
            <h3>Reservations</h3>
            <ScrollArea style={{ height: '100%' }}>
                {reservations.length > 0 ? (
                    <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} className={styles.table} highlightOnHover>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Users</Table.Th>
                                <Table.Th>N. nodes</Table.Th>
                                <Table.Th>Nodes</Table.Th>
                                <Table.Th>Start time</Table.Th>
                                <Table.Th>End time</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {rows.length > 0 ? (
                                rows
                            ) : (
                                <Table.Tr>
                                    <Table.Td colSpan={6}>
                                        <p>No reservations available.</p>
                                    </Table.Td>
                                </Table.Tr>
                            )}
                        </Table.Tbody>
                    </Table>
                ) : (
                    <p>No reservations available.</p>
                )}
            </ScrollArea>
        </div>
    );
};

export default ReservationsColumn;

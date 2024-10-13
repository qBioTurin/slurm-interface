'use client';

import { useState } from 'react';
import { TextInput, Button, Switch, Table, Group, Badge, Flex } from '@mantine/core';
import styles from './Reservations.module.css';
import { Reservation } from '../../../../utils/models/models';
import { mockReservations } from '../../../../utils/models/mock';





export default function ReservationsPage() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [reservations, setReservations] = useState<Reservation[]>(mockReservations);


    const filteredReservations = reservations.filter((reservation) => {
        const matchSearch = reservation.ReservationID.toLowerCase().includes(searchQuery.toLowerCase());
        return matchSearch;
    }
    );

    return (
        <div className={styles.container}>
            <Group className={styles.controls}>
                <TextInput
                    className={styles.searchInput}
                    placeholder='Search reservation by id'
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.currentTarget.value)}
                />
            </Group>

            <Table className={styles.table} striped highlightOnHover>
                <thead>
                    <tr>
                        <th>ReservationID</th>
                        <th>Node</th>
                        <th>Job</th>
                        <th>Start</th>
                        <th>End</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReservations.length > 0 ? (
                        filteredReservations.map((reservation) => (
                            <tr key={reservation.ReservationID}>
                                <td>{reservation.ReservationID}</td>
                                <td>{reservation.Node.NodeID}</td>
                                <td>{reservation.Job.JobName}</td>
                                <td>{reservation.StartTime}</td>
                                <td>{reservation.EndTime}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className={styles.noNodes}>
                                No reservations found
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>


    );
}
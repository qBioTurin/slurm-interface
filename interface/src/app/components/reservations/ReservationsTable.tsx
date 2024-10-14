'use client';

import { useState } from 'react';
import { Table, Pill } from '@mantine/core';
import styles from './Reservations.module.css';
import { Reservation } from '../../../../utils/models/models';
import { useRouter } from 'next/navigation';


interface ReservationsTableProps {
    reservations: Reservation[];
    onReserve: (reservationName: string) => void;
}



export default function ReservationsTable({ reservations, onReserve }: ReservationsTableProps) {

    const router = useRouter();

    const handleRowClick = (reservationName: string) => {
        router.push(`/dashboard/reservations/${reservationName}`);
    };

    return (
        <Table className={styles.table} striped highlightOnHover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Users</th>
                    <th>N. nodes</th>
                    <th>Nodes</th>
                    <th>Start</th>
                    <th>End</th>
                </tr>
            </thead>
            <tbody>
                {reservations.length > 0 ? (
                    reservations.map((reservation) => (
                        <tr key={reservation.ReservationName} onClick={() => handleRowClick(reservation.ReservationName)}>
                            <td>{reservation.ReservationName}</td>
                            <td>
                                {reservation.Users.map((user) => (
                                    <Pill key={user} mr='0.5em' mb='0.5em' disabled>
                                        {user}
                                    </Pill>
                                ))}
                            </td>
                            <td>{reservation.NodeCnt}</td>
                            <td>{reservation.Nodes.map((node) => (
                                <Pill key={node.NodeID} mr='0.5em' mb='0.5em' disabled>{node.NodeID}</Pill>))}</td>
                            <td>{reservation.StartTime.toUTCString()}</td>
                            <td>{reservation.EndTime.toUTCString()}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={6} className={styles.noReservations}>
                            No reservations found
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>


    );
}
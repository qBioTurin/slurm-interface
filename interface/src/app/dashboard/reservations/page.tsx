'use client';

import { useState } from 'react';
import { TextInput, Button, Switch, Table, Group, Badge, Flex } from '@mantine/core';
import styles from './Reservations.module.css';
import { Reservation } from '../../../../utils/models/models';
import { mockReservations } from '../../../../utils/models/mock';
import ReservationsTable from '@/app/components/reservations/ReservationsTable';





export default function ReservationsPage() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [reservations, setReservations] = useState<Reservation[]>(mockReservations);


    const filteredReservations = reservations.filter((reservation) => {
        const matchSearch = reservation.ReservationName.toLowerCase().includes(searchQuery.toLowerCase());
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

            <ReservationsTable reservations={filteredReservations} onReserve={() => { }} />

        </div>


    );
}
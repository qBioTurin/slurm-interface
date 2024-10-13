'use client';

import { Badge, Text } from '@mantine/core';
import { Reservation } from '../../../../../utils/models/models';
import { mockReservations } from '../../../../../utils/models/mock';
import { useState, useEffect } from 'react';
import { InfoCard } from '../../../components/jobs/job-details/InfoCard';
import { InfoField } from '../../../components/jobs/job-details/InfoField';
import styles from './ReservationDetails.module.css';


interface DetailProps {
    params: {
        reservationName: string;
    };
}

export default function ReservationDetail({ params }: DetailProps) {
    const { reservationName } = params;
    const [reservation, setReservation] = useState<Reservation | null>(null);

    useEffect(() => {
        const foundReservation = mockReservations.find((r) => r.ReservationName === reservationName);
        setReservation(foundReservation || null);
    }, [reservationName]);

    if (!reservation) {
        return <Text>Reservation {reservationName} not found</Text>;
    }

    return (
        <div className={styles.container}>

            {/* Reservation Header */}
            <div className={styles.header}>
                <h2 className={styles.title}>Reservation: {reservation.ReservationName}</h2>
            </div>

        </div>
    );
}


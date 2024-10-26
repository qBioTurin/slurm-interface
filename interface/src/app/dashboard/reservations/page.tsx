'use client';

import styles from './ReservationsPage.module.css';
import { useState, useEffect } from 'react';
import ReservationsTable from '@/components/reservations/ReservationsTable';
import { ReservationSchema, SlurmReservationResponseSchema } from '@/schemas/reservation_schema';
import { set, z } from 'zod';
import { fromError } from 'zod-validation-error';
import LoadingPage from '@/components/LoadingPage/loadingPage';
import { useFetchData } from '@/hooks/useFetchData';

type Reservation = z.infer<typeof ReservationSchema>;


export default function ReservationsPage() {

    const [reservations, setReservations] = useState<Reservation[]>([]); // fetched reservations
    const { data, error } = useFetchData('reservations', SlurmReservationResponseSchema);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);

        if (data) {
            setReservations(data);
        }
        setLoading(false);
    }, [data]);

    if (loading) {
        return <LoadingPage />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (<ReservationsTable reservations={reservations} />);
}
'use client';

import { useState, useEffect } from 'react';
import { ReservationsTable, LoadingPage, ErrorPage } from '@/components';
import { ReservationSchema, SlurmReservationResponseSchema } from '@/schemas/reservation_schema';
import { useFetchData } from '@/hooks/useFetchData';
import { z } from 'zod';

type Reservation = z.infer<typeof ReservationSchema>;

export default function ReservationsPage() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const { data, loading, error } = useFetchData('reservations', SlurmReservationResponseSchema);

    useEffect(() => {
        if (data) {
            setReservations(data);
            console.log("loading value:", loading);
        }
    }, [data]);

    if (loading) {
        return <LoadingPage />;
    }

    if (error) {
        return <ErrorPage error={error} />;
    }

    return (<ReservationsTable reservations={reservations} />);
}
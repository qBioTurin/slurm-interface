'use client';

import { useState, useEffect } from 'react';
import { ReservationsTable, LoadingPage } from '@/components';
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
        }
    }, [data]);

    if (loading) {
        return <LoadingPage />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (<ReservationsTable reservations={reservations} />);
}
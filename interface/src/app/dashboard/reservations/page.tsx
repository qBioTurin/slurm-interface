'use client';

import { useState, useEffect } from 'react';
import { ReservationsTable, LoadingPage } from '@/components';
import { ReservationSchema, SlurmReservationResponseSchema } from '@/schemas/reservation_schema';
import { useFetchData } from '@/hooks/useFetchData';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';

type Reservation = z.infer<typeof ReservationSchema>;


export default function ReservationsPage() {

    const [reservations, setReservations] = useState<Reservation[]>([]); // fetched reservations
    const { data, error } = useFetchData('reservations', SlurmReservationResponseSchema);
    const [loading, setLoading] = useState<boolean>(false); // page state

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
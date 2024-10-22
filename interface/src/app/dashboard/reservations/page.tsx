'use client';

import styles from './ReservationsPage.module.css';
import { useState, useEffect } from 'react';
import ReservationsTable from '@/components/reservations/ReservationsTable';
import { ReservationSchema, SlurmReservationResponseSchema } from '@/schemas/reservation_schema';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';
import LoadingPage from '@/components/LoadingPage/loadingPage';
import { useSlurmData } from '@/hooks/useSlurmData';

type Reservation = z.infer<typeof ReservationSchema>;


export default function ReservationsPage() {

    const [searchQuery, setSearchQuery] = useState<string>(''); // search bar
    const [reservations, setReservations] = useState<Reservation[]>([]); // fetched reservations
    const [isValidating, setIsValidating] = useState(false);
    const { data, loading, error } = useSlurmData('reservations');

    //parse data from the API
    useEffect(() => {
        if (error) {
            return;
        }

        if (loading) {
            return;
        }

        if (data) {
            setIsValidating(true);
            try {
                const validatedData = SlurmReservationResponseSchema.parse(data);
                setReservations(validatedData.reservations);
            } catch (error) {
                const validationError = fromError(error);
                console.error('Error validating reservation data:', validationError.toString());
                setReservations([]);
            } finally {
                setIsValidating(false);
            }
        } else {
            console.warn("Data is null or undefined, skipping validation.");
        }
    }, [data, loading]);


    return (<ReservationsTable />);
}
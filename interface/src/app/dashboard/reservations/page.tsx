import ReservationsPage from "../../components/reservations/reservations";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Reservations',
    description: 'View and manage reservations',
};

export default function Reservations() {
    return (
        <ReservationsPage />
    );
}
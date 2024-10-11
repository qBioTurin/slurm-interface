import DashBoardPage from "@/app/components/dashboard/dashboard";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'DashBoard',
    description: 'Aggregate statistics',
};

export default function DashBoard() {
    return (
        <DashBoardPage />
    );
}
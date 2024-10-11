import JobsPage from "@/app/components/jobs/jobs";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Jobs',
    description: 'View and manage jobs in the cluster',
};

export default function Nodes() {
    return (
        <JobsPage />
    );
}
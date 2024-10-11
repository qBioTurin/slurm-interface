import NodesPage from "@/app/components/nodes/nodes";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Nodes',
    description: 'View and manage nodes in the cluster',
};

export default function Nodes() {
    return (
        <NodesPage />
    );
}
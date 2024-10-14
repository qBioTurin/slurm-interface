import { Metadata } from 'next';
import { mockJobs } from '../../../../utils/models/mock';
import JobsBarchart from '../../components/dashboard/JobsBarchart';
import UpcomingJobs from '../../components/dashboard/UpcomingJobsTable';

export const metadata: Metadata = {
    title: 'DashBoard',
    description: 'Aggregate statistics',
};

export default function DashBoard() {
    return (
        <div>
            <h1> Dashboard </h1>
            <div>
                <h2>Upcoming Jobs for Today </h2>
                <UpcomingJobs jobs={mockJobs} />
            </div>

            <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: 10}}>
                <h2> Jobs statistics </h2>
                <JobsBarchart jobs={mockJobs} />
            </div>
        </div>
    );
}
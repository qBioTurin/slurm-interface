import { Metadata } from 'next';
import { mockJobs } from '../../../../utils/models/mock';
import JobsBarchart from '../../components/dashboard/JobsBarchart';
import UpcomingJobs from '../../components/dashboard/UpcomingJobsTable';
import styles from './Dashboard.module.css';

export const metadata: Metadata = {
    title: 'DashBoard',
    description: 'Aggregate statistics',
};

export default function DashBoard() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1> Dashboard </h1>
            </div>
            
            <div className={styles.section}>
                <h2>Upcoming Jobs for Today </h2>

                <div className={styles.upcomingJobs}>
                    <UpcomingJobs jobs={mockJobs} />
                </div>
            </div>

            <div className={styles.section}>
                <h2> Jobs statistics </h2>

                <div className={styles.stats}>
                    <JobsBarchart jobs={mockJobs} />
                </div>
                
            </div>
        </div>
    );
}
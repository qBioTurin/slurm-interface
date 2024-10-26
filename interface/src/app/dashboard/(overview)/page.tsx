'use client'

import { Grid } from '@mantine/core';
import JobsBarchart from '../../components/dashboard/JobsBarchart';
import LoadingPage from '@/components/LoadingPage/loadingPage';
import { useFetchData } from '@/hooks/useFetchData';
import { JobSchema, SlurmJobResponseSchema } from '../../schemas/job_schema';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';
import { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import RunningJobsColumn from '../../components/dashboard/RunningJobsColumn';
import PendingJobsColumn from '../../components/dashboard/PendingJobsColumn';

type Job = z.infer<typeof JobSchema>;
const currentUser = "scontald"; // TODO: get current user from auth context

export default function DashBoard() {
    const [jobs, setJobs] = useState<Job[]>([]); // fetched jobs
    const [loading, setLoading] = useState(false); // page state

    const { data, error } = useFetchData('jobs', SlurmJobResponseSchema);

    useEffect(() => {
        setLoading(true);
        if (data) {
            setJobs(data);
        }
        setLoading(false);
    }, [data]);

    const userJobs = jobs;
    const runningCompletedJobs = userJobs.filter(job => job.job_state[0] != 'PENDING');
    const pendingJobs = userJobs.filter(job => job.job_state[0] === 'PENDING');

    if (loading) {
        return <LoadingPage />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1> Dashboard </h1>
            </div>

            <div className={styles.section}>
                <h2>Upcoming Jobs for Today </h2>
                <Grid>
                    {/* Left Column: Running jobs */}
                    <Grid.Col span={{ base: 8, md: 8, lg: 8 }}>
                        <RunningJobsColumn jobs={runningCompletedJobs} />
                    </Grid.Col>

                    {/* Right Column: Pending jobs */}
                    <Grid.Col span={{ base: 4, md: 4, lg: 4 }}>
                        <PendingJobsColumn jobs={pendingJobs} />
                    </Grid.Col>
                </Grid>
            </div>

            <div className={styles.section}>
                <h2> Jobs statistics </h2>

                <div className={styles.stats}>
                    <JobsBarchart jobs={userJobs} />
                </div>

            </div>
        </div>
    );
}
'use client'

import { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import { Grid, Switch, Group, Flex, Stack, Title } from '@mantine/core';
import { JobsBarchart, RunningJobsColumn, PendingJobsColumn, LoadingPage } from '@/components/';
import { useFetchData } from '@/hooks/';
import { JobSchema, SlurmJobResponseSchema } from '@/schemas/job_schema';
import { z } from 'zod';


type Job = z.infer<typeof JobSchema>;
const currentUser = process.env.CURRENT_USER || 'scontald'; // TODO: get current user from auth context

export default function DashBoard() {
    const [allJobs, setAllJobs] = useState<Job[]>([]); // fetched jobs
    const { data, loading, error } = useFetchData('jobs', SlurmJobResponseSchema);
    const [showUserJobs, setShowUserJobs] = useState(true);

    useEffect(() => {
        if (data) {
            setAllJobs(data);
        }
    }, [data]);

    const jobs = showUserJobs ? allJobs.filter(job => job.user_name.includes(currentUser)) : allJobs;
    const runningCompletedJobs = jobs.filter(job => job.job_state[0] != 'PENDING');
    const pendingJobs = jobs.filter(job => job.job_state[0] === 'PENDING');

    if (loading) {
        return <LoadingPage />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Stack>
            <Group justify='space-between'>
                <Title order={2} > Dashboard</Title>
                <Switch
                    label={showUserJobs ? "Your jobs" : "All Jobs"}
                    checked={showUserJobs}
                    onChange={(event) => setShowUserJobs(event.currentTarget.checked)}
                />
            </Group>
            <Title order={3} mt='sm'>Upcoming Jobs for Today </Title>
            <Flex direction={{ base: 'row', sm: 'column' }}>
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
            </Flex>

            <Stack mt='md'>
                <Title order={3} ml='sm'> Jobs statistics </Title>

                <div className={styles.stats}>
                    <JobsBarchart jobs={jobs} />
                </div>

            </Stack>
        </Stack >
    );
}
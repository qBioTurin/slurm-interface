'use client'

import { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import { Grid, Switch, Group, Flex, Stack, Title, Text } from '@mantine/core';
import { JobsBarchart, RunningJobsColumn, PendingJobsColumn, LoadingPage } from '@/components/';
import { useFetchData } from '@/hooks/';
import { JobSchema, SlurmJobResponseSchema } from '@/schemas/job_schema';
import { z } from 'zod';


type Job = z.infer<typeof JobSchema>;
const currentUser = process.env.CURRENT_USER || "" // TODO: get current user from auth context

export default function DashBoard() {
    const [allJobs, setAllJobs] = useState<Job[]>([]);
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
                <Text size='30px' fw='bold' mt='md'> Dashboard</Text>
                <Switch
                    label={showUserJobs ? "Your jobs" : "All Jobs"}
                    checked={showUserJobs}
                    onChange={(event) => setShowUserJobs(event.currentTarget.checked)}
                />
            </Group>
            <Text size='20px' fw='bold' mt='lg'>Upcoming Jobs for Today </Text>
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
                <Text size='20px' fw='bold' mt='lg'>Jobs Stats</Text>
                <div className={styles.stats}>
                    <JobsBarchart jobs={jobs} />
                </div>

            </Stack>
        </Stack >
    );
}
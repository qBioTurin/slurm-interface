'use client'

import { useState, useEffect } from 'react';
import { Grid, Switch, Group, Flex, Stack, Title } from '@mantine/core';
import { JobsBarchart, RunningJobsColumn, PendingJobsColumn, LoadingPage } from '@/components/';
import NodesPiechart from '@/components/dashboard/NodesPiechart';
import { useFetchData } from '@/hooks/';
import { JobSchema, SlurmJobResponseSchema } from '@/schemas/job_schema';
import { SlurmNodeResponseSchema, NodeSchema } from '@/schemas/node_schema';
import { z } from 'zod';

type Job = z.infer<typeof JobSchema>;
type Node = z.infer<typeof NodeSchema>;
const currentUser = process.env.CURRENT_USER || 'scontald'; // TODO: get current user from auth context

export default function DashBoard() {
    const [allJobs, setAllJobs] = useState<Job[]>([]); // fetched jobs
    const [nodes, setNodes] = useState<Node[]>([]); // fetched nodes
    const { data: jobData, loading: jobLoading, error: jobError } = useFetchData('jobs', SlurmJobResponseSchema);
    const { data: nodeData, loading: nodeLoading, error: nodeError } = useFetchData('nodes', SlurmNodeResponseSchema);
    const [showUserJobs, setShowUserJobs] = useState(true);

    useEffect(() => {
        if (jobData) {
            setAllJobs(jobData);
        }
    }, [jobData]);

    useEffect(() => {
        if (nodeData) {
            setNodes(nodeData);
        }
    }, [nodeData]);

    const jobs = showUserJobs ? allJobs.filter(job => job.user_name.includes(currentUser)) : allJobs;
    const runningCompletedJobs = jobs.filter(job => job.job_state[0] != 'PENDING');
    const pendingJobs = jobs.filter(job => job.job_state[0] === 'PENDING');

    if (jobLoading || nodeLoading) {
        return <LoadingPage />;
    }

    if (jobError) {
        return <div>Error: {jobError}</div>;
    }

    if (nodeError) {
        return <div>Error: {nodeError}</div>;
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
                <Flex direction={{ base: 'column', md: 'row' }} gap="md">
                    <div style={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Title order={3} ml='sm' mb='sm'> Jobs stats </Title>
                        <JobsBarchart jobs={jobs} />
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Title order={3} ml='sm' mb='sm'> Nodes stats </Title>
                        <NodesPiechart nodes={nodes} />
                    </div>
                </Flex>

            </Stack>
        </Stack >
    );
}

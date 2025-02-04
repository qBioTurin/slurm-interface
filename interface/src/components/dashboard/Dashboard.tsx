'use client'

import { useState, useEffect } from 'react';
import { Grid, Switch, Group, Flex, Accordion, Title } from '@mantine/core';
import { JobsBarchart, RunningJobsColumn, PendingJobsColumn, LoadingPage } from '@/components/';
import { IconBriefcase2, IconPresentationAnalyticsFilled, IconCalendarFilled } from '@tabler/icons-react';
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
        <div>
            <Group justify='space-between' style={{ marginBottom: '20px' }}>
                <Title order={2}> Welcome, <span style={{ color: 'red' }}>{currentUser}</span></Title>
                <Switch
                    label={showUserJobs ? "Your jobs" : "All Jobs"}
                    checked={showUserJobs}
                    onChange={(event) => setShowUserJobs(event.currentTarget.checked)}
                />
            </Group>

            <Accordion multiple defaultValue={['UpcomingJobs', 'Stats']}>
                <Accordion.Item value="UpcomingJobs">
                    <Accordion.Control icon={<IconBriefcase2 size={20} color="red" />}>
                        <div style={{ fontWeight: 'bold', fontSize: '20px' }}>Upcoming Jobs</div>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Flex direction={{ base: 'column', md: 'row' }} gap="md">
                            {/* Left Column: Running jobs */}
                            <div style={{ flex: 2, minWidth: '0' }}>
                                <RunningJobsColumn jobs={runningCompletedJobs} />
                            </div>

                            {/* Right Column: Pending jobs */}
                            <div style={{ flex: 1, minWidth: '0' }}>
                                <PendingJobsColumn jobs={pendingJobs} />
                            </div>
                        </Flex>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="Stats">
                    <Accordion.Control icon={<IconPresentationAnalyticsFilled size={20} color="red" />}>
                        <div style={{ fontWeight: 'bold', fontSize: '20px' }}>Stats</div>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Flex direction={{ base: 'column', md: 'row' }} gap="md">
                            <div style={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', border: '1px solid #e0e0e0', borderRadius: '5px' }}>
                                <div style={{ textAlign: 'center', backgroundColor: '#f5f5f5', padding: '10px', margin: '20px', width: '100%', fontSize: '20px', fontWeight: 'bold' }}> Jobs stats </div>
                                <JobsBarchart jobs={jobs} />
                            </div>

                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', border: '1px solid #e0e0e0', borderRadius: '5px' }}>
                                <div style={{ textAlign: 'center', backgroundColor: '#f5f5f5', padding: '10px', margin: '20px', width: '100%', fontSize: '20px', fontWeight: 'bold' }}> Nodes stats </div>
                                <NodesPiechart nodes={nodes} />
                            </div>
                        </Flex>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}

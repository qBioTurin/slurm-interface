'use client'

import { useState, useEffect } from 'react';
import { Button, Switch, Group, Flex, Accordion, Title } from '@mantine/core';
import { JobsBarchart, RunningJobsColumn, PendingJobsColumn, LoadingPage, ErrorPage } from '@/components/';
import { IconBriefcase2, IconPresentationAnalyticsFilled, IconCalendarFilled } from '@tabler/icons-react';
import NodesPiechart from '@/components/dashboard/NodesPiechart';
import { useFetchData } from '@/hooks/';
import { JobSchema, SlurmJobResponseSchema } from '@/schemas/job_schema';
import { SlurmNodeResponseSchema, NodeSchema } from '@/schemas/node_schema';
import { ReservationSchema, SlurmReservationResponseSchema } from '@/schemas/reservation_schema';
import { z } from 'zod';
import ReservationsColumn from './ReservationsColumn';
import { useRouter } from 'next/navigation';

type Job = z.infer<typeof JobSchema>;
type Node = z.infer<typeof NodeSchema>;
type Reservation = z.infer<typeof ReservationSchema>;

const currentUser = process.env.CURRENT_USER || 'scontald'; // TODO: get current user from auth context

export default function DashBoard() {
    const router = useRouter();
    const [allJobs, setAllJobs] = useState<Job[]>([]); // fetched jobs
    const [nodes, setNodes] = useState<Node[]>([]); // fetched nodes
    const [reservations, setReservations] = useState<Reservation[]>([]); // fetched reservations
    const { data: jobData, loading: jobLoading, error: jobError } = useFetchData('jobs', SlurmJobResponseSchema);
    const { data: nodeData, loading: nodeLoading, error: nodeError } = useFetchData('nodes', SlurmNodeResponseSchema);
    const { data: reservationData, loading: reservationLoading, error: reservationError } = useFetchData('reservations', SlurmReservationResponseSchema);
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

    useEffect(() => {
        if (reservationData) {
            setReservations(reservationData);
        }
    }, [reservationData]);

    const jobs = showUserJobs ? allJobs.filter(job => job.user_name.includes(currentUser)) : allJobs;
    const runningCompletedJobs = jobs.filter(job => job.job_state[0] != 'PENDING');
    const pendingJobs = jobs.filter(job => job.job_state[0] === 'PENDING');
    const userReservations = reservations.filter(reservation => reservation.users.includes(currentUser));

    if (jobLoading || nodeLoading || reservationLoading) {
        return <LoadingPage />;
    }

    if (jobError) {
        return <ErrorPage error={jobError} />;
    }

    if (nodeError) {
        return <ErrorPage error={nodeError} />;
    }

    if (reservationError) {
        return <ErrorPage error={reservationError} />;
    }

    return (
        <div>
            <Flex justify="space-between" align="center" style={{ marginBottom: '10px' }}>
                <Title order={3}> Welcome, <span style={{ color: 'red' }}>{currentUser}</span> !</Title>
                <Group>
                    <Button mb="md" onClick={() => router.push('/dashboard/jobs/submit')} color="red">
                        Submit Jobs
                    </Button>
                    <Button mb="md" onClick={() => router.push('/dashboard/reservations/new')} color="black">
                        New reservation
                    </Button>
                </Group>
            </Flex>

            <Accordion multiple defaultValue={['Reservations', 'Jobs', 'Stats']}>
                <Accordion.Item value="Reservations">
                    <Accordion.Control icon={<IconCalendarFilled size={20} color="red" />}>
                        <Title order={4}>Upcoming Reservations</Title>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <ReservationsColumn reservations={userReservations} />
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="Jobs">
                    <Accordion.Control icon={<IconBriefcase2 size={20} color="red" />}>
                        <Group>
                            <Title order={4}>Upcoming Jobs</Title>

                            <Switch
                                label={showUserJobs ? "Your jobs" : "All Jobs"}
                                checked={showUserJobs}
                                onChange={(event) => setShowUserJobs(event.currentTarget.checked)}
                            />
                        </Group>
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
                        <Title order={4}>Stats</Title>
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

'use client';

import '@mantine/notifications/styles.css';
import { useState, useEffect } from 'react';
import styles from './JobsPage.module.css';
import { TextInput, Group, rem, Switch, Button, ActionIcon } from '@mantine/core';
import { JobSchema, SlurmJobResponseSchema } from '@/schemas/job_schema';
import { LoadingPage, JobsTable } from '@/components/';
import { useFetchData, useDeleteData } from '@/hooks';
import { useRouter } from 'next/navigation';
import { IconTrash, IconPlayerPause, IconSearch } from '@tabler/icons-react';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';


type Job = z.infer<typeof JobSchema>;
const currentUser = "testslurm"; // TODO: get current user from auth context

export default function JobsPage() {
    const { data, loading, error } = useFetchData('jobs', SlurmJobResponseSchema);
    const { deleteData } = useDeleteData();
    const [searchQuery, setSearchQuery] = useState<string>(''); // search bar
    const [showUserJobs, setShowUserJobs] = useState(true); // state toggle
    const [jobs, setJobs] = useState<Job[]>([]); // fetched jobs
    const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
    const router = useRouter();


    useEffect(() => {
        if (data) {
            setJobs(data);
        }
    }, [data]);

    const filteredJobs = jobs.filter((job) => {
        const matchesSearchQuery = job.job_id.toString().includes(searchQuery) ||
            job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.partition.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.job_state[0].toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.nodes.toString().includes(searchQuery);
        const matchesUserFilter = showUserJobs
            ? job.user_name.toLowerCase() === currentUser.toLowerCase()
            : true;

        return matchesSearchQuery && matchesUserFilter;
    });

    const handleJobSelect = (jobId: number, isSelected: boolean) => {
        setSelectedJobs((prevSelectedJobs) =>
            isSelected ? [...prevSelectedJobs, jobId] : prevSelectedJobs.filter((id) => id !== jobId)
        );
    };

    const handleDeleteSelectedJobs = () => {
        console.log('delete clicked');
        for (const id of selectedJobs) {
            deleteData(`job/${id}`)
                .then(() => {
                    console.log('Job deleted');
                })
                .catch((error) => {
                    console.error('Error deleting job:', error);
                });
        }

        setSelectedJobs([]);

        router.refresh();
    };


    const handleSelectAll = (isSelected: boolean) => {
        setSelectedJobs(isSelected ? filteredJobs.map(job => job.job_id) : []);
    };

    if (loading) {
        return <LoadingPage />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <div className={styles.container}>

            <Group className={styles.group}>
                <TextInput
                    className={styles.searchInput}
                    placeholder="Search jobs"
                    leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.currentTarget.value)}
                />

                <Switch
                    label={showUserJobs ? "Your jobs" : "All Jobs"}
                    checked={showUserJobs}
                    onChange={(event) => setShowUserJobs(event.currentTarget.checked)}
                />

                {selectedJobs.length > 0 &&
                    showUserJobs &&
                    (
                        <Group>
                            <Button onClick={() => setSelectedJobs([])} variant='outline'>
                                Clear selection
                            </Button>

                            <ActionIcon size="lg" variant='outline' aria-label={selectedJobs.length == 1 ? 'Cancel job' : 'Cancel jobs'} color='red' onClick={handleDeleteSelectedJobs}>
                                <IconTrash />
                            </ActionIcon>
                        </Group>
                    )}

                <Button className={styles.submitButton} onClick={() => router.push('/dashboard/jobs/submit')}>
                    Submit Jobs
                </Button>
            </Group>

            {filteredJobs.length > 0 ? (
                <JobsTable
                    jobs={filteredJobs}
                    selectable={showUserJobs}
                    selectedJobs={selectedJobs}
                    onSelect={handleJobSelect}
                    onSelectAll={handleSelectAll}
                />
            ) : (
                <p>No jobs found.</p>
            )}

        </div>
    );
}

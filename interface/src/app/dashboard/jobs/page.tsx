'use client';

import { useState, useEffect } from 'react';
import { TextInput, Group, rem, Switch, Button, ActionIcon } from '@mantine/core';
import JobTable from '../../components/jobs/JobsTable';
import { IconSearch } from '@tabler/icons-react';
import {JobSchema, SlurmJobResponseSchema} from '../../schemas/job_schema';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';
import styles from './JobsPage.module.css';
import LoadingPage from '@/components/LoadingPage/loadingPage';
import { useSlurmData } from '@/hooks/useSlurmData';
import { useRouter } from 'next/navigation';
import {IconTrash, IconPlayerPause} from '@tabler/icons-react';

type Job = z.infer<typeof JobSchema>;
const currentUser = "scontald"; // TODO: get current user from auth context

export default function JobsPage() {
    const [searchQuery, setSearchQuery] = useState<string>(''); // search bar
    const [showUserJobs, setShowUserJobs] = useState(true); // state toggle
    const [jobs, setJobs] = useState<Job[]>([]); // fetched jobs
    const [isValidating, setIsValidating] = useState(false); // page state
    const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
    const router = useRouter();

    const { data, loading, error } = useSlurmData('jobs');

    useEffect(() => {
        if (error) {
            return;
        }

        if (loading) {
            return;
        }
    
        if (data) {
            setIsValidating(true);
            try {
                const validatedData = SlurmJobResponseSchema.parse(data);
                setJobs(validatedData.jobs);
            } catch (error) {
                const validationError = fromError(error);
                console.error('Error validating job data:', validationError.toString());
                setJobs([]);
            } finally {
                setIsValidating(false);
            }
        } else {
            console.warn("Data is null or undefined, skipping validation.");
        }
    }, [data, loading]);

    const filteredJobs = jobs.filter((job) => {
        const matchesSearchQuery = job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                   job.user_name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesUserFilter  = showUserJobs
        ? job.user_name.toLowerCase() === currentUser.toLowerCase()
        : true;

        return matchesSearchQuery && matchesUserFilter ;
    });

    const handleJobSelect = (jobId: number, isSelected: boolean) => {
        setSelectedJobs((prevSelectedJobs) =>
            isSelected ? [...prevSelectedJobs, jobId] : prevSelectedJobs.filter((id) => id !== jobId)
        );
    };

    const handleSelectAll = (isSelected: boolean) => {
        setSelectedJobs(isSelected ? filteredJobs.map(job => job.job_id) : []);
    };

    if (loading || isValidating) {
        return <LoadingPage />;
    }

    return (
        <div className={styles.container}>

            <Group className={styles.group}>
                <TextInput
                    className={styles.searchInput}
                    placeholder="Search Jobs"
                    leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.currentTarget.value)}
                />

                <Switch
                    label={showUserJobs ? "Your jobs" : "All Jobs"}
                    checked={showUserJobs}
                    onChange={(event) => setShowUserJobs(event.currentTarget.checked)}
                />

                {selectedJobs.length > 0 && (
                    <Group>
                        <Button onClick={() => setSelectedJobs([])} variant='outline'>
                            Clear selection
                        </Button>

                        <ActionIcon size="lg" color='red' className={styles.cancelJobButton} title={selectedJobs.length === 1 ? 'Cancel job' : 'Cancel jobs'} onClick={() => {}}>
                            <IconTrash size={40} />
                        </ActionIcon>

                        <ActionIcon size="lg" color='yellow' className={styles.stopJobButton} title={selectedJobs.length === 1 ? 'Stop job' : 'Stop jobs'} onClick={() => {}}>
                            <IconPlayerPause size={40} />
                        </ActionIcon>
                    </Group>
                )}

                <Button className={styles.submitButton} onClick={() => router.push('/dashboard/jobs/submit')}>
                    Submit Jobs
                </Button>
            </Group>

            {filteredJobs.length > 0 ? (
               <JobTable 
               jobs={filteredJobs} 
               selectable={!showUserJobs}
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

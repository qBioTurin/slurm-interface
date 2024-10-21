'use client';

import { useState, useEffect } from 'react';
import { TextInput, Group, rem, Switch } from '@mantine/core';
import JobTable from '../../components/jobs/JobsTable';
import { IconSearch } from '@tabler/icons-react';
import {JobSchema, SlurmJobResponseSchema} from '../../schemas/job_schema';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';
import styles from './JobsPage.module.css';
import LoadingPage from '@/components/LoadingPage/loadingPage';
import { useSlurmData } from '@/hooks/useSlurmData';

type Job = z.infer<typeof JobSchema>;

export default function JobsPage() {
    const [searchQuery, setSearchQuery] = useState<string>(''); // search bar
    const [showRunning, setShowRunning] = useState(true); // state toggle
    const [jobs, setJobs] = useState<Job[]>([]); // fetched jobs
    const [isValidating, setIsValidating] = useState(false); // page state

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
        const isRunningJob = job.job_state[0] === 'RUNNING';
        
        return matchesSearchQuery && (showRunning ? isRunningJob : !isRunningJob);
});

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
                    label={showRunning ? "Running Jobs" : "All Jobs"}
                    checked={showRunning}
                    onChange={(event) => setShowRunning(event.currentTarget.checked)}
                />
            </Group>

            {filteredJobs.length > 0 ? (
                <JobTable jobs={filteredJobs} />
            ) : (
                <p>No jobs found.</p>
            )}

        </div>
    );
}

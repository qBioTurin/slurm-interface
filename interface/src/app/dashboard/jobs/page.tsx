'use client';

import { useState, useEffect } from 'react';
import { TextInput, Group, rem, Switch, Button } from '@mantine/core';
import JobTable from '../../components/jobs/JobsTable';
import { IconSearch } from '@tabler/icons-react';
import {JobSchema, SlurmJobResponseSchema} from '../../schemas/job_schema';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';
import styles from './JobsPage.module.css';
import LoadingPage from '@/components/LoadingPage/loadingPage';
import { useSlurmData } from '@/hooks/useSlurmData';
import { useRouter } from 'next/navigation';

type Job = z.infer<typeof JobSchema>;
const currentUser = "scontald"; // TODO: get current user from auth context

export default function JobsPage() {
    const [searchQuery, setSearchQuery] = useState<string>(''); // search bar
    const [showUserJobs, setShowUserJobs] = useState(true); // state toggle
    const [jobs, setJobs] = useState<Job[]>([]); // fetched jobs
    const [isValidating, setIsValidating] = useState(false); // page state
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

                <Button className={styles.submitButton} onClick={() => router.push('/dashboard/jobs/submit')}>
                    Submit Jobs
                </Button>
            </Group>

            {filteredJobs.length > 0 ? (
                <JobTable jobs={filteredJobs} />
            ) : (
                <p>No jobs found.</p>
            )}

        </div>
    );
}

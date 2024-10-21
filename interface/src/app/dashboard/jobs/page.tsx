'use client';

import { useState, useEffect } from 'react';
import { TextInput, Group, rem } from '@mantine/core';
import JobTable from '../../components/jobs/JobsTable';
import { IconSearch } from '@tabler/icons-react';
import styles from './Jobs.module.css';
import {JobSchema, SlurmJobResponseSchema} from '../../schemas/job_schema';
import { z } from 'zod';
import {mockJobData} from '../../../../../temp/job-106958';

type Job = z.infer<typeof JobSchema>;

export default function JobsPage() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        try {
            const validatedData = SlurmJobResponseSchema.parse(mockJobData);
            setJobs(validatedData.jobs);
        } catch (error) {
            console.error('Error validating job data:', error);
            setJobs([]);
        }
    }, []);

    const filteredJobs = jobs.filter((job) =>
        job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.user_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
            </Group>

            {filteredJobs.length > 0 ? (
                <JobTable jobs={filteredJobs} />
            ) : (
                <p>No jobs found.</p>
            )}

        </div>
    );
}

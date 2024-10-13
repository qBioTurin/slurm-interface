'use client';

import { useState } from 'react';
import { TextInput, Group } from '@mantine/core';
import JobTable from '../../components/jobs/JobsTable';
import { Job } from '../../../../utils/models/models';
import { mockJobs } from '../../../../utils/models/mock';
import styles from './Jobs.module.css';

export default function JobsPage() {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredJobs = mockJobs.filter((job) =>
        job.JobName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.User.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <Group className={styles.group}>
                <TextInput
                    className={styles.searchInput}
                    placeholder="Search Jobs"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.currentTarget.value)}
                />
            </Group>

            <JobTable jobs={filteredJobs} />
        </div>
    );
}

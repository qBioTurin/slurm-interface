'use client';

import { useState } from 'react';
import { TextInput, Group } from '@mantine/core';
import JobTable from '../../components/jobs/JobsTable';
import { mockJobs } from '../../../../utils/models/mock';
import styles from './Jobs.module.css';

export default function JobsPage() {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredJobs = mockJobs.filter((job) =>
        job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.user.toLowerCase().includes(searchQuery.toLowerCase())
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

import React from 'react';
import { JobSchema } from '@/schemas/job_schema';
import { z } from 'zod';
import { Table, ScrollArea } from '@mantine/core';
import styles from './JobColumns.module.css';
import Link from 'next/link';

type Job = z.infer<typeof JobSchema>;

interface PendingJobsColumnProps {
    jobs: Job[];
}

const PendingJobsColumn: React.FC<PendingJobsColumnProps> = ({ jobs }) => {
    return (
        <div className={styles.column}>
            <h3>Pending Jobs</h3>
            <ScrollArea style={{ height: '100%' }}>
                {jobs.length > 0 ? (
                    <Table striped highlightOnHover className={styles.table}>
                        <thead>
                            <tr>
                                <th>Job ID</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => (
                                <tr key={job.job_id}>
                                    <td>
                                        <Link href={`/dashboard/jobs/${job.job_id}`} passHref>
                                            <span className={styles.link}>{job.job_id}</span>
                                        </Link>
                                    </td>
                                    <td>{job.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p>No pending jobs available.</p>
                )}
            </ScrollArea>
        </div>
    );
};

export default PendingJobsColumn;

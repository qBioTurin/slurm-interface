import React from 'react';
import { JobSchema } from '@/schemas/job_schema';
import { z } from 'zod';
import { Table, ScrollArea, Button } from '@mantine/core';
import styles from './JobColumns.module.css';

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
                                <tr
                                    key={job.job_id}
                                    onClick={() => (window.location.href = `/dashboard/jobs/${job.job_id}`)}
                                    className={`${styles.greyRow}`}

                                >
                                    <td>
                                        <Button>
                                            {job.job_id}
                                        </Button>
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

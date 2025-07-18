import React from 'react';
import { JobSchema } from '@/schemas/job_schema';
import { z } from 'zod';
import { Table, ScrollArea, Button } from '@mantine/core';
import styles from './JobColumns.module.css';

type Job = z.infer<typeof JobSchema>;

interface RunningJobsColumnProps {
    jobs: Job[];
}

const getRowClass = (jobState: string[]) => {
    const state = jobState[0];

    if (state === 'RUNNING') return styles.greenRow;
    if (state === 'COMPLETED' || state === 'COMPLETING') return styles.blueRow;
    if (['FAILED', 'TIMEOUT', 'DEADLINE', 'CANCELLED', 'NODE_FAIL', 'OUT_OF_MEMORY'].includes(state)) return styles.redRow;
    if (state === 'STOPPED' || state === 'SUSPENDED') return styles.yellowRow;

    return '';
};


const RunningJobsColumn: React.FC<RunningJobsColumnProps> = ({ jobs }) => {
    return (
        <div className={styles.column}>
            <h3>Running Jobs</h3>
            <ScrollArea style={{ height: '100%' }}>
                {jobs.length > 0 ? (
                    <Table striped highlightOnHover className={styles.table}>
                        <thead>
                            <tr>
                                <th>Job ID</th>
                                <th>Name</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Nodes</th>
                                <th>State</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => (
                                <tr
                                    key={job.job_id}
                                    className={`${getRowClass(job.job_state)} ${styles.hoverRow}`}
                                    onClick={() => (window.location.href = `/dashboard/jobs/${job.job_id}`)}
                                >
                                    <td>
                                        <Button>
                                            {job.job_id}
                                        </Button>
                                    </td>
                                    <td>{job.name}</td>
                                    <td>{new Date(job.start_time.number! * 1000).toLocaleTimeString()}</td>
                                    <td>{job.end_time.number ? new Date(job.end_time.number! * 1000).toLocaleTimeString() : 'N/A'}</td>
                                    <td>{job.nodes}</td>
                                    <td>{job.job_state[0]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p>No running jobs available.</p>
                )}
            </ScrollArea>
        </div>
    );
};

export default RunningJobsColumn;

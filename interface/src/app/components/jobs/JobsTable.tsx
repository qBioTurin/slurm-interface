import { Table, Button } from '@mantine/core';
import styles from './JobsTable.module.css';
import Link from 'next/link';
import JobStateBadge from './JobStateBadge';
import {JobSchema} from '../../schemas/job_schema';
import { z } from 'zod';

interface JobTableProps {
    jobs: z.infer<typeof JobSchema>[];
}

export default function JobsTable({ jobs }: JobTableProps) {

    return (
        <Table className={styles.table} striped highlightOnHover>
            <thead>
                <tr>
                    <th>Job ID</th>
                    <th>Job Name</th>
                    <th>User</th>
                    <th>Partition</th>
                    <th>State</th>
                    <th>Nodes Count</th>
                    <th>Elapsed Time</th>
                </tr>
            </thead>
            <tbody>
                {jobs.map((job) => {

                    return (
                    <tr key={job.job_id}>
                        <td>
                            <Link href={`/dashboard/jobs/${job.job_id}`} passHref>
                                <Button>
                                    {job.job_id}
                                </Button>
                            </Link>
                        </td>
                        <td>{job.name}</td>
                        <td>{job.user_name}</td>
                        <td>{job.partition}</td>
                        <td> <JobStateBadge state={job.job_state[0]} /> </td>
                        <td>{job.nodes}</td>
                        <td>'N/A'</td>
                    </tr>
                );
                })}
            </tbody>
        </Table>
    );
}

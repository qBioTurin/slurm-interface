import { Table, Badge, Button } from '@mantine/core';
import { Job } from '../../../../utils/models/models';
import styles from './JobsTable.module.css';
import Link from 'next/link';

interface JobTableProps {
    jobs: Job[];
}

export default function JobsTable({ jobs }: JobTableProps) {

    return (
        <Table className={styles.table} striped highlightOnHover>
            <thead>
                <tr>
                    <th>JobID</th>
                    <th>JobName</th>
                    <th>User</th>
                    <th>Partition</th>
                    <th>State</th>
                    <th>Priority</th>
                    <th>Time Left</th>
                </tr>
            </thead>
            <tbody>
                {jobs.map((job) => (
                    <tr key={job.JobID}>
                        <td>
                        <Link href={`/dashboard/jobs/${job.JobID}`} passHref>
                            <Button>
                                {job.JobID}
                            </Button>
                        </Link>
                        </td>
                        <td>{job.JobName}</td>
                        <td>{job.User}</td>
                        <td>{job.Partition}</td>
                        <td>
                            <Badge color={job.State === 'RUNNING' ? 'green' : 'gray'}>
                                {job.State}
                            </Badge>
                        </td>
                        <td>{job.Priority}</td>
                        <td>{job.TimeLeft || 'N/A'}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

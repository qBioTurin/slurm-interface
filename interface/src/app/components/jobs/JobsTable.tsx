import { Table, Badge, Button } from '@mantine/core';
import { Job, JobStateDescriptions} from '../../../../utils/models/models';
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
                {jobs.map((job) => (
                    <tr key={job.jobId}>
                        <td>
                        <Link href={`/dashboard/jobs/${job.jobId}`} passHref>
                            <Button>
                                {job.jobId}
                            </Button>
                        </Link>
                        </td>
                        <td>{job.name}</td>
                        <td>{job.user}</td>
                        <td>{job.partition.name}</td>
                        <td>
                            <Badge color={
                                job.state === 'R' ? 'green' :
                                job.state === 'PD' ? 'yellow' :
                                job.state === 'CD' ? 'blue' :
                                job.state === 'F' ? 'red' :
                                'gray'
                            }>
                                {job.state}
                            </Badge>
                        </td>
                        <td>{job.nodesCount}</td>
                        <td>{job.time}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

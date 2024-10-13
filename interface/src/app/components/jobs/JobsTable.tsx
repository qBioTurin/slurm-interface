import { Table, Badge, Button } from '@mantine/core';
import { Job } from '../../../../utils/models/models';
import { useRouter } from 'next/router';

interface JobTableProps {
    jobs: Job[];
}

export default function JobTable({ jobs }: JobTableProps) {
    // const router = useRouter();

    // const handleJobClick = (jobID: number) => {
    //     router.push(`/dashboard/jobs/${jobID}`);
    // };

    return (
        <Table striped highlightOnHover>
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
                            {/*<Button variant="subtle" onClick={() => handleJobClick(job.JobID)}>*/}
                                <Button>
                                {job.JobID}
                            </Button>
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

import styles from './JobsTable.module.css';
import React, { useEffect, useState } from 'react';
import { Table, Button } from '@mantine/core';
import Link from 'next/link';
import JobStateBadge from './JobStateBadge';
import { JobSchema } from '../../schemas/job_schema';
import { z } from 'zod';
import { FC } from 'react';

type Job = z.infer<typeof JobSchema>;

interface JobTableProps {
    jobs: Job[];
}

export const JobsTable: FC<JobTableProps> = ({ jobs }) => {

    return (
        <Table className={styles.table} striped highlightOnHover>
            <thead>
                <tr>
                    <th>Job ID</th>
                    <th>Job Name</th>
                    <th>User</th>
                    <th>Partition</th>
                    <th>State</th>
                    <th>Nodes</th>
                    <th>Reservation</th>
                </tr>
            </thead>
            <tbody>
                {jobs.map((job: any) => {

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
                        <td>{job.resv_name}</td>
                    </tr>
                );
                })}
            </tbody>
        </Table>
    );
}; 

export default JobsTable;

'use client'

import styles from './JobsTable.module.css';
import { Table, Button, Checkbox  } from '@mantine/core';
import Link from 'next/link';
import JobStateBadge from './JobStateBadge';
import { JobSchema } from '../../schemas/job_schema';
import { sortItems, SortConfig } from '../../../../utils/sort';
import { IconChevronDown, IconChevronUp} from '@tabler/icons-react';
import { z } from 'zod';
import { FC } from 'react';
import { useState } from 'react';

type Job = z.infer<typeof JobSchema>;

interface JobTableProps {
    jobs: Job[];
    onSelect?: (jobId: number, selected: boolean) => void;
    onSelectAll?: (isSelected: boolean) => void;
    selectable?: boolean;
    selectedJobs?: number[];
}

export const JobsTable: FC<JobTableProps> = ({
    jobs,
    onSelect,
    onSelectAll,
    selectable = false,
    selectedJobs = []
}) => {
    const [sortConfig, setSortConfig] = useState<SortConfig<Job>>({ key: null, direction: 'asc' });
    const sortedJobs = sortItems(jobs, sortConfig);
    const allSelected = jobs.every((job) => selectedJobs.includes(job.job_id));
    const someSelected = jobs.some((job) => selectedJobs.includes(job.job_id));

    const handleSort = (key: keyof Job) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const getSortIcon = (key: keyof Job) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />;
    };

    return (
        <Table className={styles.table} striped highlightOnHover>
            <thead>
                <tr>
                {selectable && ( // only show this column if selectable is true
                        <th>
                            <Checkbox
                                size='md'
                                checked={allSelected}
                                indeterminate={!allSelected && someSelected}
                                onChange={(event) => onSelectAll?.(event.currentTarget.checked)}
                            />
                        </th>
                    )}
                    <th onClick={() => handleSort('job_id')}>Job ID {getSortIcon('job_id')}</th>
                    <th onClick={() => handleSort('name')}>Job Name {getSortIcon('name')}</th>
                    <th onClick={() => handleSort('user_name')}>User {getSortIcon('user_name')}</th>
                    <th onClick={() => handleSort('partition')}>Partition {getSortIcon('partition')}</th>
                    <th>State</th>
                    <th onClick={() => handleSort('nodes')}>Nodes {getSortIcon('nodes')}</th>
                    {/* <th onClick={() => handleSort('resv_name')}>Reservation {getSortIcon('resv_name')}</th> */}
                </tr>
            </thead>
            <tbody>
                {sortedJobs.map((job: any) => {

                    return (
                    <tr key={job.job_id}>

                         {selectable && ( // only show this column if selectable is true
                            <td>
                                <Checkbox
                                    size='md'
                                    checked={selectedJobs.includes(job.job_id)}
                                    onChange={(event) => onSelect?.(job.job_id, event.currentTarget.checked)}
                                />
                            </td>
                        )}

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
                        {/* <td>{job.resv_name}</td> */}
                    </tr>
                );
                })}
            </tbody>
        </Table>
    );
}; 

export default JobsTable;

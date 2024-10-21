'use client'

import '@mantine/core/styles.css';
import React, { useEffect } from 'react';
import { Table, Button, Group, rem, TextInput } from '@mantine/core';
import styles from './JobsTable.module.css';
import { IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import JobStateBadge from './JobStateBadge';
import { useSlurmData } from '@/hooks/useSlurmData';
import { useState } from 'react';
import LoadingPage from '../LoadingPage/loadingPage';



const JobsTable: React.FC = () => {
    const { data, loading, error } = useSlurmData('users');
    console.log(data);

    const [searchQuery, setSearchQuery] = useState<string>('');
    const filteredJobs = data?.filter((job: any) =>
        job.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.user?.toLowerCase().includes(searchQuery.toLowerCase())
    );



    if (loading) return <LoadingPage />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.container}>
            <Group className={styles.group}>
                <TextInput
                    className={styles.searchInput}
                    placeholder="Search Jobs"
                    leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.currentTarget.value)}
                />
            </Group>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredJobs?.map((user: any) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );

    // return (
    //     <div className={styles.container}>

    // <Group className={styles.group}>
    //     <TextInput
    //         className={styles.searchInput}
    //         placeholder="Search Jobs"
    //         leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
    //         value={searchQuery}
    //         onChange={(event) => setSearchQuery(event.currentTarget.value)}
    //     />
    // </Group>
    //         <Table className={styles.table} striped highlightOnHover>
    //             <thead>
    //                 <tr>
    //                     <th>Job ID</th>
    //                     <th>Job Name</th>
    //                     <th>User</th>
    //                     <th>Partition</th>
    //                     <th>State</th>
    //                     <th>Nodes Count</th>
    //                     <th>Elapsed Time</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {filteredJobs.map((job: any) => (
    //                     <tr key={job.jobId}>
    //                         <td>
    //                             <Link href={`/dashboard/jobs/${job.jobId}`} passHref>
    //                                 <Button>
    //                                     {job.jobId}
    //                                 </Button>
    //                             </Link>
    //                         </td>
    //                         <td>{job.name}</td>
    //                         <td>{job.user}</td>
    //                         <td>{job.partition.name}</td>
    //                         <td> <JobStateBadge state={job.state} /> </td>
    //                         <td>{job.nodesCount}</td>
    //                         <td>{job.time}</td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </Table>
    //     </div>

    // );
};

export default JobsTable;


'use client';

import { Badge, Text } from '@mantine/core';
import { Job } from '../../../../../utils/models/models';
import { mockJobs } from '../../../../../utils/models/mock';
import { useState, useEffect } from 'react';
import styles from './JobDetails.module.css';
import {InfoCard} from '../../../components/jobs/job-details/InfoCard';
import {InfoField} from '../../../components/jobs/job-details/InfoField';

interface JobPageProps {
  params: {
    jobID: string;
  };
}

const JobPage = ({ params }: JobPageProps) => {
  const { jobID } = params;
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const foundJob = mockJobs.find((j) => j.JobID === Number(jobID));
    setJob(foundJob || null);
  }, [jobID]);

  if (!job) {
    return <Text>Job {jobID} not found</Text>;
  }

  return (
    <div className={styles.container}>
      
      {/* Job Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Job {job.JobID}: {job.JobName}</h2>
        <Badge className={styles.badge} color={job.State === 'RUNNING' ? 'green' : 'gray'}>
          {job.State}
        </Badge>
      </div>

      {/* Job Info Section */}
      <InfoCard title="Job Info">
        <InfoField label="Submission Time" value={job.TimeSubmit} />
        {job.TimeStart && <InfoField label="Start Time" value={job.TimeStart} />}
        <InfoField label="Time Left" value={job.TimeLeft} />
        <InfoField label="Time Used" value={job.TimeUsed} />
        <InfoField label="Partition" value={job.Partition} />
        <InfoField label="Priority" value={job.Priority} />
      </InfoCard>

      {/* Job Progress Section */}
      <InfoCard title="Job Progress">
        <InfoField label="Submitted" value={job.TimeSubmit} />
        {job.TimeStart && <InfoField label="Started" value={job.TimeStart} />}
        <InfoField label="State" value={job.State} />
        {job.TimeUsed && <InfoField label="Elapsed Time" value={job.TimeUsed} />}
      </InfoCard>
    </div>
  );
};

export default JobPage;

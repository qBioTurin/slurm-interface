'use client';

import { Badge, Text } from '@mantine/core';
import { Job } from '../../../../../utils/models/models';
import { mockJobs } from '../../../../../utils/models/mock';
import { useState, useEffect } from 'react';
import styles from './JobDetails.module.css';
import {InfoCard} from '../../../components/jobs/job-details/InfoCard';
import {InfoField} from '../../../components/jobs/job-details/InfoField';
import JobStateBadge from '../../../components/jobs/JobStateBadge';
import JobProgressTimeline from '../../../components/jobs/job-details/JobProgressTimeline';

interface JobPageProps {
  params: {
    jobID: string;
  };
}

const JobPage = ({ params }: JobPageProps) => {
  const { jobID } = params;
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const foundJob = mockJobs.find((j) => j.jobId === Number(jobID));
    setJob(foundJob || null);
  }, [jobID]);

  if (!job) {
    return <Text>Job {jobID} not found</Text>;
  }

  return (
    <div className={styles.container}>
      
      {/* Job Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Job {job.jobId}: {job.name}</h2>
        <JobStateBadge state={job.state} />
      </div>

      {/* Job Info Section */}
      <InfoCard title="Job Info">
        <InfoField label="Submission Time" value={job.timeSubmission} />
        {job.timeStart && <InfoField label="Start Time" value={job.timeStart} />}
        <InfoField label="Time Left" value={job.timeLeft} />
        <InfoField label="Time Used" value={job.timeUsed} />
        <InfoField label="Partition" value={job.partition.name} />
        <InfoField label="Priority" value={job.priority.toFixed(2)} />
      </InfoCard>

      {/* Job Progress Section */}
      <InfoCard title="Job Progress">
        <InfoField label="Submitted" value={job.timeSubmission} />
        {job.timeStart && <InfoField label="Started" value={job.timeStart} />}
        <InfoField label="State" value={job.state} />
        {job.timeUsed && <InfoField label="Elapsed Time" value={job.timeUsed} />}
        <InfoField label="Nodes Count" value={job.nodesCount.toString()} />
        <InfoField label="Quality of Service" value={job.qos} />
      </InfoCard>

      <InfoCard title="Job Timeline">
        <JobProgressTimeline job={job} />
      </InfoCard>
    </div>

  );
};

export default JobPage;

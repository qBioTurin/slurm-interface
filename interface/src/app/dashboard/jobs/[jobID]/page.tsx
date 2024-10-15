'use client';

import { Text, Grid } from '@mantine/core';
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
        <h2 className={styles.title}>[{job.jobId}] {job.name}</h2>
        <JobStateBadge state={job.state} />
      </div>

      <Grid>
        {/* Left Column: Job Timeline */}
        <Grid.Col span={6}>
            <InfoCard title="Job Timeline">
              <JobProgressTimeline job={job} />
            </InfoCard>
        </Grid.Col>
          
        {/* Right Column: Job Info */}
        <Grid.Col span={6}>
          <InfoCard title="Job Metadata">
            <InfoField label="User" value={job.user} />
            <InfoField label="Submission Time" value={job.timeSubmission} />
            <InfoField label="Quality of Service" value={job.qos} />
            <InfoField label="Priority" value={job.priority.toFixed(2)} />
          </InfoCard>

          <InfoCard title="Job Resources">
          <InfoField label="Partition" value={job.partition.name} />
          <InfoField label="Nodes Count" value={job.nodesCount.toString()} />
          </InfoCard>

          <InfoCard title="Job Info">
            {job.timeStart && <InfoField label="Start Time" value={job.timeStart} />}
            <InfoField label="Time Left" value={job.timeLeft} />
            {job.timeUsed && <InfoField label="Elapsed Time" value={job.timeUsed} />}
          </InfoCard>
        </Grid.Col>
    </Grid>
  </div>
  );
};

export default JobPage;

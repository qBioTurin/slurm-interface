'use client';

import { Text, Grid, Stack, Flex } from '@mantine/core';
import { useState, useEffect } from 'react';
import styles from './JobDetails.module.css';
import { InfoCard, InfoField, JobStateBadge, JobProgressTimeline, LoadingPage } from '@/components';
import { useFetchData } from '@/hooks';
import { z } from 'zod';
import { JobSchema, SlurmJobResponseSchema } from '@/schemas/job_schema';
import { formatDate } from '../../../../../utils/datetime';

type Job = z.infer<typeof JobSchema>;

interface JobPageProps {
  params: {
    jobID: string;
  };
}

const JobPage = ({ params }: JobPageProps) => {
  const { jobID } = params;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const id = parseInt(jobID);
  const { data, error } = useFetchData(`job/${id}`, SlurmJobResponseSchema);

  useEffect(() => {
    setLoading(true);
    if (data) {
      setJob(data[0]);
    }

    setLoading(false);
  });

  if (error) {
    return <Text>Failed to load job data</Text>;
  }

  if (!job) {
    return <LoadingPage />;
  } else if (!job && !loading) {
    return <Text>Job not found</Text>;
  }

  return (
    <div className={styles.container}>

      {/* Job Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>[{job.job_id}] {job.name}</h2>
        <JobStateBadge state={job.job_state[0]} />
      </div>

      {/* Job Description */}
      <Flex
        direction={{ base: 'column', lg: 'row' }}
      >
        {/* Left Column: Job Timeline */}
        <Stack>
          <InfoCard title="Job Timeline">
            <JobProgressTimeline job={job} />
          </InfoCard>
        </Stack>

        {/* Right Column: Job Info */}
        <Stack justify='stretch'>
          <InfoCard title="Job Metadata">
            <InfoField label="User" value={job.user_name} />
            <InfoField label="Submission Time" value={formatDate(job.submit_time.number)} />
            <InfoField label="Quality of Service" value={job.qos} />
            <InfoField label="Priority" value={job.priority.number.toFixed(2)} />
          </InfoCard>

          <InfoCard title="Job Resources">
            <InfoField label="Partition" value={job.partition} />
            <InfoField label="Nodes" value={job.nodes.toString()} />
          </InfoCard>

          <InfoCard title="Job Info">
            {job.start_time && <InfoField label="Start Time" value={formatDate(job.start_time.number)} />}
            {job.end_time && <InfoField label="End Time" value={formatDate(job.end_time.number)} />}
          </InfoCard>
        </Stack>
      </Flex>
    </div>
  );
};

export default JobPage;

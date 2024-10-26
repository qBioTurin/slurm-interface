'use client';

import { Text, Grid } from '@mantine/core';
import { useState, useEffect } from 'react';
import styles from './JobDetails.module.css';
import { InfoCard } from '../../../components/jobs/job-details/InfoCard';
import { InfoField } from '../../../components/jobs/job-details/InfoField';
import JobStateBadge from '../../../components/jobs/JobStateBadge';
import JobProgressTimeline from '../../../components/jobs/job-details/JobProgressTimeline';
import LoadingPage from '@/components/LoadingPage/loadingPage';
import { useFetchData } from '@/hooks/useFetchData';
import { z } from 'zod';
import { JobSchema, SlurmJobResponseSchema } from '../../../schemas/job_schema';
import { formatDate, formatDuration } from '../../../../../utils/datetime';

type Job = z.infer<typeof JobSchema>;

interface JobPageProps {
  params: {
    jobID: string;
  };
}

const JobPage = ({ params }: JobPageProps) => {
  const { jobID } = params;
  const [job, setJob] = useState<Job | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const id = parseInt(jobID);
  const { data, loading, error } = useFetchData(`job/${id}`);

  useEffect(() => {
    if (error) {
      console.error(error);
      setJob(null);
      return;
    }

    if (data) {
      setIsValidating(true);
      try {
        const validatedData = SlurmJobResponseSchema.parse(data);
        setJob(validatedData.jobs[0]);
      } catch (error) {
        console.error('Invalid job data:', error);
        setJob(null);
      } finally {
        setIsValidating(false);
      }
    } else {
      setJob(null);
    }
  }, [data, loading, error]);

  if (loading || isValidating) {
    return <LoadingPage />;
  }

  if (!job) {
    return <Text>Job {jobID} not found</Text>;
  }

  return (
    <div className={styles.container}>

      {/* Job Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>[{job.job_id}] {job.name}</h2>
        <JobStateBadge state={job.job_state[0]} />
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
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default JobPage;

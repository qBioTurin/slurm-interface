import { Timeline, Text } from '@mantine/core';
import {
  IconClipboardCheck,
  IconClock,
  IconPlayerPlayFilled,
  IconHourglass,
  IconHandStop,
} from '@tabler/icons-react';
import { z } from 'zod';
import {JobSchema} from '../../../schemas/job_schema';
import { formatDate, formatDuration } from '../../../../../utils/datetime';

type Job = z.infer<typeof JobSchema>;

interface JobProgressTimelineProps {
  job: Job;
}

function JobProgressTimeline({ job }: JobProgressTimelineProps) {

  let activeStep = 0;
  switch (job.job_state[0]) {
    case 'PENDING':
      activeStep = 0;
      break;
    case 'RUNNING':
      activeStep = 2;
      break;
    case 'COMPLETING':
      activeStep = 3;
      break;
    case 'COMPLETED':
    case 'FAILED':
    case 'TERMINATED':
      activeStep = 4;
      break;
    default:
      break;
  }

    return (
    <Timeline active={activeStep} bulletSize={24} lineWidth={2}>

      {/* Submitted Step */}
      <Timeline.Item
        bullet={<IconClipboardCheck size={12} />}
        title="Submitted"
      >
        <Text c="dimmed" size="sm">
          The job <strong>{job.name}</strong> has been submitted by{' '}
          <strong>{job.user_name}</strong> on <strong> {formatDate(job.submit_time.number)} </strong>.
        </Text>
        <Text size="xs" mt={4}>
          {job.start_time.number ? `Started: ${formatDate(job.start_time.number)}` : 'Pending Start'}
        </Text>
      </Timeline.Item>

      {/* Scheduling Step */}
      <Timeline.Item
        bullet={<IconClock size={12} />}
        title="Scheduling"
      >
        <Text c="dimmed" size="sm">
          The job is currently being scheduled for resource allocation.
        </Text>
        <Text size="xs" mt={4}>
          Priority: {job.priority.number} | QOS: {job.qos}
        </Text>
      </Timeline.Item>

      {/* Running Step */}
      <Timeline.Item
        bullet={<IconPlayerPlayFilled size={12} />}
        title="Running"
      >
        <Text c="dimmed" size="sm">
          The job is currently running on <strong>{job.job_resources && job.job_resources.nodes? job.job_resources.nodes.count : job.nodes}</strong> node(s).
        </Text>
        <Text size="xs" mt={4}>
          Estimated Time Remaining: {formatDuration(job.end_time.number - job.start_time.number)}
        </Text>
      </Timeline.Item>

      {/* Completing Step */}
      <Timeline.Item
        bullet={<IconHourglass size={12} />}
        title="Completing"
      >
        <Text c="dimmed" size="sm">
          The job is finishing up its tasks.
        </Text>
        <Text size="xs" mt={4}>
        </Text>
      </Timeline.Item>

      {/* Terminated Step */}
      <Timeline.Item
        bullet={<IconHandStop size={12} />}
        title="Terminated"
        lineVariant="dashed"
      >
        <Text c="dimmed" size="sm">
          The job has been terminated successfully.
        </Text>
        <Text size="xs" mt={4}>
        </Text>
      </Timeline.Item>
    </Timeline>
  );
}

export default JobProgressTimeline;
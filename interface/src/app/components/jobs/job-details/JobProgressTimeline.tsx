import { Timeline, Text } from '@mantine/core';
import {
  IconClipboardCheck,
  IconClock,
  IconPlayerPlayFilled,
  IconHourglass,
  IconHandStop,
  IconPlayerPause,
  IconAlertTriangle
} from '@tabler/icons-react';
import { z } from 'zod';
import {JobSchema} from '../../../schemas/job_schema';
import { formatDate } from '../../../../../utils/datetime';

type Job = z.infer<typeof JobSchema>;

interface JobProgressTimelineProps {
  job: Job;
}

function JobProgressTimeline({ job }: JobProgressTimelineProps) {
  const jobState = job.job_state[0];
  let isErrorState = false;
  let isPaused = false;

  let activeStep = 0;
  switch (jobState) {
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
    case 'CANCELLED':
    case 'FAILED':
    case 'TIMEOUT':
      activeStep = 5;
      isErrorState = true;
      break;
    case 'PAUSED':
      activeStep = 2;
      isPaused = true;
      break;
    default:
      break;
  }

    return (
    <Timeline active={activeStep} bulletSize={24} lineWidth={2} color={isErrorState ? 'red' : 'blue'}>
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
        bullet={isPaused ? <IconPlayerPause size={12} color="orange" /> : <IconPlayerPlayFilled size={12} />}
        title={isPaused ? 'Paused' : 'Running'}
      >
        <Text c="dimmed" size="sm">
          {isPaused ? 'The job has been paused.' : 'The job is currently running.'}
        </Text>
        <Text size="xs" mt={4}>
          {job.job_resources && job.job_resources.nodes
            ? `Resources: ${job.job_resources.nodes.count} node(s)`
            : `Nodes: ${job.nodes}`}
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
          {isErrorState
            ? `The job ended due to ${jobState.toLowerCase()}.`
            : 'The job has successfully completed.'}
        </Text>
        {isErrorState && (
          <Text size="xs" mt={4} color="red">
            Error code: {job.exit_code.return_code.number} {jobState === 'FAILED' ? '| See logs for details.' : ''}
          </Text>
        )}
      </Timeline.Item>

      {/* Error Step */}
      {isErrorState && (
        <Timeline.Item
          bullet={<IconAlertTriangle size={12} color="red" />}
          title="Error"
          color="red"
        >
          <Text c="dimmed" size="sm">
            The job has terminated with an error state: <strong>{jobState}</strong>.
          </Text>
          <Text size="xs" mt={4} color="red">
            {`Exited at: ${formatDate(job.end_time.number)}`}
          </Text>
        </Timeline.Item>
      )}

    </Timeline>
  );
}

export default JobProgressTimeline;
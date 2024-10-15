import { Timeline, Text } from '@mantine/core';
import {
  IconClipboardCheck,
  IconClock,
  IconPlayerPlayFilled,
  IconHourglass,
  IconHandStop,
} from '@tabler/icons-react';
import { Job } from '../../../../../utils/models/models';
import { JobStateInfo } from '../../../../../utils/models/models';

interface JobProgressTimelineProps {
  job: Job;
}

function JobProgressTimeline({ job }: JobProgressTimelineProps) {
  // Determine the active state based on job state
  let activeStep = 0;
  switch (job.state) {
    case 'PD': // Pending
      activeStep = 0;
      break;
    case 'R': // Running
      activeStep = 2;
      break;
    case 'CG': // Completing
      activeStep = 3;
      break;
    case 'CD': // Completed
    case 'F':  // Failed
    case 'TO': // Terminated
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
          <strong>{job.user}</strong> on <strong>{job.timeSubmission}</strong>.
        </Text>
        <Text size="xs" mt={4}>
          {job.timeStart ? `Started: ${job.timeStart}` : 'Pending Start'}
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
          Priority: {job.priority} | QOS: {job.qos}
        </Text>
      </Timeline.Item>

      {/* Running Step */}
      <Timeline.Item
        bullet={<IconPlayerPlayFilled size={12} />}
        title="Running"
      >
        <Text c="dimmed" size="sm">
          The job is currently running on <strong>{job.nodesCount}</strong> node(s).
        </Text>
        <Text size="xs" mt={4}>
          Time Used: {job.timeUsed} | Time Left: {job.timeLeft}
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
          Expected End Time: {job.endTime}
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
          Time Limit: {job.timeLimit}
        </Text>
      </Timeline.Item>
    </Timeline>
  );
}

export default JobProgressTimeline;
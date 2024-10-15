import { Badge, Tooltip } from '@mantine/core';
import { JobStates} from '../../../../utils/models/job_state';


interface JobStateBadgeProps {
    state: string;
}

const JobStateBadge: React.FC<JobStateBadgeProps> = ({ state }) => {
    const jobStateInfo = JobStates.find((jobState) => jobState.code === state);

    if (!jobStateInfo) {
        return (
            <Tooltip label="Unknown" position="top" withArrow>
                <Badge color="gray" style={{ cursor: 'pointer' }}>
                    Unknown
                </Badge>
            </Tooltip>
        );
    }
    
    const getBadgeColor = () => {
        switch (jobStateInfo.code) {
            case 'R':   return 'green';    // Running
            case 'PD':  return 'yellow';   // Pending
            case 'CD':  return 'blue';     // Completed
            case 'F':   return 'red';      // Failed
            default:    return 'gray';     // Default for unknown or handled states
        }
    };

    return (
        <Tooltip label={jobStateInfo.description} position="top" withArrow>
            <Badge color={getBadgeColor()} style={{ cursor: 'pointer' }}>
                {jobStateInfo.state}
            </Badge>
        </Tooltip>
    );
};

export default JobStateBadge;

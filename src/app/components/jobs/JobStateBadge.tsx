import { Badge, Tooltip } from '@mantine/core';
import { JobStates} from '../../../../utils/models/job_state';


interface JobStateBadgeProps {
    state: string;
}

const JobStateBadge: React.FC<JobStateBadgeProps> = ({ state }) => {
    const jobStateInfo = JobStates.find((jobState) => jobState.state === state);

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
        switch (jobStateInfo.state) {
            case 'RUNNING':   return 'green';
            case 'PENDING':  return 'yellow';
            case 'COMPLETED':  return 'blue';
            case 'FAILED':   return 'red';
            default:    return 'gray';
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

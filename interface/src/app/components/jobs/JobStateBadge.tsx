import { Badge, Tooltip } from '@mantine/core';
import { JobState, JobStateDescriptions } from '../../../../utils/models/models';


interface JobStateBadgeProps {
    state: JobState; // The state of the job
}

const JobStateBadge: React.FC<JobStateBadgeProps> = ({ state }) => {
    const getBadgeColor = () => {
        switch (state) {
            case 'R':
                return 'green';
            case 'PD':
                return 'yellow';
            case 'CD':
                return 'blue';
            case 'F':
                return 'red';
            default:
                return 'gray';
        }
    };

    return (
        <Tooltip label={JobStateDescriptions[state]} position="top" withArrow>
            <Badge color={getBadgeColor()} style={{ cursor: 'pointer' }}>
                {state}
            </Badge>
        </Tooltip>
    );
};

export default JobStateBadge;

import { Badge, Tooltip } from '@mantine/core';
import { NodeStates } from '@/utils/models/node_state';

interface NodeStateBadgeProps {
    state: string;
}

const NodeStateBadge: React.FC<NodeStateBadgeProps> = ({ state }) => {
    const nodeStateInfo = NodeStates.find((nodeState) => nodeState.state === state);

    if (!nodeStateInfo) {
        return (
            <Tooltip label="Unknown" position="top" withArrow>
                <Badge color="gray" style={{ cursor: 'pointer' }}>
                    Unknown
                </Badge>
            </Tooltip>
        );
    }

    const getBadgeColor = () => {
        switch (nodeStateInfo.state) {
            case 'IDLE': return '#51cf66';
            case 'ALLOCATED': return '#1c7ed6';
            case 'DOWN': return 'red';
            case 'RESERVED': return '#0c8599';
            default: return 'gray';
        }
    };

    return (
        <Tooltip label={nodeStateInfo.description} position="top" withArrow>
            <Badge color={getBadgeColor()} style={{ cursor: 'pointer' }}>
                {nodeStateInfo.state}
            </Badge>
        </Tooltip>
    );
};

export default NodeStateBadge;

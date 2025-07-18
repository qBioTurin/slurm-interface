import { PieChart } from '@mantine/charts';
import { NodeSchema } from '@/schemas/node_schema';
import { z } from 'zod';

type Node = z.infer<typeof NodeSchema>;

interface NodesPiechartProps {
    nodes: Node[];
}

const stateColors = {
    unknown: '#C9C9C9',
    mixed: '#260000',
    error: '#c92a2a',
    future: '#730000',
    idle: '#69db7c',
    down: '#343a40',
    allocated: '#74c0fc'
};

function processData(nodes: Node[]) {
    return nodes.reduce((acc, node) => {
        const state = node.state[0].toLowerCase();
        if (!acc[state]) {
            acc[state] = { name: state, value: 0, color: stateColors[state as keyof typeof stateColors] };
        }
        acc[state].value += 1;
        return acc;
    }, {} as Record<string, { name: string; value: number; color: string }>);
}

export default function NodesPiechart({ nodes }: NodesPiechartProps) {
    const data = processData(nodes);
    const chartData = Object.values(data);

    return <PieChart data={chartData} size={200} withTooltip withLabelsLine labelsPosition="inside" labelsType="percent" startAngle={180} endAngle={0} strokeWidth={2} />;
}
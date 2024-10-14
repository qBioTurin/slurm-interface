import { BarChart } from '@mantine/charts';
import '@mantine/charts/styles.css' 
import { Job } from '../../../../utils/models/models';

interface JobsBarchartProps {
    jobs: Job[];
}

const aggregateJobStates = (jobs: Job[]) => {

    const counts = jobs.reduce((acc, job) => {
        acc[job.State] = (acc[job.State] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([state, count]) => ({
        state,
        count,
    }));
};

const JobsBarchart: React.FC<JobsBarchartProps> = ({ jobs }) => {
    const data = aggregateJobStates(jobs);

    const maxCount = Math.max(...data.map(item => item.count), 0);
    const yAxisMax = Math.ceil(maxCount / 10) * 10;

    return (
        <BarChart
            h={200}
            data={data}
            dataKey="state"
            orientation="vertical"
            yAxisProps={{ domain: [0, yAxisMax], width: 80 }}
            barProps={{ radius: 20 }}
            series={[{ name: 'count', color: 'violet.6' }]}
        />
    );
};

export default JobsBarchart;
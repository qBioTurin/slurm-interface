import { BarChart } from '@mantine/charts';
import '@mantine/charts/styles.css' 
import { JobStates }  from '../../../../utils/models/job_state';
import {JobSchema} from '../../schemas/job_schema';
import { z } from 'zod';

type Job = z.infer<typeof JobSchema>;

interface JobsBarchartProps {
    jobs: Job[];
}

const jobStateMap = JobStates.reduce((map, stateInfo) => {
    map[stateInfo.code] = stateInfo.state;
    return map;
}, {} as Record<string, string>);

const aggregateJobStates = (jobs: Job[]) => {
    const counts = jobs.reduce((acc, job) => {
        const stateName = jobStateMap[job.job_state[0]] || job.job_state[0];
        acc[stateName] = (acc[stateName] || 0) + 1;
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
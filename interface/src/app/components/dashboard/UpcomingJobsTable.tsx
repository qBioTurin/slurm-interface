import React from 'react';
import JobsTable from '../jobs/JobsTable';
import { Job } from '../../../../utils/models/models';

interface JobsProps {
    jobs: Job[];
}

const filterAndSortJobsByDate = (jobs: Job[], targetDate: Date) => {
    const now = new Date();

    const filteredJobs = jobs.filter((job) => {
        if (job.timeStart) {
            const jobDate = new Date(job.timeStart);

            const isSameDay =
                jobDate.getFullYear() === targetDate.getFullYear() &&
                jobDate.getMonth() === targetDate.getMonth() &&
                jobDate.getDate() === targetDate.getDate();

            return isSameDay && jobDate >= now;
        }
        return false;
    });

    filteredJobs.sort((a, b) => new Date(a.timeStart!).getTime() - new Date(b.timeStart!).getTime());

    return filteredJobs.slice(0, 5);
};

const UpcomingJobsByDate: React.FC<JobsProps> = ({ jobs }) => {
    const today = new Date();
    const filteredJobs = filterAndSortJobsByDate(jobs, today);

    if (filteredJobs.length === 0) {
        return <p>No upcoming jobs later on today.</p>;
    }

    return (
            <JobsTable jobs={filteredJobs} />
    );
};

export default UpcomingJobsByDate;

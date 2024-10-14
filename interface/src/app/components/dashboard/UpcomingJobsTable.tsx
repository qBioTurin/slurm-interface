import React from 'react';
import JobsTable from '../jobs/JobsTable'; // Fixed the import (missing closing quote)
import { Job } from '../../../../utils/models/models'; // Job model

interface JobsProps {
    jobs: Job[];
}

const filterAndSortJobsByDate = (jobs: Job[], targetDate: Date) => {
    const now = new Date();

    const filteredJobs = jobs.filter((job) => {
        if (job.TimeStart) {
            const jobDate = new Date(job.TimeStart);

            const isSameDay =
                jobDate.getFullYear() === targetDate.getFullYear() &&
                jobDate.getMonth() === targetDate.getMonth() &&
                jobDate.getDate() === targetDate.getDate();

            return isSameDay && jobDate >= now;
        }
        return false;
    });

    filteredJobs.sort((a, b) => new Date(a.TimeStart!).getTime() - new Date(b.TimeStart!).getTime());

    return filteredJobs.slice(0, 5);
};

const UpcomingJobsByDate: React.FC<JobsProps> = ({ jobs }) => {
    const today = new Date();

    const filteredJobs = filterAndSortJobsByDate(jobs, today);

    return (
            <JobsTable jobs={filteredJobs} />
    );
};

export default UpcomingJobsByDate;

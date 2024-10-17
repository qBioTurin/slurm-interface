import { getJobs, getNodes, getReservations } from "@/lib/slurm-api";
import { TextInput, Group, rem } from '@mantine/core';
import JobTable from '../../components/jobs/JobsTable';
import { IconSearch } from '@tabler/icons-react';
import { mockJobs } from '../../../../utils/models/mock';
import styles from './Jobs.module.css';





export default function JobsPage() {

    getJobs();


    return (
        <div>Jobs</div>
    )
}


// export default function JobsPage() {


//     const [searchQuery, setSearchQuery] = useState<string>('');

//     const filteredJobs = mockJobs.filter((job) =>
//         job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         job.user.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <div className={styles.container}>
//             <Group className={styles.group}>
//                 <TextInput
//                     className={styles.searchInput}
//                     placeholder="Search Jobs"
//                     leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
//                     value={searchQuery}
//                     onChange={(event) => setSearchQuery(event.currentTarget.value)}
//                 />
//             </Group>

//             <JobTable jobs={filteredJobs} />
//         </div>
//     );
// }

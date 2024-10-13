import { Node } from './models';
import { Job } from './models';

export const mockNodes: Node[] = [
    { NodeID: 'node1', State: 'Idle', reserved: false },
    { NodeID: 'node2', State: 'Allocated', reserved: true },
    { NodeID: 'node3', State: 'Down', reserved: false },
    { NodeID: 'node4', State: 'Maintenance', reserved: false },
];

export const mockJobs: Job[] = [
    {
        JobID: 1,
        JobName: 'data-analysis',
        User: 'john_doe',
        Partition: 'compute',
        State: 'RUNNING',
        TimeSubmit: '2024-10-12T10:00:00Z',
        TimeStart: '2024-10-12T10:05:00Z',
        Nodes: 4,
        CPUs: 16,
        Memory: '32G',
        TimeLimit: '1-00:00:00',
        TimeUsed: '02:00:00',
        TimeLeft: '22:00:00',
        Priority: 1000,
    },
    {
        JobID: 2,
        JobName: 'model-training',
        User: 'jane_doe',
        Partition: 'gpu',
        State: 'PENDING',
        TimeSubmit: '2024-10-12T09:00:00Z',
        Nodes: 2,
        CPUs: 8,
        Memory: '64G',
        TimeLimit: '2-00:00:00',
        Priority: 900,
    },
];

export const mockReservations = [
    {
        ReservationID: 'rsv1',
        User: 'John Doe',
        Node: mockNodes[0],
        Job: mockJobs[0],
        StartTime: 'Tue, 8 Oct 2024 10:00:00 GMT',
        EndTime: 'Sun, 13 Oct 2024 16:00:00 GMT',
    },
    {
        ReservationID: 'rsv2',
        User: 'Jane Doe',
        Node: mockNodes[1],
        Job: mockJobs[1],
        StartTime: 'Tue, 8 Oct 2024 16:00:00 GMT',
        EndTime: 'Sun, 13 Oct 2024 22:00:00 GMT',
    },
];
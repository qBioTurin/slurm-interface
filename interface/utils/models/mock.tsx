import { Node } from './models';
import { Job } from './models';

export const mockNodes: Node[] = [
  {
    nodeName: "csm-001",
    account: "general",
    state: "ALLOCATED",
    cpu: {
      load: 13.61,
      allocated: 20,
      idle: 0,
      total: 20,
    },
    memory: {
      available: 45186,
      total: 246640,
    },
    gpu: {
      idle: "N/A",
      total: "N/A",
    },
    reason: "N/A",
  },
  {
    nodeName: "csm-002",
    account: "albrecht",
    state: "MIXED",
    cpu: {
      load: 10.14,
      allocated: 15,
      idle: 5,
      total: 20,
    },
    memory: {
      available: 1072,
      total: 246640,
    },
    gpu: {
      idle: "N/A",
      total: "N/A",
    },
    reason: "N/A",
  },
  {
    nodeName: "csm-003",
    account: "colej",
    state: "ALLOCATED",
    cpu: {
      load: 7.45,
      allocated: 20,
      idle: 0,
      total: 20,
    },
    memory: {
      available: 50032,
      total: 246640,
    },
    gpu: {
      idle: "N/A",
      total: "N/A",
    },
    reason: "N/A",
  },
  {
    nodeName: "csn-004",
    account: "general",
    state: "MIXED",
    cpu: {
      load: 9.92,
      allocated: 12,
      idle: 8,
      total: 20,
    },
    memory: {
      available: 16160,
      total: 118012,
    },
    gpu: {
      idle: "N/A",
      total: "N/A",
    },
    reason: "Scheduled maintenance",
  },
  {
    nodeName: "csm-005",
    account: "albrecht",
    state: "IDLE",
    cpu: {
      load: 0.0,
      allocated: 0,
      idle: 20,
      total: 20,
    },
    memory: {
      available: 246640,
      total: 246640,
    },
    gpu: {
      idle: "N/A",
      total: "N/A",
    },
    reason: "No jobs",
  }
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
    {
        JobID: 3,
        JobName: "Job 3",
        User: "User 3",
        Partition: "Partition B",
        State: "FAILED",
        TimeSubmit: "2024-10-01T12:10:00Z",
        Nodes: 1,
        CPUs: 1,
        Memory: "2GB",
        TimeLimit: "1h",
        Priority: 3,
      },
      {
        JobID: 4,
        JobName: "Job 4",
        User: "User 2",
        Partition: "Partition A",
        State: "RUNNING",
        TimeSubmit: "2024-10-01T12:05:00Z",
        Nodes: 1,
        CPUs: 4,
        Memory: "8GB",
        TimeLimit: "2h",
        Priority: 2,
      },
      {
        JobID: 5,
        JobName: 'Job5',
        User: 'UserA',
        Partition: 'A',
        State: 'RUNNING',
        TimeSubmit: '2024-10-12T08:00:00',
        TimeStart: '2024-10-12T09:00:00',
        Nodes: 2,
        CPUs: 4,
        Memory: '8GB',
        TimeLimit: '1h',
        TimeUsed: '30m',
        TimeLeft: '30m',
        Priority: 5
    },
    {
        JobID: 6,
        JobName: 'Job6',
        User: 'UserB',
        Partition: 'B',
        State: 'PENDING',
        TimeSubmit: '2024-10-14T22:00:00',
        TimeStart: '2024-10-14T23:00:00',
        Nodes: 1,
        CPUs: 2,
        Memory: '4GB',
        TimeLimit: '2h',
        Priority: 8
    },
    {
        JobID: 7,
        JobName: 'Job7',
        User: 'UserC',
        Partition: 'C',
        State: 'PENDING',
        TimeSubmit: '2024-10-14T21:00:00',
        TimeStart: '2024-10-14T23:30:00',
        Nodes: 3,
        CPUs: 6,
        Memory: '16GB',
        TimeLimit: '3h',
        Priority: 7
    }
];

export const mockReservations = [
    {
        ReservationName: 'rsv1',
        StartTime: new Date('10/08/2024 10:00:00'), // format: MM/DD/YYYY HH:MM:SS
        EndTime: new Date('10/12/2024 16:00:00'),
        Duration: '5 days 6 hours',
        Users: ['Jane Doe', 'John Doe'],
        Accounts: ['biology'],
        Nodes: mockNodes.slice(0, 3),
        NodeCnt: 3,
    },
    {
        ReservationName: 'rsv2',
        StartTime: new Date('10/10/2024 16:00:00'), // format: MM/DD/YYYY HH:MM:SS
        EndTime: new Date('10/13/2024 22:00:00'),
        Duration: '5 days 6 hours',
        Users: ['Tom Cruise'],
        Accounts: ['physics'],
        Nodes: mockNodes.slice(3, 4),
        NodeCnt: 1,
    },
    {
        ReservationName: 'Reservation3',
        StartTime: '2024-10-12T09:00:00',
        EndTime: '2024-10-12T10:00:00',
        Duration: '1h',
        Users: ['UserA'],
        Accounts: ['AccountA'],
        Nodes: [mockNodes[0], mockNodes[1]],
        NodeCnt: 2,
    },
    {
        ReservationName: 'Reservation4',
        StartTime: '2024-14-12T22:00:00',
        EndTime: '2024-14-12T23:00:00',
        Duration: '2h',
        Users: ['UserB'],
        Accounts: ['AccountB'],
        Nodes: [mockNodes[2]],
        NodeCnt: 1,
    },
    {
        ReservationName: 'Reservation5',
        StartTime: '2024-140-12T21:00:00',
        EndTime: '2024-14-12T23:30:00',
        Duration: '3h',
        Users: ['UserC'],
        Accounts: ['AccountC'],
        Nodes: [mockNodes[3], mockNodes[4], mockNodes[5]],
        NodeCnt: 3,
    }
];
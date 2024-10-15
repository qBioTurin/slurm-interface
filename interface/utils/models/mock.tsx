import { mock } from 'node:test';
import { Node } from './models';
import { Job } from './models';
import { Partition } from './models';
import { Reservation } from './models';

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


export const mockPartitions: Partition[] = [
  {
    name: "batch",
    availability: "UP",
    timeLimit: "infinite",
    nodesCount: 5,
    state: "ALLOCATED",
    nodeList: [
      mockNodes[0], // csm-001
      mockNodes[1], // csm-002
      mockNodes[2], // csm-003
      mockNodes[3], // csn-004
      mockNodes[4], // csm-005
    ],
  },
  {
    name: "debug",
    availability: "UP",
    timeLimit: "30:00",
    nodesCount: 3,
    state: "IDLE",
    nodeList: [
      mockNodes[0], // csm-001
      mockNodes[1], // csm-002
      mockNodes[4], // csm-005
    ],
  },
];

// Mock jobs
export const mockJobs: Job[] = [
  {
    jobId: 18957,
    partition: mockPartitions[0], // batch
    name: "mean",
    user: "user1",
    state: "R", // Running
    time: "0:01",
    nodesCount: 1,
    nodeList: [mockNodes[0]], // csm-001
  },
  {
    jobId: 18956,
    partition: mockPartitions[0], // batch
    name: "calc",
    user: "user2",
    state: "R", // Running
    time: "48:38",
    nodesCount: 1,
    nodeList: [mockNodes[1]], // csm-002
  },
  {
    jobId: 18967,
    partition: mockPartitions[1], // debug
    name: "wrap",
    user: "user1",
    state: "PD", // Pending
    time: "14:25",
    nodesCount: 1,
    nodeList: [mockNodes[2]], // csm-003
  },
  {
    jobId: 18968,
    partition: mockPartitions[0], // batch
    name: "test",
    user: "user3",
    state: "CG", // Completing
    time: "12:10",
    nodesCount: 2,
    nodeList: [mockNodes[3], mockNodes[4]], // csn-004, csm-005
  },
  {
    jobId: 18969,
    partition: mockPartitions[1], // debug
    name: "analyze",
    user: "user2",
    state: "CD", // Completed
    time: "10:05",
    nodesCount: 1,
    nodeList: [mockNodes[4]], // csm-005
  },
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
export interface Node {
  nodeName: string;
  account: string;
  state: "ALLOCATED" | "MIXED" | "IDLE" | "DOWN"; //for simplicity, we only consider these states
  cpu: {
    load: number;
    allocated: number; 
    idle: number; 
    total: number;
  };
  memory: {
    available: number;
    total: number;
  };
  gpu: {
    idle: string | number;
    total: string | number;
  };
  reason: string;
}

export type JobState = keyof typeof JobStateDescriptions;

export const JobStateDescriptions = {
  PD: 'Pending: The job is waiting in a queue for allocation of resources',
  R: 'Running: The job currently is allocated to a node and is running',
  CG: 'Completing: The job is finishing but some processes are still active',
  CD: 'Completed: The job has completed successfully',
  F: 'Failed: The job failed with a non-zero exit value',
  TO: 'Terminated: Job terminated by Slurm after reaching its runtime limit',
  S: 'Suspended: A running job has been stopped with its resources released to other jobs',
  ST: 'Stopped: A running job has been stopped with its resources retained',
} as const;

export interface Job {
  jobId: number;
  partition: string;
  name: string;
  user: string;
  state: JobState;
  time: string;
  nodesCount: number;
  nodeList: Node[];
}

export interface Reservation {
  ReservationName: string;
  StartTime: Date;
  EndTime: Date;
  Duration: string;
  Users: string[];
  Accounts: string[];
  Nodes: Node[];
  NodeCnt: number;
}


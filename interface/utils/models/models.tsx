export interface Node {
  NodeID: string;
  State: 'Idle' | 'Allocated' | 'Down' | 'Maintenance';
  reserved: boolean;
}

export interface Job {
  JobID: number;
  JobName: string;
  User: string;
  Partition: string;
  State:
  | 'COMPLETED'
  | 'COMPLETING'
  | 'FAILED'
  | 'PENDING'
  | 'PREEMPTED'
  | 'RUNNING'
  | 'SUSPENDED'
  | 'STOPPED'
  TimeSubmit: string;
  TimeStart?: string;
  Nodes: number;
  CPUs: number;
  Memory: string;
  TimeLimit: string;
  TimeUsed?: string;
  TimeLeft?: string;
  Priority: number;
}

export interface Reservation {
  ReservationID: string;
  User: string;
  Node: Node;
  Job: Job;
  StartTime: string;
  EndTime: string;
}


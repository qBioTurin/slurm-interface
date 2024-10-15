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
  ReservationName: string;
  StartTime: Date;
  EndTime: Date;
  Duration: string;
  Users: string[];
  Accounts: string[];
  Nodes: Node[];
  NodeCnt: number;
}


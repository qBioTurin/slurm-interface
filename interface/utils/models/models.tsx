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

export interface JobStateInfo {
  code: string;
  state: string;
  description: string;
}

export interface Job {
  jobId: number;
  partition: Partition;
  name: string;
  user: string;
  state: string;
  time: string;
  nodesCount: number;
  nodeList: Node[];

  priority: number;             // %p: Priority of the job (0.0 to 1.0)
  qos: string;                  // %q: Quality of service associated with the job
  timeStart: string;            // %S: Actual or expected start time of the job
  reservation: string;          // %v: Reservation for the job
  timeSubmission: string;       // %V: Job's submission time
  timeUsed: string;             // %M: Time used by the job in days-hours:minutes:seconds
  timeLeft: string;             // %L: Time left for the job in days-hours:minutes:seconds
  timeLimit: string;            // %l: Time limit of the job in days-hours:minutes:seconds
  endTime: string;              // %e: Time at which the job ended or is expected to end
}

export interface Partition {
  name: string;
  availability: 'UP' | 'DOWN';
  timeLimit: string;
  nodesCount: number;
  state: 'ALLOCATED' | 'IDLE' | 'DOWN';
  nodeList: Node[];
}

export interface Reservation {
  ReservationName: string;
  StartTime: Date;
  EndTime: Date;
  Duration: string;
  Users?: string[];
  Groups?: string[];
  Accounts?: string[];
  NodeCnt?: number; //TODO: should be an array of numbers
  Nodes?: Node[];
  CoreCnt?: number; //TODO: should be an array of numbers
  PartitionName?: string;
  Licenses?: string
  Features?: string
  Flags?: string[];
  BurstBuffer?: string;
  //MaxStartDelay'
}


export interface JobStateInfo {
  code: string;
  state: string;
  description: string;
}

export const JobStates: JobStateInfo[] = [
  { code: 'BF', state: 'BOOT_FAIL', description: 'Job terminated due to launch failure, typically due to a hardware failure (e.g. unable to boot the node or block and the job can not be requeued).' },
  { code: 'CA', state: 'CANCELLED', description: 'Job was explicitly cancelled by the user or system administrator. The job may or may not have been initiated.' },
  { code: 'CD', state: 'COMPLETED', description: 'Job has terminated all processes on all nodes with an exit code of zero.' },
  { code: 'CF', state: 'CONFIGURING', description: 'Job has been allocated resources, but are waiting for them to become ready for use (e.g. booting).' },
  { code: 'CG', state: 'COMPLETING', description: 'Job is in the process of completing. Some processes on some nodes may still be active.' },
  { code: 'DL', state: 'DEADLINE', description: 'Job terminated on deadline.' },
  { code: 'F', state: 'FAILED', description: 'Job terminated with non-zero exit code or other failure condition.' },
  { code: 'NF', state: 'NODE_FAIL', description: 'Job terminated due to failure of one or more allocated nodes.' },
  { code: 'OOM', state: 'OUT_OF_MEMORY', description: 'Job experienced out of memory error.' },
  { code: 'PD', state: 'PENDING', description: 'Job is awaiting resource allocation.' },
  { code: 'PR', state: 'PREEMPTED', description: 'Job terminated due to preemption.' },
  { code: 'R', state: 'RUNNING', description: 'Job currently has an allocation.' },
  { code: 'RD', state: 'RESV_DEL_HOLD', description: 'Job is being held after requested reservation was deleted.' },
  { code: 'RF', state: 'REQUEUE_FED', description: 'Job is being requeued by a federation.' },
  { code: 'RH', state: 'REQUEUE_HOLD', description: 'Held job is being requeued.' },
  { code: 'RQ', state: 'REQUEUED', description: 'Completing job is being requeued.' },
  { code: 'RS', state: 'RESIZING', description: 'Job is about to change size.' },
  { code: 'RV', state: 'REVOKED', description: 'Sibling was removed from cluster due to other cluster starting the job.' },
  { code: 'SI', state: 'SIGNALING', description: 'Job is being signaled.' },
  { code: 'SE', state: 'SPECIAL_EXIT', description: 'The job was requeued in a special code. This code can be set by users, typically in EpilogSlurmctld, if the job has terminated with a particular exit value.' },
  { code: 'SO', state: 'STAGE_OUT', description: 'Job is staging out files.' },
  { code: 'ST', state: 'STOPPED', description: 'Job has an allocation, but execution has been stopped with SIGSTOP signal. CPUS have been retained by this job.' },
  { code: 'S', state: 'SUSPENDED', description: 'Job has an allocation, but execution has been suspended and CPUs have been released for other jobs.' },
  { code: 'TO', state: 'TIMEOUT', description: 'Job terminated upon reaching its time limit.' },
] as const;
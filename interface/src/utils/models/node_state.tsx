export interface NodeStateInfo {
    state: string;
    description: string;
}

export const NodeStates: NodeStateInfo[] = [
    { state: 'ALLOCATED', description: 'The node has been allocated to one or more jobs.' },
    { state: 'ALLOCATED+', description: 'The node is allocated to one or more active jobs plus one or more jobs are in the process of COMPLETING.' },
    { state: 'BLOCKED', description: 'The node has been blocked by exclusive topo job.' },
    { state: 'COMPLETING', description: "All jobs associated with this node are in the process of COMPLETING. This node state will be removed when all of the job's processes have terminated and the Slurm epilog program (if any) has terminated." },
    { state: 'DOWN', description: 'The node is unavailable for use. Slurm can automatically place nodes in this state if some failure occurs. System administrators may also explicitly place nodes in this state. If a node resumes normal operation, Slurm can automatically return it to service.' },
    { state: 'DRAINED', description: 'The node is unavailable for use per system administrator request.' },
    { state: 'DRAINING', description: 'The node is currently allocated a job, but will not be allocated additional jobs. The node state will be changed to state DRAINED when the last job on it completes.' },
    { state: 'FAIL', description: 'The node is expected to fail soon and is unavailable for use per system administrator request.' },
    { state: 'FAILING', description: 'The node is currently executing a job, but is expected to fail soon and is unavailable for use per system administrator request.' },
    { state: 'FUTURE', description: 'The node is currently not fully configured, but expected to be available at some point in the indefinite future for use.' },
    { state: 'IDLE', description: 'The node is not allocated to any jobs and is available for use.' },
    { state: 'INVAL', description: "The node did not register correctly with the controller. This happens when a node registers with less resources than configured in the slurm.conf file. The node will clear from this state with a valid registration (i.e. a slurmd restart is required)." },
    { state: 'MAINT', description: 'The node is currently in a reservation with a flag value of "maintenance".' },
    { state: 'REBOOT_ISSUED', description: 'A reboot request has been sent to the agent configured to handle this request.' },
    { state: 'REBOOT_REQUESTED', description: "A request to reboot this node has been made, but hasn't been handled yet." },
    { state: 'MIXED', description: 'The node has some of its CPUs ALLOCATED while others are IDLE. Or the node has a suspended job allocated to some of its TRES (e.g., memory).' },
    { state: 'PERFCTRS (NPC)', description: 'Network Performance Counters associated with this node are in use, rendering this node as not usable for any other jobs.' },
    { state: 'PLANNED', description: 'The node is planned by the backfill scheduler for a higher priority job.' },
    { state: 'POWER_DOWN', description: 'The node is pending power down.' },
    { state: 'POWERED_DOWN', description: 'The node is currently powered down and not capable of running any jobs.' },
    { state: 'POWERING_DOWN', description: 'The node is in the process of powering down and not capable of running any jobs.' },
    { state: 'POWERING_UP', description: 'The node is in the process of being powered up.' },
    { state: 'RESERVED', description: 'The node is in an advanced reservation and not generally available.' },
    { state: 'UNKNOWN', description: "The Slurm controller has just started and the node's state has not yet been determined." },
  ] as const;
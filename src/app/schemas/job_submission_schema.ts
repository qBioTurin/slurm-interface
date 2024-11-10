import { z } from 'zod';

export const EnvironmentSchema = z.object({
  PATH: z.string().optional(),
});

export const JobSubmissionSchema = z.object({
    tasks: z.number().min(1, 'Number of tasks is required'),
    name: z.string().min(1, 'Job name is required'),
    nodes: z.number().min(1, 'Number of nodes is required'),
    current_working_directory: z.string(),
    environment: EnvironmentSchema,
    script: z.string().min(1, 'Script is required'),
    // description: z.string().optional(),
    // partition: z.string().optional(),
    // specify_nodes: z.string().optional(),
    // immediate: z.boolean().optional(),
    // tmp_disk_space: z.number().optional(),
    // min_memory_per_cpu: z.number().optional(),
    // cpus_per_task: z.number().optional(),
    // tasks_per_node: z.number().optional(),
  });
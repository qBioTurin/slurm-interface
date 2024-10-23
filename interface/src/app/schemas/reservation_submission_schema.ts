import { z } from 'zod';

export const ReservationSubmissionSchema = z.object({
    name: z.string().min(1, 'Reservation name is required'),
    StartTime: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
    EndTime: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
    Users: z.array(z.string()).nonempty('At least one user must be specified'),
    NodeCnt: z.number().min(1, 'At least 1 node must be specified'),
    Nodes: z.array(z.string()).optional(),
    PartitionName: z.string().optional(),
  });
  
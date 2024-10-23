import { z } from 'zod';
import dayjs from 'dayjs';

export const ReservationSubmissionSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    start_time: z.date(),
    end_time: z.date(),
    users: z.array(z.string()),
    // NodeCnt: z.number().min(0, { message: "Node count must be at least 0" }),
    nodes: z.array(z.string()).optional(),
    // partition: z.string().optional(),
    });
  
export const FilteredReservationSubmissionSchema = ReservationSubmissionSchema
    .refine(data => data.end_time >= data.start_time, {
        message: "End time must be greater than start time",
        path: ["end_time"],
    })
    .refine(data => {
    return !dayjs(data.end_time).isSame(data.start_time, 'day') || data.end_time > data.start_time;
    }, {
        message: "End time must be greater than start time.",
        path: ["end_time"],
});
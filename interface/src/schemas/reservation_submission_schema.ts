import { z } from 'zod';
import dayjs from 'dayjs';

export const ReservationSubmissionSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    start_time: z.date(),
    end_time: z.date(),
    users: z.array(z.string()),
    // node_cnt: z.number().min(0),
    nodes: z.string(),
    partition: z.string().optional(),
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
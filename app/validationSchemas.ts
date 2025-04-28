import {z} from "zod";

export const TaskSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required').nonempty('Description is required'),
    id: z.number().optional(),
});

export const patchTaskSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255).optional(),
    description: z.string().min(1, 'Description is required').nonempty('Description is required').max(35000).optional(),
    assignedToUserId: z.string().min(1, 'User is required').optional().nullable(),
    id: z.number().optional(),
});
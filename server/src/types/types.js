import { z } from "zod";

export const UserSchema = z.object({
   username: z.string().min(3),
   email: z.email(),
   password: z.string().min(6).max(8),
});

export const TaskSchema = z.object({
   title: z.string().min(1),
   subject: z.string().min(1),
   description: z.string().optional(),

   dueDate: z.coerce.date(),

   priority: z.enum(["low", "medium", "high"]).default("medium"),

   status: z.enum(["pending", "in-progress", "completed"]).default("pending"),
});

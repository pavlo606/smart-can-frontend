import { z } from "zod";

export const createTrackSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
  paymentDetails: z.string().optional(),
  future: z.boolean().optional(),
});

export type CreateTrackSchemaDto = z.infer<typeof createTrackSchema>;
import { z } from "zod";

export const connectTrackerSchema = z.object({
  deviceId: z.string().min(1, "DeviceId cannot be empty"),
  secret: z.string().min(1, "Secret cannot be empty"),
});

export type ConnectTrackerSchemaDto = z.infer<typeof connectTrackerSchema>;
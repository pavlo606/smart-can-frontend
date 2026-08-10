import { z } from "zod";

export const createVehicleSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  brand: z.string().min(1, "Brand cannot be empty"),
  model: z.string().min(1, "Model cannot be empty"),
  initialOdometer: z.number().min(0, "Initial odometer cannot be negative"),
  year: z.string().optional(),
  vin: z.string().optional(),
});

export type CreateVehicleSchemaDto = z.infer<typeof createVehicleSchema>;
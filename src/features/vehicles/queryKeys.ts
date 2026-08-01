import type { VehiclesQuery } from "./types";

export const vehiclesKeys = {
  all: ["vehicle"] as const,
  list: (params: Partial<VehiclesQuery>) =>
    [...vehiclesKeys.all, "list", params] as const,
  detail: (id: string) =>
    [...vehiclesKeys.all, "detail", id] as const,
};

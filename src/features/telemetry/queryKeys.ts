import type { TelemetryQuery } from "./types";

export const telemetrysKeys = {
  all: ["telemetry"] as const,
  list: (params?: Partial<TelemetryQuery>) =>
    [...telemetrysKeys.all, "list", params] as const,
  detail: (id: string, timestamp: string) =>
    [...telemetrysKeys.all, "detail", id, timestamp] as const,
};

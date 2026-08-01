import type { DevicesQuery } from "./types";

export const devicesKeys = {
  all: ["device"] as const,
  list: (params: Partial<DevicesQuery>) =>
    [...devicesKeys.all, "list", params] as const,
  detail: (id: string) =>
    [...devicesKeys.all, "detail", id] as const,
};

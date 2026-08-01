import type { TracksQuery } from "./types";

export const tracksKeys = {
  all: ["track"] as const,
  list: (params: Partial<TracksQuery>) =>
    [...tracksKeys.all, "list", params] as const,
  detail: (id: string) =>
    [...tracksKeys.all, "detail", id] as const,
};

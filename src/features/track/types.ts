import type { Device } from "../device/types"

export interface Track {
  id: string
  deviceId: string
  device: Device
  name: string
  startTimestamp: string
  endTimestamp: string
  createdAt: string
  updatedAt: string
}

export type SortOrder = 'asc' | 'desc'

export interface TracksQuery {
  search: string
  page: number
  limit: number
  sortBy: string
  sortOrder: SortOrder
}

export interface TracksResponse {
  items: Track[]
  meta: { total: number; page: number; limit: number; totalPages: number }
}
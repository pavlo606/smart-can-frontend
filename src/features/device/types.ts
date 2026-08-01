import type { Track } from "../track/types"
import type { Vehicle } from "../vehicles/types"

export interface Device {
  id: string
  imei: string
  vehicleId: string
  firmwareVersion: string
  vehicle: Vehicle
  tracks: Track[]
  createdAt: string
  updatedAt: string
}

export type SortOrder = 'asc' | 'desc'

export interface DevicesQuery {
  search: string
  page: number
  limit: number
  sortBy: string
  sortOrder: SortOrder
}

export interface DevicesResponse {
  items: Device[]
  meta: { total: number; page: number; limit: number; totalPages: number }
}
import type { Device } from "../device/types"
import type { User } from "../users/types"

export interface Vehicle {
  id: string
  name: string
  brand: string
  model: string
  year?: string
  vin?: string
  initialOdometer: number
  user?: User
  device?: Device
}

export type SortOrder = 'asc' | 'desc'

export interface VehiclesQuery {
  search: string
  page: number
  limit: number
  sortBy: string
  sortOrder: SortOrder
}

export interface VehiclesResponse {
  items: Vehicle[]
  meta: { total: number; page: number; limit: number; totalPages: number }
}

export interface AuthDeviceDto {
  deviceId: string;
  secret: string;
}
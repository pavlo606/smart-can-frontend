export interface Telemetry {
  deviceId: string
  timestamp: string
  latitude?: number
  longitude?: number
  speed?: number
  rpm?: number
  coolantTemp?: number
  fuelLevel?: number
  createdAt?: string
}

export interface TelemetryQuery {
  deviceId: string
  gte: string
  lte: string
  limit?: number
  lastTimestamp?: string
}

export interface TelemetryResponse {
  items: Telemetry[],
  meta: {
    total: number,
    limit: number,
    totalPages: number
  }
}
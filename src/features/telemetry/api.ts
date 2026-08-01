import api from '@/services/api'
import type { Telemetry, TelemetryQuery, TelemetryResponse } from './types'

export async function getTelemetryById(deviceId: string, timestamp: string) {
  const res = await api.get<Telemetry>(`/telemetry/${deviceId}/${timestamp}`)
  return res.data
}

export async function getManyTelemetrys(query: Partial<TelemetryQuery>) {
  const res = await api.get<TelemetryResponse>('/telemetry', {
    params: query,
  })

  return res.data
}

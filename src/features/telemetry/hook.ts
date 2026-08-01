import { useQuery } from '@tanstack/react-query'
import { getTelemetryById, getManyTelemetrys } from './api'
import { telemetrysKeys } from './queryKeys'
import type { TelemetryQuery } from './types'

export function useManyTelemetry(query: Partial<TelemetryQuery>) {
  return useQuery({
    queryKey: telemetrysKeys.list(query),
    enabled:
      !!query.deviceId &&
      !!query.gte &&
      !!query.lte,

    queryFn: () => getManyTelemetrys(query),
  })
}

export function useTelemetry(id: string, timestamp: string) {
  return useQuery({
    queryKey: telemetrysKeys.detail(id, timestamp),
    queryFn: () => getTelemetryById(id, timestamp),
    enabled: !!id,
  })
}

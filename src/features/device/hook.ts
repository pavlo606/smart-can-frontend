import { useQuery } from '@tanstack/react-query'
import { getDeviceById, getManyDevices } from './api'
import { devicesKeys } from './queryKeys'
import type { DevicesQuery } from './types'

export function useManyDevices(query: DevicesQuery) {
  return useQuery({
    queryKey: devicesKeys.list(query),
    queryFn: () => getManyDevices(query),
  })
}

export function useDevice(id: string) {
  return useQuery({
    queryKey: devicesKeys.detail(id),
    queryFn: () => getDeviceById(id),
    enabled: !!id,
  })
}

import { useQuery } from '@tanstack/react-query'
import { getVehicleById, getManyVehicles } from './api'
import { vehiclesKeys } from './queryKeys'
import type { VehiclesQuery } from './types'

export function useManyVehicles(query: VehiclesQuery) {
  return useQuery({
    queryKey: vehiclesKeys.list(query),
    queryFn: () => getManyVehicles(query),
  })
}

export function useVehicle(id: string) {
  return useQuery({
    queryKey: vehiclesKeys.detail(id),
    queryFn: () => getVehicleById(id),
    enabled: !!id,
  })
}

import api from '@/services/api'
import { type Vehicle, type VehiclesQuery, type VehiclesResponse } from './types'
import type { CreateVehicleSchemaDto } from './schemas/createVehicle.schema'

export async function getVehicleById(id: string) {
  const res = await api.get<Vehicle>(`/vehicle/${id}`)
  return res.data
}

export async function getManyVehicles(query: Partial<VehiclesQuery>) {
  const res = await api.get<VehiclesResponse>('/vehicle', {
    params: query,
  })

  return res.data
}

export async function createVehicle(payload: CreateVehicleSchemaDto) {
  const res = await api.post<Vehicle>('/vehicle', payload)
  return res.data
}

export async function updateVehicle(id: string, payload: Partial<CreateVehicleSchemaDto>) {
  const res = await api.patch<Vehicle>(`/vehicle/${id}`, payload)
  return res.data
}

export async function deleteVehicle(id: string) {
  await api.delete(`/vehicle/${id}`)
}

export async function deleteSoftVehicle(id: string) {
  await api.delete(`/vehicle/soft/${id}`)
}

export async function restoreVehicle(id: string) {
  await api.patch(`/vehicle/restore/${id}`)
}

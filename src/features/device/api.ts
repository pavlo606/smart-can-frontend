import api from '@/services/api'
import { type Device, type DevicesQuery, type DevicesResponse } from './types'
import type { CreateDeviceSchemaDto } from './schemas/createDevice.schema'

export async function getDeviceById(id: string) {
  const res = await api.get<Device>(`/device/${id}`)
  return res.data
}

export async function getManyDevices(query: Partial<DevicesQuery>) {
  const res = await api.get<DevicesResponse>('/device', {
    params: query,
  })

  return res.data
}

export async function createDevice(payload: CreateDeviceSchemaDto) {
  const res = await api.post<Device>('/device', payload)
  return res.data
}

export async function updateDevice(id: string, payload: Partial<CreateDeviceSchemaDto>) {
  const res = await api.patch<Device>(`/device/${id}`, payload)
  return res.data
}

export async function deleteDevice(id: string) {
  await api.delete(`/device/${id}`)
}

export async function deleteSoftDevice(id: string) {
  await api.delete(`/device/soft/${id}`)
}

export async function restoreDevice(id: string) {
  await api.patch(`/device/restore/${id}`)
}

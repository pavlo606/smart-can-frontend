import api from '@/services/api'
import { type Track, type TracksQuery, type TracksResponse } from './types'
import type { CreateTrackSchemaDto } from './schemas/createTrack.schema'

export async function getTrackById(id: string) {
  const res = await api.get<Track>(`/track/${id}`)
  return res.data
}

export async function getManyTracks(query: Partial<TracksQuery>) {
  const res = await api.get<TracksResponse>('/track', {
    params: query,
  })

  return res.data
}

export async function createTrack(payload: CreateTrackSchemaDto) {
  const res = await api.post<Track>('/track', payload)
  return res.data
}

export async function updateTrack(id: string, payload: Partial<CreateTrackSchemaDto>) {
  const res = await api.patch<Track>(`/track/${id}`, payload)
  return res.data
}

export async function deleteTrack(id: string) {
  await api.delete(`/track/${id}`)
}

export async function deleteSoftTrack(id: string) {
  await api.delete(`/track/soft/${id}`)
}

export async function restoreTrack(id: string) {
  await api.patch(`/track/restore/${id}`)
}

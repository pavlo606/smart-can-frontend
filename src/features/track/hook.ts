import { useQuery } from '@tanstack/react-query'
import { getTrackById, getManyTracks } from './api'
import { tracksKeys } from './queryKeys'
import type { TracksQuery } from './types'

export function useManyTracks(query: TracksQuery) {
  return useQuery({
    queryKey: tracksKeys.list(query),
    queryFn: () => getManyTracks(query),
  })
}

export function useTrack(id: string) {
  return useQuery({
    queryKey: tracksKeys.detail(id),
    queryFn: () => getTrackById(id),
    enabled: !!id,
  })
}

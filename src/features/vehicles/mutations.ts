import { useMutation, useQueryClient } from "@tanstack/react-query";
import { connectTracker, createVehicle, deleteVehicle, updateVehicle } from "./api";
import { vehiclesKeys } from "./queryKeys";
import type { CreateVehicleSchemaDto } from "./schemas/createVehicle.schema";
import type { AuthDeviceDto } from "./types";

export function useCreateVehicle() {
  const queryVehicle = useQueryClient();

  return useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      queryVehicle.invalidateQueries({
        queryKey: vehiclesKeys.all,
      });
    },
  });
}

export function useUpdateVehicle(vehicleId: string) {
  const queryVehicle = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateVehicleSchemaDto) =>
      updateVehicle(vehicleId, payload),
    onSuccess: () => {
      queryVehicle.invalidateQueries({
        queryKey: vehiclesKeys.all,
      });
    },
  });
}

export function useDeleteVehicle() {
  const queryVehicle = useQueryClient();

  return useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => {
      queryVehicle.invalidateQueries({
        queryKey: vehiclesKeys.all,
      });
    },
  });
}

export function useConnectTracker(vehicleId: string) {
  const queryVehicle = useQueryClient();

  return useMutation({
    mutationFn: (payload: AuthDeviceDto) =>
      connectTracker(vehicleId, payload),
    onSuccess: () => {
      queryVehicle.invalidateQueries({
        queryKey: vehiclesKeys.all,
      });
    },
  });
}

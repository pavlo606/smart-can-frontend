import { Button } from "@/components/ui/Button";
import { type Vehicle } from "../types";
import { useCreateVehicle, useUpdateVehicle } from "../mutations";
import type { FormPropsIntarface } from "@/features/common/types/formProps.interface";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  createVehicleSchema,
  type CreateVehicleSchemaDto,
} from "../schemas/createVehicle.schema";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormErrorMsg } from "@/components/ui/FormErrorMsg";

export function CreateVehicleForm({
  editingItem,
  onError,
  onSuccess,
}: FormPropsIntarface<Vehicle>) {
  const createMutation = useCreateVehicle();
  const updateMutation = useUpdateVehicle(editingItem?.id || "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateVehicleSchemaDto>({
    resolver: zodResolver(createVehicleSchema),
    defaultValues: {
      name: editingItem?.name || "",
      brand: editingItem?.brand || "",
      model: editingItem?.model || "",
      initialOdometer: editingItem?.initialOdometer || 0,
      year: editingItem?.year || "",
      vin: editingItem?.vin || "",
    },
  });

  const onSubmit: SubmitHandler<CreateVehicleSchemaDto> = (data) => {
    if (editingItem) {
      updateMutation.mutate(data, {
        onSuccess,
        onError: (err) => {
          toast.error(`Error: ${err.message}`);
          if (onError) onError(err);
        },
      });
    } else {
      createMutation.mutate(data, {
        onSuccess,
        onError: (err) => {
          toast.error(`Error: ${err.message}`);
          if (onError) onError(err);
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Name*</label>
        <input
          {...register("name")}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <FormErrorMsg message={errors.name?.message} ns="vehicle" />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Brand*</label>
        <input
          {...register("brand")}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <FormErrorMsg message={errors.brand?.message} ns="vehicle" />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Model*</label>
        <input
          {...register("model")}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <FormErrorMsg message={errors.model?.message} ns="vehicle" />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Initial odometer*
        </label>
        <input
          type="number"
          {...register("initialOdometer", { valueAsNumber: true })}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <FormErrorMsg message={errors.initialOdometer?.message} ns="vehicle" />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Year</label>
        <input
          {...register("year")}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <FormErrorMsg message={errors.year?.message} ns="vehicle" />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Vin</label>
        <input
          {...register("vin")}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <FormErrorMsg message={errors.vin?.message} ns="vehicle" />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="submit"
          disabled={createMutation.isPending || updateMutation.isPending}
        >
          {editingItem ? "Save Changes" : "Add Vehicle"}
        </Button>
      </div>
    </form>
  );
}

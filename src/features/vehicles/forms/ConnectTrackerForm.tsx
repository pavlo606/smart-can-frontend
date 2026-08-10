import { Button } from "@/components/ui/Button";
import { type Vehicle } from "../types";
import { useConnectTracker } from "../mutations";
import type { FormPropsIntarface } from "@/features/common/types/formProps.interface";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormErrorMsg } from "@/components/ui/FormErrorMsg";
import { connectTrackerSchema, type ConnectTrackerSchemaDto } from "../schemas/connectTracker.schema";

export function ConnectTrackerForm({
  editingItem: editingVehicle,
  onError,
  onSuccess,
}: FormPropsIntarface<Vehicle>) {
  if (!editingVehicle?.id){
    console.log(editingVehicle)
    toast.error("Error: No vehicleId")
    return
  }
  const connectMutation = useConnectTracker(editingVehicle?.id || "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConnectTrackerSchemaDto>({
    resolver: zodResolver(connectTrackerSchema),
    defaultValues: {
      deviceId: "",
      secret: "",
    },
  });

  const onSubmit: SubmitHandler<ConnectTrackerSchemaDto> = (data) => {
    if (editingVehicle) {
      connectMutation.mutate(data, {
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
        <label className="mb-1 block text-sm font-medium">DeviceId*</label>
        <input
          {...register("deviceId")}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <FormErrorMsg message={errors.deviceId?.message} ns="vehicle" />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Secret*</label>
        <input
          {...register("secret")}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <FormErrorMsg message={errors.secret?.message} ns="vehicle" />
      </div>


      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="submit"
          disabled={connectMutation.isPending}
        >
          Connect Tracker
        </Button>
      </div>
    </form>
  );
}

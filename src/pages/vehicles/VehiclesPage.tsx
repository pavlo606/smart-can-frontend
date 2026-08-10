import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { ConnectTrackerForm } from "@/features/vehicles/forms/ConnectTrackerForm";
import { CreateVehicleForm } from "@/features/vehicles/forms/CreateVehicleForm";
import { useManyVehicles } from "@/features/vehicles/hook";
import type { Vehicle } from "@/features/vehicles/types";
import { useDebounce } from "@/hooks/useDebounce";
import { useQueryPagination } from "@/hooks/useQueryPagination";
import { cn } from "@/utils/cn";
import { PencilLine, Plus } from "lucide-react";
import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { toast } from "react-toastify";

const VehiclesPage = () => {
  // const navigate = useNavigate();
  // const { t } = useTranslation(["common"]);
  const [modalConnectTrackerOpen, setModalConnectTrackerOpen] = useState(false);
  const [modalEditVehicleOpen, setModalEditVehicleOpen] = useState(false);

  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const { search, page, limit, sortBy, sortOrder, setQuery } =
    useQueryPagination();

  const [searchState, _] = useState(search);
  const debouncedSearch = useDebounce(searchState);

  const { data, isLoading, isError, error } = useManyVehicles({
    search: debouncedSearch,
    page,
    limit,
    sortBy,
    sortOrder,
  });

  const vehicles = data?.items ?? [];

  useEffect(() => {
    if (isError) toast.error(error.message);
  }, [isError, error]);

  useEffect(() => {
    setQuery({ search: searchState, page: 1 });
  }, [debouncedSearch]);

  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Cars</h1>
          <p className="text-sm text-gray-600">Manage your cars</p>
        </div>
        <Button
          Icon={Plus}
          onClick={() => {
            setEditingVehicle(null);
            setModalEditVehicleOpen(true);
          }}
        >
          Add car
        </Button>
      </div>

      <div>
        {isLoading ? (
          <div className="text-sm text-gray-500">{"loading"}</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right w-64">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow>
                  <TableCell>{vehicle.name}</TableCell>
                  <TableCell>{vehicle.brand}</TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell>{vehicle.year || "-"}</TableCell>
                  <TableCell
                    className={cn(
                      vehicle.device ? "text-emerald-500" : "text-red-500",
                    )}
                  >
                    {vehicle.device
                      ? "Tracker connected"
                      : "Tracker not connected"}
                  </TableCell>
                  <TableCell className="space-x-2 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingVehicle(vehicle);
                        setModalEditVehicleOpen(true);
                      }}
                      Icon={PencilLine}
                    ></Button>
                    {vehicle.device ? (
                      <>
                        <Link to={`/cars/device/${vehicle.device.id}`}>
                          <Button variant="ghost" size="sm">
                            View tracks
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <>
                        {/* <Link to={`/clients/${vehicle.id}`}> */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingVehicle(vehicle);
                            setModalConnectTrackerOpen(true)
                          }}
                        >
                          Connect Tracker
                        </Button>
                        {/* </Link> */}
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <Modal
        open={modalEditVehicleOpen}
        title={editingVehicle ? "Edit" : "Create"}
        onClose={() => setModalEditVehicleOpen(false)}
      >
        <CreateVehicleForm
          editingItem={editingVehicle || undefined}
          onSuccess={() => setModalEditVehicleOpen(false)}
        />
      </Modal>

      <Modal
        title="Connect Tracker"
        open={modalConnectTrackerOpen}
        onClose={() => setModalConnectTrackerOpen(false)}
      >
        <ConnectTrackerForm
          editingItem={editingVehicle || undefined}
          onSuccess={() => {
            toast.success("Tracker Connected!")
            setModalConnectTrackerOpen(false)
          }}
        />
      </Modal>
    </div>
  );
};

export default VehiclesPage;

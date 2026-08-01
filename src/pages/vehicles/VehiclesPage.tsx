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
import { useManyVehicles } from "@/features/vehicles/hook";
import { useDebounce } from "@/hooks/useDebounce";
import { useQueryPagination } from "@/hooks/useQueryPagination";
import { cn } from "@/utils/cn";
import { Eye, PencilLine, Plus } from "lucide-react";
import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { toast } from "react-toastify";

const VehiclesPage = () => {
  // const navigate = useNavigate();
  // const { t } = useTranslation(["common"]);
  const [modalOpen, setModalOpen] = useState(false);

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
        <Button Icon={Plus}>Add car</Button>
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
                  <TableCell className={cn(vehicle.device ? "text-emerald-500" : "text-red-500")}>{vehicle.device ? "Tracker connected" : "Tracker not connected"}</TableCell>
                  <TableCell className="space-x-2">
                    <Link to={`/clients/${vehicle.id}`}>
                      <Button variant="ghost" size="sm" Icon={Eye}></Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // setEditingClient(client);
                        // setModalOpen(true);
                      }}
                      Icon={PencilLine}
                    ></Button>
                    {vehicle.device ? (
                      <>
                        <Link to={`/device/${vehicle.device.id}`}>
                          <Button variant="ghost" size="sm">
                            View tracks
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <>
                        {/* <Link to={`/clients/${vehicle.id}`}> */}
                        <Button variant="ghost" size="sm" onClick={() => setModalOpen(true)}>
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
        title="Connect Tracker"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <form>
          <label className="text-sm">Device Id</label>
          <input className="w-full rounded-md border px-3 py-2 text-sm" />
          
          <label className="text-sm">Device Key</label>
          <input className="w-full rounded-md border px-3 py-2 text-sm" />

          <div className="flex justify-end mt-4">
            <Button className="">Connect</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default VehiclesPage;

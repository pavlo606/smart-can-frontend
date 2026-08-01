import { Button } from "@/components/ui/Button";
import { MapComponent } from "@/components/ui/Map";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { useDevice } from "@/features/device/hook";
import { Eye, PencilLine } from "lucide-react";
import { Link, useParams } from "react-router";

const DevicePage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useDevice(id!);

  if (isLoading) {
    return <div className="text-sm text-gray-500">Loading...</div>;
  }

  if (isError || !data) {
    return <div className="text-sm text-red-600">Failed to load project</div>;
  }

  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Tracks</h1>
          <p className="text-sm text-gray-600">See tracks for device {data.imei}</p>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead className="text-right w-64">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.tracks.map((track) => (
            <TableRow>
              <TableCell>{track.name}</TableCell>
              <TableCell>{track.startTimestamp}</TableCell>
              <TableCell>{track.endTimestamp}</TableCell>
              <TableCell className="space-x-2 text-right">
                <Link to={`/track/${track.id}`}>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DevicePage;

import { useEffect, useMemo, useState } from "react";
import { MapComponent } from "@/components/ui/Map";
import { useManyTelemetry } from "@/features/telemetry/hook";
import { useTrack } from "@/features/track/hook";
import { useParams } from "react-router";
import { Polyline, Tooltip } from "react-leaflet";
import { type LatLngExpression } from "leaflet";

type MetricKey = "speed" | "rpm" | "coolantTemp" | "fuelLevel";

const metricLabels: Record<MetricKey, string> = {
  speed: "Speed",
  rpm: "RPM",
  coolantTemp: "Coolant Temp",
  fuelLevel: "Fuel Level",
};

const metricUnits: Record<MetricKey, string> = {
  speed: "km/h",
  rpm: "rpm",
  coolantTemp: "°C",
  fuelLevel: "L",
};

function interpolateColor(min: number, max: number, value?: number) {
  if (max === min || !value) return "#3b82f6";

  const normalized = (value - min) / (max - min);

  const hue = (1 - normalized) * 240;

  return `hsl(${hue}, 100%, 50%)`;
}

const TrackPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: track } = useTrack(id!);

  const { data: telemetry } = useManyTelemetry({
    deviceId: track?.deviceId,
    gte: track?.startTimestamp,
    lte: track?.endTimestamp,
  });

  const [selectedMetric, setSelectedMetric] = useState<MetricKey>("speed");

  const positions = useMemo<LatLngExpression[]>(() => {
    return telemetry?.items.map((point) => [
      point.latitude,
      point.longitude,
    ]) as LatLngExpression[];
  }, [telemetry]);

  const metricValues = useMemo(() => {
    return telemetry?.items.map((p) => p[selectedMetric])?.filter((p) => p) as
      | number[]
      | undefined;
  }, [selectedMetric, telemetry]);

  const minValue = metricValues ? Math.min(...metricValues) : 0;
  const maxValue = metricValues ? Math.max(...metricValues) : 0;

  const segments = useMemo(() => {
    if (!telemetry) return [];

    const result = [];

    for (let i = 0; i < telemetry.items.length - 1; i++) {
      const current = telemetry.items[i];
      const next = telemetry.items[i + 1];

      const value = current[selectedMetric];

      result.push({
        positions: [
          [current.latitude, current.longitude],
          [next.latitude, next.longitude],
        ] as LatLngExpression[],
        value,
        color: interpolateColor(minValue, maxValue, value),
        timestamp: current.timestamp,
      });
    }

    return result;
  }, [selectedMetric, minValue, maxValue, telemetry]);

  const center = positions
    ? positions[0]
    // : ([49.8397, 24.0297] as LatLngExpression);
    : undefined

  useEffect(() => {
    console.log("positions");
    console.log(positions);
    console.log("center");
    console.log(center);
  }, [center, positions]);

  return (
    <div className="h-[90vh] w-full flex flex-col">
      <div className="border-b border-zinc-800 p-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">OBD-II Route Visualization</h1>

          <p className="text-zinc-400 text-sm mt-1">
            Colored route by telemetry parameter
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded mr-1" style={{backgroundColor: "hsl(240, 100%, 50%)"}}></div>
            <p>- {Number(minValue.toFixed(2))}</p>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded mr-1" style={{backgroundColor: "hsl(0, 100%, 50%)"}}></div>
            <p>- {Number(maxValue.toFixed(2))}</p>
          </div>
        </div>

        {/* Metric selector */}
        <div className="flex gap-2">
          {(Object.keys(metricLabels) as MetricKey[]).map((metric) => (
            <button
              key={metric}
              onClick={() => setSelectedMetric(metric)}
              className={`px-4 py-2 rounded-xl border transition
                ${
                  selectedMetric === metric
                    ? "bg-blue-500 border-blue-400"
                    : "bg-zinc-50 border-zinc-500 hover:bg-zinc-100"
                }
              `}
            >
              {metricLabels[metric]}
            </button>
          ))}
        </div>
      </div>
      {center ? (
        <div className="h-full">
          <MapComponent center={center}>
            <Polyline
                positions={positions}
                pathOptions={{
                  color: "red",
                  weight: 8,
                  opacity: 0.9,
                  lineCap: "round",
                }}
              ></Polyline>
            {segments.map((segment, index) => (
              <Polyline
                key={index}
                positions={segment.positions}
                pathOptions={{
                  color: segment.color,
                  weight: 8,
                  opacity: 0.9,
                  lineCap: "round",
                }}
              >
                <Tooltip>
                  <div className="text-sm">
                    <div>
                      <b>{metricLabels[selectedMetric]}:</b> {Number(segment.value?.toFixed(2) || 0)}{" "}
                      {metricUnits[selectedMetric]}
                    </div>

                    <div>
                      <b>Time:</b> {new Date(segment.timestamp).toLocaleString()}
                    </div>
                  </div>
                </Tooltip>
              </Polyline>
            ))}
          </MapComponent>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};


export default TrackPage;

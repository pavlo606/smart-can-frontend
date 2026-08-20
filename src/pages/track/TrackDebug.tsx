import { useEffect, useState } from "react";
import { MapComponent } from "@/components/ui/Map";
import { Polyline, useMapEvents } from "react-leaflet";
import { type LatLngExpression } from "leaflet";

function ClickHandler({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      console.log(`Map clicked at: ${lat}, ${lng}`);
      onClick(lat, lng)
    },
    
  });
  
  return null; // This component doesn't render anything UI-wise
}

const DebugTrackPage = () => {
  const center = ([49.8397, 24.0297] as LatLngExpression);

  useEffect(() => {
    console.log("center");
    console.log(center);
  }, [center]);

  const [coords, setCoords] = useState<number[][]>([])

  return (
    <div className="w-full flex flex-col">
      <div className="h-[70vh] mb-2 cursor-default">
        <MapComponent center={center}>
          <Polyline
              positions={coords as LatLngExpression[]}
              pathOptions={{
                color: "red",
                weight: 8,
                opacity: 0.9,
                lineCap: "round",
              }}
            ></Polyline>
          <ClickHandler onClick={(lat, lng) => setCoords((a) => [ ...a, [lat, lng] ])}/>
        </MapComponent>
      </div>
      <button onClick={() => setCoords((a) => a.slice(0, -1))}>Undo</button>
      <p className="w-100 text-wrap">{"["}{coords.map((coord) => `[${coord[0]}, ${coord[1]}],`)}{"]"}</p>
      <button onClick={() => setCoords([])}>Reset</button>
    </div>
  );
};


export default DebugTrackPage;

import { useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import MyMap from "./components/Map";
import { LatLngLiteral } from "leaflet";

interface LocationInterface {
  lat: number;
  lng: number;
  address?: string;
}

function App() {
  const [markers, setMarkers] = useState<LocationInterface[]>([]);

  const [selectedLocation, setSelectedLocation] = useState<LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  return (
    <div className="flex relative h-[100vh]">
      <Sidebar
        setSelectedLocation={setSelectedLocation}
        markers={markers}
        setMarkers={setMarkers}
      />
      <div className="flex items-center px-8 w-full">
        <MyMap
          selectedLocation={selectedLocation}
          markers={markers}
          setMarkers={setMarkers}
        />
      </div>
    </div>
  );
}

export default App;

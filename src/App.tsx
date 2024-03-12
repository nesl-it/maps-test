import { useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import MyMap from "./components/Map";

interface location {
  lat: number;
  lng: number;
  address?: string;
}

type Location = {
  lat: string;
  lng: string;
};

function App() {
  const [markers, setMarkers] = useState<location[]>([]);

  const [selectedLocation, setSelectedLocation] = useState<Location>({
    lat: "",
    lng: "",
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

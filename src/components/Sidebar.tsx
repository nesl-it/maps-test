import React from "react";

interface Marker {
  lat: number;
  lng: number;
  address?: string;
}

interface SidebarProps {
  markers: Marker[];
  setSelectedLocation: any;
  setMarkers: React.Dispatch<React.SetStateAction<Marker[]>>;
}

function Sidebar({ markers, setMarkers, setSelectedLocation }: SidebarProps) {
  const handleRemoveMarker: (indexToRemove: number) => void = (
    indexToRemove: number
  ) => {
    setMarkers(markers.filter((_, index: number) => index !== indexToRemove));
  };

  const handleCardClick = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  };

  return (
    <div className="bg-[#6895D2] gap-12 flex flex-col text-center text-white w-[300px] px-2 py-7">
      <p className="font-semibold">Your Locations</p>
      <div className="flex cursor-pointer flex-col text-left overflow-y-auto px-3 gap-2">
        {markers?.map((item: Marker, key: number) => {
          return (
            <div
              key={key}
              onClick={() => handleCardClick(item.lat, item.lng)}
              className="flex justify-between items-center p-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
            >
              <p className="font-normal text-sm text-black">{item.address}</p>
              <p
                className="text-black font-bold cursor-pointer"
                onClick={() => handleRemoveMarker(key)}
              >
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;

import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import { LatLngLiteral } from "leaflet";

interface MarkerType {
  lat: number;
  lng: number;
  address?: string;
}

interface MyMapProps {
  markers: MarkerType[];
  setMarkers: React.Dispatch<React.SetStateAction<MarkerType[]>>;
  selectedLocation: LatLngLiteral;
}

const containerStyle = {
  width: "100%",
  height: "600px",
  borderRadius: "16px",
};

function MyMap({ markers, setMarkers, selectedLocation }: MyMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
  });

  const [infoWindowPosition, setInfoWindowPosition] =
    useState<MarkerType | null>(null);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    const center = {
      lat: -3.745,
      lng: -38.523,
    };
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
  }, []);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event && event.latLng) {
      const clickedLat = event.latLng.lat();
      const clickedLng = event.latLng.lng();
      const geocoder = new window.google.maps.Geocoder();
      const location = new window.google.maps.LatLng(clickedLat, clickedLng);
      geocoder.geocode({ location }, (results, status) => {
        if (status === "OK" && results) {
          setInfoWindowPosition({
            lat: clickedLat,
            lng: clickedLng,
            address: results[0].formatted_address,
          });
        }
      });
    }
  };

  const handleAddMarkerToList = () => {
    if (infoWindowPosition) {
      setMarkers([...markers, infoWindowPosition]);
      setInfoWindowPosition(null);
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={selectedLocation}
      zoom={15}
      onLoad={onLoad}
      onClick={handleMapClick}
    >
      {infoWindowPosition && (
        <InfoWindow
          position={infoWindowPosition}
          onUnmount={() => setInfoWindowPosition(null)}
          onCloseClick={() => setInfoWindowPosition(null)}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="font-semibold space-y-1">
              <p>Latitude: {infoWindowPosition.lat}</p>
              <p>Longitude: {infoWindowPosition.lng}</p>
              <p>{infoWindowPosition.address}</p>
            </span>
            <button
              onClick={handleAddMarkerToList}
              className="text-[#6895D2] font-bold"
            >
              Add to list
            </button>
          </div>
        </InfoWindow>
      )}

      {markers.map((marker, index) => (
        <Marker key={index} position={marker} />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default MyMap;

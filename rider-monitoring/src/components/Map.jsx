import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/Dashboard.css";
import L from "leaflet";

// Define custom blinking red dot icon
const markerIcon = L.divIcon({
  className: "map-dot-icon",
  iconSize: [30, 30],
});

const generateRandomCoordinates = (baseLat, baseLng, range = 0.02) => {
  const randomLat = baseLat + (Math.random() - 0.35) * range;
  const randomLng = baseLng + (Math.random() - 0.25) * range;
  return { lat: randomLat, lng: randomLng };
};

const Map = ({ cityCoordinates }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, [cityCoordinates]);

  const randomMarkers = Array.from({ length: 2 }, () =>
    generateRandomCoordinates(cityCoordinates.lat, cityCoordinates.lng)
  );

  return (
    <MapContainer
      center={[cityCoordinates.lat, cityCoordinates.lng]}
      zoom={
        cityCoordinates.lat === 20.5937 && cityCoordinates.lng === 78.9629
          ? 5
          : 14
      } // Adjust zoom level as needed
      className="leaflet-container"
      ref={mapRef}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[cityCoordinates.lat, cityCoordinates.lng]} icon={markerIcon}></Marker>
      {randomMarkers.map((coords, index) => (
        <Marker
          key={index}
          position={[coords.lat, coords.lng]}
          icon={markerIcon}
        ></Marker>
      ))}
    </MapContainer>
  );
};

export default Map;

import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/Dashboard.css";
import L from "leaflet";

const markerIcon = L.divIcon({
  className: "map-dot-icon",
  iconSize: [30, 30],
});

const centerIcon = L.divIcon({
  className: "map-center-icon",
  iconSize: [70, 70],
});

const generateRandomCoordinates = (baseLat, baseLng, range = 0.02) => {
  const randomLat = baseLat + (Math.random() - 0.5) * range;
  const randomLng = baseLng + (Math.random() - 0.5) * range;
  return { lat: randomLat, lng: randomLng };
};

const Map = ({ cityCoordinates, onMarkerClick }) => {
  const mapRef = useRef(null);
  const [randomMarkers, setRandomMarkers] = useState([]);

  useEffect(() => {
    const markers = Array.from({ length: 2 }, () =>
      generateRandomCoordinates(cityCoordinates.lat, cityCoordinates.lng)
    );
    setRandomMarkers(markers);
  }, [cityCoordinates]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, [cityCoordinates]);

  const handleMarkerClick = (lat, lng) => {
    if (onMarkerClick) {
      onMarkerClick(lat, lng);
    }
  };

  return (
    <MapContainer
      center={[cityCoordinates.lat, cityCoordinates.lng]}
      zoom={
        cityCoordinates.lat === 20.5937 && cityCoordinates.lng === 78.9629
          ? 5
          : 14
      }
      className="leaflet-container"
      ref={mapRef}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker
        position={[cityCoordinates.lat, cityCoordinates.lng]}
        icon={centerIcon}
      />
      {cityCoordinates.lat !== 20.5937 &&
        cityCoordinates.lng !== 78.9629 &&
        randomMarkers.map((coords, index) => (
          <Marker
            key={index}
            position={[coords.lat, coords.lng]}
            icon={markerIcon}
            eventHandlers={{
              click: () => {
                handleMarkerClick(coords.lat, coords.lng);
              },
            }}
          />
        ))}
    </MapContainer>
  );
};

export default Map;

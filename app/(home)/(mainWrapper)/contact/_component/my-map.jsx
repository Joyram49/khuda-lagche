"use client";
import MapError from "@/components/error/map-error";
import Spinner from "@/components/loader/spinner";
import L from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// Manually set the default marker icon path
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const defaultLocation = [23.8041, 90.4152];

const MapComponent = () => {
  const [position, setPosition] = useState(defaultLocation); // State to store user's location
  const [error, setError] = useState(null); // State to store error messages
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          )
            .then((response) => response.json())
            .then((data) => setAddress(data.display_name))
            .catch((err) => setError("Failed to fetch address"));
          setIsLoading(false);
        },
        (err) => {
          // Handle different types of errors
          switch (err.code) {
            case err.POSITION_UNAVAILABLE:
              setError(
                "Location information is unavailable. Please try again later."
              );
              break;
            case err.TIMEOUT:
              setError(
                "The request to get your location timed out. Please try again."
              );
              break;
            case err.UNKNOWN_ERROR:
              setError("An unknown error occurred. Please try again.");
              break;
          }
          setIsLoading(false); // Stop loading when an error occurs
        },
        { timeout: 10000 } // Optional: Set a timeout of 10 seconds
      );
    } else {
      setError(
        "Geolocation is not supported by this browser. Please use a modern browser."
      );
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <MapError error={error} />;
  }

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "50vh", width: "100%", position: "relative" }}
    >
      <div className='text-white bg-black absolute top-50 left-0'>
        Position with address
      </div>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>{address ?? "turn on your location"}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;

"use client";
import React, { useRef, useEffect, useState } from "react";

const LocationPicker = ({ googleMapApiKey, onLocationChange, initialLatLng }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [latLng, setLatLng] = useState(initialLatLng);
  const [map, setMap] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(14);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapApiKey}`;
        script.async = true;
        script.defer = true;
        script.onload = initializeMap;
        document.head.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (!latLng) return;

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: latLng,
        zoom: zoomLevel,
      });

      setMap(mapInstance);

      const marker = new window.google.maps.Marker({
        position: latLng,
        map: mapInstance,
        draggable: true,
      });

      markerRef.current = marker;

      marker.addListener("dragend", () => {
        const newLat = marker.getPosition().lat();
        const newLng = marker.getPosition().lng();
        onLocationChange({ lat: newLat, lng: newLng });
        setLatLng({ lat: newLat, lng: newLng });
      });

      mapInstance.addListener("click", (event) => {
        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();
        marker.setPosition({ lat: newLat, lng: newLng });
        onLocationChange({ lat: newLat, lng: newLng });
        setLatLng({ lat: newLat, lng: newLng });
      });

      mapInstance.addListener("zoom_changed", () => {
        setZoomLevel(mapInstance.getZoom());
      });
    };

    loadGoogleMapsScript();
  }, [googleMapApiKey, latLng, onLocationChange, zoomLevel]);

  useEffect(() => {
    if (map && latLng) {
      map.setCenter(latLng);
      markerRef.current.setPosition(latLng);
    }
  }, [latLng, map]);

  useEffect(() => {
    if ((!initialLatLng || (initialLatLng.lat === 0 && initialLatLng.lng === 0)) && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const initialPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLatLng(initialPosition);
        },
        (error) => {
          console.error("Error getting geolocation: ", error);
          setLatLng({ lat: 18.5204, lng: 73.8567 });
        }
      );
    } else if (!initialLatLng || (initialLatLng.lat === 0 && initialLatLng.lng === 0)) {
      console.error("Geolocation is not supported by this browser.");
      setLatLng({ lat: 18.5204, lng: 73.8567 });
    }
  }, [initialLatLng]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default LocationPicker;

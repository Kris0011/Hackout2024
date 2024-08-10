import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface MapWithLocationPickerProps {
  onLocationSelect: (latlng: L.LatLng) => void;
  initialLocation: { lat: number | null; lng: number | null };
}

const MapWithLocationPicker: React.FC<MapWithLocationPickerProps> = ({ onLocationSelect, initialLocation }) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const { lat, lng } = initialLocation;

    const map = L.map(containerRef.current, {
      center: [lat ?? 51.505, lng ?? -0.09],
      zoom: 13,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    mapRef.current = map;

    map.on('click', (e: L.LeafletMouseEvent) => {
      onLocationSelect(e.latlng);
    });

    return () => {
      map.off();
      map.remove();
    };
  }, [initialLocation, onLocationSelect]);

  useEffect(() => {
    if (mapRef.current && initialLocation.lat !== null && initialLocation.lng !== null) {
      mapRef.current.setView([initialLocation.lat, initialLocation.lng], 13);
    }
  }, [initialLocation]);

  return <div ref={containerRef} style={{ height: '400px', width: '100%' }} />;
};

export default MapWithLocationPicker;

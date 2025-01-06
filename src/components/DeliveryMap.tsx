import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface DeliveryMapProps {
  pickupLocation?: [number, number];
  dropoffLocation?: [number, number];
}

const DeliveryMap = ({ pickupLocation, dropoffLocation }: DeliveryMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN'; // Replace with your token
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40], // Default center
      zoom: 9
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, []);

  // Update markers when locations change
  useEffect(() => {
    if (!map.current) return;

    // Add pickup marker
    if (pickupLocation) {
      new mapboxgl.Marker({ color: '#22c55e' })
        .setLngLat(pickupLocation)
        .addTo(map.current);
    }

    // Add dropoff marker
    if (dropoffLocation) {
      new mapboxgl.Marker({ color: '#ef4444' })
        .setLngLat(dropoffLocation)
        .addTo(map.current);
    }

    // Fit bounds if both locations are set
    if (pickupLocation && dropoffLocation) {
      const bounds = new mapboxgl.LngLatBounds()
        .extend(pickupLocation)
        .extend(dropoffLocation);

      map.current.fitBounds(bounds, {
        padding: 100
      });
    }
  }, [pickupLocation, dropoffLocation]);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default DeliveryMap;
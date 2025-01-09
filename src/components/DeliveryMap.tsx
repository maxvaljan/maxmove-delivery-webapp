import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface DeliveryMapProps {
  pickupLocation?: [number, number];
  dropoffLocation?: [number, number];
}

const DeliveryMap = ({ pickupLocation, dropoffLocation }: DeliveryMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [token, setToken] = useState(localStorage.getItem('mapbox_token') || '');
  const [isTokenSet, setIsTokenSet] = useState(!!localStorage.getItem('mapbox_token'));

  const handleTokenSubmit = () => {
    localStorage.setItem('mapbox_token', token);
    setIsTokenSet(true);
    window.location.reload();
  };

  useEffect(() => {
    if (!mapContainer.current || !isTokenSet) return;

    console.log('Initializing map with token...');
    
    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 9
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    console.log('Map initialized successfully');

    return () => {
      map.current?.remove();
    };
  }, [isTokenSet, token]);

  useEffect(() => {
    if (!map.current || !isTokenSet) return;

    console.log('Updating markers:', { pickupLocation, dropoffLocation });

    // Clear existing markers
    const markers = document.getElementsByClassName('mapboxgl-marker');
    while(markers[0]) {
      markers[0].remove();
    }

    if (pickupLocation) {
      new mapboxgl.Marker({ color: '#22c55e' })
        .setLngLat(pickupLocation)
        .addTo(map.current);
    }

    if (dropoffLocation) {
      new mapboxgl.Marker({ color: '#ef4444' })
        .setLngLat(dropoffLocation)
        .addTo(map.current);
    }

    if (pickupLocation && dropoffLocation) {
      const bounds = new mapboxgl.LngLatBounds()
        .extend(pickupLocation)
        .extend(dropoffLocation);

      map.current.fitBounds(bounds, {
        padding: 100
      });
    }
  }, [pickupLocation, dropoffLocation, isTokenSet]);

  if (!isTokenSet) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center space-y-4 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold">Enter your Mapbox token</h3>
        <p className="text-sm text-gray-600 text-center max-w-md">
          To use the map features, please enter your Mapbox public token. 
          You can find this in your Mapbox account dashboard.
        </p>
        <div className="w-full max-w-md space-y-2">
          <Input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="pk.eyJ1..."
            className="w-full"
          />
          <Button onClick={handleTokenSubmit} className="w-full">
            Set Token
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default DeliveryMap;
import React, { useState } from 'react';
import LocationInput from './LocationInput';
import DeliveryMap from './DeliveryMap';
import ServiceCard from './ServiceCard';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { MapPin } from 'lucide-react';

const DeliveryForm = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [selectedService, setSelectedService] = useState<'motorcycle' | 'car' | 'van'>();
  const [pickupCoords, setPickupCoords] = useState<[number, number]>();
  const [dropoffCoords, setDropoffCoords] = useState<[number, number]>();

  const services = [
    {
      type: 'motorcycle' as const,
      price: '$10',
      time: '15-20 min',
    },
    {
      type: 'car' as const,
      price: '$20',
      time: '20-30 min',
    },
    {
      type: 'van' as const,
      price: '$30',
      time: '25-35 min',
    },
  ];

  // Simulating geocoding for demo purposes
  const simulateGeocode = (address: string): [number, number] => {
    // This is just for demonstration - in a real app, you'd use a geocoding service
    return [-74.5 + Math.random() * 0.1, 40 + Math.random() * 0.1];
  };

  const handlePickupChange = (value: string) => {
    setPickup(value);
    if (value) {
      setPickupCoords(simulateGeocode(value));
    }
  };

  const handleDropoffChange = (value: string) => {
    setDropoff(value);
    if (value) {
      setDropoffCoords(simulateGeocode(value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !dropoff) {
      toast.error('Please enter both pickup and dropoff locations');
      return;
    }
    if (!selectedService) {
      toast.error('Please select a delivery service');
      return;
    }
    toast.success('Delivery request submitted!');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Schedule a Delivery</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative space-y-4">
              <LocationInput
                label="Pickup Location"
                placeholder="Enter pickup address"
                value={pickup}
                onChange={handlePickupChange}
                icon={<MapPin className="text-primary" />}
              />
              
              <LocationInput
                label="Dropoff Location"
                placeholder="Enter dropoff address"
                value={dropoff}
                onChange={handleDropoffChange}
                icon={<MapPin className="text-destructive" />}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Select Vehicle Type</h3>
              <div className="grid gap-4">
                {services.map((service) => (
                  <ServiceCard
                    key={service.type}
                    type={service.type}
                    price={service.price}
                    time={service.time}
                    selected={selectedService === service.type}
                    onClick={() => setSelectedService(service.type)}
                  />
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full text-lg py-6">
              Request Delivery
            </Button>
          </form>
        </div>

        <div className="h-[600px]">
          <DeliveryMap
            pickupLocation={pickupCoords}
            dropoffLocation={dropoffCoords}
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;
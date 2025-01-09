import React, { useState } from 'react';
import LocationInput from './LocationInput';
import DeliveryMap from './DeliveryMap';
import ServiceCard from './ServiceCard';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { MapPin, Clock, Package2, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const DeliveryForm = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [selectedService, setSelectedService] = useState<'motorcycle' | 'car' | 'van'>();
  const [pickupCoords, setPickupCoords] = useState<[number, number]>();
  const [dropoffCoords, setDropoffCoords] = useState<[number, number]>();
  const [packageSize, setPackageSize] = useState<'small' | 'medium' | 'large'>('small');
  const [scheduledTime, setScheduledTime] = useState<Date | null>(null);

  const services = [
    {
      type: 'motorcycle' as const,
      price: '$10',
      time: '15-20 min',
      maxWeight: '5kg',
      description: 'Best for small packages and documents',
    },
    {
      type: 'car' as const,
      price: '$20',
      time: '20-30 min',
      maxWeight: '20kg',
      description: 'Ideal for medium-sized deliveries',
    },
    {
      type: 'van' as const,
      price: '$30',
      time: '25-35 min',
      maxWeight: '50kg',
      description: 'Perfect for large items and bulk orders',
    },
  ];

  // Simulating geocoding for demo purposes
  const simulateGeocode = (address: string): [number, number] => {
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
    toast.success('Delivery request submitted successfully!', {
      description: 'A driver will be assigned to your delivery shortly.',
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2 text-secondary">Schedule a Delivery</h1>
        <p className="text-muted-foreground mb-8">Fast, reliable delivery services at your fingertips</p>
      </motion.div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
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
              <div className="flex items-center gap-2 mb-4">
                <Package2 className="w-5 h-5 text-secondary" />
                <h3 className="text-lg font-semibold">Select Vehicle Type</h3>
              </div>
              <div className="grid gap-4">
                {services.map((service) => (
                  <ServiceCard
                    key={service.type}
                    type={service.type}
                    price={service.price}
                    time={service.time}
                    maxWeight={service.maxWeight}
                    description={service.description}
                    selected={selectedService === service.type}
                    onClick={() => setSelectedService(service.type)}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-4 items-center bg-muted p-4 rounded-lg">
              <Info className="w-5 h-5 text-secondary" />
              <p className="text-sm text-muted-foreground">
                Prices may vary based on distance and traffic conditions
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full text-lg py-6 bg-secondary hover:bg-secondary/90"
            >
              Request Delivery
            </Button>
          </form>
        </motion.div>

        <motion.div 
          className="h-[600px]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <DeliveryMap
            pickupLocation={pickupCoords}
            dropoffLocation={dropoffCoords}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default DeliveryForm;
import React, { useState } from 'react';
import LocationInput from './LocationInput';
import DeliveryMap from './DeliveryMap';
import { Button } from './ui/button';
import { toast } from 'sonner';

const DeliveryForm = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !dropoff) {
      toast.error('Please enter both pickup and dropoff locations');
      return;
    }
    // Here you would typically geocode the addresses and proceed with the delivery
    toast.success('Delivery request submitted!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Schedule a Delivery</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <LocationInput
              label="Pickup Location"
              placeholder="Enter pickup address"
              value={pickup}
              onChange={setPickup}
            />
            
            <LocationInput
              label="Dropoff Location"
              placeholder="Enter dropoff address"
              value={dropoff}
              onChange={setDropoff}
            />

            <Button type="submit" className="w-full">
              Request Delivery
            </Button>
          </form>
        </div>

        <div>
          <DeliveryMap />
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;
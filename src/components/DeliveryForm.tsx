import React, { useState } from 'react';
import DeliveryMap from './DeliveryMap';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import LocationSection from './delivery/LocationSection';
import ScheduleSection from './delivery/ScheduleSection';
import ServicesSection from './delivery/ServicesSection';

const DeliveryForm = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [selectedService, setSelectedService] = useState<'motorcycle' | 'car' | 'van'>();
  const [pickupCoords, setPickupCoords] = useState<[number, number]>();
  const [dropoffCoords, setDropoffCoords] = useState<[number, number]>();
  const [scheduledTime, setScheduledTime] = useState<Date | null>(null);
  const [isScheduled, setIsScheduled] = useState(false);

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

    const deliveryTime = isScheduled && scheduledTime 
      ? format(scheduledTime, 'PPpp')
      : 'As soon as possible';

    toast.success('Delivery request submitted successfully!', {
      description: `Your ${selectedService} delivery is scheduled for ${deliveryTime}`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-2 text-primary">Schedule a Delivery</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Fast, reliable delivery services at your fingertips. Choose from our range of professional delivery options.
        </p>
      </motion.div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg border border-accent/10">
            <LocationSection
              pickup={pickup}
              dropoff={dropoff}
              onPickupChange={handlePickupChange}
              onDropoffChange={handleDropoffChange}
            />

            <ScheduleSection
              isScheduled={isScheduled}
              onScheduleChange={setIsScheduled}
            />

            <ServicesSection
              selectedService={selectedService}
              onServiceSelect={setSelectedService}
            />

            <div className="flex gap-4 items-center bg-muted p-4 rounded-lg">
              <Info className="w-5 h-5 text-primary" />
              <p className="text-sm text-muted-foreground">
                Prices may vary based on distance and traffic conditions. All deliveries are insured.
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full text-lg py-6 bg-primary hover:bg-primary/90"
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
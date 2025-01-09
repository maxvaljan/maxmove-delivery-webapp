import React from 'react';
import LocationInput from '../LocationInput';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface LocationSectionProps {
  pickup: string;
  dropoff: string;
  onPickupChange: (value: string) => void;
  onDropoffChange: (value: string) => void;
}

const LocationSection = ({ pickup, dropoff, onPickupChange, onDropoffChange }: LocationSectionProps) => {
  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <LocationInput
        label="Pickup Location"
        placeholder="Enter pickup address"
        value={pickup}
        onChange={onPickupChange}
        icon={<MapPin className="text-primary" />}
      />
      
      <LocationInput
        label="Dropoff Location"
        placeholder="Enter dropoff address"
        value={dropoff}
        onChange={onDropoffChange}
        icon={<MapPin className="text-destructive" />}
      />
    </motion.div>
  );
};

export default LocationSection;
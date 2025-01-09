import React from 'react';
import ServiceCard from '../ServiceCard';
import { Package2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServicesSectionProps {
  selectedService?: 'motorcycle' | 'car' | 'van';
  onServiceSelect: (service: 'motorcycle' | 'car' | 'van') => void;
}

const ServicesSection = ({ selectedService, onServiceSelect }: ServicesSectionProps) => {
  const services = [
    {
      type: 'motorcycle' as const,
      price: '$10',
      time: '15-20 min',
      maxWeight: '5kg',
      description: 'Best for small packages and documents. Quick delivery for urgent items.',
      features: ['Instant Delivery', 'Real-time Tracking', 'Proof of Delivery'],
    },
    {
      type: 'car' as const,
      price: '$20',
      time: '20-30 min',
      maxWeight: '20kg',
      description: 'Ideal for medium-sized deliveries. Perfect for multiple packages.',
      features: ['Multiple Stops', 'Temperature Control', 'Insurance Coverage'],
    },
    {
      type: 'van' as const,
      price: '$30',
      time: '25-35 min',
      maxWeight: '50kg',
      description: 'Perfect for large items and bulk orders. Best for business deliveries.',
      features: ['Loading Assistance', 'Route Optimization', 'Dedicated Support'],
    },
  ];

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Package2 className="w-5 h-5 text-primary" />
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
            features={service.features}
            selected={selectedService === service.type}
            onClick={() => onServiceSelect(service.type)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ServicesSection;
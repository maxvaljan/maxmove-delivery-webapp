import React from 'react';
import { motion } from 'framer-motion';

interface LocationInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}

const LocationInput = ({ label, placeholder, value, onChange, icon }: LocationInputProps) => {
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all duration-200"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400">
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default LocationInput;
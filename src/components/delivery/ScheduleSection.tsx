import React from 'react';
import { Button } from '../ui/button';
import { Calendar, Clock3 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScheduleSectionProps {
  isScheduled: boolean;
  onScheduleChange: (scheduled: boolean) => void;
}

const ScheduleSection = ({ isScheduled, onScheduleChange }: ScheduleSectionProps) => {
  return (
    <motion.div 
      className="flex items-center gap-4 mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Button
        type="button"
        variant={isScheduled ? "outline" : "secondary"}
        className="flex-1 hover:bg-accent/80"
        onClick={() => onScheduleChange(false)}
      >
        <Clock3 className="w-4 h-4 mr-2" />
        ASAP
      </Button>
      <Button
        type="button"
        variant={isScheduled ? "secondary" : "outline"}
        className="flex-1 hover:bg-accent/80"
        onClick={() => onScheduleChange(true)}
      >
        <Calendar className="w-4 h-4 mr-2" />
        Schedule
      </Button>
    </motion.div>
  );
};

export default ScheduleSection;
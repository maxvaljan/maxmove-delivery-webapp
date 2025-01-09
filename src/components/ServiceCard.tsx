import { motion } from "framer-motion";
import { Truck, Car, Bike } from "lucide-react";

interface ServiceCardProps {
  type: "van" | "car" | "motorcycle";
  price: string;
  time: string;
  maxWeight: string;
  description: string;
  onClick: () => void;
  selected?: boolean;
}

const ServiceCard = ({ 
  type, 
  price, 
  time, 
  maxWeight,
  description,
  onClick, 
  selected 
}: ServiceCardProps) => {
  const icons = {
    van: Truck,
    car: Car,
    motorcycle: Bike,
  };

  const Icon = icons[type];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`p-6 rounded-lg cursor-pointer transition-all duration-200 ${
        selected
          ? "bg-secondary text-white shadow-lg"
          : "bg-white hover:shadow-md border border-gray-100"
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-full ${selected ? 'bg-white/10' : 'bg-secondary/10'}`}>
          <Icon className={`w-6 h-6 ${selected ? "text-white" : "text-secondary"}`} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold capitalize">{type}</h3>
              <p className={`text-sm ${selected ? 'text-white/80' : 'text-muted-foreground'}`}>
                {time} • Up to {maxWeight}
              </p>
            </div>
            <span className="font-bold text-lg">{price}</span>
          </div>
          <p className={`text-sm ${selected ? 'text-white/70' : 'text-muted-foreground'}`}>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
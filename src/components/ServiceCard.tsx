import { motion } from "framer-motion";
import { Truck, Car, Bike } from "lucide-react";

interface ServiceCardProps {
  type: "van" | "car" | "motorcycle";
  price: string;
  time: string;
  onClick: () => void;
  selected?: boolean;
}

const ServiceCard = ({ type, price, time, onClick, selected }: ServiceCardProps) => {
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
          ? "bg-primary text-white shadow-lg"
          : "bg-white hover:shadow-md border border-gray-100"
      }`}
    >
      <div className="flex items-center space-x-4">
        <Icon className={`w-8 h-8 ${selected ? "text-white" : "text-primary"}`} />
        <div>
          <h3 className="font-semibold capitalize">{type}</h3>
          <p className="text-sm opacity-80">{time}</p>
        </div>
        <div className="ml-auto">
          <span className="font-bold">{price}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
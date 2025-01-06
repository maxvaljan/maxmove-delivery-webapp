import { useState } from "react";
import { motion } from "framer-motion";
import ServiceCard from "../components/ServiceCard";
import LocationInput from "../components/LocationInput";

const Index = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    { type: "motorcycle" as const, price: "$20", time: "20-30 min" },
    { type: "car" as const, price: "$35", time: "25-35 min" },
    { type: "van" as const, price: "$50", time: "30-40 min" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Fast & Reliable Delivery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose your preferred delivery option and get your items delivered quickly and safely
          </p>
        </motion.div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="space-y-4 mb-8">
            <LocationInput
              label="Pickup Location"
              placeholder="Enter pickup address"
              value={pickup}
              onChange={setPickup}
            />
            <LocationInput
              label="Dropoff Location"
              placeholder="Enter delivery address"
              value={dropoff}
              onChange={setDropoff}
            />
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-lg mb-4">Select Service Type</h2>
            {services.map((service) => (
              <ServiceCard
                key={service.type}
                {...service}
                selected={selectedService === service.type}
                onClick={() => setSelectedService(service.type)}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-8 bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200"
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Index;
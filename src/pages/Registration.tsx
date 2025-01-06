import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const driverFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  vehicleType: z.enum(["car", "motorcycle", "van"]),
  licenseNumber: z.string().min(5, "License number must be at least 5 characters"),
  vehiclePlate: z.string().min(4, "Vehicle plate must be at least 4 characters"),
});

const Registration = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"driver" | "customer" | null>(
    null
  );

  const form = useForm<z.infer<typeof driverFormSchema>>({
    resolver: zodResolver(driverFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      vehicleType: "car",
      licenseNumber: "",
      vehiclePlate: "",
    },
  });

  const onSubmit = (values: z.infer<typeof driverFormSchema>) => {
    console.log("Form submitted:", values);
    toast.success("Registration successful!");
    navigate("/delivery");
  };

  const handleRoleSelection = (role: "driver" | "customer") => {
    setSelectedRole(role);
    if (role === "customer") {
      toast.success("Registered as customer");
      navigate("/delivery");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to MaxMove</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose how you'd like to use our platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 px-4">
          {/* Customer Card */}
          <Card
            className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
              selectedRole === "customer" ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => handleRoleSelection("customer")}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-center space-y-4"
            >
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold">I Need Delivery</h2>
              <p className="text-gray-600">
                Send packages or items to any destination quickly and securely
              </p>
              <Button className="w-full" variant="outline">
                Continue as Customer
              </Button>
            </motion.div>
          </Card>

          {/* Driver Card */}
          <Card
            className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
              selectedRole === "driver" ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setSelectedRole("driver")}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-center space-y-4"
            >
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold">I Want to Drive</h2>
              <p className="text-gray-600">
                Earn money by delivering packages with your vehicle
              </p>
              <Button className="w-full" variant="outline">
                Continue as Driver
              </Button>
            </motion.div>
          </Card>
        </div>

        {/* Driver Registration Form */}
        {selectedRole === "driver" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Driver Registration
              </h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1234567890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vehicleType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="car" id="car" />
                              <Label htmlFor="car">Car</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="motorcycle"
                                id="motorcycle"
                              />
                              <Label htmlFor="motorcycle">Motorcycle</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="van" id="van" />
                              <Label htmlFor="van">Van</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Driver's License Number</FormLabel>
                        <FormControl>
                          <Input placeholder="License number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vehiclePlate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Plate Number</FormLabel>
                        <FormControl>
                          <Input placeholder="ABC123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Register as Driver
                  </Button>
                </form>
              </Form>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Registration;
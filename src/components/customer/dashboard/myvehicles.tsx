import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Edit, Plus } from "lucide-react";
import { useState } from "react";
import { Vehicle } from "@/types/car";

const vehicles: Vehicle[] = [
    {
        vehicle_id: 1,
        make_id: 1,
        make_name: "Toyota",
        model_id: 1,
        model_name: "Explorer",
        color: "White",
        year: "2023",
        lisence_plate: "DEF456",
        vin: "2HJHK234HB843901",
        created_at: "2024-05-14T19:41:18.210Z",
    },
    {
        vehicle_id: 2,
        make_id: 2,
        make_name: "Ford",
        model_id: 1,
        model_name: "Explorer",
        color: "Black",
        year: "2023",
        lisence_plate: "DEF456",
        vin: "2HJHK234HB843901",
        created_at: "2024-05-14T19:41:18.210Z",
    },
];

export function MyVehicles() {
    const [expandedVehicleId, setExpandedVehicleId] = useState<number | null>(null);

    const toggleVehicleDetails = (vehicleId: number) => {
        setExpandedVehicleId(vehicleId === expandedVehicleId ? null : vehicleId);
    };

    const handleEdit = (vehicle: Vehicle) => {
        console.log("Editing vehicle:", vehicle);
    };

    const handleBook = (vehicle: Vehicle) => {
        console.log("Booking service for vehicle:", vehicle);
    };

    return (
        <Card className="h-1/2">
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>My Vehicles</CardTitle>
                <Button variant="outline" size="sm">
                    <Plus size={16} />
                </Button>
            </CardHeader>
            <CardContent className="overflow-y-auto max-h-[calc(50vh-12rem)] pr-2" style={{ scrollbarGutter: "stable" }}>
                <div className="space-y-2">
                    {vehicles.map((vehicle) => (
                        <div
                            key={vehicle.vehicle_id}
                            className="space-y-2 cursor-pointer"
                            onClick={() => toggleVehicleDetails(vehicle.vehicle_id)}
                        >
                            <div className="flex items-center">
                                <div className="flex items-center flex w-[40px] h-[40px] px-1 bg-white rounded-full">
                                    <img
                                        src={`/car_make_logos/${vehicle.make_name.replace(/\s+/g, "_").toLowerCase()}.png`}
                                        alt={`${vehicle.make_name} logo`}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                                <div className="flex-1 ml-4">
                                    <p className="text-sm font-medium leading-none">
                                        {vehicle.make_name} {vehicle.model_name}
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {vehicle.year} - {vehicle.color}
                                    </p>
                                </div>
                                <Button variant="link" className="text-primaryCustomer" size="sm" onClick={() => handleBook(vehicle)}>
                                    New Service
                                </Button>
                                <Button variant="link" size="sm" onClick={() => toggleVehicleDetails(vehicle.vehicle_id)}>
                                    {expandedVehicleId === vehicle.vehicle_id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </Button>
                            </div>
                            <AnimatePresence>
                                {expandedVehicleId === vehicle.vehicle_id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden bg-gray-100 p-4 rounded"
                                        style={{ willChange: "transform" }}
                                    >
                                        <div className="flex justify-between">
                                            <div className="pl-3 space-y-2">
                                                <div className="flex">
                                                    <p className="text-sm font-medium w-28">Make:</p>
                                                    <p className="text-sm">{vehicle.make_name}</p>
                                                </div>
                                                <div className="flex">
                                                    <p className="text-sm font-medium w-28">Model:</p>
                                                    <p className="text-sm">{vehicle.model_name}</p>
                                                </div>
                                                <div className="flex">
                                                    <p className="text-sm font-medium w-28">Year:</p>
                                                    <p className="text-sm">{vehicle.year}</p>
                                                </div>
                                                <div className="flex">
                                                    <p className="text-sm font-medium w-28">Color:</p>
                                                    <p className="text-sm">{vehicle.color}</p>
                                                </div>
                                                <div className="flex">
                                                    <p className="text-sm font-medium w-28">VIN:</p>
                                                    <p className="text-sm">{vehicle.vin}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col space-y-2">
                                                <Button variant="link" size="sm" onClick={() => handleEdit(vehicle)}>
                                                    <Edit size={16} />
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <Separator className="mt-2" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

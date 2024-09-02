"use client";
import { Vehicle } from "@/types/car";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import StepBar from "@/components/customer/book/StepBar";
import { useDispatch, useSelector } from 'react-redux';
import { setVehicleID, clearBooking } from '@/store/slices/bookingSlice';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

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
    {
        vehicle_id: 3,
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
        vehicle_id: 4,
        make_id: 1,
        make_name: "Ford",
        model_id: 1,
        model_name: "Explorer",
        color: "Black",
        year: "2023",
        lisence_plate: "DEF456",
        vin: "2HJHK234HB843901",
        created_at: "2024-05-14T19:41:18.210Z",
    },
    {
        vehicle_id: 5,
        make_id: 1,
        make_name: "Ford",
        model_id: 1,
        model_name: "Explorer",
        color: "Black",
        year: "2023",
        lisence_plate: "DEF456",
        vin: "2HJHK234HB843901",
        created_at: "2024-05-14T19:41:18.210Z",
    },
    {
        vehicle_id: 6,
        make_id: 1,
        make_name: "Ford",
        model_id: 1,
        model_name: "Explorer",
        color: "Black",
        year: "2023",
        lisence_plate: "DEF456",
        vin: "2HJHK234HB843901",
        created_at: "2024-05-14T19:41:18.210Z",
    },
    {
        vehicle_id: 7,
        make_id: 1,
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

export default function SelectVehiclePage() {
    const [expandedVehicleId, setExpandedVehicleId] = useState<number | null>(null);
    const [selectedVehicleIdLocal, setSelectedVehicleIdLocal] = useState<number | null>(null);
    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
    const [pendingNavigationUrl, setPendingNavigationUrl] = useState<string | null>(null);
    const [allowNavigation, setAllowNavigation] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    
    // useRef to store the handleBeforeUnload function
    const handleBeforeUnloadRef = useRef<(event: BeforeUnloadEvent) => void>();

    const selectedVehicleId = useSelector((state: any) => state.booking.vehicleID);

    useEffect(() => {
        if (selectedVehicleId) {
            setSelectedVehicleIdLocal(selectedVehicleId);
        }
    }, [selectedVehicleId]);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (!allowNavigation) {
                event.preventDefault();
                event.returnValue = ''; // This triggers a confirmation dialog in the browser
            }
        };

        handleBeforeUnloadRef.current = handleBeforeUnload;

        const handlePopState = (event: PopStateEvent) => {
            if (!allowNavigation && !window.location.pathname.startsWith('/customer/book')) {
                event.preventDefault();
                setPendingNavigationUrl(window.location.pathname);
                setIsCancelDialogOpen(true);
                window.history.pushState(null, '', '/customer/book/select-vehicle'); // Prevent navigation
            }
        };

        const handleLinkClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const closestAnchor = target.closest('a');
            if (closestAnchor && closestAnchor.href && !closestAnchor.href.includes('/customer/book')) {
                event.preventDefault();
                event.stopImmediatePropagation(); // Stop other event listeners
                setPendingNavigationUrl(closestAnchor.href);
                setIsCancelDialogOpen(true);
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnloadRef.current);
        window.addEventListener('popstate', handlePopState);
        document.addEventListener('click', handleLinkClick, true); // Capture phase

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnloadRef.current!);
            window.removeEventListener('popstate', handlePopState);
            document.removeEventListener('click', handleLinkClick, true);
        };
    }, [allowNavigation]);

    const toggleVehicleDetails = (vehicleId: number) => {
        setExpandedVehicleId(vehicleId === expandedVehicleId ? null : vehicleId);
    };

    const confirmSelection = () => {
        if (selectedVehicleIdLocal) {
            dispatch(setVehicleID(selectedVehicleIdLocal));
            setAllowNavigation(true);
            router.push('/customer/book/select-service');
        }
    };

    const handleCancel = () => {
        // Cancel the beforeunload event listener
        window.removeEventListener('beforeunload', handleBeforeUnloadRef.current!);

        dispatch(clearBooking());
        setIsCancelDialogOpen(false);
        if (pendingNavigationUrl) {
            setAllowNavigation(true);
            window.location.href = pendingNavigationUrl; // Use window.location.href to ensure a full reload
        } else {
            router.push('/customer/dashboard');
        }
    };

    const stayOnPage = () => {
        setIsCancelDialogOpen(false);
        setPendingNavigationUrl(null);
    };

    return (
        <div className="flex flex-col">
            <StepBar />
            <h1 className="text-2xl p-4">Select Vehicle for Service:</h1>
            <div className="flex flex-col items-center w-full">
                <div className="bg-white px-4 mt-2 mb-8 rounded max-h-[calc(66vh-200px)] overflow-y-auto">
                    {vehicles.map((vehicle) => (
                        <div
                            key={vehicle.vehicle_id}
                            className="space-y-2 cursor-pointer w-[400px] mt-3"
                        >
                            <div className="flex items-center">
                                <label className="flex items-center cursor-pointer p-4">
                                    <input
                                        type="radio"
                                        name="vehicle"
                                        checked={selectedVehicleIdLocal === vehicle.vehicle_id}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            setSelectedVehicleIdLocal(vehicle.vehicle_id);
                                        }}
                                        className="cursor-pointer"
                                    />
                                </label>
                                <div className="flex items-center flex w-[40px] h-[40px] px-1 bg-white rounded-full"
                                    onClick={() => toggleVehicleDetails(vehicle.vehicle_id)}
                                >
                                    <img
                                        src={`/car_make_logos/${vehicle.make_name.replace(/\s+/g, "_").toLowerCase()}.png`}
                                        alt={`${vehicle.make_name} logo`}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                                <div className="flex-1 ml-4" onClick={() => toggleVehicleDetails(vehicle.vehicle_id)}>
                                    <p className="text-sm font-medium leading-none">
                                        {vehicle.make_name} {vehicle.model_name}
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {vehicle.year} - {vehicle.color}
                                    </p>
                                </div>
                                <Button variant="link" size="sm" onClick={(e) => {
                                    e.stopPropagation();
                                    toggleVehicleDetails(vehicle.vehicle_id);
                                }}>
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
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <Separator className="" />
                        </div>
                    ))}
                </div>
                <div className="flex space-x-4">
                    <Button variant="customerDefault" className="w-[200px]" onClick={confirmSelection} disabled={!selectedVehicleIdLocal}>
                        Select
                    </Button>
                    <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-[200px]">Cancel</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Confirm Cancellation</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to cancel? Your booking information will not be saved.
                            </DialogDescription>
                            <DialogFooter>
                                <Button variant="outline" onClick={stayOnPage}>No, stay here</Button>
                                <Button variant="destructive" onClick={handleCancel}>Yes, cancel booking</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div >
    );
}
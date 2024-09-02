"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Vehicle } from "@/types/car";
import StepBar from "@/components/customer/book/StepBar";
import { ChevronDown, ChevronUp } from "lucide-react";
import { setTime, clearBooking } from "@/store/slices/bookingSlice";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const availableTimes = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"
];

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

const services = [
    {
        category: "Maintenance",
        services: [
            { service_id: 1, name: "Oil Change", description: "Change the engine oil and replace the oil filter.", price: "$50" },
            { service_id: 2, name: "Tire Rotation", description: "Rotate tires for even wear and tear.", price: "$30" },
            { service_id: 3, name: "Brake Inspection", description: "Inspect the brakes for wear and safety.", price: "$25" },
        ],
    },
    {
        category: "Detailing",
        services: [
            { service_id: 6, name: "Exterior Wash", description: "Complete exterior wash to remove dirt and grime.", price: "$25" },
            { service_id: 7, name: "Interior Cleaning", description: "Deep clean of the vehicle's interior surfaces.", price: "$40" },
        ],
    },
    {
        category: "Repairs",
        services: [
            { service_id: 11, name: "Brake Pad Replacement", description: "Replace worn brake pads to ensure safety.", price: "$150" },
            { service_id: 12, name: "Transmission Repair", description: "Repair or replace the vehicle's transmission.", price: "$1,500" },
        ],
    },
    {
        category: "Upgrades",
        services: [
            { service_id: 16, name: "Custom Wheels", description: "Upgrade to custom wheels and rims.", price: "$1,200" },
            { service_id: 17, name: "Sound System Upgrade", description: "Install a high-end sound system.", price: "$2,000" },
        ],
    },
];

const providers = [
    {
        provider_id: 1,
        name: "QuickFix Auto Service",
        distance: 2.5,
        starting_price: 50,
        address: "1234 Elm Street, Springfield, IL"
    },
    {
        provider_id: 2,
        name: "AutoCare Experts",
        distance: 1.8,
        starting_price: 40,
        address: "5678 Oak Street, Springfield, IL"
    },
    {
        provider_id: 3,
        name: "Elite Car Repair",
        distance: 3.2,
        starting_price: 70,
        address: "9101 Maple Avenue, Springfield, IL"
    },
    {
        provider_id: 4,
        name: "DriveSure Mechanics",
        distance: 4.5,
        starting_price: 65,
        address: "1213 Birch Lane, Springfield, IL"
    },
];

export default function SelectTimePage() {
    const [expandedInfo, setExpandedInfo] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
    const [pendingNavigationUrl, setPendingNavigationUrl] = useState<string | null>(null);
    const [allowNavigation, setAllowNavigation] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    // useRef to store the handleBeforeUnload function
    const handleBeforeUnloadRef = useRef<(event: BeforeUnloadEvent) => void>();

    // Retrieve selected vehicle, service, and provider from Redux
    const selectedVehicleId = useSelector((state: any) => state.booking.vehicleID);
    const selectedServiceId = useSelector((state: any) => state.booking.serviceID);
    const selectedProviderId = useSelector((state: any) => state.booking.providerID);
    const savedDateTime = useSelector((state: any) => state.booking.dateTime);

    // Restore previous date and time selection
    useEffect(() => {
        if (savedDateTime) {
            const restoredDate = new Date(savedDateTime.date);
            setSelectedDate(restoredDate);
            setSelectedTime(savedDateTime.time);
        } else {
            setSelectedDate(undefined);
            setSelectedTime(null);
        }
    }, [savedDateTime]);

    // Get today's date and set time to 00:00:00 to only compare the date portion
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get detailed information about the selected vehicle, service, and provider
    const selectedVehicle = vehicles.find(vehicle => vehicle.vehicle_id === selectedVehicleId);
    const selectedService = services.flatMap(category => category.services).find(service => service.service_id === selectedServiceId);
    const selectedProvider = providers.find(provider => provider.provider_id === selectedProviderId);

    const handleDateSelect = (date: Date | undefined) => {
        if (date instanceof Date && !isNaN(date.getTime())) {
            setSelectedDate(date);
        } else {
            setSelectedDate(undefined);
        }
        setSelectedTime(null); // Reset time selection when a new date is selected
    };

    const toggleInfo = (infoType: string) => {
        setExpandedInfo(expandedInfo === infoType ? null : infoType);
    };

    const confirmSelection = () => {
        if (selectedDate instanceof Date && !isNaN(selectedDate.getTime()) && selectedDate.getTime() >= today.getTime() && selectedTime) {
            dispatch(setTime({ date: selectedDate.toISOString(), time: selectedTime }));
            setAllowNavigation(true);
            router.push('/customer/book/payment');
        } else {
            console.log('You must select a valid date (today or later) and time before proceeding.');
        }
    };

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
                window.history.pushState(null, '', '/customer/book/select-time'); // Prevent navigation
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
        <div className="flex flex-col h-full w-full">
            <StepBar />
            <div className="flex flex-col items-center">
                <div className="flex flex-row h-[55vh] w-full">
                    {/* Service Info */}
                    <div className="flex-[1] p-4 max-h-[calc(55vh)] overflow-y-auto border border-r-0 border-gray-200 shadow-sm pt-6">
                        <h2 className="text-lg font-semibold mb-4">Service Information</h2>
                        <div className="space-y-3">
                            {/* Vehicle Info */}
                            {selectedVehicle && (
                                <div>
                                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleInfo('vehicle')}>
                                        <div className="flex items-center">
                                            <img
                                                src={`/car_make_logos/${selectedVehicle.make_name.replace(/\s+/g, "_").toLowerCase()}.png`}
                                                alt={`${selectedVehicle.make_name} logo`}
                                                className="h-10 w-10 object-contain"
                                            />
                                            <div className="ml-4">
                                                <p className="text-sm font-medium">{selectedVehicle.make_name} {selectedVehicle.model_name}</p>
                                                <p className="text-sm text-muted-foreground">{selectedVehicle.lisence_plate}</p>
                                            </div>
                                        </div>
                                        <Button variant="link" size="sm">
                                            {expandedInfo === 'vehicle' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </Button>
                                    </div>
                                    {expandedInfo === 'vehicle' && (
                                        <div className="p-4 bg-gray-100 rounded">
                                            <div className="flex">
                                                <p className="text-sm text-muted-foreground font-medium w-12">Year:</p>
                                                <p className="text-sm text-muted-foreground">{selectedVehicle.year}</p>
                                            </div>
                                            <div className="flex">
                                                <p className="text-sm text-muted-foreground font-medium w-12">Color:</p>
                                                <p className="text-sm text-muted-foreground">{selectedVehicle.color}</p>
                                            </div>
                                            <div className="flex">
                                                <p className="text-sm text-muted-foreground font-medium w-12">VIN:</p>
                                                <p className="text-sm text-muted-foreground">{selectedVehicle.vin}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Price Info */}
                            {selectedProvider && (
                                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleInfo('service')}>
                                    <div className="flex justify-start">
                                        <p className="text-sm font-medium w-16">Price: </p>
                                        <p className="text-sm">${`${selectedProvider.starting_price}`}</p>
                                    </div>
                                </div>
                            )}

                            {/* Service Info */}
                            {selectedService && (
                                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleInfo('service')}>
                                    <div className="flex justify-start">
                                        <p className="text-sm font-medium w-16">Service: </p>
                                        <p className="text-sm">{selectedService.name}</p>
                                    </div>
                                </div>
                            )}

                            {/* Provider Info */}
                            {selectedProvider && (
                                <div>
                                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleInfo('provider')}>
                                        <div className="flex justify-start">
                                            <p className="text-sm font-medium w-16">Provider: </p>
                                            <p className="text-sm">{selectedProvider.name}</p>
                                        </div>
                                        <Button variant="link" size="sm" className="h-5">
                                            {expandedInfo === 'provider' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </Button>
                                    </div>
                                    {expandedInfo === 'provider' && (
                                        <div className="p-4 rounded bg-gray-100">
                                            <div className="flex">
                                                <p className="text-sm text-muted-foreground font-medium w-24">Address:</p>
                                                <p className="text-sm text-muted-foreground">{selectedProvider.address}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Service Duration */}
                            <div className="flex items-center">
                                <div className="flex justify-start">
                                    <p className="text-sm font-medium w-16">Service:</p>
                                    <p className="text-sm">60 mins</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Calendar */}
                    <div className="flex-[1.3] px-4 pb-4 pt-2 flex flex-col max-h-[calc(55vh)] overflow-y-auto overflow-x-hidden border border-gray-200 shadow-sm pt-6">
                        <h2 className="text-lg font-semibold mb-4">Select Date</h2>
                        <Calendar
                            selectedDate={selectedDate}
                            onDateSelect={handleDateSelect}
                            serviceDates={[]}
                        />
                    </div>

                    {/* Time Selection */}
                    <div className="flex-[1] p-4 max-h-[calc(55vh)] overflow-y-auto border border-l-0 border-gray-200 shadow-sm pt-6">
                        <h2 className="text-lg font-semibold mb-4">Select Time</h2>
                        <div className="space-y-2 max-h-[calc(45vh)] overflow-y-auto w-full">
                            {availableTimes.map((time) => (
                                <button
                                    key={time}
                                    className={`text-center w-full text-left p-2 border rounded ${selectedTime === time ? "bg-primaryCustomer text-white" : "hover:bg-gray-100"}`}
                                    onClick={() => setSelectedTime(time)}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <Button variant="customerDefault" className="w-[200px] mt-4" onClick={confirmSelection} disabled={!(selectedDate instanceof Date && !isNaN(selectedDate.getTime()) && selectedDate.getTime() >= today.getTime()) || !selectedTime}>
                        Select
                    </Button>
                    <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-[200px] mt-4">Cancel</Button>
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
        </div>
    );
}
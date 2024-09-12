"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { setServiceID, clearBooking } from '@/store/slices/bookingSlice';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import StepBar from "@/components/customer/book/StepBar";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

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

const popularServices = [
    { service_id: 3, name: "Brake Inspection", description: "Inspect the brakes for wear and safety.", price: "$25" },
    { service_id: 7, name: "Interior Cleaning", description: "Deep clean of the vehicle's interior surfaces.", price: "$40" },
    { service_id: 12, name: "Transmission Repair", description: "Repair or replace the vehicle's transmission.", price: "$1,500" },
];

export default function SelectServicePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [selectedServiceIdLocal, setSelectedServiceIdLocal] = useState<number | null>(null);
    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
    const [pendingNavigationUrl, setPendingNavigationUrl] = useState<string | null>(null);
    const [allowNavigation, setAllowNavigation] = useState(false);
    const [showVehicleAlert, setShowVehicleAlert] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleBeforeUnloadRef = useRef<(event: BeforeUnloadEvent) => void>();

    const selectedVehicleId = useSelector((state: any) => state.booking.vehicleID);
    const selectedServiceId = useSelector((state: any) => state.booking.serviceID);

    useEffect(() => {
        if (!selectedVehicleId) {
            setShowVehicleAlert(true);
        }
    }, [selectedVehicleId]);

    useEffect(() => {
        if (selectedServiceId) {
            setSelectedServiceIdLocal(selectedServiceId);
        }
    }, [selectedServiceId]);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (!allowNavigation) {
                event.preventDefault();
                event.returnValue = ''; 
            }
        };

        handleBeforeUnloadRef.current = handleBeforeUnload;

        const handlePopState = (event: PopStateEvent) => {
            if (!allowNavigation && !window.location.pathname.startsWith('/customer/book')) {
                event.preventDefault();
                setPendingNavigationUrl(window.location.pathname);
                setIsCancelDialogOpen(true);
                window.history.pushState(null, '', '/customer/book/select-service');
            }
        };

        const handleLinkClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const closestAnchor = target.closest('a');
            if (closestAnchor && closestAnchor.href && !closestAnchor.href.includes('/customer/book')) {
                event.preventDefault();
                event.stopImmediatePropagation(); 
                setPendingNavigationUrl(closestAnchor.href);
                setIsCancelDialogOpen(true);
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnloadRef.current);
        window.addEventListener('popstate', handlePopState);
        document.addEventListener('click', handleLinkClick, true);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnloadRef.current!);
            window.removeEventListener('popstate', handlePopState);
            document.removeEventListener('click', handleLinkClick, true);
        };
    }, [allowNavigation]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredServices = searchTerm
        ? services
            .map((category) => ({
                ...category,
                services: category.services.filter(service =>
                    service.name.toLowerCase().includes(searchTerm.toLowerCase())
                ),
            }))
            .filter(category => category.services.length > 0)
        : services;

    const confirmSelection = () => {
        if (selectedServiceIdLocal) {
            dispatch(setServiceID(selectedServiceIdLocal));
            setAllowNavigation(true);
            router.push('/customer/book/select-provider');
        }
    };

    const toggleCategory = (category: string) => {
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    const handleCancel = () => {
        window.removeEventListener('beforeunload', handleBeforeUnloadRef.current!);

        dispatch(clearBooking());
        setIsCancelDialogOpen(false);
        if (pendingNavigationUrl) {
            setAllowNavigation(true);
            window.location.href = pendingNavigationUrl; 
        } else {
            router.push('/customer/dashboard');
        }
    };

    const stayOnPage = () => {
        setIsCancelDialogOpen(false);
        setPendingNavigationUrl(null);
    };

    const redirectToSelectVehicle = () => {
        setShowVehicleAlert(false);
        router.push('/customer/book/select-vehicle');
    };

    return (
        <div className="flex flex-col">
            <StepBar />
            <h1 className="text-2xl p-4">Select Service for Your Vehicle:</h1>
            <div className="flex flex-col items-center w-full">
                <div className="bg-white px-4 mt-2 mb-8 rounded w-full max-w-md max-h-[calc(66vh-200px)] overflow-y-auto">
                    <input
                        type="text"
                        placeholder="Search for a service..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="mb-4 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />

                    {!searchTerm && (
                        <>
                            <h2 className="text-lg font-semibold mb-2">Popular Services</h2>
                            <div className="mb-4">
                                {popularServices.map((service) => (
                                    <div key={service.service_id} className="flex items-center mb-3 cursor-pointer">
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="service"
                                                checked={selectedServiceIdLocal === service.service_id}
                                                onChange={() => setSelectedServiceIdLocal(service.service_id)}
                                                className="cursor-pointer"
                                            />
                                            <span className="ml-2 text-sm font-medium">{service.name}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <Separator className="my-4" />
                        </>
                    )}

                    {filteredServices.map((category) => (
                        <div key={category.category} className="w-full">
                            <div 
                                className="flex items-center justify-between cursor-pointer" 
                                onClick={() => toggleCategory(category.category)}
                            >
                                <h2 className="text-lg font-semibold my-2">{category.category}</h2>
                                {expandedCategory === category.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                            {(searchTerm || expandedCategory === category.category) && (
                                <div className="pl-4">
                                    {category.services.map((service) => (
                                        <div key={service.service_id} className="flex items-center mb-3 cursor-pointer">
                                            <label className="flex items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="service"
                                                    checked={selectedServiceIdLocal === service.service_id}
                                                    onChange={() => setSelectedServiceIdLocal(service.service_id)}
                                                    className="cursor-pointer"
                                                />
                                                <span className="ml-2 text-sm font-medium">{service.name}</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex space-x-4">
                    <Button variant="customerDefault" className="w-[200px]" onClick={confirmSelection} disabled={!selectedServiceIdLocal}>
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

            <Dialog open={showVehicleAlert} onOpenChange={setShowVehicleAlert}>
                <DialogContent>
                    <DialogTitle>Vehicle Not Selected</DialogTitle>
                    <DialogDescription>
                        You need to select a vehicle before choosing a service. You will be redirected to the vehicle selection page.
                    </DialogDescription>
                    <DialogFooter>
                        <Button onClick={redirectToSelectVehicle}>OK</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
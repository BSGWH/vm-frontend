"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { setProviderID, clearBooking } from '@/store/slices/bookingSlice';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import StepBar from "@/components/customer/book/StepBar";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

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

export default function SelectProviderPage() {
    const [sortBy, setSortBy] = useState<'price' | 'distance'>('distance');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [expandedProviderId, setExpandedProviderId] = useState<number | null>(null);
    const [selectedProviderIdLocal, setSelectedProviderIdLocal] = useState<number | null>(null);
    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
    const [pendingNavigationUrl, setPendingNavigationUrl] = useState<string | null>(null);
    const [allowNavigation, setAllowNavigation] = useState(false);
    const [showVehicleAlert, setShowVehicleAlert] = useState(false);
    const [showServiceAlert, setShowServiceAlert] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleBeforeUnloadRef = useRef<(event: BeforeUnloadEvent) => void>();

    const selectedVehicleId = useSelector((state: any) => state.booking.vehicleID);
    const selectedServiceId = useSelector((state: any) => state.booking.serviceID);
    const selectedProviderId = useSelector((state: any) => state.booking.providerID);

    useEffect(() => {
        if (!selectedVehicleId) {
            setShowVehicleAlert(true);
        } else if (!selectedServiceId) {
            setShowServiceAlert(true);
        }
    }, [selectedVehicleId, selectedServiceId]);

    useEffect(() => {
        if (selectedProviderId) {
            setSelectedProviderIdLocal(selectedProviderId);
        }
    }, [selectedProviderId]);

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
                window.history.pushState(null, '', '/customer/book/select-provider'); // Prevent navigation
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

    const handleSort = (criteria: 'price' | 'distance') => {
        if (sortBy === criteria) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(criteria);
            setSortOrder('asc');
        }
    };

    const sortedProviders = [...providers].sort((a, b) => {
        if (sortBy === 'price') {
            return sortOrder === 'asc' ? a.starting_price - b.starting_price : b.starting_price - a.starting_price;
        } else {
            return sortOrder === 'asc' ? a.distance - b.distance : b.distance - a.distance;
        }
    });

    const toggleExpand = (provider_id: number) => {
        setExpandedProviderId(prev => (prev === provider_id ? null : provider_id));
    };

    const handleProviderSelection = (provider_id: number) => {
        setSelectedProviderIdLocal(provider_id);
    };

    const confirmSelection = () => {
        if (selectedProviderIdLocal) {
            dispatch(setProviderID(selectedProviderIdLocal));
            setAllowNavigation(true);
            router.push('/customer/book/select-time');
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

    const redirectToSelectVehicle = () => {
        setShowVehicleAlert(false);
        router.push('/customer/book/select-vehicle');
    };

    const redirectToSelectService = () => {
        setShowServiceAlert(false);
        router.push('/customer/book/select-service');
    };

    return (
        <div className="flex flex-col">
            <StepBar />
            <h1 className="text-2xl p-4">Select Provider for Your Service:</h1>
            <div className="flex flex-col items-center w-full">
                <div className="bg-white px-4 mt-2 mb-8 rounded w-full max-w-lg max-h-[calc(66vh-200px)] overflow-y-auto">
                    {/* Table Header */}
                    <div className="grid grid-cols-[1fr_4fr_2fr_2fr] items-center px-2 gap-4">
                        <div className="pl-4">
                            <div className="w-[13px]"></div>
                        </div>
                        <div className="text-sm font-semibold flex justify-start">
                            <div className="max-w-[180px]">
                                Provider Name
                            </div>
                        </div>
                        <div className="text-sm font-semibold flex items-center justify-center w-[80px]">
                            Distance
                            <Button
                                variant="link"
                                size="sm"
                                className="text-muted-foreground p-0 ml-1"
                                onClick={() => handleSort('distance')}
                            >
                                {sortBy === 'distance' && sortOrder === 'asc' ? (
                                    <ChevronUp size={16} className="text-blue-500" />
                                ) : (
                                    <ChevronDown size={16} className={sortBy === 'distance' ? "text-blue-500" : ""} />
                                )}
                            </Button>
                        </div>
                        <div className="text-sm font-semibold flex justify-center">
                            <div className="flex items-center w-[50px]">
                                Price
                                <Button
                                    variant="link"
                                    size="sm"
                                    className="text-muted-foreground p-0 ml-1"
                                    onClick={() => handleSort('price')}
                                >
                                    {sortBy === 'price' && sortOrder === 'asc' ? (
                                        <ChevronUp size={16} className="text-blue-500" />
                                    ) : (
                                        <ChevronDown size={16} className={sortBy === 'price' ? "text-blue-500" : ""} />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Providers List */}
                    {sortedProviders.map((provider) => (
                        <div
                            key={provider.provider_id}
                            className="flex flex-col"
                        >
                            <div
                                className="grid grid-cols-[1fr_4fr_2fr_2fr] items-center cursor-pointer px-2 py-1 gap-4"
                                onClick={() => toggleExpand(provider.provider_id)}
                            >
                                <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                                    <label className="flex items-center cursor-pointer pl-4 py-4">
                                        <input
                                            type="radio"
                                            name="provider"
                                            checked={selectedProviderIdLocal === provider.provider_id}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                handleProviderSelection(provider.provider_id);
                                            }}
                                            className="cursor-pointer"
                                        />
                                        <span className="ml-2"></span>
                                    </label>
                                </div>
                                <div className="flex items-center text-left justify-between max-w-[180px]">
                                    <p className="text-sm font-medium leading-none">{provider.name}</p>
                                    <ChevronDown
                                        size={16}
                                        className={`ml-2 transition-transform ${expandedProviderId === provider.provider_id ? 'rotate-180' : ''}`}
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <div className="text-left w-[80px]">
                                        <p className="text-sm text-muted-foreground">{`${provider.distance} miles`}</p>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="text-left w-[50px]">
                                        <p className="text-sm text-muted-foreground">{`$${provider.starting_price}`}</p>
                                    </div>
                                </div>
                            </div>
                            <AnimatePresence>
                                {expandedProviderId === provider.provider_id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden grid grid-cols-[1fr_10fr] gap-4 px-2"
                                        style={{ willChange: "transform" }}
                                    >
                                        <div></div>
                                        <div className="pl-2 space-y-2 bg-gray-100 p-4 rounded">
                                            <div className="flex">
                                                <p className="text-sm font-medium w-20">Address:</p>
                                                <p className="text-sm">{provider.address}</p>
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
                    <Button variant="customerDefault" className="w-[200px]" onClick={confirmSelection} disabled={!selectedProviderIdLocal}>
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

            {/* Vehicle Alert Dialog */}
            <Dialog open={showVehicleAlert} onOpenChange={setShowVehicleAlert}>
                <DialogContent>
                    <DialogTitle>Vehicle Not Selected</DialogTitle>
                    <DialogDescription>
                        You need to select a vehicle before choosing a provider. You will be redirected to the vehicle selection page.
                    </DialogDescription>
                    <DialogFooter>
                        <Button onClick={redirectToSelectVehicle}>OK</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Service Alert Dialog */}
            <Dialog open={showServiceAlert} onOpenChange={setShowServiceAlert}>
                <DialogContent>
                    <DialogTitle>Service Not Selected</DialogTitle>
                    <DialogDescription>
                        You need to select a service before choosing a provider. You will be redirected to the service selection page.
                    </DialogDescription>
                    <DialogFooter>
                        <Button onClick={redirectToSelectService}>OK</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
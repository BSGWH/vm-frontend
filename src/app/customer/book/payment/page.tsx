"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import StepBar from "@/components/customer/book/StepBar";
import { clearBooking } from "@/store/slices/bookingSlice";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Vehicle } from "@/types/car";

// Use the passed data
export default function PaymentPage() {
    const router = useRouter();
    const dispatch = useDispatch();

    // Get selected vehicle, service, provider, and time from Redux
    const selectedVehicleId = useSelector((state: any) => state.booking.vehicleID);
    const selectedServiceId = useSelector((state: any) => state.booking.serviceID);
    const selectedProviderId = useSelector((state: any) => state.booking.providerID);
    const selectedDateTime = useSelector((state: any) => state.booking.dateTime);

    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
    const [pendingNavigationUrl, setPendingNavigationUrl] = useState<string | null>(null);
    const [allowNavigation, setAllowNavigation] = useState(false);

    // useRef to store the handleBeforeUnload function
    const handleBeforeUnloadRef = useRef<(event: BeforeUnloadEvent) => void>();


    const formattedDate = new Date(selectedDateTime?.date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formattedTime = selectedDateTime?.time;

    // Define static data
    const vehicles = [
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

    // Get detailed information of the vehicle, service, and provider based on ID
    const selectedVehicle = vehicles.find(vehicle => vehicle.vehicle_id === selectedVehicleId);
    const selectedService = services.flatMap(category => category.services).find(service => service.service_id === selectedServiceId);
    const selectedProvider = providers.find(provider => provider.provider_id === selectedProviderId);

    const handlePayment = () => {
        // Complete the payment logic, such as calling a payment API or redirecting to the payment success page
        setAllowNavigation(true);
        router.push('/customer/book/confirmation');
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
                window.history.pushState(null, '', '/customer/book/payment'); // Prevent navigation
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
                    {/* Order Summary */}
                    <div className="flex-[1] p-4 max-h-[calc(55vh)] overflow-y-auto shadow-sm pt-6">
                        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium">Vehicle:</p>
                                <p className="text-sm text-muted-foreground">
                                    {selectedVehicle?.make_name} {selectedVehicle?.model_name} {selectedVehicle?.year}
                                </p>
                                <p className="text-sm text-muted-foreground">{selectedVehicle?.lisence_plate}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Service:</p>
                                <p className="text-sm text-muted-foreground">{selectedService?.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Provider:</p>
                                <p className="text-sm text-muted-foreground">{selectedProvider?.name}</p>
                                <p className="text-sm text-muted-foreground">{selectedProvider?.address}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Date & Time:</p>
                                <p className="text-sm text-muted-foreground">{formattedDate}</p>
                                <p className="text-sm text-muted-foreground">{formattedTime}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Price:</p>
                                <p className="text-sm text-muted-foreground">{selectedService?.price}</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Options */}
                    <div className="flex-[1.3] px-4 pb-4 pt-6 flex flex-col justify-start max-h-[calc(55vh)] overflow-y-auto overflow-x-hidden shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input type="radio" id="credit-card" name="payment" className="mr-2" />
                                <label htmlFor="credit-card" className="text-sm font-medium">Credit Card</label>
                            </div>
                            <div className="flex items-center">
                                <input type="radio" id="paypal" name="payment" className="mr-2" />
                                <label htmlFor="paypal" className="text-sm font-medium">PayPal</label>
                            </div>
                            <div className="flex items-center">
                                <input type="radio" id="apple-pay" name="payment" className="mr-2" />
                                <label htmlFor="apple-pay" className="text-sm font-medium">Apple Pay</label>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h2 className="text-lg font-semibold mb-4">Billing Address</h2>
                            <div className="space-y-4">
                                <input type="text" placeholder="Street Address" className="w-full p-2 border rounded" />
                                <input type="text" placeholder="City" className="w-full p-2 border rounded" />
                                <input type="text" placeholder="Postal Code" className="w-full p-2 border rounded" />
                                <input type="text" placeholder="Country" className="w-full p-2 border rounded" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <Button variant="customerDefault" className="w-[200px] mt-4" onClick={handlePayment}>
                        Pay Now
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
"use client";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/navigation";
import StepBar from "@/components/customer/book/StepBar";
import { Button } from "@/components/ui/button";
import { clearBooking } from '@/store/slices/bookingSlice';

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



export default function ConfirmationPage() {
    const router = useRouter();
    const dispatch = useDispatch();

    // Get the selected vehicle, service, provider, date, and payment information from Redux
    const selectedVehicleId = useSelector((state: any) => state.booking.vehicleID);
    const selectedServiceId = useSelector((state: any) => state.booking.serviceID);
    const selectedProviderId = useSelector((state: any) => state.booking.providerID);
    const selectedDateTime = useSelector((state: any) => state.booking.dateTime);

    const formattedDate = new Date(selectedDateTime?.date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formattedTime = selectedDateTime?.time;

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

    // 根据ID获取车辆、服务和提供商的详细信息
    const selectedVehicle = vehicles.find(vehicle => vehicle.vehicle_id === selectedVehicleId);
    const selectedService = services.flatMap(category => category.services).find(service => service.service_id === selectedServiceId);
    const selectedProvider = providers.find(provider => provider.provider_id === selectedProviderId);

    const handleFinish = () => {
        dispatch(clearBooking());
        router.push('/customer/dashboard');
    }

    return (
        <div className="flex flex-col h-full w-full">
            <StepBar />
            <div className="flex flex-col items-center">
                <div className="flex flex-row h-[55vh] w-full">

                    <div className="flex-[1.3] px-4 pb-4 pt-2 flex justify-center items-center max-h-[calc(55vh)] overflow-y-auto shadow-sm">
                        <div className="text-center">
                            <h3 className="text-2xl font-medium mb-4">Thank you for your booking!</h3>
                            <Button variant="customerDefault" className="w-[200px] mt-4" onClick={handleFinish}>
                                Back to Dashboard
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-[1] p-4 max-h-[calc(55vh)] overflow-y-auto shadow-sm pt-6 items-center">
                        <div className="border border-gray-200 p-6 rounded-lg">
                            <h2 className="text-lg font-semibold mb-4">Service Information</h2>
                            <div className="space-y-3">
                                {/* Vehicle Info */}
                                {selectedVehicle && (
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm font-medium">Vehicle: </p>
                                            <p className="text-sm">{selectedVehicle.make_name} {selectedVehicle.model_name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm">{selectedVehicle.lisence_plate}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Service Info */}
                                {selectedService && (
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm font-medium">Service: </p>
                                            <p className="text-sm">{selectedService.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm">{selectedService.price}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Provider Info */}
                                {selectedProvider && (
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm font-medium">Provider: </p>
                                            <p className="text-sm">{selectedProvider.name}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Date & Time */}
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Date & Time: </p>
                                        <p className="text-sm">{formattedDate} at {formattedTime}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

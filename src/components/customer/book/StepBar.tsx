import { usePathname } from "next/navigation";
import Link from "next/link";

const steps = [
    { label: "Select Vehicle", path: "/customer/book/select-vehicle" },
    { label: "Select Service", path: "/customer/book/select-service" },
    { label: "Select Provider", path: "/customer/book/select-provider" },
    { label: "Select Time", path: "/customer/book/select-time" },
    { label: "Payment", path: "/customer/book/payment" },
    { label: "Confirmation", path: "/customer/book/confirmation" }
];

export default function StepBar() {
    const pathname = usePathname();
    const currentStepIndex = steps.findIndex(s => s.path === pathname);

    return (
        <div className="flex justify-between items-center text-sm relative">
            {steps.map((step, index) => (
                <div 
                    key={index} 
                    className="flex-1 relative"
                    style={{
                        marginLeft: index !== 0 ? '-16px' : '0',
                    }}
                >
                    <div className={`flex items-center justify-center text-white h-8 px-4 ${index <= currentStepIndex ? "bg-primaryCustomer" : "bg-gray-300"} relative z-10`}
                        style={{
                            clipPath: index === 0
                                ? "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)"
                                : index === steps.length - 1
                                    ? "polygon(0 0, 10% 50%, 0 100%, 100% 100%, 100% 0%)"
                                    : "polygon(0 0, 10% 50%, 0 100%, 90% 100%, 100% 50%, 90% 0 )"
                        }}>
                        {index <= currentStepIndex ? (
                            <Link href={step.path} passHref>
                                <p className={`cursor-pointer ${pathname === step.path ? "text-white font-bold" : "text-white"}`}>
                                    {step.label}
                                </p>
                            </Link>
                        ) : (
                            <p className="cursor-not-allowed text-white">
                                {step.label}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

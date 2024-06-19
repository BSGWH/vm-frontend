import { Service } from "@/types/service";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ServiceCardProps {
  service: Service;
}

const VehicleCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Link href={`services/${service.service_id}`}>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full py-6 pl-6 pr-4 hover:bg-accent hover:text-accent-foreground transparent">
        <div className="flex-col p-6 space-y-1 flex md:flex-row gap-12 items-center justify-between">
          <div className="grow">
            <div className="grid grid-cols-1 justify-items-center md:justify-items-start lg:grid-cols-2 xl:grid-cols-3 gap-y-4 md:max-w-[500px] xl:max-w-[750px] gap-y-4">
              <div className="text-lg font-semibold">
                Vehicle:&nbsp;
                <span className="font-normal">{service.vehicle}</span>
              </div>
              <div className="text-lg font-semibold">
                Service Type:&nbsp;
                <span className="font-normal">{service.service_type}</span>
              </div>
              <div className="text-lg font-semibold">
                Provider:&nbsp;
                <span className="font-normal">{service.provider}</span>
              </div>
              <div className="text-lg font-semibold">
                Service Date:&nbsp;
                <span className="font-normal">{service.service_date}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-x-4 justify-self-end">
            <ChevronRightIcon className="h-4 w-4 hidden md:block" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;

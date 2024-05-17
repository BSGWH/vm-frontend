import { Vehicle } from "@/types/car";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <Link href={`vehicles/${vehicle.vehicle_id}`}>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full py-6 pl-6 pr-4 hover:bg-accent hover:text-accent-foreground transparent">
        <div className="flex-col p-6 space-y-1 flex md:flex-row gap-8 items-center justify-between">
          <div className="flex items-center flex w-[64px] h-[64px]  px-1 bg-white rounded-full">
            <img
              src="/car_make_logos/toyota-logo-2020-europe-download.png"
              alt="Description"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="grow">
            <div className="grid grid-cols-1 justify-items-center md:justify-items-start lg:grid-cols-2 xl:grid-cols-3 gap-y-4 md:max-w-[500px] xl:max-w-[750px] gap-y-4">
              <div className="text-lg font-semibold">
                Make:&nbsp;
                <span className="font-normal">{vehicle.make_name}</span>
              </div>
              <div className="text-lg font-semibold">
                Model:&nbsp;
                <span className="font-normal">{vehicle.model_name}</span>
              </div>
              <div className="text-lg font-semibold">
                Color:&nbsp;
                <span className="font-normal">{vehicle.color}</span>
              </div>
              <div className="text-lg font-semibold">
                License Plate:&nbsp;
                <span className="font-normal">{vehicle.lisence_plate}</span>
              </div>
              <div className="text-lg font-semibold">
                Year:&nbsp;
                <span className="font-normal">{vehicle.year}</span>
              </div>
              <div className="text-lg font-semibold">
                VIN:&nbsp;
                <span className="font-normal">{vehicle.vin}</span>
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

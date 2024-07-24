import { NormalOperationTime } from "@/components/providerComponents/providerProfile/NormalOperationTime";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function OperationsPage() {
  return (
    <div className="flex-1 space-y-4 px-4 md:px-8">
      <NormalOperationTime />
    </div>
  );
}

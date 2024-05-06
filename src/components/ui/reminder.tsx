
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Reminder() {
  return (
    <div className="space-y-8">

      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>Ford</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Oil Change for Ford Explorer</p>
          <p className="text-sm text-muted-foreground">
          Auto Zone, Aurora Ave, Boston
          </p>
        </div>
        <div className="ml-auto font-medium">
            <p className="text-sm font-medium leading-none">Monday</p>
            <p className="text-sm text-muted-foreground">9:30 am</p>
        </div>
      </div>

      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarFallback>Ford</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Brake Pad Replacement for Toyota Camry</p>
          <p className="text-sm text-muted-foreground">Manny's Auto Repair, Main Street, Los Angeles</p>
        </div>
        <div className="ml-auto font-medium">
            <p className="text-sm font-medium leading-none">Monday</p>
            <p className="text-sm text-muted-foreground">11:00 am</p>
        </div>
      </div>

      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>Ford</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Tire Rotation for Chevrolet Silverado</p>
          <p className="text-sm text-muted-foreground">
          Speedy Lube, Elm Street, Chicago
          </p>
        </div>
        <div className="ml-auto font-medium">
            <p className="text-sm font-medium leading-none">Monday</p>
            <p className="text-sm text-muted-foreground">12:00 pm</p>
        </div>
      </div>

      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>Ford</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Oil Change for Ford Explorer</p>
          <p className="text-sm text-muted-foreground">
          Auto Zone, Aurora Ave, Boston
          </p>
        </div>
        <div className="ml-auto font-medium">
            <p className="text-sm font-medium leading-none">Tuesday</p>
            <p className="text-sm text-muted-foreground">11:00 am</p>
        </div>
      </div>

      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarFallback>Ford</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Brake Pad Replacement for Toyota Camry</p>
          <p className="text-sm text-muted-foreground">Manny's Auto Repair, Main Street, Los Angeles</p>
        </div>
        <div className="ml-auto font-medium">
            <p className="text-sm font-medium leading-none">Tuesday</p>
            <p className="text-sm text-muted-foreground">11:00 am</p>
        </div>
      </div>
    </div>
  );
}

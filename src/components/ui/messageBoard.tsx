
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function MessageBoard() {
  return (
    <div className="space-y-8">

      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">BOSTON AUTO PARTNERS</p>
          <p className="text-sm text-muted-foreground">
          Thank you for choosing us!
          </p>
          <p className="text-xs text-muted-foreground">
          3 minutes ago
          </p>
        </div>
        <div className="ml-auto font-medium">
            <button className="text-sm font-medium leading-none">Reply</button>
        </div>
      </div>

      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">ABC REPAIR SHOP</p>
          <p className="text-sm text-muted-foreground">
          Our next available time for tire rotation is 10:00 AM.
          </p>
          <p className="text-xs text-muted-foreground">
          54 minutes ago
          </p>
        </div>
        
        <div className="ml-auto font-medium">
            <button className="text-sm font-medium leading-none">Reply</button>
        </div>
      </div>

      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">AUTO ZONE</p>
          <p className="text-sm text-muted-foreground">
          We're delighted to hear that you're impressed with the quality of our work!
          </p>
          <p className="text-xs text-muted-foreground">
          3 hours ago
          </p>
        </div>
        <div className="ml-auto font-medium">
        <button className="text-sm font-medium leading-none">Reply</button>
        </div>
      </div>

    </div>
  );
}



import * as React from "react";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CollapsibleHeaderProps {
  title: string;
  children: React.ReactNode;
}

export default function CollapsibleHeader({ title, children }: CollapsibleHeaderProps) {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className=""
    >
      <div className="border-b-2 bg-card text-card-foreground w-full p-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            {title}
          </h3>
          <CollapsibleTrigger asChild>
            {isOpen ? (
              <RemoveCircleOutlineIcon className="w-6 h-6 text-muted-foreground cursor-pointer" />
            ) : (
              <AddCircleOutlineIcon className="w-6 h-6 text-muted-foreground cursor-pointer" />
            )}
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          {children}
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

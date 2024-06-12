"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ProviderDashboardSidebarNav } from "./ProviderDashboardSidebarNav";

import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { providerNavItems } from "@/data/nav_data";

export function ProviderMobileSidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Overview
              </h2>
              <div className="space-y-1">
                <ProviderDashboardSidebarNav items={providerNavItems} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

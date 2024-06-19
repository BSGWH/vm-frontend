"use client";
import * as React from "react";
import CollapsibleHeader from "./CollapsibleHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VehicleServices() {

  return (
    <CollapsibleHeader title="Service">
      <div className="py-6">
				No service history
      </div>
			<Button>
        <Link href="">Book a service</Link>
      </Button>
    </CollapsibleHeader>
  );
}

"use client";
import * as React from "react";
import CollapsibleHeader from "./CollapsibleHeader";

export default function VehicleOverview() {

  return (
    <CollapsibleHeader title="Overview ">
      <div className="pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 py-2 max-w-[500px] lg:max-w-[1000px]">
          <div className="grid grid-cols-2 py-2  ">
            <div className="font-semibold">Make</div>
            <div className="font-light text-muted-foreground">Ford</div>
          </div>
          <div className="grid grid-cols-2 py-2 ">
            <div className="font-semibold">Model</div>
            <div className="font-light text-muted-foreground">Explorer</div>
          </div>
          <div className="grid grid-cols-2 py-2 ">
            <div className="font-semibold">Year</div>
            <div className="font-light text-muted-foreground">2023</div>
          </div>
          <div className="grid grid-cols-2 py-2 ">
            <div className="font-semibold">Color</div>
            <div className="font-light text-muted-foreground">White</div>
          </div>
          <div className="grid grid-cols-2 py-2 ">
            <div className="font-semibold">Lisence Plate</div>
            <div className="font-light text-muted-foreground">DEF456</div>
          </div>
          <div className="grid grid-cols-2 py-2">
            <div className="font-semibold">VIN</div>
            <div className="font-light text-muted-foreground">
              2HJHK234HB843901
            </div>
          </div>
        </div>
      </div>
    </CollapsibleHeader>
  );
}

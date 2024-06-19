"use client";
import * as React from "react";
import CollapsibleHeader from "./CollapsibleHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VehicleDocuments() {
  return (
    <CollapsibleHeader title="Document">
      <div className="py-6">No documents</div>
      <Button>
        <Link href="">Add a document</Link>
      </Button>
    </CollapsibleHeader>
  );
}

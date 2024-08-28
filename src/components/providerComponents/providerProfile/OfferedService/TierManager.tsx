import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tier } from "./types";
import TierInputs from "./TierInputs";

const TierManager: React.FC = () => {
  const [isMultipleTiers, setIsMultipleTiers] = useState(false);
  const [tiers, setTiers] = useState<Tier[]>([
    { name: "", price: "", hours: "0", minutes: "00", description: "" },
  ]);

  const addTier = () => {
    setTiers([
      ...tiers,
      { name: "", price: "", hours: "0", minutes: "00", description: "" },
    ]);
    console.log(tiers);
  };

  const updateTier = (index: number, field: keyof Tier, value: string) => {
    const newTiers = [...tiers];
    newTiers[index] = { ...newTiers[index], [field]: value };
    setTiers(newTiers);
  };

  return (
    <div className="flex flex-col space-y-3">
      <h3 className="text-slate-500">
        {isMultipleTiers
          ? "You can add multiple tiers for your service. Tier 1 will be your default service tier."
          : "This is your single service tier."}
      </h3>
      <div className="flex items-center space-x-2 mb-4">
        <Switch
          id="multiple-tiers"
          checked={isMultipleTiers}
          onCheckedChange={setIsMultipleTiers}
        />
        <Label htmlFor="multiple-tiers">Enable multiple tiers</Label>
      </div>
      {tiers.map((tier, index) => (
        <TierInputs
          key={index}
          tier={tier}
          index={index}
          isMultipleTiers={isMultipleTiers}
          updateTier={updateTier}
        />
      ))}
      {isMultipleTiers && (
        <Button onClick={addTier} variant="outline" className="mt-4">
          + Add another tier
        </Button>
      )}
    </div>
  );
};

export default TierManager;

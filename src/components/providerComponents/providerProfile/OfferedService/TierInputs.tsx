import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tier } from "./types";

interface TierInputsProps {
  tier: Tier;
  index: number;
  isMultipleTiers: boolean;
  updateTier: (index: number, field: keyof Tier, value: string) => void;
}

const TierInputs: React.FC<TierInputsProps> = ({
  tier,
  index,
  isMultipleTiers,
  updateTier,
}) => {
  const hourOptions = Array.from({ length: 7 }, (_, i) => i.toString());
  const minuteOptions = ["00", "15", "30", "45"];

  return (
    <div className="px-2 flex flex-col space-y-3 mt-4">
      {isMultipleTiers && (
        <>
          <p className="text-lg font-bold">Tier {index + 1}</p>
          <div>
            <Label htmlFor={`tier-${index}-name`}>Tier Name</Label>
            <Input
              id={`tier-${index}-name`}
              type="text"
              placeholder="Enter your tier name"
              className="mt-1"
              value={tier.name}
              onChange={(e) => updateTier(index, "name", e.target.value)}
            />
          </div>
        </>
      )}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <div className="w-[200px]">
          <Label htmlFor={`tier-${index}-price`}>Price</Label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <Input
              type="text"
              id={`tier-${index}-price`}
              className="pl-7 pr-4 mt-1"
              placeholder="0.00"
              value={tier.price}
              onChange={(e) => updateTier(index, "price", e.target.value)}
            />
          </div>
        </div>
        <div>
          <Label htmlFor={`tier-${index}-duration`}>Duration</Label>
          <div className="flex flex-row mt-1">
            <Select
              value={tier.hours}
              onValueChange={(value) => updateTier(index, "hours", value)}
            >
              <SelectTrigger className="w-[100px] mr-1">
                <SelectValue placeholder="Hours" />
              </SelectTrigger>
              <SelectContent>
                {hourOptions.map((h) => (
                  <SelectItem key={h} value={h}>
                    {h} hr{h !== "1" ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={tier.minutes}
              onValueChange={(value) => updateTier(index, "minutes", value)}
              disabled={tier.hours === "6"}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Minutes" />
              </SelectTrigger>
              <SelectContent>
                {minuteOptions.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m} min
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div>
        <Label htmlFor={`tier-${index}-description`}>
          Description (optional)
        </Label>
        <Textarea
          id={`tier-${index}-description`}
          placeholder="Enter your description"
          className="mt-1"
          value={tier.description}
          onChange={(e) => updateTier(index, "description", e.target.value)}
        />
      </div>
    </div>
  );
};

export default TierInputs;

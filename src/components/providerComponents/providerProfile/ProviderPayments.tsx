"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

export function ProviderPayments() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSetupPayment = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/provider/profile/payments");

      // Access the URL from the account_link object
      const setupUrl = response.data.account_link?.url;

      if (setupUrl) {
        window.open(setupUrl, "_blank");
      } else {
        console.error("Setup URL not found in the response");
        // Handle the case where the URL is not present
      }
    } catch (error) {
      console.error("Error setting up payment:", error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center mt-6 mb-2">
        <p className="text-lg font-bold">Payment setting</p>
      </div>
      <Separator />
      <Button
        variant="providerDefault"
        className="mt-5"
        onClick={handleSetupPayment}
        disabled={isLoading}
      >
        {isLoading ? "Setting up..." : "Set up payment"}
      </Button>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import EditIcon from "@mui/icons-material/Edit";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";
import ProviderAddressAutocomplete from "@/components/features/ProviderAddressAutocomplete";

interface AddressInfo {
  street_address_one: string;
  street_address_two: string;
  city: string;
  state: string;
  zip: string;
}

export function AddressInfo() {
  const [addressInfo, setAddressInfo] = useState<AddressInfo>({
    street_address_one: "No data",
    street_address_two: "No data",
    city: "No data",
    state: "No data",
    zip: "No data",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalInfo, setOriginalInfo] = useState<AddressInfo>({
    street_address_one: "No data",
    street_address_two: "No data",
    city: "No data",
    state: "No data",
    zip: "No data",
  });

  useEffect(() => {
    const fetchAddressInfo = async () => {
      try {
        const response = await axios.get("/api/provider/profile/address-info");
        const newInfo = {
          street_address_one: response.data.street_address_one,
          street_address_two: response.data.street_address_two,
          city: response.data.city,
          state: response.data.state,
          zip: response.data.zip,
        };
        setAddressInfo(newInfo);
        setOriginalInfo(newInfo);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching address info:", error);
        setIsLoading(false);
      }
    };
    fetchAddressInfo();
  }, []);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    const updatedInfo = { ...addressInfo, [name]: value };
    setAddressInfo(updatedInfo);
    setHasChanges(JSON.stringify(updatedInfo) !== JSON.stringify(originalInfo));
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setHasChanges(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setAddressInfo(originalInfo);
    setHasChanges(false);
  };

  const handleSaveClick = async () => {
    setIsSaving(true);
    console.log("Saving address info:", addressInfo);
    try {
      await axios.patch("/api/provider/profile/address-info", addressInfo);
      setOriginalInfo(addressInfo);
      setHasChanges(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving address info:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const renderAddressInput = (
    label: string,
    name: keyof AddressInfo,
    placeholder?: string
  ) => {
    const isDisabledField = ["city", "state", "zip"].includes(name);

    return (
      <div className="flex flex-row items-center py-4 px-1 h-16">
        <div className="w-1/3">
          <p className="font-medium text-sm">{label}</p>
        </div>
        <div className="w-2/3">
          {isLoading ? (
            <Spinner size="xs" />
          ) : name === "street_address_one" ? (
            <ProviderAddressAutocomplete
              value={addressInfo}
              onChange={(newAddress: Partial<AddressInfo>) => {
                if (isEditing) {
                  console.log("Selected address:", newAddress);
                  const updatedInfo = {
                    ...addressInfo,
                    ...newAddress,
                  };
                  setAddressInfo(updatedInfo);
                  setHasChanges(
                    JSON.stringify(updatedInfo) !== JSON.stringify(originalInfo)
                  );
                }
              }}
              className={`w-2/3 text-sm bg-transparent h-8 px-2 border ${
                isEditing ? "border-gray-300 rounded-md" : "border-transparent"
              }`}
              disabled={!isEditing}
            />
          ) : isDisabledField ? (
            <p className="text-sm px-2">{addressInfo[name]}</p>
          ) : (
            <input
              type="text"
              name={name}
              value={addressInfo[name]}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder={placeholder}
              className={`w-1/3 text-sm bg-transparent h-8 px-2 border ${
                isEditing ? "border-gray-300 rounded-md" : "border-transparent"
              }`}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center mt-10 mb-2">
        <p className="text-lg font-bold">Company Address</p>
        {isEditing ? (
          <div className="flex space-x-2">
            <Button variant="outline" size="xs" onClick={handleCancelClick}>
              Cancel
            </Button>
            <Button
              variant="providerDefault"
              size="xs"
              onClick={handleSaveClick}
              className={`${
                hasChanges ? "opacity-100" : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!hasChanges || isSaving}
            >
              {isSaving ? (
                <>
                  <Spinner size="xs" className="mr-2" />
                  Save
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="xs" onClick={handleEditClick}>
            Edit
            <EditIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <div className="py-2">
        {renderAddressInput("Address Line 1", "street_address_one")}
        {renderAddressInput(
          "Address Line 2",
          "street_address_two",
          "Apt, suite, unit, building, floor, etc."
        )}
        {renderAddressInput("City", "city")}
        {renderAddressInput("State", "state")}
        {renderAddressInput("ZIP Code", "zip")}
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import EditIcon from "@mui/icons-material/Edit";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";

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
        console.error("Error fetching business info:", error);
        setIsLoading(false);
      }
    };
    fetchAddressInfo();
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  // Loading for data fetching
  const [isLoading, setIsLoading] = useState(true);
  // Loading for save operation
  const [isSaving, setIsSaving] = useState(false);
  // HasChange is to detect whether there are changes made
  const [hasChanges, setHasChanges] = useState(false);

  const [originalInfo, setOriginalInfo] = useState<AddressInfo>({
    street_address_one: "No data",
    street_address_two: "No data",
    city: "No data",
    state: "No data",
    zip: "No data",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedInfo = { ...addressInfo, [name]: value };

    setAddressInfo(updatedInfo);
    setHasChanges(
      updatedInfo.street_address_one !== originalInfo.street_address_one ||
        updatedInfo.street_address_two !== originalInfo.street_address_two ||
        updatedInfo.city !== originalInfo.city ||
        updatedInfo.state !== originalInfo.state ||
        updatedInfo.zip !== originalInfo.zip
    );
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
  const renderInfoRow = (
    label: string,
    value: string,
    name: keyof AddressInfo
  ) => (
    <div className="flex flex-row items-center py-4 px-1 h-16">
      <div className="w-1/3">
        <p className="font-medium text-sm">{label}</p>
      </div>
      <div className="w-2/3">
        {isLoading ? (
          <Spinner size="xs" />
        ) : (
          <input
            type="text"
            name={name}
            value={value}
            className={`text-sm bg-transparent h-8 px-2 border ${
              isEditing ? "border-gray-300 rounded-md" : "border-transparent"
            }`}
          />
        )}
      </div>
    </div>
  );

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
              // onClick={handleSaveClick}
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
        {renderInfoRow(
          "Address Line 1",
          addressInfo.street_address_one,
          "street_address_one"
        )}
        {renderInfoRow(
          "Address Line 2",
          addressInfo.street_address_two,
          "street_address_two"
        )}
        {renderInfoRow("City", addressInfo.city, "city")}
        {renderInfoRow("State", addressInfo.state, "state")}
        {renderInfoRow("ZIP Code", addressInfo.zip, "zip")}
      </div>
    </div>
  );
}

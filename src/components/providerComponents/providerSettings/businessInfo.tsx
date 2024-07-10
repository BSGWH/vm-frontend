"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import EditIcon from "@mui/icons-material/Edit";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";

interface BusinessInfo {
  companyName: string;
  phoneNumber: string;
  yoe: string;
}

export function BusinessInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    companyName: "",
    phoneNumber: "",
    yoe: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        const response = await axios.get("/api/business-info");
        setBusinessInfo({
          companyName: response.data.company_name,
          phoneNumber: response.data.phone_number,
          yoe: response.data.year_of_experience,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching business info:", error);
        setIsLoading(false);
      }
    };
    fetchBusinessInfo();
  }, []);

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => setIsEditing(false);

  const handleSaveClick = async () => {
    try {
      await axios.put("/api/business-info", {
        company_name: businessInfo.companyName,
        phone_number: businessInfo.phoneNumber,
        year_of_experience: businessInfo.yoe,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving business info:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusinessInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const renderInfoRow = (
    label: string,
    value: string,
    name: keyof BusinessInfo
  ) => (
    <div className="flex flex-row py-4 px-2">
      <div className="w-1/3">
        <p className="font-medium text-sm">{label}</p>
      </div>
      <div className="w-2/3">
        {isLoading ? (
          <Spinner size="xs" />
        ) : isEditing ? (
          <input
            type="text"
            name={name}
            value={value}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2"
          />
        ) : (
          <p className="text-sm">{value}</p>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex flex-row justify-between items-center mt-10 mb-2">
        <p className="text-lg font-bold">Company Information</p>
        {isEditing ? (
          <div className="flex space-x-2">
            <Button variant="outline" size="xs" onClick={handleCancelClick}>
              Cancel
            </Button>
            <Button
              variant="providerDefault"
              size="xs"
              onClick={handleSaveClick}
            >
              Save
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
        {renderInfoRow("Company Name", businessInfo.companyName, "companyName")}
        {renderInfoRow("Phone Number", businessInfo.phoneNumber, "phoneNumber")}
        {renderInfoRow("Year of Experience", businessInfo.yoe, "yoe")}
      </div>
    </div>
  );
}

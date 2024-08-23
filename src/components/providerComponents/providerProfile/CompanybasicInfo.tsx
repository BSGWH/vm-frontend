"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import EditIcon from "@mui/icons-material/Edit";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";

// Interface for BusinessInfo
interface BusinessInfo {
  companyName: string;
  phoneNumber: string;
  yoe: string;
}

export function CompanyBasicInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    companyName: "No Data",
    phoneNumber: "No Data",
    yoe: "No Data",
  });

  // Loading for data fetching
  const [isLoading, setIsLoading] = useState(true);

  // Loading for save operation
  const [isSaving, setIsSaving] = useState(false);

  // HasChange is to detect whether there are changes made
  const [hasChanges, setHasChanges] = useState(false);
  // Without originalInfo, we would face several issues:
  // We couldn't accurately revert changes on cancel.
  // We'd have difficulty determining if actual changes were made versus just focusing on an input without changing its value.
  const [dataExists, setDataExists] = useState(false);

  const [originalInfo, setOriginalInfo] = useState<BusinessInfo>({
    companyName: "No Data",
    phoneNumber: "No Data",
    yoe: "No Data",
  });

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        const response = await axios.get("/api/provider/profile/company-info");
        const newInfo = {
          companyName: response.data.company_name || "",
          phoneNumber: response.data.phone_number || "",
          yoe: response.data.year_of_experience || "",
        };
        setBusinessInfo(newInfo);
        setOriginalInfo(newInfo);
        setDataExists(
          response.data.company_name !== null &&
            response.data.company_name !== undefined
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching business info:", error);
        setIsLoading(false);
      }
    };
    fetchBusinessInfo();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setHasChanges(false);
  };
  const handleCancelClick = () => {
    setIsEditing(false);
    setBusinessInfo(originalInfo);
    setHasChanges(false);
  };

  const handleSaveClick = async () => {
    setIsSaving(true);
    try {
      const endpoint = "/api/provider/profile/company-info";
      const method = dataExists ? "patch" : "post";
      const data = {
        company_name: businessInfo.companyName,
        phone_number: businessInfo.phoneNumber,
        year_of_experience: businessInfo.yoe,
      };

      await axios[method](endpoint, data);

      setOriginalInfo(businessInfo);
      setHasChanges(false);
      setIsEditing(false);
      setDataExists(true); // Set to true after successful save
    } catch (error) {
      console.error("Error saving business info:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedInfo = { ...businessInfo, [name]: value };

    setBusinessInfo(updatedInfo);
    setHasChanges(
      updatedInfo.companyName !== originalInfo.companyName ||
        updatedInfo.phoneNumber !== originalInfo.phoneNumber ||
        updatedInfo.yoe !== originalInfo.yoe
    );
  };

  const renderInfoRow = (
    label: string,
    value: string,
    name: keyof BusinessInfo,
    placeholder: string
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
            onChange={handleChange}
            disabled={!isEditing}
            placeholder={placeholder}
            className={`w-1/3 text-sm bg-transparent h-8 px-2 border ${
              isEditing ? "border-gray-500 rounded-md" : "border-transparent"
            }`}
          />
        )}
      </div>
    </div>
  );

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isEditing ? "bg-gray-100 rounded-lg p-4" : ""
      }`}
    >
      <div className="flex flex-row justify-between items-center">
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
      <Separator
        className={`mt-2 ${isEditing ? "bg-gray-500" : "bg-gray-200"}`}
      />
      <div className="py-2">
        {renderInfoRow(
          "Company Name",
          businessInfo.companyName,
          "companyName",
          "Enter company name"
        )}
        {renderInfoRow(
          "Phone Number",
          businessInfo.phoneNumber,
          "phoneNumber",
          "Enter phone number"
        )}
        {renderInfoRow(
          "Year of Experience",
          businessInfo.yoe,
          "yoe",
          "Enter years of experience"
        )}
      </div>
    </div>
  );
}

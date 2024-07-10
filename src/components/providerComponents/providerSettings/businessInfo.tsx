"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import EditIcon from "@mui/icons-material/Edit";
import { Separator } from "@/components/ui/separator";
import axios from "axios";

export function BusinessInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [yoe, setYoe] = useState("");

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        const response = await axios.get("/api/business-info");
        setCompanyName(response.data.company_name);
        setPhoneNumber(response.data.phone_number);
        setYoe(response.data.year_of_experience);
      } catch (error) {
        console.error("Error fetching business info:", error);
      }
    };
    fetchBusinessInfo();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    // Add your save logic here
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center mt-10 mb-2">
        <p className="text-lg font-medium">Company Information</p>
        {isEditing ? (
          <div className="flex space-x-2">
            <Button variant={"outline"} size="xs" onClick={handleCancelClick}>
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
          <Button variant={"outline"} size="xs" onClick={handleEditClick}>
            Edit
            <EditIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <div className="py-2">
        <div className="flex flex-row py-4 px-2">
          <div className="w-1/3">
            <p className="font-semibold text-sm">Company Name</p>
          </div>
          <div className="w-2/3">
            <p className="text-sm">{companyName}</p>
          </div>
        </div>
        <div className="flex flex-row py-4 px-2">
          <div className="w-1/3">
            <p className="font-semibold text-sm">Phone Number</p>
          </div>
          <div className="w-2/3">
            <p className="text-sm">{phoneNumber}</p>
          </div>
        </div>
        <div className="flex flex-row py-4 px-2">
          <div className="w-1/3">
            <p className="font-semibold text-sm">Year of Experience</p>
          </div>
          <div className="w-2/3">
            <p className="text-sm">{yoe}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

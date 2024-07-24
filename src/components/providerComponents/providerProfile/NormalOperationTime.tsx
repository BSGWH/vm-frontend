"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import EditIcon from "@mui/icons-material/Edit";
import { Switch } from "@/components/ui/switch";
import { SwitchCamera } from "lucide-react";

interface OperationTime {
  id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
  is_closed: boolean;
}

// Formatting time to apply to US convention
const formatTime = (time: string | null | undefined) => {
  if (!time) return "No data";
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

export function NormalOperationTime() {
  const [isEditing, setIsEditing] = useState(false);
  const [operationTimes, setOperationTimes] = useState<OperationTime[]>([]);
  const [originalTimes, setOriginalTimes] = useState<OperationTime[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const daysOfWeek: Array<
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
  > = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const sortAndFillOperationTimes = (
    data: OperationTime[]
  ): OperationTime[] => {
    const dataMap = new Map(
      data.map((item) => [item?.day_of_week.toLowerCase(), item])
    );

    const filledData = daysOfWeek.map((day) => {
      return (
        dataMap.get(day.toLowerCase()) || {
          id: 0, // or any appropriate default ID
          day_of_week: day,
          start_time: "",
          end_time: "",
          is_closed: true,
        }
      );
    });

    return filledData;
  };

  useEffect(() => {
    const fetchOperationTimes = async () => {
      try {
        const response = await axios.get(
          "/api/provider/profile/normal-operation-times"
        );
        const sortedAndFilledTimes = sortAndFillOperationTimes(response.data);
        setOperationTimes(sortedAndFilledTimes);
        setOriginalTimes(sortedAndFilledTimes);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching operation times:", error);
        setIsLoading(false);
      }
    };
    fetchOperationTimes();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setHasChanges(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setOperationTimes(originalTimes);
    setHasChanges(false);
  };

  const handleSaveClick = async () => {
    setIsSaving(true);
    try {
      const dataToSend = operationTimes.map((time) => ({
        ...time,
        start_time: time.is_closed ? "" : time.start_time,
        end_time: time.is_closed ? "" : time.end_time,
      }));
      await axios.patch("/api/provider/profile/normal-operation-times", {
        providers_availabilities: dataToSend,
      });
      setOriginalTimes(operationTimes);
      setHasChanges(false);
      setIsEditing(false);
      console.log(dataToSend);
    } catch (error) {
      console.error("Error saving operation times:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (
    index: number,
    field: keyof OperationTime,
    value: string | boolean
  ) => {
    const updatedTimes = [...operationTimes];

    if (field === "is_closed") {
      updatedTimes[index] = {
        ...updatedTimes[index],
        is_closed: value as boolean,
        // Keep the existing times even when closed
        start_time: updatedTimes[index].start_time,
        end_time: updatedTimes[index].end_time,
      };
    } else {
      updatedTimes[index] = { ...updatedTimes[index], [field]: value };
    }

    setOperationTimes(updatedTimes);
    setHasChanges(
      JSON.stringify(updatedTimes) !== JSON.stringify(originalTimes)
    );
  };

  const renderTimeRow = (
    day: string,
    time: OperationTime | null,
    index: number
  ) => (
    <div className="flex flex-row items-center py-2 px-1 h-16" key={day}>
      <div className="w-1/3">
        <p className="font-medium text-sm">{day}</p>
      </div>
      <div className="w-2/3">
        {isLoading ? (
          <Spinner size="xs" />
        ) : isEditing ? (
          <div className="grid grid-cols-3 gap-4 items-center w-full p-4 ">
            <input
              type="time"
              value={time?.start_time || ""}
              onChange={(e) =>
                handleChange(index, "start_time", e.target.value)
              }
              className={`w-full text-sm bg-white h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                time?.is_closed ? "text-gray-400" : ""
              }`}
              disabled={time?.is_closed}
            />
            <input
              type="time"
              value={time?.end_time || ""}
              onChange={(e) => handleChange(index, "end_time", e.target.value)}
              className={`w-full text-sm bg-white h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                time?.is_closed ? "text-gray-400" : ""
              }`}
              disabled={time?.is_closed}
            />
            <div className="flex items-center justify-center space-x-2">
              <Switch
                checked={time?.is_closed}
                onCheckedChange={(checked) =>
                  handleChange(index, "is_closed", checked)
                }
                id={`closed-switch-${index}`}
              />
              <label
                htmlFor={`closed-switch-${index}`}
                className="text-sm font-medium text-gray-900 cursor-pointer"
              >
                Closed
              </label>
            </div>
          </div>
        ) : (
          <p className={`text-sm`}>
            {time === null
              ? "No data"
              : time.is_closed
              ? `Closed`
              : `${formatTime(time.start_time)} - ${formatTime(time.end_time)}`}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex flex-row justify-between items-center mt-6 mb-2">
        <p className="text-lg font-bold">Opening Hours</p>
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
      <div>
        {daysOfWeek.map((day, index) =>
          renderTimeRow(day, operationTimes[index], index)
        )}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ServiceQuestion } from "./types";
import TierManager from "./TierManager";
import axios from "axios";
interface QuestionRendererProps {
  question: ServiceQuestion;
  index: number;
  service: any;
  provider_service_id: number;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  index,
  service,
  provider_service_id,
}) => {
  const [isMobile, setIsMobile] = useState(service.is_mobile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckboxChange = async (checked: boolean) => {
    setLoading(true);
    setError(null);
    setIsMobile(checked);
    try {
      await axios.patch(
        `/api/provider/profile/offered-service/mobile-service`,
        {
          id: provider_service_id,
          is_mobile: checked,
        }
      );
      console.log("Backend updated successfully");
    } catch (error) {
      console.error("Error updating backend:", error);
      setIsMobile(!checked);
      setError("Failed to update. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderError = () => {
    return error ? <p className="text-red-500">{error}</p> : null;
  };

  switch (question.type) {
    case "checkbox":
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`question-${index}`}
            checked={isMobile}
            borderColor="border-slate-500"
            onCheckedChange={handleCheckboxChange}
            disabled={loading}
          />
          <Label htmlFor={`question   -${index}`} className="cursor-pointer">
            Yes
          </Label>
          {loading && <span className="ml-2">Loading...</span>}
          {renderError()}
        </div>
      );
    case "text":
      return <TierManager />;
    default:
      return null;
  }
};

export default QuestionRenderer;

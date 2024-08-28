import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ServiceQuestion } from "./types";
import TierManager from "./TierManager";

interface QuestionRendererProps {
  question: ServiceQuestion;
  index: number;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  index,
}) => {
  switch (question.type) {
    case "checkbox":
      return (
        <div className="flex items-center space-x-2">
          <Checkbox id={`question-${index}`} />
          <Label htmlFor={`question-${index}`} className="cursor-pointer">
            Yes
          </Label>
        </div>
      );
    case "text":
      return <TierManager />;
    default:
      return null;
  }
};

export default QuestionRenderer;

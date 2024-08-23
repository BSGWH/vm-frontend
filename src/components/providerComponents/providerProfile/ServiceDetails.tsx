import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  serviceQuestions,
  ServiceQuestion,
} from "./OfferedService/ServiceQuestions";
interface ProviderService {
  id: number;
  provider_id: number;
  default_service_id: number;
  provider_service_name: string;
  product_id: string;
  is_mobile: boolean;
  created_at: string;
  updated_at: string;
}

interface ServiceDetailsProps {
  service: ProviderService;
}

type QuestionType = "checkbox" | "text" | "date";

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ service }) => {
  const questions = serviceQuestions[service.provider_service_name] || [];

  const renderQuestionInput = (question: ServiceQuestion, index: number) => {
    switch (question.type) {
      case "checkbox":
        return (
          <div className="flex flex-row space-x-8">
            {question.options?.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-2">
                <Checkbox id={`question-${index}-option-${optionIndex}`} />
                <Label htmlFor={`question-${index}-option-${optionIndex}`}>
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );
      case "text":
        return <Input type="text" placeholder="Enter your answer here" />;
      case "date":
        return <Calendar mode="single" className="rounded-md border" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-muted p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {service.provider_service_name}
      </h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Service questions</h3>
        <p className="text-gray-600 mb-4">
          You need to answer this series of questions, allowing customers to
          find your services seamlessly.
        </p>
        <Accordion type="single" collapsible className="w-full">
          {questions.map((question, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{question.question}</AccordionTrigger>
              <AccordionContent>
                {renderQuestionInput(question, index)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="flex justify-between">
        <Button variant="providerOutline">Remove this service</Button>
        <Button variant="providerDefault">Save</Button>
      </div>
    </div>
  );
};

export default ServiceDetails;

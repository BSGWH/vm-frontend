import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { serviceQuestions } from "./ServiceQuestions";
import { ProviderService } from "./types";
import QuestionRenderer from "./QuestionRenderer";
import axios from "axios";
interface ServiceDetailsProps {
  service: ProviderService;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ service }) => {
  const questions = serviceQuestions[service.provider_service_name] || [];

  return (
    <div className="bg-muted p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {service.provider_service_name}
      </h2>
      <h2>{service.product_id}</h2>
      <h2>{service.id}</h2>
      <h2>{service.is_mobile ? "Yes" : "No"}</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Service questions</h3>
        <p className="text-slate-500 mb-4">
          You need to answer this series of questions, allowing customers to
          find your services seamlessly.
        </p>
        <Accordion type="multiple" className="w-full">
          {questions.map((question, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {question.question}
              </AccordionTrigger>
              <AccordionContent>
                <QuestionRenderer
                  question={question}
                  index={index}
                  service={service}
                  provider_service_id={service.id}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline">Remove this service</Button>
        <Button>Save</Button>
      </div>
    </div>
  );
};

export default ServiceDetails;

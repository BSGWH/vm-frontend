// serviceQuestions.ts

export interface ServiceQuestion {
  question: string;
  type: "checkbox" | "text";
}

export const serviceQuestions: Record<string, ServiceQuestion[]> = {
  "Oil Change": [
    {
      question: "Are you able to provide mobile service?",
      type: "checkbox",
    },
    {
      question: "What is your price for this service?",
      type: "checkbox",
    },
  ],

  "Vehicle Inspection": [
    {
      question: "Are you able to provide mobile service?",
      type: "checkbox",
    },
    {
      question:
        "Please provide the service tiers you offer, along with the price and duration",
      type: "text",
    },
  ],

  "Vehicle Diagnosis": [
    {
      question: "Are you able to provide mobile service?",
      type: "checkbox",
    },
    {
      question: "Are there any specific areas of concern?",
      type: "text",
    },
  ],
  // ... other services ...
};

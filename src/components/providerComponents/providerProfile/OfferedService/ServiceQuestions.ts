// serviceQuestions.ts

export interface ServiceQuestion {
  question: string;
  type: "checkbox" | "text" | "date";
  options?: string[]; // For checkbox questions
}

export const serviceQuestions: Record<string, ServiceQuestion[]> = {
  "Oil Change": [
    {
      question: "Are you able to provide mobile service",
      type: "checkbox",
      options: ["Yes", "No"],
    },
    {
      question: "Select a time interval for oil change bookings",
      type: "date",
    },
    {
      question: "What is your price for this service?",
      type: "checkbox",
      options: ["Yes", "No"],
    },
  ],
  "Vehicle Inspection": [
    {
      question: "Are you able to provide mobile service",
      type: "checkbox",
      options: ["Yes", "No"],
    },
    {
      question: "Are there any specific areas of concern?",
      type: "text",
    },
    {
      question: "When was your last vehicle inspection?",
      type: "date",
    },
  ],
  "Vehicle Diagnosis": [
    {
      question: "Are you able to provide mobile service",
      type: "checkbox",
      options: ["Yes", "No"],
    },
    {
      question: "Are there any specific areas of concern?",
      type: "text",
    },
    {
      question: "When was your last vehicle inspection?",
      type: "date",
    },
  ],
  // ... other services ...
};

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "How do I sign up for Vehicle Manager?",
    answer: "Signing up is easy. Just click <a href='/signup' class='text-primary border-primary hover:border-b'>sign up</a>, and follow the instructions to create your account and add your first vehicle to get started.",
    value: "item-1",
  },
  {
    question: "Can I track multiple vehicles on Vehicle Manager?",
    answer:
      "Yes, Vehicle Manager allows you to manage multiple vehicles from a single account, making it convenient for individuals with more than one vehicle or businesses with fleets.",
    value: "item-2",
  },
  {
    question:
      "Is Vehicle Manager compatible with all vehicle makes and models?",
    answer:
      "Yes, Vehicle Manager is compatible with vehicles of all makes and models, ensuring that regardless of what you drive, our platform can meet your needs.",
    value: "item-3",
  },
  {
    question: "Is Vehicle Manager suitable for both individual vehicle owners and small businesses with fleets?",
    answer: "Certainly! Vehicle Manager is designed to cater to the needs of both individual vehicle owners and small businesses managing fleets, offering tailored solutions for each.",
    value: "item-4",
  },
  {
    question:
      "How does Vehicle Manager help me keep track of my vehicle maintenance schedule?",
    answer:
      "Vehicle Manager sends personalized maintenance reminders based on your vehicle's unique requirements, ensuring that you never miss an essential service appointment again.",
    value: "item-5",
  },
	{
    question:
      "Can I use Vehicle Manager to store and access important vehicle documents?",
    answer:
      "Yes, Vehicle Manager provides a secure space for storing and accessing crucial vehicle documents such as insurance papers, registration details, and service records.",
    value: "item-6",
  },
	{
    question:
      "Can I access Vehicle Manager from my mobile device?",
    answer:
      "Yes, Vehicle Manager is accessible from any device with an internet connection, allowing you to manage your vehicles on the go.",
    value: "item-7",
  },
	{
    question:
      "How does Vehicle Manager track mileage and expenses for tax purposes?",
    answer:
      "Vehicle Manager logs feature allows you to track your mileage and vehicle-related expenses, generating detailed reports.",
    value: "item-8",
  },
];

export const FAQ = () => {
  return (
    <section
      id="faq"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot"
      >
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent><p dangerouslySetInnerHTML={{ __html: answer }}></p></AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          href="#"
          className="text-primary border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};

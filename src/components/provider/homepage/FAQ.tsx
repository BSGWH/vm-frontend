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
    question: "What is Logic Auto, and how does it work?",
    answer:
      "Logic Auto is an innovative platform that simplifies the auto service experience for both customers and service providers. Customers can easily schedule services based on location and availability.",
    value: "item-1",
  },
  {
    question: "How can service providers benefit from Logic Auto?",
    answer:
        "Service providers can leverage Logic Auto to attract new customers and manage appointments. Logic Auto offers an effective way for service providers to grow and optimize.",
    value: "item-2",
  },
  {
    question:
      "How can Logic Auto help grow my customer base?",
    answer:
      "By joining the Logic Auto network, your auto shop gains access to a broader customer base. Our platform connects you with a diverse audience actively seeking auto services, increasing your chances of reaching potential customers who may not have discovered your shop otherwise.",
    value: "item-3",
  },
  {
    question:
      "What kind of exposure can I expect by joining Logic Auto?",
    answer:
      "Logic Auto provides your auto shop with increased visibility in our online marketplace. This heightened exposure showcases your services to potential customers actively searching for auto solutions, enhancing the chances of converting leads into loyal, repeat customers.",
    value: "item-4",
  },
  {
    question:
      "Can I create custom promotions and incentives on Logic Auto?",
    answer:
      "Yes, Logic Auto offers the flexibility to design custom promotions and incentives tailored to your business goals. You can create enticing offers, such as discounts, special deals, or exclusive packages, to attract new customers and boost loyalty.",
    value: "item-5",
  },
  {
    question:
      "How does Logic Auto assist with targeted marketing? ",
    answer:
      "Our platform provides insights into customer preferences and local market trends, enabling you to target your marketing efforts effectively. By understanding what customers are looking for, you can fine-tune your promotions to align with demand.",
    value: "item-6",
  },
  {
    question: "How does Logic Auto increase my shop's visibility? ",
    answer:
      "Logic Auto’s online marketplace increases your shop’s visibility by showcasing your services to potential customers actively searching for auto solutions. This exposure helps convert leads into loyal, repeat customers.",
    value: "item-7",
  },
  {
    question:
      "How does Logic Auto help with appointment management?",
    answer:
      "Logic Auto simplifies the scheduling process for both providers and customers, ensuring seamless service. Our user-friendly platform allows you to efficiently manage appointments and bookings.",
    value: "item-8",
  },
  {
    question:
      "What kind of data insights does Logic Auto provide?",
    answer:
      "Logic Auto provides valuable data insights that help you make informed decisions to optimize your operations and marketing strategies. These insights enable you to identify trends and preferences, fostering better customer engagement.",
    value: "item-9"
  },
  {
    question:
      "How can I engage with customers through Logic Auto?",
    answer:
      "Logic Auto allows you to engage with customers before, during, and after their service appointments. Personalized communication builds trust and encourages repeat business, fostering long-term customer relationships.",
    value: "item-10"
  },
  {
    question:
      "Will integrating Logic Auto disrupt my existing workflow?",
    answer:
      "No, Logic Auto seamlessly integrates with your existing auto shop systems, making it easy to adapt to the platform without disrupting your workflow. This streamlined approach saves time and resources, maximizing operational efficiency.",
    value: "item-11"
  },
  {
    question:
      "How do I get started with Logic Auto?",
    answer:
      "To get started, simply sign up on our platform and complete your auto shop profile. Once your profile is active, you can begin leveraging all the benefits Logic Auto offers to grow your customer base and revenue.",
    value: "item-12"
  }
];

export const FAQ = () => {
  return (
    <section id="faq" className="container py-24 sm:py-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b text-primaryProvider bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>
              <p dangerouslySetInnerHTML={{ __html: answer }}></p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a href="#" className="text-primaryProvider border-primaryProvider hover:border-b-2">
          Contact us
        </a>
      </h3>
    </section>
  );
};

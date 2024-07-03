"use client"
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";

interface FeatureProps {
  imageSrcLight: string;
  imageSrcDark: string;
  title: string;
  description: string;
  step: number;
}

const features: FeatureProps[] = [
  {
    imageSrcLight: "/images/customer-how-it-works/select-vehicle.png",
    imageSrcDark: "images/customer-how-it-works/select-vehicle-dark.png",
    title: "Sign Up",
    description:
      "Register for an account on Logic Auto's platform and add your first vehicle to begin.",
    step: 1,
  },
  {
    imageSrcLight: "/images/customer-how-it-works/select-service.png",
    imageSrcDark: "images/customer-how-it-works/select-service-dark.png",
    title: "Book Services",
    description:
      "Track usage and conduct cost analysis easily with Logic Auto's advanced features.",
    step: 2,
  },
  {
    imageSrcLight: "/images/customer-how-it-works/documents.png",
    imageSrcDark: "images/customer-how-it-works/documents-dark.png",
    title: "Store Documents",
    description:
      "Keep all your important vehicle documents organized and easily accessible with Logic Auto.",
    step: 3,
  },
  {
    imageSrcLight: "/images/customer-how-it-works/my-vehicles.png",
    imageSrcDark: "images/customer-how-it-works/my-vehicles-dark.png",
    title: "Gain Insights",
    description:
      "Gain service reminders and data-driven insights into your vehicle's performance with Logic Auto.",
    step: 4,
  },
];

export const HowItWorks = () => {
  const { resolvedTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(resolvedTheme === "dark");
  }, [resolvedTheme]);

  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-12"
    >
      <h2 className="text-4xl font-bold leading-loose mb-8">
        How It{" "}
        <span className="bg-gradient-to-b text-primaryCustomer bg-clip-text">
          Works{" "}
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ imageSrcLight, imageSrcDark, title, description, step }: FeatureProps) => (
          <Card key={title} className="bg-muted/0 rounded-lg shadow-lg">
            <CardHeader className="flex flex-col items-center p-4">
              <div className="w-full h-48 sm:h-64 md:h-40 mb-4 overflow-hidden">
                <img
                  src={isDarkMode ? imageSrcDark : imageSrcLight}
                  alt={title}
                  className="w-full h-full object-contain"
                />
              </div>
              <CardTitle className="text-center w-full text-primaryCustomer">
                Step {step} :
              </CardTitle>
              <CardTitle className="text-center w-full">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center w-full px-4">
              {description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;

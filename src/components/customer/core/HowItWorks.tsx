"use client";
import { useEffect, useState } from "react";
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
    imageSrcLight: "/images/customer-how-it-works/sign-up.png",
    imageSrcDark: "images/customer-how-it-works/sign-up-dark.png",
    title: "Sign Up",
    description:
      "Simply enter basic information to create an account on Logic Auto and hit the road!",
    step: 1,
  },
  {
    imageSrcLight: "/images/customer-how-it-works/add-vehicles.png",
    imageSrcDark: "images/customer-how-it-works/add-vehicles-dark.png",
    title: "Add Vehicles",
    description:
      "Add your vehicles to the platform to easily find and connect with nearby service providers.",
    step: 2,
  },
  {
    imageSrcLight: "/images/customer-how-it-works/book-services.png",
    imageSrcDark: "images/customer-how-it-works/book-services-dark.png",
    title: "Book Services",
    description:
      "Schedule maintenance and other services at your convenience through Logic Auto",
    step: 3,
  },
  {
    imageSrcLight: "/images/customer-how-it-works/sit-back.png",
    imageSrcDark: "images/customer-how-it-works/sit-back-dark.png",
    title: "Sit Back and Relax",
    description:
      "Enjoy peace of mind while Logic Auto takes care of your vehicle's maintenance, providing you with reminders and insights.",
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
    <section id="howItWorks" className="container text-center py-10 lg:py-16">
      <h2 className="text-3xl md:text-4xl font-bold leading-loose">
        How It{" "}
        <span className="bg-gradient-to-b text-primaryCustomer bg-clip-text">
          Works{" "}
        </span>
      </h2>

      <div className="flex flex-col">
        {features.map(
          (
            { imageSrcLight, imageSrcDark, title, description, step },
            index
          ) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={title}
                className={`flex flex-col md:flex-row ${
                  isEven ? "md:flex-row-reverse" : ""
                } items-center md:space-x-8 rounded-lg border-b ${
                  isDarkMode ? "border-gray-900" : "border-gray-100"
                } py-6`}
              >
                <div
                  className={`flex w-full md:w-1/2 px-1 sm:px-10 md:px-16 ${
                    isEven ? "md:pl-8" : "md:pr-8"
                  } text-left flex flex-col justify-center items-center`}
                >
                  <div className={`text-left ${isEven ? "" : "md:ml-8"} `}>
                    <h3 className="text-lg md:text-xl font-bold mb-2">
                      Step {step} : {title}
                    </h3>
                    <p>{description}</p>
                  </div>
                </div>
                <div className="flex w-full md:w-1/2 h-4/5 justify-center items-center overflow-hidden">
                  <img
                    src={isDarkMode ? imageSrcDark : imageSrcLight}
                    alt={title}
                    className="object-contain py-4 md:py-0 max-w-[400px]"
                  />
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
};

export default HowItWorks;

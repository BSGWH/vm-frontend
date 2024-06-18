import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Storefront from "@mui/icons-material/Storefront";
import BarChartIcon from "@mui/icons-material/BarChart";
import ArticleIcon from "@mui/icons-material/Article";
import PaidIcon from "@mui/icons-material/Paid";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <Storefront className="w-14 h-14 fill-[#2FA16D]" />,
    title: "Create Account",
    description: "Register for a Provider Account and complete your profile",
  },
  {
    icon: <BarChartIcon className="w-14 h-14 fill-[#2FA16D]" />,
    title: "Add Services",
    description:
      "List automotive services you provide and services information",
  },
  {
    icon: <ArticleIcon className="w-14 h-14 fill-[#2FA16D]" />,
    title: "Accept Bookings",
    description: "Accept or send a request to reschedule, or send a message",
  },
  {
    icon: <PaidIcon className="w-14 h-14 fill-[#2FA16D]" />,
    title: "Track Earning",
    description: "Provide data-driven insights for you to maximize earning",
  },
];

export const HowItWorks = () => {
  return (
    <section id="howItWorks" className="text-center py-8 sm:py-16">
      <div className="container">
        <h2 className="text-5xl font-bold p-8">
          How It{" "}
          <span className="bg-gradient-to-b from-[#2FA16D]/60 to-[#2FA16D] text-transparent bg-clip-text">
            Works?
          </span>
        </h2>
        <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground"></p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon, title, description }: FeatureProps) => (
            <Card key={title} className="bg-muted/50 ">
              <CardHeader>
                <CardTitle className="grid gap-4 place-items-center text-providerPrimary-foreground">
                  {icon}
                  {title}
                </CardTitle>
              </CardHeader>
              {/*<CardContent className="text-providerPrimary-foregroundd">{description}</CardContent>*/}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

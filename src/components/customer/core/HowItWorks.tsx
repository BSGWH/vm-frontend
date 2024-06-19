import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";

import CarRepairIcon from '@mui/icons-material/CarRepair';
import BarChartIcon from '@mui/icons-material/BarChart';
import ArticleIcon from '@mui/icons-material/Article';
import DataUsageIcon from '@mui/icons-material/DataUsage';

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <CarRepairIcon className="w-14 h-14 fill-primaryCustomer"/>,
    title: "Add Vehicles",
    description:
      "Register for an account on Logic Auto's platform and add your first vehicle to begin.",
  },
  {
    icon: <BarChartIcon className="w-14 h-14 fill-primaryCustomer"/>,
    title: "Book Services",
    description:
      "Track usage and conduct cost analysis easily with Logic Auto's advanced features.",
  },
  {
    icon: <ArticleIcon className="w-14 h-14 fill-primaryCustomer"/>,
    title: "Store Documents",
    description:
      "Keep all your important vehicle documents organized and easily accessible with Logic Auto.",
  },
  {
    icon: <DataUsageIcon className="w-14 h-14 fill-primaryCustomer"/>,
    title: "Gain Insights",
    description:
      "Gain service reminders and data-driven insights into your vehicle's performance with Logic Auto.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-12"
    >
      <h2 className="text-5xl font-bold leading-loose mb-8">
        How It{" "}
        <span className="bg-gradient-to-b text-primaryCustomer bg-clip-text">
          Works{" "}
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/0"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

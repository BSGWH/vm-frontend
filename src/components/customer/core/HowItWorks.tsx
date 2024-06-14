import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      "Register for an account on LogicAuto's platform and add your first vehicle to begin.",
  },
  {
    icon: <BarChartIcon className="w-14 h-14 fill-primaryCustomer"/>,
    title: "Book Services",
    description:
      "Track usage and conduct cost analysis easily with LogicAuto's advanced features.",
  },
  {
    icon: <ArticleIcon className="w-14 h-14 fill-primaryCustomer"/>,
    title: "Store Documents",
    description:
      "Keep all your important vehicle documents organized and easily accessible with LogicAuto.",
  },
  {
    icon: <DataUsageIcon className="w-14 h-14 fill-primaryCustomer"/>,
    title: "Gain Insights",
    description:
      "Gain service reminders and data-driven insights into your vehicle's performance with LogicAuto.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It{" "}
        <span className="bg-gradient-to-b from-primaryCustomer/60 to-primaryCustomer text-transparent bg-clip-text">
          Works{" "}
        </span>
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
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

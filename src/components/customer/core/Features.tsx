import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


interface FeatureProps {
  title: string;
  description: string
}

const features: FeatureProps[] = [
  {
    title: "Book Services",
    description:
      "Navigate your vehicle management tasks effortlessly with our intuitive dashboard, designed for simplicity and ease of use."
  },
  {
    title: "Track Usage & Costs",
    description:
      "Stay informed about your vehicle's financial health and usage patterns, empowering you to make informed decisions and optimize your driving experience."
	},
  {
    title: "Everything for Your Vehicles",
    description:
      "From maintenance reminders to document storage, Logic Auto offers a comprehensive solution, ensuring vehicles are always in top condition."
  },
];

const featureList: string[] = [
  "User-Friendly Dashboard",
  "Schedule Appointments",
  "Service Reminders",
  "Cost Analysis",
  "VIN Authentication",
  "Vehicle Documents",
];

export const Features = () => {
  return (
    <section
      id="features"
      className="container py-10 lg:py-16 space-y-8"
    >
      <h2 className="text-3xl sm:text-4xl font-bold md:text-center leading-loose">
        Many{" "}
        <span className="bg-gradient-to-b text-primaryCustomer bg-clip-text">
          Great Features
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge
              variant="secondary"
              className="text-sm"
            >
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map(({ title, description }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle className="leading-normal">{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

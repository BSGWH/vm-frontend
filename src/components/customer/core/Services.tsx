import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "Maintain Services",
    description:
      "",
    icon: <MiscellaneousServicesIcon className="w-14 h-14 fill-primaryCustomer"/>
  },
  {
    title: "Track Vehicle Data",
    description:
      "",
    icon: <LeaderboardIcon className="w-14 h-14 fill-primaryCustomer"/>,
  },
  {
    title: "Gain Custom Insight",
    description:
      "",
    icon: <QueryStatsIcon className="w-14 h-14 fill-primaryCustomer"/>,
  },
];

export const Services = () => {
  return (
    <section className="container py-32 sm:py-20">
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div>
          <h2 className="text-5xl font-bold">
						A full overview,{" "}
            <span className="bg-gradient-to-b text-primaryCustomer bg-clip-text">
              simplified
            </span>
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8 ">
						Logic Auto offers a packaged overview of your vehicle's maintenance, expenses, and documentation, all presented in a simplified and user-friendly format, making it efficient and easy.
					</p>

          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4 items-center">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* <img
          src={"../assets/cube-leg.png"}
          className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
          alt="About services"
        /> */}
      </div>
    </section>
  );
};

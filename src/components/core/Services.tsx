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
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
    icon: <MiscellaneousServicesIcon className="w-14 h-14 fill-primary"/>
  },
  {
    title: "Track Vehicle Data",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
    icon: <LeaderboardIcon className="w-14 h-14 fill-primary"/>,
  },
  {
    title: "Gain Custom Insight",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
    icon: <QueryStatsIcon className="w-14 h-14 fill-primary"/>,
  },
];

export const Services = () => {
  return (
    <section className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
						A full overview,{" "}
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              simplified
            </span>
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8 ">
						Vehicle Manager offers a packaged overview of your vehicle's maintenance, expenses, and documentation, all presented in a simplified and user-friendly format, making it efficient and easy.
					</p>

          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
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

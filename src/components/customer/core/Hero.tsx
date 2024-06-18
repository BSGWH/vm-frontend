import { Button, buttonVariants } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="container flex items-center justify-center py-20 md:py-32 min-h-screen">
      <div className="flex flex-col items-center space-y-6 text-center">
        <main className="text-5xl md:text-8xl font-bold">
          <h1 className="inline from-primary/60 to-primary leading-relaxed">
            Auto Service
            <br />
            Made Simple
          </h1>
        </main>

        <p
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          style={{ marginTop: "0rem" }}
        >
          The All in One Platform for Managing Vehicles & Fleets.
        </p>

        <div className="flex space-x-4">
          <Button className="w-full md:w-auto px-6 py-4 min-w-[200px]">
            Get Started
          </Button>
        </div>

        <div className="w-1/2 shadow-lg">
          <img
            src="/images/provider-dashboard.jpg"
            alt="Customer Dashboard"
            className="w-full mt-4"
          />
        </div>
      </div>
    </section>
  );
};

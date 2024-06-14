import { Button, buttonVariants } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="grid lg:grid-cols-2 place-items-center py-20 md:py-40 gap-20 w-full">
      <div className="container text-center lg:text-start space-y-6 lg:pl-32 relative">
        <main className="text-5xl md:text-6xl font-bold md:leading-normal">
          <h1 className="inline from-primary/60 to-primary">
            Join Logic Auto
            <br />
            As a Provider
            <br />
          </h1>
          <h2 className="inline">
            {/*
            \<span className="inline bg-gradient-to-r from-[#A3E4D7] via-[#2FA16D] to-[#1D7052] text-transparent bg-clip-text">
              Start Earning
  </span>
  */}
          </h2>
        </main>

        {/*
        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          The Ultimate Platform for Auto Repair Customer Acquisition &
          Management
        </p>  
        */}

        <div className="flex flex-col lg:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center lg:items-start">
          <Button variant="providerDefault" className="w-full md:w-1/3">
            Get Started
          </Button>
        </div>
      </div>

      <div className="max-w-[100%] mr-32 shadow-2xl">
        <img src="/images/provider-dashboard.jpg" alt="Provider Dashboard" />
      </div>
    </section>
  );
};

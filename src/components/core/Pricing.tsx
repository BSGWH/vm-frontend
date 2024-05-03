
export const Pricing = () => {
  return (
    <section id="pricing" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Get
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {" "}
          Unlimited{" "}
        </span>
        Access
      </h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
        reiciendis.
      </h3>
      <div style={{ width: "100%" }}>
        <stripe-pricing-table
          pricing-table-id={process.env.STRIPE_PRICING_TABLE_ID}
          publishable-key={process.env.STRIPE_PUBLISHABLE_KEY}
        ></stripe-pricing-table>
      </div>
    </section>
  );
};

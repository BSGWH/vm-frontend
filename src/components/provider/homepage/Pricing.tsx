
export const Pricing = () => {
  return (
    <section id="pricing" className="py-12 sm:py-24 w-full bg-white" >
      <h2 className="text-4xl font-bold text-center p-3" style={{ color : "black"}}>
        Get
        <span className="bg-gradient-to-b text-primaryProvider bg-clip-text">
          {" "}
          Unlimited{" "}
        </span>
        Access
      </h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
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

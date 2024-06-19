import Header from "@/components/customer/layout/header";

export default function AuthLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen">
        {children}
      </div>
    </>
  );
}

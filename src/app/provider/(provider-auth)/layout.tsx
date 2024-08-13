import Header from "@/components/provider/nav/header";


export default function ProviderAuthLayout({
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

import DashboardHeader from "@/components/customer/layout/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardHeader />
      <div className="flex h-screen overflow-hidden bg-primaryCustomer bg-opacity-20 justify-center items-center">
        <div className="w-3/4 bg-white h-3/4 rounded-3xl shadow-2xl p-8 opacity-100">
          <main className="w-full pt-4">{children}</main>
        </div>
      </div>
    </>
  );
}

import DashboardHeader from "@/components/providerComponents/providerHeader/ProviderDashboardHeader";
import Sidebar from "@/components/providerComponents/providerSidebar/ProviderDashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardHeader />
      <div className="flex h-screen">
        <Sidebar />
        <main className="w-full pt-16">{children}</main>
      </div>
    </>
  );
}

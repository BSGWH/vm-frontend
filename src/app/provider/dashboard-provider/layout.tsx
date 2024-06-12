import ProviderDashboardHeader from "@/components/providerComponents/providerHeader/ProviderDashboardHeader";
import ProviderDashboardSidebar from "@/components/providerComponents/providerSidebar/ProviderDashboardSidebar";

export default function ProviderDashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProviderDashboardHeader />
      <div className="flex h-screen overflow-hidden">
        <ProviderDashboardSidebar />
        <main className="w-full pt-16">{children}</main>
      </div>
    </>
  );
}

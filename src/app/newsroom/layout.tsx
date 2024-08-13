import Header from "@/components/newsroom/nav";
import type { Metadata } from "next";
import { Footer } from "@/components/customer/core/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://vm-frontend-shadcn.vercel.app/"),
  title: "LogicAuto Newsroom",
  description: "Latest news of LogicAuto",
};

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
      <Footer />
    </>
  );
}

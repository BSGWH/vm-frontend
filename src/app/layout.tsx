import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Toaster } from "sonner";
import ClientLayout from "./layout.client";

const inter = Onest({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://vm-frontend-shadcn.vercel.app/"),
  title: "LogicAuto",
  description: "Manage vehicles with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <Script async src="https://js.stripe.com/v3/pricing-table.js" />
        <ClientLayout>{children}</ClientLayout> 
        <Toaster />
      </body>
    </html>
  );
}

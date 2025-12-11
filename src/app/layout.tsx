import type { Metadata } from "next";
import "./globals.css";
import { NavbarWrapper } from "@/components/navbarwraper";


export const metadata: Metadata = {
  title: "Ecommerce App",
  description: "An ecommerce application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}

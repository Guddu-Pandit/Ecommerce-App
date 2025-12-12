import type { Metadata } from "next";
import "./globals.css";
import { NavbarWrapper } from "@/components/navbarwraper";
import { CartProvider } from "@/app/context/cartcontext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Ecommerce App",
  description: "An ecommerce application built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider className="">
          <NavbarWrapper />
          {children}
          <Toaster position="top-center" richColors />
        </CartProvider>
      </body>
    </html>
  );
}

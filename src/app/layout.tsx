import type { Metadata } from "next";
import "./globals.css";
import { NavbarWrapper } from "@/components/navbarwraper";
import { CartProvider } from "@/app/context/cartcontext";

export const metadata: Metadata = {
  title: "Ecommerce App",
  description: "An ecommerce application built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased pt-22">
        <CartProvider>
          <NavbarWrapper />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

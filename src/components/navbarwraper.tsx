"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";

export function NavbarWrapper() {
  const pathname = usePathname();

  const hideNavbarOn = ["/login", "/signup"];

  if (hideNavbarOn.includes(pathname)) {
    return null;
  }

  return <Navbar />;
}

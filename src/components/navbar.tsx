"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  SearchIcon,
  LoaderCircleIcon,
  ShoppingCart,
  LogOut,
} from "lucide-react";
import { useId, useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import { useCart } from "@/app/context/cartcontext";

export default function Navbar({ onOpenCart }: any) {
  const { cart } = useCart();
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
   const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // FIXED: added correct type User | null
  const [user, setUser] = useState<User | null>(null);

  const id = useId();
  const router = useRouter();

  // -------------------------------
  // FETCH USER DETAILS
  // -------------------------------
  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, []);

  // Avatar from Google or default
  const avatar =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture || // Google image fallback
    "/profile1.avif";

  // Name (Google or Email User)
  const fullName =
    user?.user_metadata?.full_name || user?.user_metadata?.name || "User";

  useEffect(() => {
    if (!value) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [value]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className={`w-full p-4 flex items-center justify-between border-b fixed top-0 left-0 bg-white z-50 transition-shadow duration-300
        ${scrolled ? "shadow-md" : "shadow-none"}`}>
      {/* LEFT: Logo */}
      <Link href="/" className="flex items-center font-bold gap-2 text-2xl">
        Ecommerce App
      </Link>

      {/* CENTER: Search bar */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-1/2">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />

          <Input
            id={id}
            type="search"
            placeholder="Search products..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="pl-10 pr-10 rounded-full"
          />

          {isLoading && (
            <LoaderCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-4 animate-spin text-muted-foreground" />
          )}
        </div>
      </div>

      {/* RIGHT: Icons */}
      <div className="flex items-center gap-8">
        <button
  className="relative p-2 border-none rounded-lg cursor-pointer hover:bg-gray-100 transition"
  onClick={() => router.push("/cart")}
>
  <ShoppingCart />

  {cart.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs  rounded-full w-5 h-5 flex items-center justify-center">
      {cart.length}
    </span>
  )}
</button>


        {/* Avatar Dropdown */}
        <DropdownMenu > 
          <DropdownMenuTrigger asChild>
  <button
    type="button"
    className="rounded-full p-0 border-none outline-none cursor-pointer"
  >
    <Image
      src={avatar}
      width={45}
      height={45}
      alt="User"
      className="rounded-full border shadow"
    />
  </button>
</DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-60">
            {/* User Name */}
            <DropdownMenuLabel className=" text-1xl font-semibold">
              {fullName}
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* Logout */}
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 cursor-pointer"
            >
              <LogOut size={20} className="mr-2" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

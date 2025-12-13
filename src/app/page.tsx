"use client";

import { useState, useEffect } from "react";
import { BotMessageSquare, Funnel, X } from "lucide-react";
import ProductsPage from "./products/page";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import ChatBotPopup from "@/components/chatbotpopup";

export default function HomePage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(36999);

  // AUTH CHECK
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) router.push("/login");
      else setLoading(false);
    };
    checkUser();
  }, []);

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();
      setProducts(data.products);
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-xl font-semibold">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      <ProductsPage
        selectedCategories={selectedCategories}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />

      {/* CHAT BUTTON */}
      <div
        onClick={() => setShowChat(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer z-10"
      >
        <BotMessageSquare size={32} />
      </div>

      {/* CHAT POPUP */}
      {showChat && (
        <ChatBotPopup
          onClose={() => setShowChat(false)}
          products={products}
        />
      )}
    </div>
  );
}

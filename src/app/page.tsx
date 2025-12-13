"use client";

import { useState, useEffect } from "react";
import { BotMessageSquare, Funnel, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import ProductsPage from "./products/page";
import ChatBotPopup from "@/components/chatbotpopup";

export default function HomePage() {
  const router = useRouter();
  const supabase = createClient();

  // UI STATES
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // DATA STATES
  const [products, setProducts] = useState<any[]>([]);

  // FILTER STATES
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
  }, [router, supabase]);

  // FETCH PRODUCTS (for chatbot)
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

  // CATEGORY LIST
  const categories = [
    "Beauty",
    "Fragrances",
    "Furniture",
    "Groceries",
    "Home-Decoration",
    "Kitchen-Accessories",
    "Laptops",
    "Mens-Shirts",
    "Mens-Shoes",
    "Mens-Watches",
    "Mobile-Accessories",
    "Motorcycle",
    "Skin-Care",
  ];

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const min = 0;
  const max = 36999;
  const minPercent = (minPrice / max) * 100;
  const maxPercent = (maxPrice / max) * 100;

  return (
    <div className="overflow-x-hidden">
      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* FILTER SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-[420px] max-w-[90%] z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full bg-white shadow-xl p-6 flex flex-col">
          {/* HEADER */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold">Filters</h2>
              <p className="text-gray-600 text-sm">
                Refine your product search
              </p>
            </div>

            <button
              className="p-2 hover:bg-gray-200 rounded-full"
              onClick={() => setOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          {/* CONTENT */}
          <div className="overflow-y-auto pr-2 space-y-6 flex-1">
            {/* CATEGORIES */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Categories</h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* PRICE RANGE */}
            <div className="p-4 border rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Price Range</h3>

              <div className="relative w-full h-8">
                <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-gray-300 rounded" />
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-1 bg-black rounded"
                  style={{
                    left: `${minPercent}%`,
                    right: `${100 - maxPercent}%`,
                  }}
                />

                <input
                  type="range"
                  min={min}
                  max={max}
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="absolute inset-0 pointer-events-none w-full bg-transparent"
                />
                <input
                  type="range"
                  min={min}
                  max={max}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="absolute inset-0 pointer-events-none w-full bg-transparent"
                />

                <style jsx>{`
                  input[type="range"]::-webkit-slider-thumb {
                    pointer-events: auto;
                    height: 18px;
                    width: 18px;
                    border-radius: 50%;
                    background: black;
                    cursor: pointer;
                    -webkit-appearance: none;
                  }
                `}</style>
              </div>

              <div className="flex justify-between text-gray-700 text-sm font-medium mt-4">
                <span>${minPrice}</span>
                <span>—</span>
                <span>${maxPrice}</span>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl mt-4 font-semibold"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS PAGE */}
      <ProductsPage
        selectedCategories={selectedCategories}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />

      {/* OPEN FILTER BUTTON */}
      {!open && (
        <div
          onClick={() => setOpen(true)}
          className="fixed top-40 left-6 bg-gray-100 text-gray-700 p-4 rounded-full shadow-md cursor-pointer z-50"
        >
          <Funnel size={32} strokeWidth={1.55} />
        </div>
      )}

      {/* CHAT BUTTON */}
      <div
        onClick={() => setShowChat(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer z-50"
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

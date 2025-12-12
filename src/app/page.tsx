"use client";

import { useState, useEffect } from "react";
import { BotMessageSquare, Funnel, X } from "lucide-react";
import ProductsPage from "./products/page";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function HomePage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(36999);

  // 🔒 CHECK LOGIN STATUS
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login"); // Redirect to login
      } else {
        setLoading(false); // Allow page to load
      }
    };

    checkUser();
  }, []);

  // Prevent UI flashing before redirect
  if (loading) {
    return (
      <div className="p-10 text-center text-xl font-semibold">
        Checking authentication...
      </div>
    );
  }

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

  const min = 0;
  const max = 36999;

  const minPercent = (minPrice / max) * 100;
  const maxPercent = (maxPrice / max) * 100;

  const handleMinChange = (e: any) => {
    const value = Number(e.target.value);
    if (value <= maxPrice) setMinPrice(value);
  };

  const handleMaxChange = (e: any) => {
    const value = Number(e.target.value);
    if (value >= minPrice) setMaxPrice(value);
  };

  return (
    <div className="overflow-x-hidden">

      {/* DARK OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* FILTER SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-[420px] max-w-[90%] z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-full bg-white shadow-xl p-6 flex flex-col">

          {/* HEADER */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold">Filters</h2>
              <p className="text-gray-600 text-sm">Refine your product search</p>
            </div>

            <button
              className="p-2 hover:bg-gray-200 rounded-full"
              onClick={() => setOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          {/* SCROLLABLE CONTENT */}
          <div className="overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 flex-1">

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Categories</h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center space-x-3">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* PRICE RANGE */}
            <div className="p-4 border rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Price Range</h3>

              {/* Dual Slider */}
              <div className="relative w-full h-8">

                {/* Track background */}
                <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-gray-300 rounded"></div>

                {/* Active range highlight */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-1 bg-black rounded"
                  style={{
                    left: `${minPercent}%`,
                    right: `${100 - maxPercent}%`,
                  }}
                ></div>

                {/* MIN THUMB */}
                <input
                  type="range"
                  min={min}
                  max={max}
                  value={minPrice}
                  onChange={handleMinChange}
                  className="absolute inset-0 pointer-events-none w-full appearance-none bg-transparent"
                  style={{ zIndex: minPrice > max - 5000 ? 5 : 3 }}
                />

                {/* MAX THUMB */}
                <input
                  type="range"
                  min={min}
                  max={max}
                  value={maxPrice}
                  onChange={handleMaxChange}
                  className="absolute inset-0 pointer-events-none w-full appearance-none bg-transparent"
                  style={{ zIndex: 4 }}
                />

                {/* CUSTOM THUMB STYLE */}
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

              {/* Values */}
              <div className="flex justify-between text-gray-700 text-sm font-medium mt-4">
                <span>${minPrice}</span>
                <span>—</span>
                <span>${maxPrice}</span>
              </div>

              {/* Apply Button */}
              <button
                onClick={() =>
                  console.log("APPLY FILTER", minPrice, maxPrice)
                }
                className="w-full bg-black cursor-pointer hover:bg-gray-800 text-white py-3 rounded-xl mt-4 font-semibold"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN PAGE */}
      <ProductsPage />

      {/* FUNNEL BUTTON */}
      {!open && (
        <div
          onClick={() => setOpen(true)}
          className="fixed top-40 left-6 bg-gray-100 text-gray-700 p-4 rounded-full shadow-md cursor-pointer z-50"
        >
          <Funnel size={32} strokeWidth={1.55} />
        </div>
      )}

      {/* CHAT BUTTON */}
      <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer z-10">
        <BotMessageSquare size={32} strokeWidth={1.55} />
      </div>
    </div>
  );
}

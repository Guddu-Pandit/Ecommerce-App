"use client";

import { useState, useEffect } from "react";
import { BotMessageSquare, Funnel } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import ProductsPage from "./products/page";

export default function HomePage() {
  // const [products, setProducts] = useState<any[]>([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const supabase = createClient();
  //     const { data } = await supabase.from("products").select("*");
  //     setProducts(data || []);
  //   };
  //   fetchProducts();
  // }, []);

  return (
    <div>

       <ProductsPage />
      <div className="fixed top-40 left-6 bg-gray-100 text-gray-700 p-4 rounded-full shadow-md cursor-pointer">
      <Funnel size={32} strokeWidth={1.55} />
      </div>
      {/* <div>
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded">
            <img src={p.image_url} className="w-full h-40 object-cover" />
            <h2 className="text-xl">{p.title}</h2>
            <p>₹{p.price}</p>
          </div>
        ))}
      </div> */}
      <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer">
        <BotMessageSquare size={32} strokeWidth={1.55} />
      </div>
    </div>
  );
}

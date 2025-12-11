"use client";

import { useState, useEffect } from "react";
import { BotMessageSquare, Funnel } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("products").select("*");
      setProducts(data || []);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Funnel size={32} strokeWidth={1.55} />
      <div className="grid grid-cols-3 gap-6 p-6">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded">
            <img src={p.image_url} className="w-full h-40 object-cover" />
            <h2 className="text-xl">{p.title}</h2>
            <p>₹{p.price}</p>
          </div>
        ))}
        <BotMessageSquare size={32} strokeWidth={1.55} />
      </div>
    </div>
  );
}

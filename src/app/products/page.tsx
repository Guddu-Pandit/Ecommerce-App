"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/cartcontext";
import { useRouter } from "next/navigation";


const categories = [
  "All Products",
  "smartphones",
  "laptops",
  "fragrances",
  "groceries",
  "home-decoration",
  "furniture",
  "tops",
  "womens-dresses",
  "womens-shoes",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-bags",
  "sunglasses",
];

export default function ProductsPage() {
  const { addToCart, cart } = useCart(); // ✅ USE HOOK HERE ONLY

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [page, setPage] = useState(1);

  const pageSize = 12;

  useEffect(() => {
    loadProducts();
  }, [activeCategory, page]);

  const loadProducts = async () => {
    setLoading(true);

    try {
      let url = `https://dummyjson.com/products?limit=${pageSize}&skip=${
        (page - 1) * pageSize
      }`;

      if (activeCategory !== "All Products") {
        url = `https://dummyjson.com/products/category/${activeCategory}?limit=${pageSize}&skip=${
          (page - 1) * pageSize
        }`;
      }

      const res = await fetch(url);
      const data = await res.json();

      setProducts(data.products || []);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="p-6">
      {/* CATEGORY BUTTONS */}
      <div className="flex gap-3 overflow-x-scroll pb-3 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setPage(1);
              setActiveCategory(cat);
            }}
            className={`px-5 py-2 rounded-full font-semibold capitalize border text-md whitespace-nowrap transition ${
              activeCategory === cat
                ? "bg-black text-white shadow"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="shadow-md hover:shadow-lg transition rounded-xl overflow-hidden border"
            >
              <div className="relative w-full h-64 bg-white flex items-center justify-center">
                {product.discountPercentage > 0 && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-md">
                    -{Math.round(product.discountPercentage)}%
                  </div>
                )}

                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-contain"
                />
              </div>

              <CardContent className="p-4 space-y-2">
                <p className="text-[12px] px-3 py-1 bg-teal-500 text-white capitalize rounded-full w-fit">
                  {product.category}
                </p>

                <h2 className="font-semibold text-lg">{product.title}</h2>

                <p className="text-sm text-gray-500 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between px-4 items-center">
                  <p className="text-xl font-bold">${product.price}</p>
                
                {cart.some((item: any) => item.id === product.id) ? (
                  
                  <Button
                    className="w-fit  mt-3 cursor-pointer bg-black hover:bg-gray-800"
                    onClick={() => (window.location.href = "/cart")}
                  >
                    <ShoppingCart /> View Cart
                  </Button>
                ) : (
                  <Button
                    className="w-fit cursor-pointer mt-3"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-10">
        <Button
          disabled={page === 1}
          variant="outline"
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>

        <Button variant="outline">{page}</Button>

        <Button variant="outline" onClick={() => setPage((p) => p + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}

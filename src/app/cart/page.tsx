"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/cartcontext";

type CartItem = {
  id: number;
  title: string;
  price: number;
  qty: number;
  thumbnail?: string;
  image?: string;
  oldPrice?: number;
};

export default function CartPage() {
  const router = useRouter();
  const { cart = [], removeFromCart, updateQty, clearCart } = useCart();

  const goToProducts = () => router.push("/products");
  const goToOrders = () => router.push("/order");

  // SAFE subtotal
  const subtotal = cart.reduce(
    (acc: number, item: CartItem) => acc + item.price * item.qty,
    0
  );

  // IF EMPTY
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <ShoppingCart className="size-26 text-gray-400" />

      <h2 className="text-4xl font-semibold mt-6">Your cart is empty</h2>
      <p className="text-gray-600 font-semibold text-xl mt-2">
        Looks like you haven't added anything to your cart yet.
      </p>


        <button
          onClick={goToProducts}
          className="bg-black text-white px-6 py-3 mt-6 rounded-lg cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-6 md:px-20 py-10">
      <div className="flex items-center justify-between">
        <button
          onClick={goToProducts}
          className="text-md cursor-pointer font-semibold text-gray-600 flex items-center gap-2"
        >
          <ArrowLeft /> Continue Shopping
        </button>

        <button
          onClick={clearCart}
          className="text-red-600 cursor-pointer font-medium"
        >
          Clear Cart
        </button>
      </div>

      <h1 className="text-3xl font-bold mt-4">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* LEFT SIDE - ITEMS */}
        <div className="col-span-2 space-y-6">
          {cart.map((item: CartItem) => (
            <div
              key={item.id}
              className="flex items-center justify-between border rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.thumbnail || item.image || "/placeholder.png"}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="rounded-md"
                />

                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>

                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xl font-bold">${item.price}</p>

                    {item.oldPrice && (
                      <p className="line-through text-gray-500 text-sm">
                        ${item.oldPrice}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="p-2 bg-gray-100 cursor-pointer rounded-full"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="text-lg font-medium">{item.qty}</span>

                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="p-2 bg-gray-100 cursor-pointer rounded-full"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 flex cursor-pointer items-center gap-1"
              >
                <Trash2 size={18} /> Remove
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="border shadow-sm p-6 rounded-xl h-fit">
          <h3 className="text-2xl font-bold mb-4">Order Summary</h3>

          <div className="flex justify-between font-semibold text-gray-600 py-2">
            <span>Subtotal ({cart.length} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-semibold text-gray-600 py-2">
            <span>Shipping</span>
            <span className="text-green-600">FREE</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-bold mb-4">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <Button
            onClick={goToOrders}
            className="w-full cursor-pointer h-12 text-lg"
          >
            Proceed to Checkout
          </Button>

          <Button
            onClick={goToProducts}
            variant="outline"
            className="cursor-pointer w-full h-12 mt-3 text-lg"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}

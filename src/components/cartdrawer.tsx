"use client";

import { X, Trash2 } from "lucide-react";
import { useCart } from "@/app/context/cartcontext";

export default function CartDrawer({ open, onClose }: any) {
  const { cart, removeFromCart, updateQty } = useCart();

 const total = cart.reduce(
  (sum: number, item: any) => sum + item.price * item.qty,
  0
);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl p-5 transition-transform duration-300 z-50
      ${open ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={onClose}>
          <X />
        </button>
      </div>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item: any) => {
              return (
                  <div
                      key={item.id}
                      className="border rounded-lg flex gap-3 p-3"
                  >
                      <img
                          src={item.thumbnail}
                          className="w-16 h-16 rounded object-cover" />

                      <div className="flex-1">
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-gray-600">${item.price}</p>

                          <div className="flex items-center gap-2 mt-2">
                              <button
                                  className="px-2 border rounded"
                                  onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                              >
                                  -
                              </button>

                              <span>{item.qty}</span>

                              <button
                                  className="px-2 border rounded"
                                  onClick={() => updateQty(item.id, item.qty + 1)}
                              >
                                  +
                              </button>
                          </div>
                      </div>

                      <button onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="text-red-500" />
                      </button>
                  </div>
              );
          })}

          <div className="pt-4 border-t mt-4">
            <p className="text-lg font-semibold">Total: ${total}</p>
            <button className="w-full bg-black text-white py-2 mt-3 rounded-lg">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

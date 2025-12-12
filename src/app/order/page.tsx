"use client";
import { useCart } from "@/app/context/cartcontext";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";


export default function OrdersPage() {
  const { orders, removeOrder } = useCart();
  const router = useRouter();
  const goToProducts = () => router.push("/");

  return (
    <>  
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center mb-10 justify-between">
        <button
          onClick={goToProducts}
          className="text-md cursor-pointer font-semibold text-gray-600 flex items-center gap-2"
        >
          <ArrowLeft /> Continue Shopping
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-lg">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order: any) => (
            <div
              key={order.id}
              className="p-6 border rounded-lg shadow-lg flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{`Order #${order.id}`}</h2>
                <p className="text-sm text-gray-500">{order.date}</p>
                {/* REMOVE ORDER BUTTON */}
                <button
                  onClick={() => removeOrder(order.id)}
                  className="bg-red-300 text-red-800 font-semibold cursor-pointer text-sm mt-10 px-4 py-2 rounded-full hover:bg-red-400"
                >
                  Remove Order
                </button>
              </div>

              <div className="flex flex-col items-end gap-2">
                <p className="font-semibold">{order.product}</p>
                <p className="text-sm text-gray-500">
                  Original: ${order.originalPrice}
                </p>
                <p className="text-lg font-bold">${order.discountPrice}</p>

                <span
                  className={`inline-block py-1 px-3 font-semibold text-sm rounded-full ${
                    order.status === "pending"
                      ? "bg-yellow-200 text-yellow-700"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}

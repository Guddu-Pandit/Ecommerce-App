"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<any>(null);

export function CartProvider({ children }: any) {
  const [cart, setCart] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);

      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setCart([]);

  const updateQty = (id: number, qty: number) =>
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));

  const addOrders = (cartItems: any[]) => {
    const newOrders = cartItems.map((item) => ({
      id: crypto.randomUUID(),
      date: new Date().toLocaleString(),
      product: item.title || item.name,
      originalPrice: item.oldPrice || item.price,
      discountPrice: item.price,
      qty: item.qty,
      status: "pending",
      image: item.thumbnail || item.image || "",
    }));

    setOrders((prev) => [...newOrders, ...prev]);
  };

  const clearOrders = () => setOrders([]);

  // -------------------------------------------------
  // ⭐ FIX: ADD THIS FUNCTION
  // -------------------------------------------------
  const removeOrder = (id: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };
  // -------------------------------------------------

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        removeFromCart,
        clearCart,
        updateQty,
        addOrders,
        clearOrders,
        removeOrder,
        setCart,
        setOrders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send } from "lucide-react";

type ChatMessage = {
  role: "user" | "bot";
  text: string;
};

type Product = {
  title: string;
  price: number;
  category: string;
};

export default function ChatBotPopup({
  onClose,
  products,
}: {
  onClose: () => void;
  products: Product[];
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: "👋 Hello! I can help you find cheap products and suggest items by category.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,
        products: products.map((p) => ({
          title: p.title,
          price: p.price,
          category: p.category,
        })),
      }),
    });

    const data = await res.json();

    const botMessage: ChatMessage = {
      role: "bot",
      text: data.reply,
    };

    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-20 right-6 w-[360px] h-[520px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
      {/* HEADER */}
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b bg-white">
        <h3 className="font-semibold">AI Shopping Assistant</h3>
        <button
          onClick={onClose}
          className="p-2 rounded cursor-pointer hover:bg-gray-200"
        >
          <X />
        </button>
      </div>
      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl max-w-[85%] ${
              m.role === "user" ? "bg-black text-white ml-auto" : "bg-gray-100"
            }`}
          >
            {m.text}
          </div>
        ))}

        {loading && <p className="text-gray-400">Thinking...</p>}

        {/* AUTO SCROLL ANCHOR */}
        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="border-t p-3 flex gap-2 bg-white">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about products..."
          className="flex-1 border rounded-xl px-3 py-2 text-sm"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white p-4 cursor-pointer rounded-xl"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

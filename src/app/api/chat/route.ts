import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, products } = await req.json();

    const productSummary = products
      .slice(0, 50)
      .map(
        (p: any) => `• ${p.title} | ₹${p.price} | ${p.category}`
      )
      .join("\n");

    const prompt = `
You are an AI shopping assistant.

Rules:
- Always be friendly
- If user asks for cheap products, suggest lowest price items
- If user mentions a category, suggest products from that category
- If price is mentioned, respect the budget
- Answer in bullet points

Products available:
${productSummary}

User question:
"${message}"
`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await geminiRes.json();

    return NextResponse.json({
      reply:
        data?.candidates?.[0]?.content?.parts?.[0]?.text ??
        "Sorry, I couldn't find suggestions.",
    });
  } catch (error) {
    return NextResponse.json({
      reply: "Something went wrong. Please try again.",
    });
  }
}

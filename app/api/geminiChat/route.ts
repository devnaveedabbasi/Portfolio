import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import getProfileContext from "@/lib/profileContext";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
);

export async function POST(req: Request) {
  try {
    const { question } = await req.json();
    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Missing question" }, { status: 400 });
    }

    const context = await getProfileContext();

    const contactInfo = `NAVEED'S CONTACT INFORMATION:
- Email: naveedabbasi8651@gmail.com
- Phone: +92 311 1309060
- WhatsApp: https://wa.me/923111309060
- LinkedIn: https://www.linkedin.com/in/naveed-abbasi
- Instagram: https://www.instagram.com/naveed_abbasi316/`;

    const systemPrompt = `You are Naveed Abbasi's personal AI assistant. Your role is to answer questions about Naveed, his work, projects, skills, experience, and background based on the provided context.

Guidelines:
- Answer questions directly and accurately using the provided context
- If information is not in the context, be honest and suggest what you can help with
- Keep responses concise and professional
- Use a friendly, helpful tone
- Do not make up information or provide false details
- If asked about contact, email, phone, WhatsApp, or LinkedIn, provide the actual contact information
- When providing contact details, be clear and helpful`;

    const prompt = `${systemPrompt}\n\n${contactInfo}\n\nCONTEXT ABOUT NAVEED:\n${context}\n\nUSER QUESTION: "${question}"\n\nProvide a helpful, accurate answer.`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ answer: text });
  } catch (error) {
    console.error("/api/geminiChat error:", error);
    return NextResponse.json(
      { error: "Failed to process your question. Please try again." },
      { status: 500 },
    );
  }
}

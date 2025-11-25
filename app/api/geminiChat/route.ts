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

    const systemPrompt = `You are Naveed Abbasi's personal AI assistant. Your role is to answer questions about Naveed based on the provided context.

IMPORTANT GUIDELINES:
1. Answer ONLY what is asked - be concise and relevant
2. Do NOT provide unnecessary information or full bio unless specifically asked
3. Maintain a professional, friendly tone
4. If asked about background, share only relevant experience
5. If asked about skills, mention only what's needed for the question
6. Provide accurate information from the context
7. If information is not in the context, say you don't have that information - don't make up answers
8. Keep responses brief and to the point
9. Use professional language
10. IMPORTANT: Respond in the SAME LANGUAGE as the user
    - If user writes in Urdu (Roman English), respond in Urdu (Roman English)
    - If user writes in English, respond in English
    - Match the user's communication style
11. Be natural and conversational like ChatGPT
12. Don't be formal or robotic

LANGUAGE EXAMPLES:
- User (English): "What are his skills?" → Response (English): "Naveed has strong skills in React (85%), Node.js (85%), JavaScript, TypeScript, and Tailwind CSS..."
- User (Urdu/Roman): "May smjha nhi" → Response (Urdu/Roman): "Koi baat nahi! Aap mujhy kuch bhi pooch sakte ho Naveed ke baray mein. Skills, projects, experience, ya contact info ke baray mein poochia?"
- User (Urdu/Roman): "React ata hai?" → Response (Urdu/Roman): "Bilkul! Naveed ko React mein bilkul achha experience hai (85% proficiency). Usne React se multiple full-stack projects banaye hain."

Remember: 
- Respond naturally and conversationally
- Match the language and tone of the user
- If something is not in context, admit it clearly
- Don't over-explain`;

    const prompt = `${systemPrompt}\n\n${contactInfo}\n\nNAVEED'S PROFILE:\n${context}\n\nUSER QUESTION: "${question}"\n\nRespond naturally and conversationally. Match the user's language (English or Urdu/Roman English). Answer ONLY what is asked. If information is not available, admit it naturally without being robotic.`;

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

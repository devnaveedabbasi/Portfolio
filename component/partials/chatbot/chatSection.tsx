import React, { useRef, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type Message = {
  sender: "user" | "bot";
  text: string;
};

const ChatSection: React.FC = () => {
  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor,
  );
  const [chatbotOpen, setChatbotOpen] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi! I'm Naveed's AI assistant. Ask me anything about his projects, skills, experience, or background.",
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (message: string): Promise<void> => {
    if (!message.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: message }]);
    setLoading(true);

    try {
      const res = await fetch("/api/geminiChat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: message }),
      });

      const data = await res.json();
      const answer =
        data?.answer ||
        data?.text ||
        "Sorry, I couldn't process that. Please try again.";

      // Add bot response
      setMessages((prev) => [...prev, { sender: "bot", text: answer }]);

      // Check if user asked about contact and offer contact details
      const contactKeywords = [
        "contact",
        "reach",
        "email",
        "phone",
        "whatsapp",
        "linkedin",
        "message",
        "number",
      ];
      if (contactKeywords.some((kw) => message.toLowerCase().includes(kw))) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "Here's how you can reach me:\n\n📧 Email: naveedabbasi8651@gmail.com\n📱 Phone: +92 311 1309060\n💬 WhatsApp: https://wa.me/923111309060\n🔗 LinkedIn: https://www.linkedin.com/in/naveed-abbasi",
            },
          ]);
        }, 500);
      }
    } catch (err) {
      console.error("Chat API error:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (value: string) => {
    sendMessage(value);
  };

  return (
    <div className="h-full w-full p-4 md:p-6">
      {chatbotOpen && (
        <div className="fixed bottom-0 right-0 z-30 flex h-[90vh] w-full flex-col rounded-lg bg-[#111111] shadow-xl sm:bottom-4 sm:right-4 sm:h-[500px] sm:w-96 md:bottom-6 md:right-6 md:w-[400px]">
          {/* Header */}
          <div
            style={{ backgroundColor: selectedColor }}
            className="flex items-center justify-between rounded-t-lg px-4 py-3 text-black"
          >
            <div className="flex items-center gap-2">
              <Icon icon="mdi:robot-happy" width={24} />
              <h2 className="text-lg font-semibold">AI Assistant</h2>
            </div>
            <button
              onClick={() => setChatbotOpen(false)}
              className="rounded p-1 transition hover:bg-black/20"
              aria-label="Close chat"
            >
              <Icon icon="mdi:close" width={22} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-[#111111] p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-xs items-start gap-2 rounded-lg px-3 py-2 ${
                    msg.sender === "user"
                      ? "rounded-br-none bg-blue-600 text-white"
                      : "rounded-bl-none bg-gray-700 text-gray-100"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <Icon
                      icon="mdi:robot-happy"
                      width={18}
                      className="mt-1 flex-shrink-0"
                    />
                  )}
                  <div className="break-words text-sm leading-relaxed">
                    {msg.text.split("\n").map((line, idx) => (
                      <div key={idx}>
                        {line.startsWith("http") ? (
                          <a
                            href={line.trim()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold underline hover:opacity-80"
                          >
                            {line.includes("wa.me")
                              ? "💬 WhatsApp"
                              : line.includes("linkedin")
                                ? "🔗 LinkedIn"
                                : line.includes("instagram")
                                  ? "📷 Instagram"
                                  : line}
                          </a>
                        ) : (
                          line
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-lg rounded-bl-none bg-gray-700 px-3 py-2 text-gray-100">
                  <Icon
                    icon="mdi:robot-happy"
                    width={18}
                    className="flex-shrink-0"
                  />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="rounded-b-lg border-t border-gray-700 bg-[#111111] p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 rounded-md bg-[#222222] px-3 py-2 text-sm text-white placeholder-gray-500 transition focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ "--tw-ring-color": selectedColor } as any}
                onKeyDown={(e) => {
                  const input = e.target as HTMLInputElement;
                  if (e.key === "Enter" && !loading) {
                    handleSend(input.value);
                    input.value = "";
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.querySelector(
                    'input[type="text"]',
                  ) as HTMLInputElement;
                  if (input?.value.trim() && !loading) {
                    handleSend(input.value);
                    input.value = "";
                  }
                }}
                disabled={loading}
                className="rounded-md p-2 text-white transition hover:opacity-80 disabled:opacity-50"
                style={{ backgroundColor: selectedColor }}
                aria-label="Send message"
              >
                <Icon icon="mdi:send" width={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSection;

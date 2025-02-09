import React, { useState } from "react";
import { Icon } from "@iconify/react"; // Iconify import
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
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [questionIndex, setQuestionIndex] = useState<number>(0); // Track the current set of questions
  const [faqsExhausted, setFaqsExhausted] = useState<boolean>(false);

  const faqs: Record<string, string> = {
    "What's your name?": "I am your friendly ChatBot, here to help!",
    "What do you do?": "I am a web developer, and I create amazing websites!",
    "How can I contact you?": "You can contact me through the contact form on my website.",
    "What technologies do you use?": "I work with React, JavaScript, HTML, CSS, Tailwind CSS, and more!",
  };

  const sendMessage = (message: string): void => {
    // Add user message
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: message },
    ]);

    // Check if it's a known question and provide the answer
    if (faqs[message]) {
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: faqs[message] },
        ]);
        setQuestionIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          if (newIndex >= questionList.length) {
            setFaqsExhausted(true); // Set FAQs as exhausted
          }
          return newIndex;
        });
      }, 1000);
    } else {
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "Sorry, I don't understand that question." },
        ]);
      }, 1000);
    }
  };

  const questionList = [
    "What's your name?",
    "What do you do?",
    "How can I contact you?",
    "What technologies do you use?",
  ];

  return (
    <>
      <div className="w-full h-full p-6">

        {chatbotOpen && (
          <div className="z-30 fixed md:mb-20 mb-0 md:top-4 top-14 md:right-20 right-0   h-[310px] sm:h-[300px] lg:w-[30vw] md:w-[50vw]  w-[100%] rounded-md bg-[#111111] shadow-md">
            <div
              style={{ backgroundColor: selectedColor }}
              className="flex h-[60px] w-full items-center justify-between rounded-lg">
              {/* Chatbot Header */}
              <div className="flex w-[50%] items-center justify-center gap-3">
                <Icon icon="mdi:robot" width={30} className="text-black" />
                <h2 className="text-[20px]">AI ChatBot</h2>
              </div>
              {/* Close Button */}
              <div
                className="mr-4 cursor-pointer"
                onClick={() => setChatbotOpen(false)}
              >
                <Icon icon="mdi:close" width={30} className="text-black" />
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex h-full flex-col overflow-y-auto bg-[#111111] p-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`flex items-center gap-2 p-2 rounded-md ${msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-white"
                      }`}
                  >
                    <Icon
                      icon={
                        msg.sender === "user" ? "mdi:account" : "mdi:robot"
                      }
                      width={20}
                      className="text-white"
                    />
                    <span>{msg.text}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Buttons */}
            {!faqsExhausted && (
              <div className="flex flex-col gap-2 justify-end bg-[#111111] items-end p-4">
                {questionList
                  .slice(questionIndex, questionIndex + 3)
                  .map((question, index) => (
                    <button
                      key={index}
                      onClick={() => sendMessage(question)}
                      className=" px-2 p-1 w-[70%]  rounded-md text-black flex justify-start  items-center gap-2"
                      style={{ backgroundColor: selectedColor }}

                    >
                      <Icon icon="mdi:send" width={20} />
                      {question}
                    </button>
                  ))}
              </div>
            )}

            {/* Links Section */}
            {faqsExhausted && (
              <div className="flex flex-col gap-2 p-4 bg-[#222222]">
                <p className="text-white">
                  For more queries, feel free to reach out:
                </p>
                <a
                  href="https://wa.me/03111309060"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  WhatsApp Me
                </a>
                <a
                  href="https://www.linkedin.com/in/naveed-abbasi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  Connect on LinkedIn
                </a>
              </div>
            )}

            {/* Message Input */}
            <div className="flex items-center p-4  bg-[#222222] rounded-b-md gap-4">
              <input
                type="text"
                placeholder="Type your question..."
                className=" rounded-md p-2 w-full bg-[#333333] text-white"
                onKeyDown={(e) => {
                  const target = e.target as HTMLInputElement; // Typecast the target as HTMLInputElement
                  if (e.key === "Enter" && target.value.trim()) {
                    sendMessage(target.value);
                    target.value = ""; // Clear input after sending
                  }
                }}
              />
              <button
                onClick={() => {
                  const inputField = document.querySelector(
                    'input[type="text"]'
                  ) as HTMLInputElement;
                  if (inputField.value.trim()) {
                    sendMessage(inputField.value);
                    inputField.value = "";
                  }
                }}
                className="md:ml-2 p-2 rounded-md  text-black"
                style={{ backgroundColor: selectedColor }}

              >
                <Icon icon="mdi:send" width={25} />
              </button>
            </div>
          </div>
        )}
      </div>

    </>
  );
};

export default ChatSection;

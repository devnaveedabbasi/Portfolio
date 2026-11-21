// app/contact/ContactClient.tsx - CLIENT COMPONENT
"use client";

import HeaderText from "@/component/headerText";
import MobileNavigation from "@/component/partials/navigations/mobileNavigation";
import { RootState } from "@/store";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface SocialIcon {
  icon: string;
  link: string;
}

interface ContactClientProps {
  socialIcons: SocialIcon[];
}

const ContactClient: React.FC<ContactClientProps> = ({ socialIcons }) => {
  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor,
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"" | "success" | "error">("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setStatus("error");
      setStatusMessage("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "contacts"), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        createdAt: serverTimestamp(),
      });

      setStatus("success");
      setStatusMessage("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setStatus("");
        setStatusMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
      setStatusMessage("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MobileNavigation navHeadFirst="Contact" NavHeadSec="Us" />

      <div className="min-h-screen bg-[#111111]">
        <HeaderText
          backHead="Contact"
          frontHeadSimple="Get In"
          frontHeadColor="Touch"
        />

        <div className="flex w-full justify-center pb-8">
          <div className="flex h-full w-[calc(100%-32px)] max-w-6xl flex-col items-center justify-center gap-8 text-white sm:w-[86%] md:flex-row md:gap-6 lg:gap-12">
            <div className="w-full space-y-5 md:w-[35%] md:self-start">
              <h1 className="font-Poppins text-2xl font-bold sm:text-3xl">
                DON&apos;T BE SHY!
              </h1>
              <p className="font-Open_Sans text-sm leading-6 text-white sm:text-[15px]">
                Feel free to get in touch with me. I am always open to
                discussing new projects, creative ideas, or opportunities to be
                part of your visions.
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:naveedabbasi8651@gmail.com"
                  className="flex min-w-0 items-center gap-3"
                >
                  <Icon
                    icon="mdi:contact"
                    color={selectedColor}
                    width={36}
                    height={36}
                    className="shrink-0"
                  />
                  <span className="min-w-0 break-all font-Open_Sans text-sm font-medium sm:text-[15px]">
                    naveedabbasi8651@gmail.com
                  </span>
                </a>
                <a
                  href="tel:+923111309060"
                  className="flex items-center gap-3"
                >
                  <Icon
                    icon="material-symbols:mail-sharp"
                    color={selectedColor}
                    width={36}
                    height={36}
                    className="shrink-0"
                  />
                  <span className="font-Open_Sans text-sm font-medium sm:text-[15px]">
                    +92 311 1309060
                  </span>
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                {socialIcons.map((icon, idx) => (
                  <a
                    href={icon.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={idx}
                    className="flex h-11 w-11 shrink-0 items-center justify-center cursor-pointer rounded-full bg-[#252525] p-2 transition duration-200"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = selectedColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#252525";
                    }}
                  >
                    <Icon icon={icon.icon} className="text-2xl text-white" />
                  </a>
                ))}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full space-y-4 md:w-[60%]"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-full bg-[#252525] p-3 text-gray-300 transition focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  disabled={loading}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-full bg-[#252525] p-3 text-gray-300 transition focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  disabled={loading}
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Your Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full rounded-full bg-[#252525] p-3 text-gray-300 transition focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  disabled={loading}
                />
              </div>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                className="h-40 w-full rounded-2xl bg-[#252525] p-3 text-gray-300 transition focus:outline-none focus:ring-2 focus:ring-opacity-50"
                disabled={loading}
              ></textarea>

              {status === "success" && (
                <div className="rounded-lg border border-green-500 bg-green-500/20 p-3 text-center text-green-400">
                  {statusMessage}
                </div>
              )}
              {status === "error" && (
                <div className="rounded-lg border border-red-500 bg-red-500/20 p-3 text-center text-red-400">
                  {statusMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full !mb-10 bg-gradient-to-r px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 disabled:opacity-50"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${selectedColor}, ${selectedColor}CC)`,
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Icon icon="eos-icons:loading" /> Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Icon icon="lucide:send" /> Send Message
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactClient;
"use client";
import Button from "@/component/button";
import HeaderText from "@/component/headerText";
import MobileNavigation from "@/component/partials/navigations/mobileNavigation";
import { RootState } from "@/store";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ContactUs: React.FC = () => {
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

  interface Icons {
    icon: string;
    link: string;
  }
  const SocialIcons: Icons[] = [
    {
      icon: "ri:linkedin-fill",
      link: "https://www.linkedin.com/in/naveed-abbasi",
    },
    { icon: "mdi:whatsapp", link: "https://wa.me/03111309060" },
    {
      icon: "ri:instagram-line",
      link: "https://www.instagram.com/naveed_abbasi316/",
    },
    {
      icon: "ri:facebook-fill",
      link: "https://www.linkedin.com/in/naveed-abbasi",
    },
  ];

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

      <div className="bg-[#111111]">
        <HeaderText
          backHead="Contact"
          frontHeadSimple="Get In"
          frontHeadColor="Touch"
        />

        <div className="flex w-full justify-center">
          <div className="mt-8 flex h-full w-[86%] flex-col items-center justify-center gap-4 text-white md:flex-row">
            <div className="w-full space-y-4 md:w-[35%]">
              <h1 className="font-Poppins text-3xl font-bold">
                DON&apos;T BE SHY!
              </h1>
              <p className="font-Open_Sans text-[15px] text-white">
                Feel free to get in touch with me. I am always open to
                discussing new projects, creative ideas, or opportunities to be
                part of your visions.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Icon
                    icon="mdi:contact"
                    color={selectedColor}
                    width={40}
                    height={40}
                  />
                  <span className="font-Open_Sans text-[15px] font-medium">
                    naveedabbasi8651@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon
                    icon="material-symbols:mail-sharp"
                    color={selectedColor}
                    width={40}
                    height={40}
                  />
                  <span className="font-Open_Sans text-[15px] font-medium">
                    +92 311 1309060
                  </span>
                </div>
              </div>
              <div className="mt-4 flex gap-4">
                {SocialIcons.map((icon, idx) => (
                  <a
                    href={icon.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={idx}
                    className="cursor-pointer rounded-full bg-[#252525] p-2 transition duration-200"
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
              className="mt-8 w-full space-y-4 md:mt-0 md:w-[60%]"
            >
              <div className="flex flex-col gap-4 md:flex-row">
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
                className="w-full rounded-full bg-gradient-to-r px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 disabled:opacity-50"
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

export default ContactUs;

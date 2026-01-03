// app/contact/page.tsx - SERVER COMPONENT
import ContactClient from './ContactClient';

export default function ContactPage() {
  // Static data server side par define karo
  const SocialIcons = [
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

  return <ContactClient socialIcons={SocialIcons} />;
}
import Image from "next/image";

export default function SeoImageLinks() {
  return (
    <div
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        overflow: "hidden",
        clip: "rect(0 0 0 0)",
        whiteSpace: "nowrap",
      }}
    >
      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/in/naveed-abbasi"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/assets/img/Naveed_Abbasi.png"
          alt="Naveed Abbasi LinkedIn Profile Full Stack Developer"
          width={1200}
          height={630}
          priority={false} // don't block LCP
        />
      </a>

      {/* Free Consultation */}
      <a
        href="https://calendly.com/naveedabbasi8651/30min"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/assets/img/consultation.png"
          alt="Get Free Consultation with Naveed Abbasi"
          width={1200}
          height={630}
          priority={false}
        />
      </a>

      {/* Portfolio */}
      <a href="https://naveedabbasi.vercel.app/">
        <Image
          src="/assets/img/portfolio.png"
          alt="View Portfolio of Naveed Abbasi Full Stack Developer"
          width={1200}
          height={630}
          priority={false}
        />
      </a>
    </div>
  );
}

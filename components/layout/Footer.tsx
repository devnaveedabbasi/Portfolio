import { personalInfo, navLinks, socialLinks } from "@/constant/data";
import { CurtainButton } from "@/components/ui/curtain-button";
import { GoogleMeetIcon, MailIcon } from "@/components/ui/Icons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Footer() {
  return (
    <footer className="w-full bg-[var(--footer-bg)] text-[var(--footer-text)] pt-24 pb-16 overflow-hidden transition-colors">
      <div className="mx-auto max-w-7xl px-6">
        {/* Top Callout */}
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-widest text-[var(--footer-muted)]">
            GET IN TOUCH
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--footer-text)] sm:text-5xl">
            Let&apos;s engineer something extraordinary together.
          </h2>
          <p className="mt-4 text-base text-[var(--footer-muted)]">
            Available for select freelance contracts, engineering leadership, and high-concurrency systems advisory.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CurtainButton
              text="Schedule a Call ↗"
              variant="default"
              size="lg"
              href={personalInfo.bookingUrl}
              target="_blank"
              icon={<GoogleMeetIcon />}
            />

            <CurtainButton
              text="Send an Email ↗"
              variant="outline"
              size="lg"
              href={`mailto:${personalInfo.email}`}
              icon={<MailIcon />}
            />

            <ThemeToggle className="ml-2 border-neutral-700 text-white bg-neutral-900 hover:border-white hover:bg-neutral-800" />
          </div>
        </div>

        {/* Divider */}
        <div className="my-16 h-px w-full bg-[var(--footer-border)]" />

        {/* 4 Columns Sitemap */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {/* Navigation */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--footer-muted)]">
              NAVIGATION
            </div>
            <ul className="mt-4 space-y-2.5 text-sm font-medium text-neutral-400">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="transition-colors hover:text-white">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--footer-muted)]">
              CONNECT
            </div>
            <ul className="mt-4 space-y-2.5 text-sm font-medium text-neutral-400">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    {social.name} ↗
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="transition-colors hover:text-white"
                >
                  Direct Email ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Time */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--footer-muted)]">
              LOCATION &amp; TIME
            </div>
            <div className="mt-4 space-y-2 text-sm text-neutral-300">
              <div className="font-semibold text-white">{personalInfo.location}</div>
              <div className="text-neutral-400">{personalInfo.timezone} · Worldwide</div>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--footer-border)] bg-neutral-900 px-3 py-1 text-xs text-neutral-300">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
                <span>{personalInfo.availability}</span>
              </div>
            </div>
          </div>

          {/* Edition & Colophon */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--footer-muted)]">
              EDITION &amp; CRAFT
            </div>
            <div className="mt-4 space-y-2 text-sm text-neutral-400">
              <div className="text-white font-medium">Dynamic Monochrome Edition</div>
              <div>Light &amp; Dark Theme with CSS Variables</div>
              <div className="pt-2 text-xs text-neutral-500">
                © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
              </div>
            </div>
          </div>
        </div>

        {/* Giant Monogram Typography Watermark */}
        <div className="mt-20 select-none border-t border-[var(--footer-border)] pt-10 text-center">
          <div className="text-[12vw] font-black tracking-tighter leading-none text-[var(--footer-watermark)] transition-colors">
            NAVEED ABBASI
          </div>
        </div>
      </div>
    </footer>
  );
}

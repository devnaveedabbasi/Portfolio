import { personalInfo, navLinks, socialLinks } from "@/constant/data";
import { CurtainButton } from "@/components/ui/curtain-button";
import { GoogleMeetIcon, MailIcon } from "@/components/ui/Icons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Footer() {
  return (
    <footer className="dark band w-full bg-[var(--footer-bg)] text-[var(--footer-text)] pt-24 pb-16 overflow-hidden transition-colors">
      <div className="mx-auto max-w-7xl px-6">
        {/* Top Callout */}
        <div className="max-w-3xl">
          <h2 className="display-2 max-w-2xl text-[var(--footer-text)]">
            Let&apos;s work together.
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

            <ThemeToggle className="ml-2" />
          </div>
        </div>

        {/* Divider */}
        <div className="my-16 h-px w-full bg-[var(--footer-border)]" />

        {/* 4 Columns Sitemap */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {/* Navigation */}
          <div>
            <div className="text-xs font-bold text-[var(--footer-muted)]">
              Navigation
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
            <div className="text-xs font-bold text-[var(--footer-muted)]">
              Connect
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
            <div className="text-xs font-bold text-[var(--footer-muted)]">
              Location &amp; time
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
            <div className="text-xs font-bold text-[var(--footer-muted)]">
              Edition &amp; craft
            </div>
            <div className="mt-4 space-y-2 text-sm text-neutral-400">
              <div className="text-white font-medium">Dynamic Monochrome Edition</div>
              <div>Light &amp; Dark Theme with CSS Variables</div>
              <div className="pt-2 text-xs text-neutral-400">
                © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
              </div>
            </div>
          </div>
        </div>

        {/* Giant Monogram Typography Watermark */}
        <div className="mt-20 select-none border-t border-[var(--footer-border)] pt-10 text-center overflow-hidden">
          <div className="font-display text-[9.8vw] font-bold tracking-tight whitespace-nowrap leading-none text-[var(--footer-watermark)] hover:text-brand/40 transition-colors duration-300 select-none cursor-default">
            NAVEED ABBASI
          </div>
        </div>
      </div>
    </footer>
  );
}

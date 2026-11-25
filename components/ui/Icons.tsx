import * as React from "react";

// Clean Google Meet SVG Icon
export function GoogleMeetIcon({ className = "h-4 w-4 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M15 8.5L19.5 5V19L15 15.5V8.5Z" fill="#00832D" />
      <path d="M3 6.5C3 5.12 4.12 4 5.5 4H13C14.38 4 15.5 5.12 15.5 6.5V8.5H3V6.5Z" fill="#0066DA" />
      <path d="M3 15.5H15.5V17.5C15.5 18.88 14.38 20 13 20H5.5C4.12 20 3 18.88 3 17.5V15.5Z" fill="#E53935" />
      <path d="M3 8.5H15.5V15.5H3V8.5Z" fill="#FFBA00" />
    </svg>
  );
}

// Clean Telegram Paper Plane SVG Icon
export function TelegramIcon({ className = "h-4 w-4 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10.5" fill="#229ED9" />
      <path
        d="M7.2 12.1L16.4 8.2C16.8 8 17.2 8.3 17.1 8.7L15.6 15.8C15.5 16.3 15.2 16.4 14.8 16.2L12.4 14.4L11.3 15.5C11.2 15.6 11 15.8 10.7 15.8L10.9 13.4L15.2 9.5C15.4 9.3 15.1 9.2 14.9 9.4L9.6 12.7L7.3 12.1Z"
        fill="white"
      />
    </svg>
  );
}

// Clean Chat Bubble Icon
export function ChatIcon({ className = "h-4 w-4 shrink-0" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

// Clean Sparkle / Star Icon
export function SparkleIcon({ className = "h-4 w-4 shrink-0" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
    </svg>
  );
}

// Clean Email Envelope Icon
export function MailIcon({ className = "h-4 w-4 shrink-0" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

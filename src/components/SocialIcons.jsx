export const Facebook = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.4c0-.87.24-1.46 1.5-1.46h1.6V4.34C16.3 4.24 15.4 4.15 14.35 4.15c-2.4 0-4.05 1.47-4.05 4.16v2.34H7.8v3h2.5V21h3.2Z" />
  </svg>
);

export const Instagram = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const Threads = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" {...props}>
    <path d="M12 21c-4.2 0-7.2-2.6-7.2-8.9S7.8 3 12 3c3.7 0 6.4 1.9 6.9 5.3" />
    <path d="M12.2 10.2c2.9 0 4.7 1.1 4.7 3.3 0 2.6-2.3 4-5.1 4-2.1 0-3.5-1-3.5-2.5 0-1.9 2.1-2.7 4.6-2.7 1.6 0 3 .2 4 .6" />
  </svg>
);

export const LinkedIn = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M6.94 8.5H4.56v10.94h2.38V8.5ZM5.75 4.06a1.38 1.38 0 1 0 0 2.76 1.38 1.38 0 0 0 0-2.76ZM19.44 13.4c0-3.1-1.66-4.54-3.87-4.54-1.78 0-2.58.98-3.03 1.67V8.5H10.16c.03.68 0 10.94 0 10.94h2.38v-6.11c0-.33.02-.65.12-.89.26-.65.86-1.32 1.86-1.32 1.31 0 1.84.99 1.84 2.45v5.87h2.38V13.4Z" />
  </svg>
);

export const TikTok = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M16.6 3h-2.7v12.2a2.9 2.9 0 1 1-2.05-2.77V9.6a5.6 5.6 0 1 0 4.75 5.53V9.03a7.3 7.3 0 0 0 4.4 1.47V7.8a4.6 4.6 0 0 1-4.4-4.4V3Z" />
  </svg>
);

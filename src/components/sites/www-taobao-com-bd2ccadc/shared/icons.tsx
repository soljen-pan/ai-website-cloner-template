import { cn } from "@/lib/utils";

export function iconFromHtmlEntity(code: string) {
  const match = /&#x([0-9a-f]+);/i.exec(code);
  if (!match) return "";
  return String.fromCharCode(Number.parseInt(match[1], 16));
}

export function TbIcon({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  return (
    <i className={cn("tb-ifont", className)} aria-hidden>
      {iconFromHtmlEntity(code)}
    </i>
  );
}

export function SearchCameraIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-5", className)}
      fill="none"
      aria-hidden
    >
      <path
        d="M8.5 7.5h1.2l.8-1.4h3l.8 1.4H15.5A1.5 1.5 0 0 1 17 9v6.5A1.5 1.5 0 0 1 15.5 17h-7A1.5 1.5 0 0 1 7 15.5V9a1.5 1.5 0 0 1 1.5-1.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="12.2" r="2.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 6" className={cn("size-2", className)} aria-hidden>
      <path d="M1 1.2 5 5l4-3.8" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

export function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={cn("size-3", className)} aria-hidden>
      <path d="M1 1l10 10M11 1 1 11" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function QrIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-6", className)} aria-hidden>
      <path
        d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h2v2h-2v-2Zm4 0h2v2h-2v-2Zm-4 4h2v2h-2v-2Zm4 4h2v2h-2v-2Zm0-4h2v2h-2v-2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function UserFieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-4", className)} aria-hidden>
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path
        d="M5.5 19c1.4-3 3.8-4.5 6.5-4.5S17.1 16 18.5 19"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
      />
    </svg>
  );
}

export function LockFieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-4", className)} aria-hidden>
      <rect x="6" y="10" width="12" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8.5 10V8a3.5 3.5 0 0 1 7 0v2" stroke="currentColor" strokeWidth="1.4" fill="none" />
    </svg>
  );
}

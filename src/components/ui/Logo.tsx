import { cn } from "@/lib/cn";

/** Typographic wordmark with a minimal geometric "roof + door" symbol. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("h-7 w-7", className)}>
      <rect width="32" height="32" rx="9" fill="#18181B" />
      <path d="M7.5 15.2 16 8.5l8.5 6.7" fill="none" stroke="#FACC15" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 14.6V23h10v-8.4" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" />
      <rect x="14.4" y="17.6" width="3.2" height="5.4" rx="1" fill="#FACC15" />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span className="text-[17px] font-semibold tracking-[0.14em] text-ink">FATIMA</span>
      {!compact && <span className="sr-only">Real Estate Growth System</span>}
    </span>
  );
}

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_IS_EXTERNAL } from "@/config/site";

type Variant = "primary" | "secondary" | "dark";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 ease-out will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary: "btn-primary hover:-translate-y-0.5 hover:brightness-[1.03] active:translate-y-0",
  secondary:
    "bg-surface text-ink border border-line shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-float)] active:translate-y-0",
  dark: "bg-ink text-white shadow-[0_10px_24px_-10px_rgba(24,24,27,0.6)] hover:-translate-y-0.5 hover:bg-black active:translate-y-0",
};

const sizes = {
  sm: "h-10 px-4 text-[14px]",
  md: "h-12 px-5 text-[15px]",
  lg: "h-14 px-6 text-[16px]",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  external?: boolean;
  icon?: "arrow" | "none";
};

export function Button({ href, children, variant = "primary", size = "md", className, external, icon = "arrow" }: Props) {
  const cls = cn(base, variants[variant], sizes[size], className);
  const iconEl =
    icon === "arrow" ? (
      variant === "primary" ? (
        <span className="grid h-6 w-6 place-items-center rounded-full bg-ink/90 text-yellow transition-transform duration-300 group-hover:translate-x-0.5">
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
      ) : (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      )
    ) : null;

  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
        {iconEl}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {iconEl}
    </Link>
  );
}

/** The single conversion action used everywhere on the page. */
export function PrimaryCTA({ children, size = "lg", className }: { children: React.ReactNode; size?: keyof typeof sizes; className?: string }) {
  return (
    <Button href={PRIMARY_CTA_HREF} external={PRIMARY_CTA_IS_EXTERNAL} size={size} className={className}>
      {children}
    </Button>
  );
}

import { cn } from "@/lib/cn";

/** Small white tile holding an icon — the reference's floating icon treatment. */
export function IconTile({
  children,
  className,
  tone = "white",
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "white" | "yellow" | "dark";
  size?: "sm" | "md" | "lg";
}) {
  const sizes = { sm: "h-8 w-8 rounded-[10px]", md: "h-10 w-10 rounded-xl", lg: "h-14 w-14 rounded-2xl" };
  const tones = {
    white: "bg-surface border border-line text-ink shadow-[var(--shadow-soft)]",
    yellow:
      "bg-gradient-to-b from-[#fde047] to-[#facc15] text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_6px_14px_-6px_rgba(234,179,8,0.7)]",
    dark: "bg-ink text-yellow shadow-[0_6px_14px_-6px_rgba(24,24,27,0.6)]",
  };
  return <span className={cn("grid shrink-0 place-items-center", sizes[size], tones[tone], className)}>{children}</span>;
}

import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1 pl-1 pr-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted shadow-[var(--shadow-soft)]",
        className,
      )}
    >
      <span className="relative grid h-5 w-5 place-items-center rounded-full bg-ink">
        <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
      </span>
      {children}
    </span>
  );
}

type HeadingProps = {
  label: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  align?: "center" | "left";
  titleClassName?: string;
};

export function SectionHeading({ label, title, subtitle, className, align = "center", titleClassName }: HeadingProps) {
  return (
    <Reveal className={cn("flex flex-col gap-5", align === "center" ? "items-center text-center" : "items-start text-left", className)}>
      <SectionLabel>{label}</SectionLabel>
      <h2
        className={cn(
          "max-w-[820px] text-balance text-[30px] font-semibold leading-[1.08] tracking-[-0.035em] text-ink sm:text-[40px] lg:text-[48px]",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {subtitle && <p className="max-w-[620px] text-pretty text-[16px] leading-relaxed text-muted sm:text-[17px]">{subtitle}</p>}
    </Reveal>
  );
}

export function Section({
  id,
  children,
  className,
  "aria-label": ariaLabel,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <section id={id} aria-label={ariaLabel} className={cn("relative overflow-x-clip px-4 py-20 sm:px-6 sm:py-28", className)}>
      <div className="mx-auto w-full max-w-[1200px]">{children}</div>
    </section>
  );
}

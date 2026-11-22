import { brandIcons, type BrandName } from "@/config/brand-icons";
import { cn } from "@/lib/cn";

export function BrandIcon({
  name,
  className,
  mono = false,
  title,
}: {
  name: BrandName;
  className?: string;
  mono?: boolean;
  title?: string;
}) {
  const icon = brandIcons[name];
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={title ?? icon.title} className={cn("h-5 w-5", className)}>
      <path d={icon.path} fill={mono ? "currentColor" : icon.hex} />
    </svg>
  );
}

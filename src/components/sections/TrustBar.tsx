import { Bot, Database } from "lucide-react";
import { trust } from "@/config/content";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Reveal } from "@/components/ui/Reveal";

const items = [
  { label: "Meta Ads", icon: <BrandIcon name="meta" mono className="h-5 w-5" /> },
  { label: "WhatsApp", icon: <BrandIcon name="whatsapp" mono className="h-5 w-5" /> },
  { label: "Instagram", icon: <BrandIcon name="instagram" mono className="h-5 w-5" /> },
  { label: "CRM", icon: <Database className="h-5 w-5" /> },
  { label: "Agent IA", icon: <Bot className="h-5 w-5" /> },
];

export function TrustBar() {
  return (
    <section aria-label="Écosystème" className="px-4 pb-6 sm:px-6">
      <Reveal className="mx-auto max-w-[1100px]">
        <p className="text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-ink/70">{trust.label}</p>
        <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((item) => (
            <li
              key={item.label}
              className="group relative flex items-center justify-center gap-2.5 rounded-2xl px-3 py-3 text-subtle transition-colors duration-300 hover:text-ink"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-white text-ink/45 shadow-[var(--shadow-soft)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-ink">
                {item.icon}
              </span>
              <span className="whitespace-nowrap text-[15px] font-semibold tracking-tight">{item.label}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

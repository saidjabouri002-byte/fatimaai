import { Bot, ClipboardList, GraduationCap, Gift, KanbanSquare, LayoutTemplate, Megaphone, MessagesSquare, Repeat2, Settings2 } from "lucide-react";
import { deliverables } from "@/config/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { IconTile } from "@/components/ui/IconTile";

const icons = [ClipboardList, Megaphone, LayoutTemplate, Bot, MessagesSquare, KanbanSquare, Repeat2, GraduationCap, Settings2];

export function DeliverablesSection() {
  return (
    <Section id="livrables">
      <SectionHeading label={deliverables.label} title={deliverables.title} subtitle={deliverables.subtitle} />

      <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
        {deliverables.items.map((d, i) => {
          const Icon = icons[i];
          return (
            <StaggerItem key={d.title}>
              <article className="card group relative h-full overflow-hidden p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-float)]">
                <span aria-hidden="true" className="absolute right-4 top-4 text-[40px] font-semibold leading-none tracking-tighter text-[#f1eee9] transition-colors group-hover:text-yellow-soft">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <IconTile tone={i === 3 ? "dark" : "white"} className="relative">
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </IconTile>
                <h3 className="relative mt-4 text-[16.5px] font-semibold tracking-tight text-ink">{d.title}</h3>
                <p className="relative mt-1.5 text-[14px] leading-relaxed text-muted">{d.text}</p>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>

      <Reveal className="relative mt-5">
        <div aria-hidden="true" className="absolute -inset-2 rounded-[30px] bg-[linear-gradient(90deg,rgba(250,204,21,0.45),rgba(250,204,21,0.1),rgba(250,204,21,0.45))] blur-lg" />
        <article className="relative grid items-center gap-5 overflow-hidden rounded-[24px] border border-[#f3dd8a] bg-gradient-to-br from-[#fffbe6] via-white to-[#fffbe6] p-6 sm:grid-cols-[auto_1fr_auto] sm:p-8">
          <IconTile tone="yellow" size="lg">
            <Gift className="h-6 w-6" aria-hidden="true" />
          </IconTile>
          <div>
            <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-yellow">{deliverables.bonus.label}</span>
            <h3 className="mt-3 text-[20px] font-semibold tracking-tight text-ink sm:text-[22px]">{deliverables.bonus.title}</h3>
            <p className="mt-1.5 max-w-[640px] text-[14.5px] leading-relaxed text-muted">{deliverables.bonus.text}</p>
          </div>
          <div aria-hidden="true" className="hidden gap-1.5 lg:flex">
            {["Visite", "Retour", "Relance", "Décision"].map((s, i) => (
              <span key={s} className={i === 3 ? "rounded-lg bg-ink px-2.5 py-1.5 text-[12px] font-semibold text-yellow" : "rounded-lg border border-line bg-white px-2.5 py-1.5 text-[12px] font-medium text-ink"}>
                {s}
              </span>
            ))}
          </div>
        </article>
      </Reveal>

      <Reveal className="mt-10 text-center">
        <p className="text-balance text-[17px] font-medium text-ink sm:text-[19px]">{deliverables.closing}</p>
      </Reveal>
    </Section>
  );
}

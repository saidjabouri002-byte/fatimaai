import { modules } from "@/config/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { AdsVisual, AgentVisual, BookingVisual, CrmVisual, LandingVisual, StrategyVisual } from "@/components/visuals/ModuleVisuals";

const visuals = {
  strategy: StrategyVisual,
  ads: AdsVisual,
  landing: LandingVisual,
  agent: AgentVisual,
  booking: BookingVisual,
  crm: CrmVisual,
};

export function ModulesSection() {
  return (
    <Section id="modules">
      <SectionHeading label={modules.label} title={modules.title} subtitle={modules.subtitle} />
      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {modules.items.map((m) => {
          const Visual = visuals[m.key];
          return (
            <StaggerItem key={m.key}>
              <article className="card group flex h-full flex-col p-3 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-float)]">
                <Visual />
                <div className="px-2.5 pb-2.5 pt-5">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-yellow-soft px-1.5 py-0.5 text-[11px] font-bold text-yellow-ink">{m.step}</span>
                    <h3 className="text-[18px] font-semibold tracking-tight text-ink">{m.title}</h3>
                  </div>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{m.description}</p>
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}

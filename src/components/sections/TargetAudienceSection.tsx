import { Target } from "lucide-react";
import { audiences } from "@/config/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { AgencyVisual, DeveloperVisual, OwnerVisual, audienceIcons } from "@/components/visuals/AudienceVisuals";

const visuals = { owner: OwnerVisual, agency: AgencyVisual, developer: DeveloperVisual };

export function TargetAudienceSection() {
  return (
    <Section id="solutions">
      <SectionHeading label={audiences.label} title={audiences.title} subtitle={audiences.subtitle} />
      <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {audiences.items.map((a) => {
          const Visual = visuals[a.key];
          const Icon = audienceIcons[a.key];
          return (
            <StaggerItem key={a.key} className="last:md:col-span-2 last:lg:col-span-1">
              <article className="card group flex h-full flex-col p-3 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-float)]">
                <Visual />
                <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
                  <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
                    <Icon className="h-3.5 w-3.5 text-yellow-ink" aria-hidden="true" />
                    {a.eyebrow}
                  </div>
                  <h3 className="mt-2 text-[21px] font-semibold tracking-tight text-ink">{a.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{a.description}</p>
                  <p className="mt-auto flex items-start gap-2 border-t border-line-2 pt-4 text-[13.5px] font-medium leading-snug text-ink">
                    <Target className="mt-0.5 h-4 w-4 shrink-0 text-yellow-hover" aria-hidden="true" />
                    <span>
                      <span className="text-muted">Votre objectif : </span>
                      {a.goal}
                    </span>
                  </p>
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}

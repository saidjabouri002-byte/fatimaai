import { ArrowDownRight, Minus } from "lucide-react";
import { problem } from "@/config/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { AnalyticsVisual, DelayVisual, FilterVisual, FollowUpVisual, ImpressionsVisual } from "@/components/visuals/ProblemVisuals";
import { cn } from "@/lib/cn";

const visuals = [ImpressionsVisual, FilterVisual, DelayVisual, FollowUpVisual, AnalyticsVisual];
const spans = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

export function ProblemSection() {
  return (
    <Section id="probleme">
      <SectionHeading label={problem.label} title={problem.title} titleClassName="max-w-[940px] lg:text-[44px]" />

      <Reveal className="mx-auto mt-12 max-w-[980px]">
        <div className="rounded-[22px] border border-dashed border-[#dcd7cf] bg-white/50 p-5 sm:p-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">{problem.triedLabel}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {problem.tried.map((t) => (
              <li key={t} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-[13px] text-ink/75 shadow-[var(--shadow-soft)]">
                <Minus className="h-3 w-3 text-subtle" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[14.5px] font-medium text-ink">{problem.triedNote}</p>
        </div>
      </Reveal>

      <h3 className="sr-only">Pourquoi ?</h3>
      <Stagger className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
        {problem.items.map((item, i) => {
          const Visual = visuals[i];
          return (
            <StaggerItem key={item.title} className={cn(spans[i], i === 4 && "md:col-span-2 lg:col-span-2")}>
              <article className="card flex h-full flex-col gap-5 p-3 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-float)]">
                <Visual />
                <div className="px-2 pb-2">
                  <span className="text-[12px] font-semibold text-yellow-ink">Problème 0{i + 1}</span>
                  <h4 className="mt-1 text-[17.5px] font-semibold leading-snug tracking-tight text-ink">{item.title}</h4>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{item.text}</p>
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>

      <Reveal className="relative mt-8 overflow-hidden rounded-[26px] bg-ink p-7 text-white sm:p-10">
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.35),transparent_65%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="relative grid items-center gap-6 lg:grid-cols-[auto_1fr_auto]">
          <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-yellow">Le véritable enjeu</span>
          <p className="text-balance text-[19px] font-medium leading-snug tracking-tight sm:text-[22px]">{problem.stake}</p>
          <span className="inline-flex items-center gap-2 whitespace-nowrap text-[14px] font-semibold text-yellow">
            {problem.stakeNote}
            <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Reveal>
    </Section>
  );
}

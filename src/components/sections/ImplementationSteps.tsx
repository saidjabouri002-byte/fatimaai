import { Compass, LineChart, Map, Rocket, Search } from "lucide-react";
import { roadmap } from "@/config/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const icons = [Search, Map, Rocket, Compass, LineChart];
const offsets = ["lg:mt-0", "lg:mt-16", "lg:mt-4", "lg:mt-20", "lg:mt-8"];
const rotations = ["lg:-rotate-2", "lg:rotate-2", "lg:-rotate-1", "lg:rotate-2", "lg:-rotate-2"];

export function ImplementationSteps() {
  return (
    <Section id="demarrer">
      <SectionHeading label={roadmap.label} title={roadmap.title} />

      <div className="relative mt-16">
        {/* desktop connector */}
        <svg aria-hidden="true" viewBox="0 0 1200 200" preserveAspectRatio="none" className="absolute inset-x-0 top-10 hidden h-[200px] w-full lg:block">
          <path
            d="M120 30 C 220 30, 260 110, 360 110 S 520 40, 600 40 S 760 130, 840 130 S 1000 60, 1080 60"
            fill="none"
            stroke="#e0a80d"
            strokeOpacity=".55"
            strokeWidth="1.4"
            strokeDasharray="5 6"
            vectorEffect="non-scaling-stroke"
            className="animate-dash"
          />
        </svg>
        {/* mobile spine */}
        <span aria-hidden="true" className="absolute bottom-8 left-[21px] top-8 w-px border-l border-dashed border-[#d9c37a] lg:hidden" />

        <Stagger className="relative grid gap-5 lg:grid-cols-5 lg:gap-4" stagger={0.12}>
          {roadmap.steps.map((s, i) => {
            const Icon = icons[i];
            return (
              <StaggerItem key={s.title} className={cn("relative pl-14 lg:pl-0", offsets[i])}>
                <span className="absolute left-0 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border-4 border-page bg-yellow text-[13px] font-bold text-ink shadow-[0_6px_14px_-6px_rgba(234,179,8,0.8)] lg:hidden">
                  {i + 1}
                </span>
                <article className={cn("card relative p-5 transition-transform duration-500 hover:rotate-0 hover:-translate-y-1", rotations[i])}>
                  <span aria-hidden="true" className="absolute -top-3 left-1/2 hidden h-6 w-6 -translate-x-1/2 place-items-center rounded-full bg-yellow text-[11px] font-bold text-ink shadow-[0_4px_10px_-2px_rgba(234,179,8,0.8)] ring-4 ring-page lg:grid">
                    {i + 1}
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-yellow-ink shadow-[var(--shadow-soft)]">
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle">Étape {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 text-[16px] font-semibold leading-snug tracking-tight text-ink">{s.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{s.text}</p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>

      <Reveal className="mx-auto mt-14 max-w-[760px] text-center">
        <p className="text-balance text-[16px] leading-relaxed text-muted sm:text-[17px]">{roadmap.note}</p>
      </Reveal>
    </Section>
  );
}

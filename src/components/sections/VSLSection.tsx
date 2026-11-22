import { CheckCircle2, Layers } from "lucide-react";
import { vsl } from "@/config/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PrimaryCTA } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { VideoPlayer } from "@/components/ui/VideoPlayer";

export function VSLSection() {
  return (
    <Section id="video" className="!pt-6 sm:!pt-10" aria-label="Vidéo de présentation">
      <SectionHeading label={vsl.label} title={vsl.title} subtitle={vsl.subtitle} titleClassName="lg:text-[44px] max-w-[880px]" />

      <Reveal delay={0.1} className="relative mx-auto mt-12 max-w-[1050px]">
        <div aria-hidden="true" className="absolute -inset-x-10 -inset-y-8 rounded-[48px] bg-[radial-gradient(ellipse_at_center,rgba(250,204,21,0.32),transparent_65%)] blur-2xl" />
        <div className="relative rounded-[28px] border border-line bg-white p-2 shadow-[var(--shadow-card)] sm:p-2.5">
          <div className="relative aspect-video overflow-hidden rounded-[20px] sm:rounded-[22px]">
            <VideoPlayer title={vsl.title} />
          </div>
        </div>

        <div className="absolute -top-6 right-4 hidden max-w-[260px] animate-float-slow sm:block md:-right-10 md:top-12" style={{ ["--r" as string]: "3deg" }}>
          <div className="tile flex items-center gap-3 p-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink text-yellow">
              <Layers className="h-4 w-4" />
            </span>
            <p className="text-[13px] font-semibold leading-snug text-ink">{vsl.floating}</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.15} className="mx-auto mt-14 grid max-w-[1050px] gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
        {vsl.promises.map((p) => (
          <div key={p} className="flex items-start gap-2.5 rounded-2xl border border-line bg-white/70 p-3.5 text-[13.5px] leading-snug text-ink/80">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-yellow-ink" aria-hidden="true" />
            {p}
          </div>
        ))}
      </Reveal>

      <Reveal delay={0.2} className="mt-10 flex flex-col items-center gap-3 text-center">
        <PrimaryCTA className="w-full sm:w-auto">{vsl.cta}</PrimaryCTA>
        <p className="max-w-[460px] text-[13px] text-muted">{vsl.ctaNote}</p>
      </Reveal>
    </Section>
  );
}

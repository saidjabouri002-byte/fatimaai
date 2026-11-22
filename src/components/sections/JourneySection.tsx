"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Bot, CalendarClock, Eye, Handshake, MessageSquareText, Smartphone, UserRoundCheck } from "lucide-react";
import { journey } from "@/config/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { cn } from "@/lib/cn";

const icons = [Smartphone, Eye, MessageSquareText, Bot, CalendarClock, UserRoundCheck, Handshake];

function StepArt({ i }: { i: number }) {
  // Small contextual illustration per step.
  const chip = "inline-flex items-center gap-1 rounded-md border border-line bg-white px-1.5 py-0.5 text-[10px] font-medium text-ink/80";
  switch (i) {
    case 0:
      return (
        <span className="flex gap-1.5">
          <span className={chip}>
            <BrandIcon name="facebook" className="h-3 w-3" /> Facebook
          </span>
          <span className={chip}>
            <BrandIcon name="instagram" className="h-3 w-3" /> Instagram
          </span>
        </span>
      );
    case 1:
      return (
        <span className="flex gap-1.5">
          {["Photos", "Emplacement", "Prix"].map((t) => (
            <span key={t} className={chip}>
              {t}
            </span>
          ))}
        </span>
      );
    case 2:
      return (
        <span className="flex gap-1.5">
          <span className={chip}>Formulaire</span>
          <span className={chip}>
            <BrandIcon name="whatsapp" className="h-3 w-3" /> WhatsApp
          </span>
        </span>
      );
    case 3:
      return (
        <span className="flex flex-wrap gap-1.5">
          {["Type : F3", "Budget", "Délai"].map((t) => (
            <span key={t} className="rounded-md border border-[#f3dd8a] bg-yellow-soft px-1.5 py-0.5 text-[10px] font-semibold text-yellow-ink">
              {t}
            </span>
          ))}
        </span>
      );
    case 4:
      return (
        <span className="flex gap-1.5">
          {["Mar. 10:00", "Jeu. 14:30"].map((t, k) => (
            <span key={t} className={cn(chip, k === 1 && "border-ink bg-ink text-yellow")}>
              {t}
            </span>
          ))}
        </span>
      );
    case 5:
      return <span className={chip}>Fiche prospect transmise</span>;
    default:
      return (
        <span className="flex gap-1.5">
          <span className={chip}>Relance</span>
          <span className={chip}>Négociation</span>
          <span className={cn(chip, "border-ink bg-ink text-yellow")}>Décision</span>
        </span>
      );
  }
}

export function JourneySection() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <Section id="parcours">
      <SectionHeading label={journey.label} title={journey.title} subtitle={journey.subtitle} />

      <ol ref={ref} className="relative mx-auto mt-16 max-w-[980px]">
        {/* spine */}
        <span aria-hidden="true" className="absolute bottom-4 left-[19px] top-4 w-px border-l border-dashed border-[#d9d5ce] md:left-1/2" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: progress }}
          className="absolute bottom-4 left-[18px] top-4 w-[3px] origin-top rounded-full bg-gradient-to-b from-yellow to-yellow-hover md:left-[calc(50%-1px)]"
        />

        {journey.steps.map((step, i) => {
          const Icon = icons[i];
          const right = i % 2 === 1;
          return (
            <li key={step.title} className="relative grid grid-cols-[40px_1fr] gap-4 pb-6 last:pb-0 md:grid-cols-2 md:gap-14 md:pb-0 md:[&:not(:first-child)]:-mt-16">
              {/* milestone dot */}
              <span
                aria-hidden="true"
                className="absolute left-[20px] top-7 z-10 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full bg-white shadow-[var(--shadow-soft)] md:left-1/2"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-yellow ring-4 ring-yellow-soft" />
              </span>
              <span className="md:hidden" />
              <Reveal
                y={24}
                className={cn("md:py-4", right ? "md:col-start-2" : "md:col-start-1 md:row-start-1")}
              >
                <article
                  className={cn(
                    "card relative p-4 transition-transform duration-500 hover:rotate-0 sm:p-5",
                    right ? "md:rotate-[1.2deg]" : "md:-rotate-[1.2deg]",
                    i === 3 && "border-[#f3dd8a]",
                  )}
                >
                  <span aria-hidden="true" className="absolute -top-1.5 left-6 h-3 w-3 rounded-full bg-yellow shadow-[0_2px_4px_rgba(161,98,7,0.4)] ring-2 ring-white" />
                  <div className="flex items-start gap-3">
                    <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl", i === 3 ? "bg-ink text-yellow" : "bg-yellow-soft text-yellow-ink")}>
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle">Étape {String(i + 1).padStart(2, "0")}</p>
                      <h3 className="mt-0.5 text-[16.5px] font-semibold leading-snug tracking-tight text-ink">{step.title}</h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{step.text}</p>
                      <div className="mt-3 overflow-hidden" aria-hidden="true">
                        <StepArt i={i} />
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>

      <Reveal className="mx-auto mt-14 max-w-[820px]">
        <div className="card flex flex-col items-center gap-3 p-6 text-center sm:p-8">
          <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-yellow-ink">Le principe est simple</span>
          <p className="text-balance text-[18px] font-medium leading-snug tracking-tight text-ink sm:text-[21px]">{journey.principle}</p>
        </div>
      </Reveal>
    </Section>
  );
}

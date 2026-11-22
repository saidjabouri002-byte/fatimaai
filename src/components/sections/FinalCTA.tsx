import { CalendarCheck2, Check, ShieldCheck, TrendingUp, UserCheck } from "lucide-react";
import { finalCta } from "@/config/content";
import { CONSULTATION_URL } from "@/config/site";
import { SectionLabel } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PrimaryCTA } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { ConsultationForm } from "./ConsultationForm";

function MiniDashboard() {
  const bars = [38, 52, 46, 64, 58, 76, 88];
  return (
    <div aria-hidden="true" className="relative mt-10 hidden h-[220px] sm:block">
      <div className="tile absolute left-0 top-0 w-[64%] p-4">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold text-ink">Votre système d&apos;acquisition</p>
          <span className="text-[10px] font-medium uppercase tracking-wider text-subtle">Illustration</span>
        </div>
        <div className="mt-4 flex h-[92px] items-end gap-2">
          {bars.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-md"
              style={{ height: `${h}%`, background: i === bars.length - 1 ? "#18181b" : `rgba(250,204,21,${0.35 + i * 0.09})` }}
            />
          ))}
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          <BrandIcon name="meta" className="h-3.5 w-3.5" />
          <BrandIcon name="googleads" className="h-3.5 w-3.5" />
          <BrandIcon name="whatsapp" className="h-3.5 w-3.5" />
          <BrandIcon name="instagram" className="h-3.5 w-3.5" />
          <span className="ml-auto text-[10px] font-medium text-muted">Publicité → Visite</span>
        </div>
      </div>
      <div className="tile absolute right-0 top-6 w-[40%] rotate-3 p-3 animate-float" style={{ ["--r" as string]: "3deg" }}>
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-yellow text-ink">
          <CalendarCheck2 className="h-4 w-4" />
        </span>
        <p className="mt-2 text-[12px] font-semibold text-ink">Visite programmée</p>
        <p className="text-[10.5px] text-muted">Prospect qualifié · F3</p>
      </div>
      <div className="tile absolute bottom-0 left-[18%] flex items-center gap-2 px-3 py-2 -rotate-2 animate-float-slow" style={{ ["--r" as string]: "-2deg", animationDelay: "1s" }}>
        <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-yellow">
          <UserCheck className="h-3.5 w-3.5" />
        </span>
        <p className="text-[11.5px] font-semibold text-ink">Nouveau prospect qualifié</p>
      </div>
      <div className="tile absolute bottom-6 right-[6%] grid h-11 w-11 place-items-center">
        <TrendingUp className="h-5 w-5 text-yellow-ink" />
      </div>
    </div>
  );
}

export function FinalCTA() {
  return (
    <section id="diagnostic" aria-labelledby="final-title" className="relative px-3 pb-20 pt-10 sm:px-6 sm:pb-28">
      <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[32px] border border-line bg-[#fdfbf6] px-5 py-12 sm:rounded-[40px] sm:px-10 sm:py-16 lg:px-14 lg:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 -top-40 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.38),transparent_62%)] blur-2xl" />
          <div className="absolute -bottom-48 right-[-120px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.25),transparent_62%)] blur-2xl" />
          <div className="dot-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
        </div>

        <div className="relative grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <Reveal>
            <SectionLabel>{finalCta.label}</SectionLabel>
            <h2 id="final-title" className="mt-5 text-balance text-[32px] font-semibold leading-[1.06] tracking-[-0.04em] text-ink sm:text-[44px] lg:text-[50px]">
              Vos prochains acheteurs sont peut-être <span className="highlight">déjà à la recherche</span> d&apos;un bien comme le vôtre.
            </h2>
            <p className="mt-5 max-w-[520px] text-[16.5px] leading-relaxed text-muted">{finalCta.subtitle}</p>
            <p className="mt-4 max-w-[520px] text-[15px] font-medium leading-relaxed text-ink">{finalCta.question}</p>

            {CONSULTATION_URL && (
              <div className="mt-7">
                <PrimaryCTA>{finalCta.primary}</PrimaryCTA>
              </div>
            )}
            <p className="mt-5 text-[13.5px] font-medium text-muted">{finalCta.note}</p>

            <div className="mt-8 rounded-2xl border border-line bg-white/70 p-5 backdrop-blur">
              <p className="text-[13px] font-semibold text-ink">{finalCta.reviewLabel}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {finalCta.review.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-[13.5px] leading-snug text-ink/80">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-yellow-hover" strokeWidth={3} aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-start gap-2 border-t border-line-2 pt-4 text-[13px] font-medium leading-snug text-ink">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-yellow-ink" aria-hidden="true" />
                {finalCta.commitment}
              </p>
            </div>

            <MiniDashboard />
          </Reveal>

          <Reveal delay={0.1} className="relative lg:sticky lg:top-28">
            <div aria-hidden="true" className="absolute -inset-3 rounded-[32px] bg-[radial-gradient(ellipse_at_top,rgba(250,204,21,0.35),transparent_65%)] blur-xl" />
            <div className="card relative rounded-[26px]">
              <ConsultationForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

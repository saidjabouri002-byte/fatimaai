import { Check, FileText, Receipt, Sparkles } from "lucide-react";
import { offer } from "@/config/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PrimaryCTA } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";

export function OfferSection() {
  return (
    <Section id="offre">
      <SectionHeading label={offer.label} title={offer.title} subtitle={offer.subtitle} />

      <Reveal className="relative mx-auto mt-14 max-w-[1040px]">
        <div aria-hidden="true" className="absolute -inset-6 rounded-[44px] bg-[radial-gradient(ellipse_at_center,rgba(250,204,21,0.35),transparent_70%)] blur-2xl" />
        <div className="relative rounded-[30px] bg-gradient-to-b from-[#fde047] via-[#facc15]/40 to-[#eae7e2] p-px shadow-[0_40px_80px_-40px_rgba(161,98,7,0.45)]">
          <div className="grid overflow-hidden rounded-[29px] bg-white lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-6 sm:p-10">
              <div className="flex items-center gap-3">
                <LogoMark className="h-11 w-11" />
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-yellow-ink">Offre</p>
                  <h3 className="text-[20px] font-semibold tracking-tight text-ink sm:text-[24px]">{offer.name}</h3>
                </div>
              </div>
              <p className="mt-5 text-[15.5px] leading-relaxed text-muted">{offer.description}</p>

              <p className="mt-7 text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">{offer.includedLabel}</p>
              <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {offer.included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[14.5px] leading-snug text-ink/85">
                    <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-yellow">
                      <Check className="h-3 w-3 text-ink" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative flex flex-col gap-4 border-t border-line bg-[linear-gradient(180deg,#fcfbf8,#f7f4ee)] p-6 sm:p-10 lg:border-l lg:border-t-0">
              <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-50" />
              <p className="relative flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">
                <Sparkles className="h-4 w-4 text-yellow-ink" aria-hidden="true" /> Votre investissement
              </p>
              {offer.pricing.map((p, i) => (
                <div key={p.label} className="relative rounded-2xl border border-line bg-white p-4 shadow-[var(--shadow-soft)]">
                  <p className="flex items-center gap-2 text-[12.5px] font-medium text-muted">
                    {i === 0 ? <FileText className="h-3.5 w-3.5" aria-hidden="true" /> : <Receipt className="h-3.5 w-3.5" aria-hidden="true" />}
                    {p.label}
                  </p>
                  <p className="mt-1 text-[19px] font-semibold tracking-tight text-ink">{p.value}</p>
                </div>
              ))}
              <p className="relative text-[13px] leading-relaxed text-muted">{offer.pricingNote}</p>
              <p className="relative rounded-xl border border-dashed border-[#dcd7cf] bg-white/70 p-3 text-[12.5px] leading-relaxed text-muted">{offer.disclaimer}</p>
              <div className="relative mt-auto flex flex-col gap-2 pt-2">
                <PrimaryCTA size="lg" className="w-full !px-4 text-[15px]">{offer.cta}</PrimaryCTA>
                <p className="text-center text-[12.5px] text-muted">{offer.ctaNote}</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

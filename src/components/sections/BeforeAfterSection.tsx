import {
  ArrowRight,
  BellOff,
  CalendarX2,
  CalendarCheck2,
  Crosshair,
  Filter,
  Ghost,
  LineChart,
  MessageCircleOff,
  MessagesSquare,
  Newspaper,
  RefreshCcw,
  Shuffle,
  UserX,
  KanbanSquare,
  X,
  Check,
} from "lucide-react";
import { beforeAfter } from "@/config/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/ui/Logo";

const beforeIcons = [Shuffle, Newspaper, UserX, MessageCircleOff, CalendarX2, Ghost, BellOff];
const afterIcons = [Crosshair, Filter, MessagesSquare, CalendarCheck2, RefreshCcw, KanbanSquare, LineChart];

function BeforeVisual() {
  return (
    <div aria-hidden="true" className="relative h-[120px] overflow-hidden rounded-2xl border border-line bg-surface-2">
      <div className="dot-grid absolute inset-0 opacity-60" />
      {[
        { x: "8%", y: "16%", r: -8, t: "Bonjour, c'est dispo ?" },
        { x: "46%", y: "10%", r: 5, t: "Prix ?" },
        { x: "20%", y: "56%", r: 4, t: "Toujours à vendre ?" },
        { x: "60%", y: "52%", r: -6, t: "Je peux visiter ?" },
      ].map((m, i) => (
        <span
          key={i}
          className="absolute inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-2.5 py-1.5 text-[11px] text-muted shadow-[var(--shadow-soft)]"
          style={{ left: m.x, top: m.y, transform: `rotate(${m.r}deg)` }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#d4d4d8]" />
          {m.t}
          <span className="ml-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#e4e4e7] px-1 text-[9px] font-semibold text-ink/50">{i + 2}</span>
        </span>
      ))}
    </div>
  );
}

function AfterVisual() {
  const bars = [
    { label: "Demandes", w: "100%" },
    { label: "Qualifiés", w: "68%" },
    { label: "Visites", w: "44%" },
    { label: "Transactions", w: "24%" },
  ];
  return (
    <div aria-hidden="true" className="relative h-[120px] overflow-hidden rounded-2xl border border-[#f4e3a1] bg-gradient-to-br from-[#fffdf2] to-white p-3.5">
      <div className="flex h-full flex-col justify-between">
        {bars.map((b, i) => (
          <div key={b.label} className="flex items-center gap-3">
            <span className="w-[78px] shrink-0 text-[10.5px] font-medium text-muted">{b.label}</span>
            <div className="h-[14px] flex-1 rounded-full bg-[#f5f1e6]">
              <div
                className="h-full rounded-full"
                style={{
                  width: b.w,
                  background: i === 3 ? "#18181b" : `linear-gradient(90deg, #fde047, #facc15)`,
                  opacity: i === 3 ? 1 : 1 - i * 0.12,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export function BeforeAfterSection() {
  return (
    <Section id="transformation">
      <SectionHeading label={beforeAfter.label} title={beforeAfter.title} subtitle={beforeAfter.intro} />

      <div className="relative mt-14 grid items-stretch gap-5 lg:grid-cols-2 lg:gap-8">
        {/* connector */}
        <div aria-hidden="true" className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          <span className="grid h-14 w-14 place-items-center rounded-full border border-line bg-white shadow-[var(--shadow-float)]">
            <span className="btn-primary grid h-10 w-10 place-items-center rounded-full">
              <ArrowRight className="h-5 w-5" />
            </span>
          </span>
        </div>

        <Reveal className="card relative flex flex-col gap-5 bg-[#fcfbf9] p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-subtle">
                <X className="h-5 w-5" />
              </span>
              <h3 className="text-[20px] font-semibold tracking-tight text-ink/70">{beforeAfter.before.title}</h3>
            </div>
            <span className="rounded-full bg-[#f1f0ee] px-2.5 py-1 text-[11px] font-medium text-muted">Prospection aléatoire</span>
          </div>
          <BeforeVisual />
          <ul className="flex flex-col divide-y divide-line-2">
            {beforeAfter.before.items.map((item, i) => {
              const Icon = beforeIcons[i];
              return (
                <li key={item.short} className="flex items-start gap-3 py-3">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#f1f0ee] text-[#a1a1aa]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[15px] font-medium text-ink/60 line-through decoration-[#d4d4d8] decoration-1">{item.short}</p>
                    <p className="text-[13px] leading-snug text-subtle">{item.long}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.12} className="relative">
          <div aria-hidden="true" className="absolute -inset-3 rounded-[30px] bg-[radial-gradient(ellipse_at_top_right,rgba(250,204,21,0.35),transparent_60%)] blur-xl" />
          <div className="card relative flex h-full flex-col gap-5 border-[#f3dd8a] p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <LogoMark className="h-10 w-10" />
                <h3 className="text-[20px] font-semibold tracking-tight text-ink">{beforeAfter.after.title}</h3>
              </div>
              <span className="rounded-full bg-yellow-soft px-2.5 py-1 text-[11px] font-semibold text-yellow-ink">Système structuré</span>
            </div>
            <AfterVisual />
            <ul className="flex flex-col divide-y divide-line-2">
              {beforeAfter.after.items.map((item, i) => {
                const Icon = afterIcons[i];
                return (
                  <li key={item.short} className="flex items-start gap-3 py-3">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-yellow-soft text-yellow-ink">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="flex-1">
                      <p className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                        {item.short}
                      </p>
                      <p className="text-[13px] leading-snug text-muted">{item.long}</p>
                    </div>
                    <Check className="mt-1.5 h-4 w-4 shrink-0 text-yellow-hover" strokeWidth={3} aria-hidden="true" />
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal className="mx-auto mt-10 max-w-[720px] text-center">
        <p className="text-balance text-[18px] font-medium leading-snug tracking-tight text-ink sm:text-[20px]">
          <span className="highlight">{beforeAfter.goal}</span>
        </p>
      </Reveal>
    </Section>
  );
}

"use client";

import { motion } from "motion/react";
import { Bot, CalendarCheck2, CircleDollarSign, KanbanSquare, LayoutTemplate, Megaphone, UserCheck, X, Check } from "lucide-react";
import { system } from "@/config/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { cn } from "@/lib/cn";

const icons = [Megaphone, LayoutTemplate, UserCheck, Bot, CalendarCheck2, KanbanSquare, CircleDollarSign];

const W = 1200;
const H = 470;
const nodes = [
  { x: 95, y: 152 },
  { x: 268, y: 312 },
  { x: 438, y: 152 },
  { x: 600, y: 312 },
  { x: 762, y: 152 },
  { x: 932, y: 312 },
  { x: 1105, y: 152 },
];

const pathD = nodes.reduce((d, n, i) => {
  if (i === 0) return `M ${n.x} ${n.y}`;
  const p = nodes[i - 1];
  const mx = (p.x + n.x) / 2;
  return `${d} C ${mx} ${p.y}, ${mx} ${n.y}, ${n.x} ${n.y}`;
}, "");

const ease = [0.22, 1, 0.36, 1] as const;

function NodeExtra({ i }: { i: number }) {
  if (i === 0)
    return (
      <span className="mt-2 flex gap-1">
        <BrandIcon name="meta" className="h-3.5 w-3.5" />
        <BrandIcon name="googleads" className="h-3.5 w-3.5" />
      </span>
    );
  if (i === 3)
    return (
      <span className="mt-2 flex gap-1">
        <BrandIcon name="whatsapp" className="h-3.5 w-3.5" />
        <BrandIcon name="instagram" className="h-3.5 w-3.5" />
      </span>
    );
  return null;
}

function NodeCard({ i, className }: { i: number; className?: string }) {
  const step = system.steps[i];
  const Icon = icons[i];
  const featured = i === 3;
  const last = i === system.steps.length - 1;
  return (
    <div
      className={cn(
        "relative flex w-[164px] flex-col rounded-[18px] border p-3 text-left transition-transform duration-500 hover:-translate-y-1",
        featured
          ? "border-ink bg-ink text-white shadow-[0_24px_40px_-20px_rgba(24,24,27,0.6)]"
          : "border-line bg-white shadow-[var(--shadow-float)]",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "grid h-8 w-8 place-items-center rounded-[10px]",
            featured ? "bg-yellow text-ink" : last ? "bg-ink text-yellow" : "bg-yellow-soft text-yellow-ink",
          )}
        >
          <Icon className="h-4 w-4" />
        </span>
        <span className={cn("text-[10px] font-semibold", featured ? "text-white/50" : "text-subtle")}>0{i + 1}</span>
      </div>
      <p className={cn("mt-2.5 text-[13px] font-semibold leading-tight", featured ? "text-white" : "text-ink")}>{step.title}</p>
      <p className={cn("mt-0.5 text-[10.5px]", featured ? "text-white/60" : "text-muted")}>{step.meta}</p>
      <NodeExtra i={i} />
    </div>
  );
}

function DesktopDiagram() {
  return (
    <div className="relative mx-auto mt-16 hidden w-full lg:block" style={{ aspectRatio: `${W} / ${H}` }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d={pathD} fill="none" stroke="#e7e3dc" strokeWidth="2" />
        <motion.path
          d={pathD}
          fill="none"
          stroke="#facc15"
          strokeWidth="2.2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 2.4, ease: "easeInOut" }}
        />
        <path d={pathD} fill="none" stroke="#18181b" strokeOpacity=".5" strokeWidth="1.4" strokeDasharray="1 26" strokeLinecap="round" className="animate-dash" />
        {nodes.map((n, i) => (
          <motion.g
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ delay: 0.25 + i * 0.3, duration: 0.4 }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <circle cx={n.x} cy={n.y} r="9" fill="#fef9c3" />
            <circle cx={n.x} cy={n.y} r="4.5" fill="#facc15" stroke="#fff" strokeWidth="1.5" />
          </motion.g>
        ))}
      </svg>
      {nodes.map((n, i) => (
        <motion.div
          key={i}
          className="absolute -translate-x-1/2"
          style={{ left: `${(n.x / W) * 100}%`, top: `${(n.y / H) * 100}%` }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ delay: 0.3 + i * 0.3, duration: 0.6, ease }}
        >
          <div className={cn(i % 2 === 0 ? "-translate-y-[calc(100%+22px)]" : "translate-y-[22px]")}>
            <NodeCard i={i} className={i % 2 === 0 ? "-rotate-[1.5deg]" : "rotate-[1.5deg]"} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function MobileDiagram() {
  return (
    <ol className="relative mx-auto mt-12 flex max-w-[420px] flex-col gap-4 lg:hidden">
      <span aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-0.5 rounded bg-gradient-to-b from-yellow via-yellow/70 to-yellow/30" />
      {system.steps.map((s, i) => {
        const Icon = icons[i];
        const featured = i === 3;
        return (
          <motion.li
            key={s.title}
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease, delay: 0.05 * i }}
            className="relative flex items-center gap-4"
          >
            <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-4 border-page bg-yellow text-[12px] font-bold text-ink">
              {i + 1}
            </span>
            <div
              className={cn(
                "flex flex-1 items-center gap-3 rounded-2xl border p-3",
                featured ? "border-ink bg-ink text-white" : "border-line bg-white shadow-[var(--shadow-soft)]",
              )}
            >
              <span className={cn("grid h-9 w-9 place-items-center rounded-xl", featured ? "bg-yellow text-ink" : "bg-yellow-soft text-yellow-ink")}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[15px] font-semibold">{s.title}</p>
                <p className={cn("text-[12px]", featured ? "text-white/60" : "text-muted")}>{s.meta}</p>
              </div>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}

export function SystemOverviewSection() {
  return (
    <Section id="systeme" className="overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/3 h-[480px] bg-[radial-gradient(ellipse_at_center,rgba(250,204,21,0.12),transparent_65%)]" />
      <SectionHeading label={system.label} title={system.title} subtitle={system.subtitle} />
      <DesktopDiagram />
      <MobileDiagram />

      <div className="mt-16 grid gap-5 lg:mt-10 lg:grid-cols-2">
        <Reveal className="card p-6 sm:p-7">
          <h3 className="text-[18px] font-semibold tracking-tight text-ink/70">{system.classic.title}</h3>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {system.classic.items.map((t) => (
              <li key={t} className="flex items-start gap-2 rounded-xl border border-dashed border-[#dcd7cf] bg-surface-2/60 p-3 text-[13.5px] leading-snug text-muted">
                <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-subtle" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[14px] font-medium text-ink/80">{system.classic.note}</p>
        </Reveal>
        <Reveal delay={0.1} className="card relative overflow-hidden border-[#f3dd8a] p-6 sm:p-7">
          <div aria-hidden="true" className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.3),transparent_65%)]" />
          <h3 className="relative text-[18px] font-semibold tracking-tight text-ink">{system.ours.title}</h3>
          <p className="relative mt-4 flex flex-wrap items-center gap-1.5 text-[12.5px] font-semibold text-ink">
            {["Publicité", "Demande", "Qualification", "Rendez-vous", "Suivi commercial", "Transaction"].map((s, i) => (
              <span key={s} className="inline-flex items-center gap-1.5">
                {i > 0 && <span className="text-yellow-hover">→</span>}
                <span className="rounded-lg bg-yellow-soft px-2 py-1">{s}</span>
              </span>
            ))}
          </p>
          <p className="relative mt-4 text-[14.5px] leading-relaxed text-muted">{system.ours.text}</p>
          <p className="relative mt-4 flex items-start gap-2 text-[14.5px] font-medium leading-snug text-ink">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-yellow-hover" strokeWidth={3} aria-hidden="true" />
            {system.ours.difference}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

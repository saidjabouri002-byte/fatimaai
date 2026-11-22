"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Bot, CalendarCheck2, Check, CheckCheck, Database, Home, RotateCcw, Target, Wallet, Info } from "lucide-react";
import { agentDemo } from "@/config/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { cn } from "@/lib/cn";

type Msg = (typeof agentDemo.conversation)[number];

const fields = [
  { key: "type", label: "Recherche", value: "F3 · Alger", icon: Home, unlock: 1 },
  { key: "budget", label: "Budget", value: "≈ 15 M DA", icon: Wallet, unlock: 3 },
  { key: "intent", label: "Intention", value: "Résidence principale", icon: Target, unlock: 5 },
  { key: "visit", label: "Visite", value: "Souhaitée", icon: CalendarCheck2, unlock: 7 },
] as const;

function Typing() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex w-fit items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-3.5 py-3 shadow-[var(--shadow-soft)]"
      aria-label="FATIMA écrit…"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-muted"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </motion.div>
  );
}

function Bubble({ m, index }: { m: Msg; index: number }) {
  const lead = m.from === "lead";
  const time = `10:${String(2 + index).padStart(2, "0")}`;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex", lead ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[82%] rounded-2xl px-3.5 py-2 text-[14px] leading-snug text-ink shadow-[var(--shadow-soft)]",
          lead ? "rounded-tr-sm bg-[#d9fdd3]" : "rounded-tl-sm bg-white",
        )}
      >
        {m.text}
        <span className="ml-2 inline-flex translate-y-0.5 items-center gap-0.5 text-[10px] text-muted">
          {time}
          {lead && <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" />}
        </span>
      </div>
    </motion.div>
  );
}

export function AIAgentDemo() {
  const conv = agentDemo.conversation;
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [run, setRun] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, margin: "-120px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setCount(conv.length);
      return;
    }
    if (count >= conv.length) return;
    const next = conv[count];
    const isAgent = next.from === "fatima";
    const t1 = setTimeout(() => setTyping(isAgent), isAgent ? 350 : 0);
    const t2 = setTimeout(
      () => {
        setTyping(false);
        setCount((c) => c + 1);
      },
      isAgent ? 1500 : count === 0 ? 600 : 1100,
    );
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView, count, run, conv, reduce]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [count, typing, reduce]);

  const restart = useCallback(() => {
    setTyping(false);
    setCount(0);
    setRun((r) => r + 1);
  }, []);

  const done = count >= conv.length;

  return (
    <Section id="agent-ia" className="overflow-hidden">
      <SectionHeading label={agentDemo.label} title={agentDemo.title} subtitle={agentDemo.subtitle} />

      <div ref={rootRef} className="relative mt-14 grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.22),transparent_65%)] blur-xl" />

        {/* phone-like chat */}
        <Reveal className="relative">
          <div className="card overflow-hidden p-0">
            <div className="flex items-center gap-3 border-b border-line bg-white px-4 py-3">
              <span className="relative grid h-10 w-10 place-items-center rounded-full bg-ink text-yellow">
                <Bot className="h-5 w-5" aria-hidden="true" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-success" />
              </span>
              <div className="flex-1">
                <p className="text-[15px] font-semibold text-ink">FATIMA · Assistant immobilier</p>
                <p className="text-[12px] text-success">{typing ? "écrit…" : "en ligne"}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[11px] font-semibold text-muted">
                <BrandIcon name="whatsapp" className="h-3.5 w-3.5" /> WhatsApp
              </span>
            </div>

            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              aria-label="Conversation de démonstration"
              className="relative h-[430px] overflow-y-auto bg-[#efeae2] px-3 py-4 sm:px-5 [background-image:radial-gradient(rgba(24,24,27,0.05)_1px,transparent_1px)] [background-size:16px_16px]"
            >
              <div className="mx-auto mb-3 w-fit rounded-lg bg-white/80 px-2.5 py-1 text-[11px] font-medium text-muted shadow-[var(--shadow-soft)]">Aujourd&apos;hui</div>
              <div className="flex flex-col gap-2">
                {conv.slice(0, count).map((m, i) => (
                  <Bubble key={`${run}-${i}`} m={m} index={i} />
                ))}
                <AnimatePresence>{typing && <Typing key="typing" />}</AnimatePresence>
                <AnimatePresence>
                  {done && (
                    <motion.div
                      key="slots"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="max-w-[82%] rounded-2xl rounded-tl-sm bg-white p-3 shadow-[var(--shadow-soft)]"
                    >
                      <p className="text-[12px] font-semibold text-ink">Créneaux disponibles</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {["Mar. 10:00", "Mer. 16:00", "Jeu. 14:30"].map((s, i) => (
                          <span
                            key={s}
                            className={cn(
                              "rounded-lg border px-2.5 py-1 text-[12px] font-medium",
                              i === 2 ? "border-ink bg-ink text-yellow" : "border-line bg-surface-2 text-ink",
                            )}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-line bg-white px-4 py-3">
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted">
                <Info className="h-3.5 w-3.5" aria-hidden="true" />
                {agentDemo.disclaimer}
              </span>
              <button
                type="button"
                onClick={restart}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line bg-white px-3 text-[13px] font-medium text-ink shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:border-yellow"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Rejouer la démo
              </button>
            </div>
          </div>
        </Reveal>

        {/* qualification side panel */}
        <Reveal delay={0.1} className="relative flex flex-col gap-4">
          <div className="card p-5">
            <div className="flex items-center justify-between">
              <p className="text-[15px] font-semibold text-ink">Fiche de qualification</p>
              <span className="rounded-full bg-yellow-soft px-2 py-0.5 text-[11px] font-semibold text-yellow-ink">Automatique</span>
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-2.5">
              {fields.map((f) => {
                const on = count >= f.unlock;
                const Icon = f.icon;
                return (
                  <li
                    key={f.key}
                    className={cn(
                      "rounded-xl border p-3 transition-all duration-500",
                      on ? "border-[#f3dd8a] bg-[#fffdf3] shadow-[var(--shadow-soft)]" : "border-dashed border-line bg-surface-2/50",
                    )}
                  >
                    <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                      <Icon className={cn("h-3.5 w-3.5", on ? "text-yellow-ink" : "text-subtle")} aria-hidden="true" />
                      {f.label}
                    </p>
                    <p className={cn("mt-1 text-[14px] font-semibold transition-colors", on ? "text-ink" : "text-subtle")}>{on ? f.value : "En attente…"}</p>
                  </li>
                );
              })}
            </ul>
            <div
              className={cn(
                "mt-3 flex items-center gap-3 rounded-xl border p-3 transition-all duration-500",
                done ? "border-ink bg-ink text-white" : "border-dashed border-line text-subtle",
              )}
            >
              <span className={cn("grid h-8 w-8 place-items-center rounded-lg", done ? "bg-yellow text-ink" : "bg-surface-2")}>
                <Database className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <p className="text-[13px] font-semibold">{done ? "Prospect créé dans le CRM" : "Création du prospect…"}</p>
                <p className={cn("text-[11.5px]", done ? "text-white/60" : "")}>Étape : Visite à planifier · Conseiller notifié</p>
              </div>
              {done && <Check className="h-4 w-4 text-yellow" strokeWidth={3} aria-hidden="true" />}
            </div>
          </div>

          <div className="card p-5">
            <p className="text-[15px] font-semibold text-ink">Ce que FATIMA peut faire</p>
            <ul className="mt-3 flex flex-col gap-2">
              {agentDemo.capabilities.map((c) => (
                <li key={c} className="flex items-start gap-2 text-[13.5px] leading-snug text-ink/80">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-yellow-hover" strokeWidth={3} aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-xl bg-surface-2 p-3 text-[12.5px] leading-relaxed text-muted">{agentDemo.note}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

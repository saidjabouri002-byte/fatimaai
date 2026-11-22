import { Bot, CalendarCheck2, Check, CheckCheck, Heart, MousePointerClick, Phone, Send, Target, TrendingUp } from "lucide-react";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { cn } from "@/lib/cn";

const stage =
  "relative h-[220px] overflow-hidden rounded-[18px] border border-line-2 bg-[linear-gradient(180deg,#fbfaf7,#f5f2ec)]";

export function StrategyVisual() {
  const segs = [
    { l: "Primo-accédants", v: 46 },
    { l: "Investisseurs", v: 28 },
    { l: "Familles · F4+", v: 18 },
    { l: "Locataires", v: 8 },
  ];
  return (
    <div aria-hidden="true" className={stage}>
      <div className="tile absolute left-4 right-4 top-4 p-3">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-ink">
            <Target className="h-3.5 w-3.5 text-yellow-ink" /> Audiences cibles
          </p>
          <span className="text-[9.5px] text-muted">Alger · 25–55 ans</span>
        </div>
        <div className="mt-3 flex items-center gap-4">
          <svg viewBox="0 0 42 42" className="h-[74px] w-[74px] shrink-0 -rotate-90">
            {(() => {
              let acc = 0;
              const colors = ["#facc15", "#18181b", "#fde68a", "#e7e3dc"];
              return segs.map((s, i) => {
                const el = (
                  <circle key={s.l} cx="21" cy="21" r="15.9" fill="none" stroke={colors[i]} strokeWidth="6" strokeDasharray={`${s.v} ${100 - s.v}`} strokeDashoffset={-acc} />
                );
                acc += s.v;
                return el;
              });
            })()}
          </svg>
          <ul className="flex flex-1 flex-col gap-1.5">
            {segs.map((s, i) => (
              <li key={s.l} className="flex items-center gap-1.5 text-[10px] text-ink/80">
                <span className="h-2 w-2 rounded-sm" style={{ background: ["#facc15", "#18181b", "#fde68a", "#e7e3dc"][i] }} />
                <span className="flex-1 truncate">{s.l}</span>
                <span className="font-semibold text-ink">{s.v}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 flex gap-1.5">
        {["Budget", "Quartier", "Délai"].map((t) => (
          <span key={t} className="ui-chip rounded-lg px-2 py-1 text-[9.5px] font-semibold text-ink">
            {t}
          </span>
        ))}
      </div>
      <span className="absolute bottom-3 right-4 text-[8.5px] uppercase tracking-wider text-subtle">Exemple</span>
    </div>
  );
}

export function AdsVisual() {
  return (
    <div aria-hidden="true" className={stage}>
      <div className="tile absolute left-4 top-4 w-[48%] -rotate-3 p-2">
        <div className="h-[70px] rounded-lg bg-gradient-to-br from-[#fef3c7] to-[#facc15]">
          <svg viewBox="0 0 100 70" className="h-full w-full">
            <rect x="22" y="20" width="26" height="50" rx="2" fill="#fff" />
            <rect x="52" y="32" width="30" height="38" rx="2" fill="#fffbeb" />
          </svg>
        </div>
        <p className="mt-1.5 text-[9.5px] font-semibold text-ink">F3 lumineux · Hydra</p>
        <div className="mt-1 flex items-center gap-2 text-[8.5px] text-muted">
          <Heart className="h-2.5 w-2.5" /> 128 <MousePointerClick className="h-2.5 w-2.5" /> En savoir plus
        </div>
      </div>
      <div className="tile absolute right-4 top-6 w-[42%] rotate-2 p-2.5">
        <div className="flex items-center gap-1.5">
          <BrandIcon name="meta" className="h-3.5 w-3.5" />
          <BrandIcon name="googleads" className="h-3.5 w-3.5" />
          <span className="ml-auto text-[8.5px] font-semibold text-success">Actif</span>
        </div>
        <p className="mt-2 text-[9px] text-muted">Demandes générées</p>
        <svg viewBox="0 0 100 34" className="mt-1 h-[34px] w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="adg" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#facc15" stopOpacity=".45" />
              <stop offset="1" stopColor="#facc15" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 30 L15 26 L30 27 L45 18 L60 20 L75 11 L100 4 V34 H0Z" fill="url(#adg)" />
          <path d="M0 30 L15 26 L30 27 L45 18 L60 20 L75 11 L100 4" fill="none" stroke="#eab308" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="ui-chip absolute bottom-4 right-4 flex items-center gap-1.5 px-2 py-1.5">
        <TrendingUp className="h-3.5 w-3.5 text-yellow-ink" />
        <span className="text-[10px] font-semibold text-ink">Optimisation continue</span>
      </div>
      <div className="ui-chip absolute bottom-4 left-4 flex items-center gap-1 px-2 py-1.5 text-[9.5px] font-semibold text-ink">
        <BrandIcon name="instagram" className="h-3 w-3" /> <BrandIcon name="facebook" className="h-3 w-3" /> Placements
      </div>
    </div>
  );
}

export function LandingVisual() {
  return (
    <div aria-hidden="true" className={stage}>
      <div className="tile absolute left-1/2 top-5 w-[78%] -translate-x-1/2 overflow-hidden rounded-xl p-0 animate-float-slow" style={{ ["--r" as string]: "0deg" }}>
        <div className="flex items-center gap-1 border-b border-line px-2.5 py-1.5">
          {["#f87171", "#fbbf24", "#4ade80"].map((c) => (
            <span key={c} className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
          ))}
          <span className="ml-2 h-3 flex-1 rounded bg-surface-2 text-[7px] leading-3 text-subtle">&nbsp;residence-lespins.dz</span>
        </div>
        <div className="grid grid-cols-[1.1fr_1fr] gap-2 p-2.5">
          <div>
            <span className="block h-2 w-[80%] rounded bg-ink" />
            <span className="mt-1 block h-2 w-[60%] rounded bg-ink" />
            <span className="mt-2 block h-1.5 w-full rounded bg-[#ece8e1]" />
            <span className="mt-1 block h-1.5 w-[85%] rounded bg-[#ece8e1]" />
            <span className="mt-2.5 inline-flex h-4 items-center rounded-md bg-yellow px-2 text-[7px] font-bold text-ink">Réserver une visite</span>
          </div>
          <div className="h-[62px] rounded-lg bg-gradient-to-br from-[#fef3c7] to-[#fde047]" />
        </div>
        <div className="mx-2.5 mb-2.5 grid grid-cols-3 gap-1.5">
          {["Nom", "Téléphone", "Budget"].map((f) => (
            <span key={f} className="rounded-md border border-line px-1.5 py-1 text-[7px] text-subtle">
              {f}
            </span>
          ))}
        </div>
      </div>
      <div className="ui-chip absolute bottom-4 right-4 flex items-center gap-1.5 px-2 py-1.5 text-[10px] font-semibold text-ink">
        <span className="grid h-4 w-4 place-items-center rounded-full bg-success text-white">
          <Check className="h-2.5 w-2.5" strokeWidth={3} />
        </span>
        Nouvelle demande
      </div>
      <div className="ui-chip absolute bottom-4 left-4 flex items-center gap-1 px-2 py-1.5 text-[10px] font-semibold text-ink">
        <BrandIcon name="whatsapp" className="h-3 w-3" /> Bouton WhatsApp
      </div>
    </div>
  );
}

export function AgentVisual() {
  return (
    <div aria-hidden="true" className={cn(stage, "bg-[linear-gradient(180deg,#f3efe6,#efe9dd)]")}>
      <div className="absolute inset-x-4 top-3 flex items-center gap-2 rounded-xl bg-white/90 px-2.5 py-1.5 shadow-[var(--shadow-soft)]">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-yellow">
          <Bot className="h-3.5 w-3.5" />
        </span>
        <div className="flex-1">
          <p className="text-[10.5px] font-semibold leading-none text-ink">FATIMA</p>
          <p className="text-[8.5px] text-success">en ligne</p>
        </div>
        <BrandIcon name="whatsapp" className="h-3.5 w-3.5" />
      </div>
      <div className="absolute inset-x-4 top-[52px] flex flex-col gap-1.5">
        <span className="ml-auto max-w-[76%] rounded-xl rounded-tr-sm bg-[#d9fdd3] px-2.5 py-1.5 text-[10px] text-ink shadow-[var(--shadow-soft)]">
          Bonjour, je cherche un F3 à Alger.
          <CheckCheck className="ml-1 inline h-3 w-3 text-[#53bdeb]" />
        </span>
        <span className="max-w-[80%] rounded-xl rounded-tl-sm bg-white px-2.5 py-1.5 text-[10px] text-ink shadow-[var(--shadow-soft)]">
          Avec plaisir ! Quel est votre budget approximatif ?
        </span>
        <span className="ml-auto max-w-[76%] rounded-xl rounded-tr-sm bg-[#d9fdd3] px-2.5 py-1.5 text-[10px] text-ink shadow-[var(--shadow-soft)]">
          Autour de 15 M DA.
        </span>
      </div>
      <div className="absolute bottom-3 left-4 flex gap-1.5">
        <span className="rounded-full border border-[#f3dd8a] bg-yellow-soft px-2 py-0.5 text-[9px] font-semibold text-yellow-ink">Budget : 15 M DA</span>
        <span className="rounded-full border border-line bg-white px-2 py-0.5 text-[9px] font-semibold text-ink">F3 · Alger</span>
      </div>
      <span className="absolute bottom-3 right-4 grid h-6 w-6 place-items-center rounded-full bg-[#25d366] text-white">
        <Send className="h-3 w-3" />
      </span>
    </div>
  );
}

export function BookingVisual() {
  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  return (
    <div aria-hidden="true" className={stage}>
      <div className="tile absolute left-4 top-4 w-[56%] p-2.5">
        <div className="flex items-center justify-between">
          <p className="text-[10.5px] font-semibold text-ink">Novembre</p>
          <span className="text-[8.5px] text-muted">Visites</span>
        </div>
        <div className="mt-1.5 grid grid-cols-7 gap-0.5">
          {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
            <span key={i} className="text-center text-[7.5px] font-semibold text-subtle">
              {d}
            </span>
          ))}
          {days.map((d) => (
            <span
              key={d}
              className={cn(
                "grid h-[17px] place-items-center rounded-[5px] text-[8px]",
                d === 20 ? "bg-ink font-bold text-yellow" : [6, 13, 24].includes(d) ? "bg-yellow-soft font-semibold text-yellow-ink" : "text-ink/60",
              )}
            >
              {d}
            </span>
          ))}
        </div>
      </div>
      <div className="tile absolute right-4 top-10 w-[38%] rotate-2 p-2.5 animate-float" style={{ ["--r" as string]: "2deg" }}>
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-yellow text-ink">
          <CalendarCheck2 className="h-4 w-4" />
        </span>
        <p className="mt-1.5 text-[10.5px] font-semibold leading-tight text-ink">Visite confirmée</p>
        <p className="text-[9px] text-muted">Jeu. 20 · 14:30</p>
        <p className="mt-1.5 flex items-center gap-1 text-[8.5px] font-medium text-success">
          <Check className="h-2.5 w-2.5" strokeWidth={3} /> Rappel envoyé
        </p>
      </div>
      <div className="ui-chip absolute bottom-4 right-4 flex items-center gap-1.5 px-2 py-1.5 text-[9.5px] font-semibold text-ink">
        <Phone className="h-3 w-3 text-yellow-ink" /> Conseiller notifié
      </div>
    </div>
  );
}

export function CrmVisual() {
  const cols = [
    { t: "Nouveau", n: 3, c: "bg-white" },
    { t: "Qualifié", n: 2, c: "bg-white" },
    { t: "Visite", n: 2, c: "bg-yellow-soft" },
    { t: "Conclu", n: 1, c: "bg-ink" },
  ];
  return (
    <div aria-hidden="true" className={cn(stage, "p-3")}>
      <div className="grid h-full grid-cols-4 gap-1.5">
        {cols.map((col, ci) => (
          <div key={col.t} className="flex flex-col gap-1.5 rounded-xl bg-[#efebe4]/70 p-1.5">
            <p className="flex items-center justify-between px-0.5 text-[8.5px] font-semibold text-ink/70">
              {col.t}
              <span className="text-subtle">{col.n}</span>
            </p>
            {Array.from({ length: col.n }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-lg border border-line p-1.5 shadow-[var(--shadow-soft)]",
                  col.c,
                  ci === 2 && i === 0 && "-rotate-3 border-[#f3dd8a] shadow-[var(--shadow-float)]",
                )}
              >
                <span className={cn("block h-1.5 w-[70%] rounded", col.c === "bg-ink" ? "bg-yellow" : "bg-ink/70")} />
                <span className={cn("mt-1 block h-1 w-full rounded", col.c === "bg-ink" ? "bg-white/30" : "bg-[#e7e3dc]")} />
                <span className={cn("mt-0.5 block h-1 w-[60%] rounded", col.c === "bg-ink" ? "bg-white/30" : "bg-[#e7e3dc]")} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

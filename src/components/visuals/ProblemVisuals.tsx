import { Check, CheckCheck, Clock3, Eye, Filter, HelpCircle, UserRound, X } from "lucide-react";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { cn } from "@/lib/cn";

const stage =
  "relative h-[180px] overflow-hidden rounded-2xl border border-line-2 bg-[linear-gradient(180deg,#fbfaf7,#f6f3ee)]";

/** 1 — Many impressions, few qualified leads. */
export function ImpressionsVisual() {
  const bars = [62, 80, 54, 92, 70, 88, 76, 96, 66, 84, 72, 90];
  return (
    <div aria-hidden="true" className={stage}>
      <div className="absolute inset-x-4 bottom-4 top-12 flex items-end gap-1.5">
        {bars.map((h, i) => (
          <div key={i} className="relative flex-1 rounded-t-md bg-[#e9e5dd]" style={{ height: `${h}%` }}>
            {i % 4 === 3 && <span className="absolute inset-x-0 bottom-0 h-[14%] rounded-t-sm bg-yellow" />}
          </div>
        ))}
      </div>
      <div className="ui-chip absolute left-4 top-3 flex items-center gap-2 px-2.5 py-1.5">
        <Eye className="h-3.5 w-3.5 text-muted" />
        <span className="text-[11px] font-semibold text-ink">Vues</span>
        <span className="text-[10px] text-muted">beaucoup</span>
      </div>
      <div className="ui-chip absolute right-4 top-3 flex items-center gap-2 px-2.5 py-1.5">
        <span className="h-2 w-2 rounded-full bg-yellow" />
        <span className="text-[11px] font-semibold text-ink">Prospects qualifiés</span>
        <span className="text-[10px] text-muted">peu</span>
      </div>
    </div>
  );
}

/** 2 — Filtering interested vs ready-to-visit leads. */
export function FilterVisual() {
  const leads = [
    { ok: false, t: "Sans budget" },
    { ok: true, t: "Budget 15 M DA" },
    { ok: false, t: "Simple curiosité" },
    { ok: true, t: "Prêt à visiter" },
  ];
  return (
    <div aria-hidden="true" className={stage}>
      <div className="absolute left-4 top-1/2 flex -translate-y-1/2 flex-col gap-1.5">
        {leads.map((l, i) => (
          <span key={i} className="ui-chip flex items-center gap-1.5 rounded-lg px-2 py-1 text-[10px] font-medium text-ink/70">
            <UserRound className="h-3 w-3 text-muted" />
            {l.t}
          </span>
        ))}
      </div>
      <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-ink text-yellow shadow-[var(--shadow-float)]">
        <Filter className="h-6 w-6" />
      </div>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 180" preserveAspectRatio="none">
        <path d="M150 90 H 176" stroke="#d9d5ce" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
        <path d="M226 90 C 250 90, 256 62, 280 62" stroke="#facc15" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
        <path d="M226 90 C 250 90, 256 118, 280 118" stroke="#facc15" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-3">
        {leads
          .filter((l) => l.ok)
          .map((l) => (
            <span key={l.t} className="flex items-center gap-1.5 rounded-lg border border-[#f3dd8a] bg-yellow-soft px-2 py-1 text-[10px] font-semibold text-ink shadow-[var(--shadow-soft)]">
              <Check className="h-3 w-3 text-yellow-ink" strokeWidth={3} />
              {l.t}
            </span>
          ))}
      </div>
    </div>
  );
}

/** 3 — A late reply loses the lead. */
export function DelayVisual() {
  return (
    <div aria-hidden="true" className={cn(stage, "p-3.5")}>
      <div className="flex items-center gap-2 border-b border-line pb-2">
        <BrandIcon name="whatsapp" className="h-4 w-4" />
        <span className="text-[11px] font-semibold text-ink">Prospect · F3</span>
      </div>
      <div className="mt-2.5 flex flex-col gap-1.5">
        <span className="max-w-[78%] rounded-xl rounded-tl-sm bg-white px-2.5 py-1.5 text-[10.5px] text-ink shadow-[var(--shadow-soft)]">
          Le F3 est toujours disponible ?
          <span className="ml-2 text-[8.5px] text-muted">09:12</span>
        </span>
        <span className="mx-auto flex items-center gap-1 rounded-full bg-[#fde2e2] px-2 py-0.5 text-[9.5px] font-semibold text-danger">
          <Clock3 className="h-3 w-3" /> 2 jours sans réponse
        </span>
        <span className="ml-auto max-w-[78%] rounded-xl rounded-tr-sm bg-[#e8f8ee] px-2.5 py-1.5 text-[10.5px] text-ink/60">
          Oui, toujours dispo !
          <span className="ml-2 inline-flex items-center gap-0.5 text-[8.5px] text-muted">
            11:40 <CheckCheck className="h-3 w-3" />
          </span>
        </span>
        <span className="max-w-[78%] rounded-xl rounded-tl-sm bg-white px-2.5 py-1.5 text-[10.5px] text-muted shadow-[var(--shadow-soft)]">
          Merci, j&apos;ai trouvé ailleurs.
        </span>
      </div>
    </div>
  );
}

/** 4 — Broken follow-up sequence. */
export function FollowUpVisual() {
  const steps = [
    { t: "J+0", l: "Premier contact", s: "done" },
    { t: "J+2", l: "Relance", s: "missed" },
    { t: "J+5", l: "Infos complémentaires", s: "missed" },
    { t: "J+9", l: "Proposition de visite", s: "missed" },
  ];
  return (
    <div aria-hidden="true" className={cn(stage, "px-4 py-3.5")}>
      <div className="absolute bottom-6 left-[27px] top-6 w-px border-l border-dashed border-[#d9d5ce]" />
      <ul className="relative flex h-full flex-col justify-between">
        {steps.map((s) => (
          <li key={s.t} className="flex items-center gap-2.5">
            <span
              className={cn(
                "z-10 grid h-6 w-6 place-items-center rounded-full border text-[9px] font-bold",
                s.s === "done" ? "border-ink bg-ink text-yellow" : "border-line bg-white text-subtle",
              )}
            >
              {s.s === "done" ? <Check className="h-3 w-3" strokeWidth={3} /> : <X className="h-3 w-3" />}
            </span>
            <span className={cn("text-[10.5px] font-semibold", s.s === "done" ? "text-ink" : "text-subtle line-through")}>{s.l}</span>
            <span className="ml-auto text-[9.5px] text-subtle">{s.t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 5 — No data, no optimisation. */
export function AnalyticsVisual() {
  const rows = ["Demandes reçues", "Qualifiées", "Visites", "Transactions"];
  return (
    <div aria-hidden="true" className={cn(stage, "p-3.5")}>
      <div className="grid grid-cols-2 gap-1.5">
        {rows.map((r) => (
          <div key={r} className="ui-chip rounded-lg px-2 py-1.5">
            <p className="truncate text-[9px] font-medium text-muted">{r}</p>
            <p className="mt-0.5 flex items-center gap-1 text-[15px] font-semibold text-ink/30">
              ?<HelpCircle className="h-3 w-3" />
            </p>
          </div>
        ))}
      </div>
      <svg viewBox="0 0 200 50" className="mt-2 h-[52px] w-full" preserveAspectRatio="none">
        <path d="M0 38 C 20 20, 35 44, 55 30 S 90 12, 110 32 S 150 40, 170 18 S 195 30, 200 26" fill="none" stroke="#d4d4d8" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

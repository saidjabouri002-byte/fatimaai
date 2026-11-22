import { BedDouble, Bell, Building2, MapPin, UserRound, Users } from "lucide-react";
import { cn } from "@/lib/cn";

/** Shared stage for card illustrations. */
export function Stage({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative h-[230px] overflow-hidden rounded-[18px] border border-line-2 bg-[linear-gradient(180deg,#fbfaf7,#f6f3ee)]",
        className,
      )}
    >
      <div className="dot-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
      {children}
    </div>
  );
}

export function OwnerVisual() {
  return (
    <Stage>
      <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2">
        {/* isometric-ish house */}
        <svg viewBox="0 0 200 170" className="h-[170px] w-[200px] drop-shadow-[0_18px_22px_rgba(24,24,27,0.16)]">
          <ellipse cx="100" cy="158" rx="78" ry="9" fill="#18181b" opacity=".06" />
          <path d="M40 78 100 34l60 44v74H40z" fill="#fff" stroke="#eae7e2" />
          <path d="M28 84 100 28l72 56" fill="none" stroke="#18181b" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M28 84 100 28l72 56" fill="none" stroke="#facc15" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="86" y="108" width="28" height="44" rx="4" fill="#18181b" />
          <circle cx="108" cy="131" r="2" fill="#facc15" />
          <rect x="54" y="96" width="22" height="20" rx="3" fill="#fef9c3" stroke="#f3dd8a" />
          <rect x="124" y="96" width="22" height="20" rx="3" fill="#fef9c3" stroke="#f3dd8a" />
          <rect x="132" y="38" width="12" height="22" rx="2" fill="#fff" stroke="#eae7e2" />
        </svg>
      </div>
      <div className="tile absolute left-4 top-5 flex items-center gap-2 px-2.5 py-2" style={{ transform: "rotate(-4deg)" }}>
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-yellow-soft text-yellow-ink">
          <MapPin className="h-3.5 w-3.5" />
        </span>
        <div>
          <p className="text-[10.5px] font-semibold text-ink">Villa · Oran</p>
          <p className="text-[9px] text-muted">À vendre</p>
        </div>
      </div>
      <div className="tile absolute bottom-5 right-4 flex items-center gap-2 px-2.5 py-2 animate-float" style={{ ["--r" as string]: "3deg" }}>
        <span className="relative grid h-7 w-7 place-items-center rounded-full bg-ink text-yellow">
          <UserRound className="h-3.5 w-3.5" />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-success" />
        </span>
        <div>
          <p className="text-[10.5px] font-semibold text-ink">Nouvel acheteur</p>
          <p className="text-[9px] text-muted">Budget validé</p>
        </div>
      </div>
      <div className="tile absolute right-6 top-6 grid h-9 w-9 place-items-center rounded-xl">
        <Bell className="h-4 w-4 text-yellow-ink" />
        <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-yellow text-[9px] font-bold text-ink">1</span>
      </div>
    </Stage>
  );
}

export function AgencyVisual() {
  const props = [
    { t: "F2 · Bab Ezzouar", y: 26, r: -5 },
    { t: "F4 · Cheraga", y: 92, r: 3 },
    { t: "Local · Blida", y: 158, r: -3 },
  ];
  return (
    <Stage>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 360 230" preserveAspectRatio="none">
        {[44, 110, 176].map((y, i) => (
          <path key={i} d={`M118 ${y} C 160 ${y}, 170 115, 205 115`} fill="none" stroke="#e2ddd4" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        ))}
        {[44, 110, 176].map((y, i) => (
          <path
            key={`d${i}`}
            d={`M118 ${y} C 160 ${y}, 170 115, 205 115`}
            fill="none"
            stroke="#facc15"
            strokeWidth="1.6"
            strokeDasharray="2 14"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="animate-dash"
          />
        ))}
      </svg>
      {props.map((p) => (
        <div
          key={p.t}
          className="tile absolute left-3 flex w-[34%] items-center gap-1.5 rounded-xl px-2 py-1.5"
          style={{ top: p.y, transform: `rotate(${p.r}deg)` }}
        >
          <span className="h-6 w-6 shrink-0 rounded-md bg-gradient-to-br from-[#fde68a] to-[#facc15]" />
          <span className="truncate text-[9.5px] font-semibold text-ink">{p.t}</span>
        </div>
      ))}
      <div className="tile absolute right-3 top-1/2 w-[46%] -translate-y-1/2 p-2.5">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-ink">CRM · Prospects</p>
          <span className="rounded-full bg-yellow-soft px-1.5 py-0.5 text-[8.5px] font-semibold text-yellow-ink">+3</span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1">
          {["Nouveaux", "Qualifiés", "Visites"].map((c, ci) => (
            <div key={c} className="rounded-md bg-surface-2 p-1">
              <p className="truncate text-[7.5px] font-medium text-muted">{c}</p>
              {Array.from({ length: 3 - ci + 1 }).map((_, i) => (
                <span key={i} className={cn("mt-1 block h-2.5 rounded-sm", ci === 2 && i === 0 ? "bg-yellow" : "bg-white")} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}

export function DeveloperVisual() {
  return (
    <Stage>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <svg viewBox="0 0 220 190" className="h-[196px] w-[226px] drop-shadow-[0_16px_20px_rgba(24,24,27,0.14)]">
          {/* tower */}
          <path d="M70 40 120 22l50 18v150H70z" fill="#fff" stroke="#eae7e2" />
          <path d="M120 22v168" stroke="#eae7e2" />
          <path d="M120 22l50 18v150h-50z" fill="#f6f3ee" />
          {Array.from({ length: 9 }).map((_, r) =>
            [0, 1].map((c) => (
              <rect key={`l${r}${c}`} x={80 + c * 18} y={50 + r * 15} width="12" height="8" rx="1.5" fill={r === 3 && c === 1 ? "#facc15" : "#fef9c3"} stroke="#f3dd8a" strokeWidth=".6" />
            )),
          )}
          {Array.from({ length: 9 }).map((_, r) =>
            [0, 1].map((c) => (
              <rect key={`r${r}${c}`} x={128 + c * 18} y={52 + r * 15} width="12" height="8" rx="1.5" fill={r === 6 && c === 0 ? "#18181b" : "#ece8e1"} />
            )),
          )}
          {/* low wing */}
          <path d="M20 120h50v70H20z" fill="#fff" stroke="#eae7e2" />
          {[0, 1, 2].map((r) =>
            [0, 1].map((c) => <rect key={`w${r}${c}`} x={28 + c * 20} y={130 + r * 18} width="12" height="9" rx="1.5" fill="#fef9c3" stroke="#f3dd8a" strokeWidth=".6" />),
          )}
          <path d="M170 140h34v50h-34z" fill="#f6f3ee" stroke="#eae7e2" />
          <path d="M60 16h40" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
          <path d="M100 16v8" stroke="#18181b" strokeWidth="2" />
        </svg>
      </div>
      {[
        { l: "6%", t: "14%", txt: "Lead · F3 vue mer", r: -5, d: 0 },
        { l: "62%", t: "10%", txt: "Visite showroom", r: 4, d: 1.2 },
        { l: "64%", t: "56%", txt: "Réservation F4", r: -3, d: 2 },
      ].map((c) => (
        <div
          key={c.txt}
          className="tile absolute flex items-center gap-1.5 rounded-xl px-2 py-1.5 animate-float"
          style={{ left: c.l, top: c.t, ["--r" as string]: `${c.r}deg`, animationDelay: `${c.d}s` }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-hover" />
          <span className="whitespace-nowrap text-[9.5px] font-semibold text-ink">{c.txt}</span>
        </div>
      ))}
      <div className="tile absolute bottom-4 left-4 flex items-center gap-1.5 rounded-xl px-2 py-1.5">
        <Users className="h-3.5 w-3.5 text-yellow-ink" />
        <span className="text-[9.5px] font-semibold text-ink">Résidence Les Pins</span>
      </div>
    </Stage>
  );
}

export const audienceIcons = { owner: BedDouble, agency: Users, developer: Building2 };

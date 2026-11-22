import { Bot, CalendarCheck2, KanbanSquare, MapPin, UserPlus, BedDouble, Check } from "lucide-react";
import { hero } from "@/config/content";
import { Button, PrimaryCTA } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { LogoMark } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

/* Coordinates are expressed in a 1200 × 660 design space so tiles and SVG connectors stay aligned. */
const W = 1200;
const H = 660;
const pos = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });

const connectors = [
  // left side → headline
  "M150 92 C 250 110, 300 170, 395 196",
  "M78 250 C 190 250, 270 230, 380 226",
  "M128 400 C 240 380, 300 300, 392 262",
  "M214 556 C 300 500, 330 360, 405 300",
  // right side → headline
  "M1050 84 C 950 100, 900 170, 805 196",
  "M1118 236 C 1010 240, 930 226, 820 226",
  "M1062 400 C 960 380, 900 300, 808 262",
  "M1004 562 C 930 500, 870 360, 795 300",
];

function Float({
  x,
  y,
  r = 0,
  delay = 0,
  slow = false,
  children,
  className,
}: {
  x: number;
  y: number;
  r?: number;
  delay?: number;
  slow?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={pos(x, y)}>
      <div
        className={cn(slow ? "animate-float-slow" : "animate-float", className)}
        style={{ ["--r" as string]: `${r}deg`, animationDelay: `${delay}s`, transform: `rotate(${r}deg)` }}
      >
        {children}
      </div>
    </div>
  );
}

function BrandTile({ children, size = 60 }: { children: React.ReactNode; size?: number }) {
  return (
    <div className="tile grid place-items-center" style={{ width: size, height: size }}>
      {children}
    </div>
  );
}

function PropertyAdCard() {
  return (
    <div className="tile w-[188px] p-2">
      <div className="relative h-[84px] overflow-hidden rounded-[10px] bg-gradient-to-br from-[#fef3c7] via-[#fde68a] to-[#facc15]">
        {/* minimal building illustration */}
        <svg viewBox="0 0 188 84" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <circle cx="150" cy="22" r="10" fill="#fff" opacity=".7" />
          <rect x="40" y="26" width="46" height="58" rx="3" fill="#fff" />
          <rect x="90" y="40" width="58" height="44" rx="3" fill="#fffbeb" />
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={47 + c * 13} y={33 + r * 11} width="7" height="6" rx="1" fill="#facc15" opacity=".55" />),
          )}
          {[0, 1, 2].map((r) =>
            [0, 1, 2, 3].map((c) => <rect key={`b${r}${c}`} x={97 + c * 12} y={47 + r * 11} width="6" height="6" rx="1" fill="#18181b" opacity=".12" />),
          )}
        </svg>
        <span className="absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded-md bg-white/90 px-1.5 py-0.5 text-[9px] font-semibold text-ink">
          <BrandIcon name="meta" className="h-2.5 w-2.5" /> Sponsorisé
        </span>
      </div>
      <div className="px-1 pb-0.5 pt-2">
        <p className="text-[11px] font-semibold text-ink">Appartement F3 · Alger</p>
        <div className="mt-1 flex items-center gap-2 text-[9.5px] text-muted">
          <span className="inline-flex items-center gap-0.5">
            <MapPin className="h-2.5 w-2.5" /> Hydra
          </span>
          <span className="inline-flex items-center gap-0.5">
            <BedDouble className="h-2.5 w-2.5" /> 3 pièces
          </span>
        </div>
      </div>
    </div>
  );
}

function VisitCard() {
  return (
    <div className="tile w-[196px] p-3">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-yellow-soft text-yellow-ink">
          <CalendarCheck2 className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[11px] font-semibold leading-tight text-ink">Visite confirmée</p>
          <p className="text-[9.5px] text-muted">Jeu. 14:30 · F3 Hydra</p>
        </div>
      </div>
      <div className="mt-2.5 grid grid-cols-5 gap-1">
        {["L", "M", "M", "J", "V"].map((d, i) => (
          <span
            key={i}
            className={cn(
              "grid h-6 place-items-center rounded-md text-[9px] font-medium",
              i === 3 ? "bg-ink text-yellow" : "bg-surface-2 text-muted",
            )}
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

function AgentChip() {
  return (
    <div className="tile flex items-center gap-2 py-2 pl-2 pr-3">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-yellow">
        <Bot className="h-4 w-4" />
      </span>
      <div>
        <p className="text-[11px] font-semibold leading-tight text-ink">Agent FATIMA</p>
        <p className="flex items-center gap-1 text-[9.5px] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-success" /> Qualification en cours
        </p>
      </div>
    </div>
  );
}

function MobileTiles() {
  const items = [
    <BrandIcon key="m" name="meta" className="h-5 w-5" />,
    <BrandIcon key="g" name="googleads" className="h-5 w-5" />,
    <BrandIcon key="w" name="whatsapp" className="h-5 w-5" />,
    <Bot key="b" className="h-5 w-5 text-ink" />,
    <CalendarCheck2 key="c" className="h-5 w-5 text-yellow-ink" />,
  ];
  return (
    <div className="mb-8 flex items-center justify-center gap-3 lg:hidden" aria-hidden="true">
      {items.map((icon, i) => (
        <div
          key={i}
          className="tile grid h-11 w-11 place-items-center animate-float"
          style={{ ["--r" as string]: `${[-6, 4, -3, 6, -5][i]}deg`, animationDelay: `${i * 0.4}s` }}
        >
          {icon}
        </div>
      ))}
    </div>
  );
}

export function HeroSection() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pt-36 lg:pb-24">
      {/* atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-24 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.22),transparent_65%)] blur-2xl" />
        <div className="absolute -right-48 top-64 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.16),transparent_65%)] blur-2xl" />
        <div className="dot-grid absolute inset-x-0 top-0 h-[720px] [mask-image:radial-gradient(ellipse_at_center_top,black_10%,transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-[1200px]">
        {/* floating ecosystem — desktop */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 hidden lg:block" style={{ aspectRatio: `${W} / ${H}` }}>
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="hero-line" x1="0" x2="1">
                <stop offset="0" stopColor="#d9d5ce" stopOpacity="0.2" />
                <stop offset="0.5" stopColor="#d9d5ce" />
                <stop offset="1" stopColor="#d9d5ce" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {connectors.map((d, i) => (
              <g key={i}>
                <path d={d} fill="none" stroke="url(#hero-line)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
                {i % 2 === 0 && (
                  <path
                    d={d}
                    fill="none"
                    stroke="#facc15"
                    strokeWidth="1.4"
                    strokeDasharray="2 22"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    className="animate-dash"
                  />
                )}
              </g>
            ))}
          </svg>

          <Float x={150} y={92} r={-7}>
            <BrandTile size={64}>
              <BrandIcon name="meta" className="h-8 w-8" />
            </BrandTile>
          </Float>
          <Float x={78} y={250} r={8} delay={1.2} slow>
            <BrandTile size={52}>
              <BrandIcon name="googleads" className="h-6 w-6" />
            </BrandTile>
          </Float>
          <Float x={128} y={410} r={-4} delay={0.6}>
            <PropertyAdCard />
          </Float>
          <Float x={214} y={566} r={7} delay={2} slow>
            <BrandTile size={50}>
              <UserPlus className="h-5 w-5 text-yellow-ink" />
            </BrandTile>
          </Float>

          <Float x={1050} y={84} r={6} delay={0.4}>
            <BrandTile size={64}>
              <BrandIcon name="whatsapp" className="h-8 w-8" />
            </BrandTile>
          </Float>
          <Float x={1110} y={236} r={-3} delay={1.6} slow>
            <AgentChip />
          </Float>
          <Float x={1062} y={410} r={4} delay={0.9}>
            <VisitCard />
          </Float>
          <Float x={1004} y={570} r={-7} delay={2.4} slow>
            <BrandTile size={52}>
              <KanbanSquare className="h-5 w-5 text-ink" />
            </BrandTile>
          </Float>
        </div>

        <div className="relative z-10 mx-auto flex max-w-[900px] flex-col items-center text-center">
          <MobileTiles />

          <div className="animate-rise flex w-full flex-col items-center">
            <span className="inline-flex max-w-full items-center gap-2 rounded-2xl border sm:rounded-full border-line bg-white/80 py-1 pl-1 pr-3 shadow-[var(--shadow-soft)] backdrop-blur">
              <span className="hidden shrink-0 rounded-full bg-ink px-2 py-0.5 text-[10.5px] sm:inline font-semibold uppercase tracking-wider text-yellow">Nouveau</span>
              <span className="px-2 py-0.5 text-center text-[10.5px] font-semibold uppercase leading-snug tracking-[0.1em] text-muted sm:px-0 sm:py-0 sm:text-[11.5px] sm:tracking-[0.12em]">{hero.badge}</span>
            </span>
          </div>

          <div className="animate-rise" style={{ animationDelay: "0.08s" }}>
            <h1
              id="hero-title"
              className="mt-7 text-balance text-[34px] font-semibold leading-[1.04] tracking-[-0.045em] text-ink sm:text-[46px] lg:text-[clamp(38px,3.4vw,49px)]"
            >
              <span className="block">
                Attirez plus de <span className="highlight">clients qualifiés.</span>
              </span>
              <span aria-hidden="true" className="relative z-10 -my-1 flex justify-center sm:-my-2 lg:my-1">
                <span className="inline-flex -rotate-3 items-center gap-2 rounded-2xl border border-line bg-white px-3.5 py-1.5 shadow-[var(--shadow-float)] sm:px-4 sm:py-2">
                  <LogoMark className="h-6 w-6 sm:h-7 sm:w-7" />
                  <span className="text-[18px] font-semibold tracking-[0.16em] text-ink/60 sm:text-[24px]">FATIMA</span>
                </span>
              </span>
              <span className="block lg:whitespace-nowrap">Transformez vos demandes en visites.</span>
              <span className="block text-ink/90 lg:whitespace-nowrap">
                Développez vos <span className="relative whitespace-nowrap">ventes immobilières.</span>
              </span>
            </h1>
          </div>

          <div className="animate-rise" style={{ animationDelay: "0.16s" }}>
            <p className="mx-auto mt-6 max-w-[600px] text-pretty text-[16px] leading-relaxed text-muted sm:text-[17px]">{hero.paragraph}</p>
          </div>

          <div className="animate-rise mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center" style={{ animationDelay: "0.24s" }}>
            <PrimaryCTA className="w-full sm:w-auto">{hero.primary}</PrimaryCTA>
            <Button href="#systeme" variant="secondary" size="lg" className="w-full sm:w-auto">
              {hero.secondary}
            </Button>
          </div>

          <div className="animate-rise" style={{ animationDelay: "0.32s" }}>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[12.5px] font-medium text-muted sm:text-[13px]">
              {hero.pillars.map((p, i) => (
                <li key={p} className="inline-flex items-center gap-2">
                  {i > 0 && <span className="h-1 w-1 rounded-full bg-yellow-hover" aria-hidden="true" />}
                  <span className="inline-flex items-center gap-1">
                    <Check className="h-3.5 w-3.5 text-yellow-ink" strokeWidth={2.5} aria-hidden="true" />
                    {p}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

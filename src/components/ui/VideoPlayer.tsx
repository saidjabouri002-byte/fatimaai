"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { VSL_POSTER_URL, VSL_VIDEO_URL } from "@/config/site";
import { BrandIcon } from "./BrandIcon";
import { cn } from "@/lib/cn";

type Source =
  | { kind: "youtube"; embed: string }
  | { kind: "vimeo"; embed: string }
  | { kind: "file"; src: string }
  | { kind: "none" };

/** Parses YouTube, Vimeo or direct video URLs. */
export function parseVideoUrl(url: string): Source {
  if (!url) return { kind: "none" };
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\.|^m\./, "");
    if (host === "youtu.be" || host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      const id =
        host === "youtu.be"
          ? u.pathname.slice(1)
          : u.searchParams.get("v") || u.pathname.split("/").filter(Boolean).pop() || "";
      if (id) return { kind: "youtube", embed: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1` };
    }
    if (host.endsWith("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).find((s) => /^\d+$/.test(s));
      if (id) return { kind: "vimeo", embed: `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0&dnt=1` };
    }
    if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(u.pathname)) return { kind: "file", src: url };
  } catch {
    if (/\.(mp4|webm|ogg|mov)$/i.test(url)) return { kind: "file", src: url };
  }
  return { kind: "none" };
}

function PosterArt() {
  // Designed thumbnail: a mini acquisition flow, so the placeholder never looks broken.
  const steps = ["Publicité", "Landing page", "Qualification", "Visite", "Transaction"];
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#fbfaf7]">
      <div className="dot-grid absolute inset-0 opacity-70" />
      <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.35),transparent_65%)]" />
      <div className="absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.25),transparent_65%)]" />
      <div className="absolute inset-x-[6%] top-[74%] hidden -translate-y-1/2 items-center justify-between sm:flex">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center">
            <div
              className="tile flex flex-col items-center gap-1.5 px-3 py-2.5"
              style={{ transform: `translateY(${[-10, 8, -6, 10, -8][i]}px) rotate(${[-4, 3, -2, 4, -3][i]}deg)` }}
            >
              <span className={cn("grid h-6 w-6 place-items-center rounded-lg text-[10px] font-bold", i === 4 ? "bg-ink text-yellow" : "bg-yellow-soft text-yellow-ink")}>
                {i + 1}
              </span>
              <span className="whitespace-nowrap text-[11px] font-semibold text-ink">{s}</span>
            </div>
            {i < steps.length - 1 && <div className="mx-1 h-px flex-1 border-t border-dashed border-[#d9d5ce]" />}
          </div>
        ))}
      </div>
      <div className="absolute left-4 top-4 flex items-center gap-2 sm:left-6 sm:top-6">
        <span className="tile grid h-8 w-8 place-items-center rounded-lg">
          <BrandIcon name="meta" className="h-4 w-4" />
        </span>
        <span className="tile grid h-8 w-8 place-items-center rounded-lg">
          <BrandIcon name="whatsapp" className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}

export function VideoPlayer({ title }: { title: string }) {
  const source = parseVideoUrl(VSL_VIDEO_URL);
  const [playing, setPlaying] = useState(false);
  const hasVideo = source.kind !== "none";

  if (playing && source.kind === "file") {
    return (
      <video
        className="absolute inset-0 h-full w-full bg-black object-cover"
        src={source.src}
        poster={VSL_POSTER_URL || undefined}
        controls
        autoPlay
        playsInline
        preload="metadata"
      />
    );
  }
  if (playing && (source.kind === "youtube" || source.kind === "vimeo")) {
    return (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={source.embed}
        title={title}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => hasVideo && setPlaying(true)}
      aria-label={hasVideo ? `Lire la vidéo : ${title}` : "Vidéo de présentation bientôt disponible"}
      aria-disabled={!hasVideo}
      className={cn("group absolute inset-0 h-full w-full overflow-hidden text-left", hasVideo ? "cursor-pointer" : "cursor-default")}
    >
      {VSL_POSTER_URL ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={VSL_POSTER_URL} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      ) : (
        <PosterArt />
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-ink/10 via-transparent to-transparent" />
      <span className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center">
        <span className="absolute h-24 w-24 rounded-full bg-yellow/50 animate-ping-soft sm:h-28 sm:w-28" />
        <span className="relative grid h-20 w-20 place-items-center rounded-full bg-white/70 p-2 shadow-[var(--shadow-float)] backdrop-blur transition-transform duration-500 group-hover:scale-110 sm:h-24 sm:w-24">
          <span className="btn-primary grid h-full w-full place-items-center rounded-full">
            <Play className="ml-1 h-7 w-7 fill-ink text-ink" />
          </span>
        </span>
      </span>
      <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 sm:bottom-6 sm:left-6 sm:right-6">
        <span className="rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-medium text-ink shadow-[var(--shadow-soft)] backdrop-blur">
          {hasVideo ? "Regarder la présentation" : "Vidéo de présentation — bientôt disponible"}
        </span>
      </span>
    </button>
  );
}

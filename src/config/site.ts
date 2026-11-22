/**
 * Central site configuration.
 *
 * Every value here can be overridden with environment variables
 * (see `.env.example`). Nothing else in the codebase hard-codes URLs.
 */

/** Public URL of the site, used for canonical, Open Graph, sitemap and robots. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://fatima-immobilier.example").replace(/\/$/, "");

/**
 * External booking link (Calendly, Cal.com, WhatsApp link…).
 * When empty, every primary CTA scrolls to the on-page consultation form instead.
 */
export const CONSULTATION_URL = process.env.NEXT_PUBLIC_CONSULTATION_URL || "";

/**
 * VSL video. Accepts a YouTube URL, a Vimeo URL or a direct .mp4/.webm file.
 * When empty, a designed placeholder is displayed instead of a broken player.
 */
export const VSL_VIDEO_URL = process.env.NEXT_PUBLIC_VSL_VIDEO_URL || "";

/** Optional poster image for the VSL (path in /public or absolute URL). */
export const VSL_POSTER_URL = process.env.NEXT_PUBLIC_VSL_POSTER_URL || "";

/**
 * Optional WhatsApp number in international format without "+" (e.g. 213555000000).
 * Used as a fallback contact channel if the form backend is unavailable.
 */
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

/** Anchor of the on-page consultation form. */
export const FORM_ANCHOR = "#diagnostic";

/** The one conversion destination used by every primary CTA. */
export const PRIMARY_CTA_HREF = CONSULTATION_URL || FORM_ANCHOR;
export const PRIMARY_CTA_IS_EXTERNAL = Boolean(CONSULTATION_URL);

export const BRAND = {
  name: "FATIMA",
  tagline: "Real Estate Growth System",
  colors: {
    yellow: "#FACC15",
    yellowHover: "#EAB308",
    yellowSoft: "#FEF9C3",
    background: "#FAF8F5",
    card: "#FFFFFF",
    text: "#18181B",
    muted: "#71717A",
    border: "#EAE7E2",
  },
} as const;

export const NAV_LINKS = [
  { label: "Le système", href: "#systeme" },
  { label: "Comment ça marche", href: "#parcours" },
  { label: "Solutions", href: "#solutions" },
  { label: "Notre offre", href: "#offre" },
  { label: "FAQ", href: "#faq" },
] as const;

export const SEO = {
  title: "FATIMA | Système d'Acquisition Immobilière & Leads Qualifiés",
  description:
    "Attirez des acheteurs et locataires qualifiés, organisez vos visites et développez votre activité immobilière grâce au système d'acquisition FATIMA.",
} as const;

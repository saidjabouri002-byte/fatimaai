"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS, PRIMARY_CTA_HREF, PRIMARY_CTA_IS_EXTERNAL } from "@/config/site";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const ctaProps = PRIMARY_CTA_IS_EXTERNAL ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Navigation principale"
        className={cn(
          "mx-auto flex h-14 max-w-[1120px] items-center justify-between rounded-2xl border px-3 pl-4 transition-all duration-500 sm:h-16 sm:px-4 sm:pl-5",
          scrolled || open
            ? "border-line bg-white/85 shadow-[var(--shadow-float)] backdrop-blur-xl"
            : "border-transparent bg-white/40 backdrop-blur-sm",
        )}
      >
        <a href="#top" aria-label="FATIMA — accueil" className="rounded-lg">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative rounded-lg px-3 py-2 text-[14px] font-medium text-ink/70 transition-colors hover:text-ink after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-yellow-hover after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={PRIMARY_CTA_HREF}
            {...ctaProps}
            className="hidden h-10 items-center rounded-xl border border-line bg-surface px-4 text-[14px] font-medium text-ink shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:border-yellow hover:shadow-[0_8px_20px_-10px_rgba(234,179,8,0.7)] sm:inline-flex"
          >
            Réserver un diagnostic
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 max-w-[1120px] rounded-2xl border border-line bg-white p-3 shadow-[var(--shadow-float)] lg:hidden"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-[16px] font-medium text-ink hover:bg-surface-2"
                  >
                    {link.label}
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={PRIMARY_CTA_HREF}
              {...ctaProps}
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 flex h-12 items-center justify-center rounded-xl text-[15px] font-semibold"
            >
              Réserver un diagnostic
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import { Logo } from "@/components/ui/Logo";
import { footer } from "@/config/content";
import { NAV_LINKS, PRIMARY_CTA_HREF, PRIMARY_CTA_IS_EXTERNAL } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line px-4 pb-10 pt-12 sm:px-6">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-[360px]">
          <Logo />
          <p className="mt-4 text-[14px] leading-relaxed text-muted">{footer.tagline}</p>
        </div>
        <nav aria-label="Liens du pied de page" className="grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-3">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-[14px] text-ink/70 transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
          <a
            href={PRIMARY_CTA_HREF}
            {...(PRIMARY_CTA_IS_EXTERNAL ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="text-[14px] font-semibold text-ink underline decoration-yellow decoration-2 underline-offset-4"
          >
            Diagnostic gratuit
          </a>
        </nav>
      </div>
      <div className="mx-auto mt-10 flex max-w-[1200px] flex-col gap-2 border-t border-line-2 pt-6 text-[12.5px] text-subtle sm:flex-row sm:justify-between">
        <p>
          © {year} FATIMA — Real Estate Growth System. {footer.rights}
        </p>
        <p>Les marques citées (Meta, Google, WhatsApp, Instagram) appartiennent à leurs propriétaires respectifs.</p>
      </div>
    </footer>
  );
}

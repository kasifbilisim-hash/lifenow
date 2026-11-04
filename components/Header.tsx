import Link from "next/link";
import Image from "next/image";
import type { Dict, Locale } from "@/lib/i18n";
import LangSwitch from "./LangSwitch";

export default function Header({ lang, d }: { lang: Locale; d: Dict }) {
  const links = [
    { href: `/${lang}`, label: d.nav.home },
    { href: `/${lang}/urunler`, label: d.nav.products },
    { href: `/${lang}/hakkimizda`, label: d.nav.about },
    { href: `/${lang}/iletisim`, label: d.nav.contact },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/85 backdrop-blur">
      <div className="container-x flex h-16 md:h-20 items-center justify-between gap-6">
        <Link href={`/${lang}`} aria-label="Life Now">
          <Image src="/img/logo.jpg" alt="Life Now" width={720} height={560} priority className="h-11 md:h-14 w-auto mix-blend-multiply" />
        </Link>
        <nav className="hidden items-center gap-8 whitespace-nowrap font-medium lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-brand">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <LangSwitch lang={lang} />
          <a href="/Katalog_2026.pdf" target="_blank" className="btn btn-red !py-2.5 text-sm">
            {d.nav.catalog}
          </a>
        </div>
        <details className="group relative lg:hidden">
          <summary className="btn btn-ghost cursor-pointer list-none !py-2 text-sm">{d.nav.menu}</summary>
          <div className="absolute end-0 mt-3 w-64 space-y-4 rounded-2xl border border-black/5 bg-white p-5 shadow-xl">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="block font-medium">
                {l.label}
              </Link>
            ))}
            <a href="/Katalog_2026.pdf" target="_blank" className="block font-medium text-brand">
              {d.nav.catalog}
            </a>
            <LangSwitch lang={lang} />
          </div>
        </details>
      </div>
    </header>
  );
}

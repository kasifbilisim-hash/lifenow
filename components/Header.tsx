import Link from "next/link";
import Image from "next/image";
import type { Dict, Locale } from "@/lib/i18n";
import LangSwitch, { LangSelect } from "./LangSwitch";

export default function Header({ lang, d }: { lang: Locale; d: Dict }) {
  const links = [
    { href: `/${lang}`, label: d.nav.home },
    { href: `/${lang}/urunler`, label: d.nav.products },
    { href: `/${lang}/hakkimizda`, label: d.nav.about },
    { href: `/${lang}/iletisim`, label: d.nav.contact },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white">
      <div className="container-x flex h-24 md:h-32 items-center justify-between gap-6">
        <Link href={`/${lang}`} aria-label="Life Now Global" className="flex min-w-0 items-center gap-2 md:gap-3">
          <Image src="/img/logo.jpg" alt="" width={720} height={560} priority className="h-[72px] md:h-24 w-auto shrink-0 mix-blend-multiply" />
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
        <div className="flex items-center gap-2 lg:hidden">
          <LangSelect lang={lang} />
          <details className="group relative">
          <summary className="btn btn-ghost h-10 cursor-pointer list-none !py-0 text-sm">{d.nav.menu}</summary>
          <div className="absolute end-0 mt-3 w-64 space-y-4 rounded-2xl border border-black/5 bg-white p-5 shadow-xl">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="block font-medium">
                {l.label}
              </Link>
            ))}
            <a href="/Katalog_2026.pdf" target="_blank" className="block font-medium text-brand">
              {d.nav.catalog}
            </a>
          </div>
        </details>
        </div>
      </div>
    </header>
  );
}

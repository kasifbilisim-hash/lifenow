"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n";

export default function LangSwitch({ lang }: { lang: Locale }) {
  const pathname = usePathname() ?? `/${lang}`;
  const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
  return (
    <div className="flex items-center gap-1 text-sm" aria-label="Language">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l}
          title={localeNames[l]}
          className={`rounded-full px-2.5 py-1 font-semibold uppercase transition ${
            l === lang ? "bg-navy text-white" : "text-muted hover:text-navy"
          }`}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}

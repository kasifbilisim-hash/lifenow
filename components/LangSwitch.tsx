"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, isLocale, type Locale } from "@/lib/i18n";

/** Kullanıcının seçtiği dili hatırlar; proxy.ts bir sonraki ziyarette bunu kullanır. */
function rememberLocale(l: Locale) {
  try {
    document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000; samesite=lax`;
  } catch {}
}

function useSwitchPath(lang: Locale) {
  const pathname = usePathname() ?? `/${lang}`;
  const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
  return (l: Locale) => `/${l}${rest}`;
}

/** Masaüstü: yan yana dil düğmeleri. */
export default function LangSwitch({ lang }: { lang: Locale }) {
  const hrefFor = useSwitchPath(lang);
  return (
    <div className="flex items-center gap-1 text-sm" aria-label="Language">
      {locales.map((l) => (
        <Link
          key={l}
          href={hrefFor(l)}
          hrefLang={l}
          title={localeNames[l]}
          onClick={() => rememberLocale(l)}
          className={`rounded-full px-3 py-1.5 font-semibold uppercase transition ${
            l === lang ? "bg-navy text-white" : "text-muted hover:text-navy"
          }`}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}

/** Mobil: menü düğmesinin yanında açılır dil seçici (yerel select, her cihazda kolay kullanım). */
export function LangSelect({ lang }: { lang: Locale }) {
  const router = useRouter();
  const hrefFor = useSwitchPath(lang);
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Language</span>
      <select
        value={lang}
        onChange={(e) => {
          const l = e.target.value;
          if (!isLocale(l)) return;
          rememberLocale(l);
          router.push(hrefFor(l));
        }}
        className="h-10 cursor-pointer appearance-none rounded-full border-[1.5px] border-navy/70 bg-transparent ps-3.5 pe-8 text-sm font-semibold text-navy outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {localeNames[l]}
          </option>
        ))}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 12 12"
        className="pointer-events-none absolute end-3 h-3 w-3 text-navy"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 4.5l4 4 4-4" />
      </svg>
    </label>
  );
}

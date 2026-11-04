import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, isLocale, type Locale } from "@/lib/i18n";

const COOKIE = "NEXT_LOCALE";

/** Accept-Language başlığını q değerine göre sıralayıp desteklenen ilk dili döndürür. */
function fromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;
  const prefs = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { lang: tag.trim().toLowerCase().split("-")[0], q: q ? parseFloat(q.split("=")[1]) : 1 };
    })
    .filter((p) => p.lang && p.lang !== "*" && !Number.isNaN(p.q) && p.q > 0)
    .sort((a, b) => b.q - a.q);

  const hit = prefs.find((p) => isLocale(p.lang));
  if (hit) return hit.lang as Locale;
  // Desteklenmeyen dil (örn. Almanca): yabancı ziyaretçiye İngilizce göster.
  return prefs.length ? "en" : defaultLocale;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  const saved = req.cookies.get(COOKIE)?.value;
  const locale: Locale =
    saved && isLocale(saved) ? saved : fromAcceptLanguage(req.headers.get("accept-language"));

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|img|.*\\..*|api).*)"],
};

import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import { legacyProductPath, legacyStaticPaths } from "@/lib/legacy";
import { SITE_URL } from "@/lib/site";

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
  const { pathname, search } = req.nextUrl;
  const host = (req.headers.get("host") ?? "").split(":")[0].toLowerCase();

  // 1) Üretimde www'suz adres → www (301). Google'da iki sürüm de indeksli.
  if (host === "lifenow.com.tr") {
    return NextResponse.redirect(`${SITE_URL}${pathname}${search}`, 301);
  }

  // 2) Eski ürün sayfaları: /u/<ad>-<id>  → yeni ürün sayfası (301).
  const old = pathname.match(/^\/u\/([^/]+)\/?$/);
  if (old) {
    const target = legacyProductPath(old[1]);
    const url = req.nextUrl.clone();
    url.pathname = target ? `/tr${target}` : "/tr/urunler";
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  // 3) Eski sabit sayfalar (301).
  const stat = legacyStaticPaths[pathname.replace(/\/$/, "").toLowerCase()];
  if (stat) {
    const url = req.nextUrl.clone();
    url.pathname = stat;
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  // 4) Dil öneki olan adresler olduğu gibi açılır.
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  // 5) Dil öneki olmayan adresler: çerez veya tarayıcı diline göre (geçici, 307).
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


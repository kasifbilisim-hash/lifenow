import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  const accept = req.headers.get("accept-language") ?? "";
  const pref = accept
    .split(",")
    .map((p) => p.trim().slice(0, 2).toLowerCase())
    .find((p) => (locales as readonly string[]).includes(p));
  const url = req.nextUrl.clone();
  url.pathname = `/${pref ?? defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|img|.*\\..*|api).*)"],
};

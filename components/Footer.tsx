import Link from "next/link";
import Image from "next/image";
import type { Dict, Locale } from "@/lib/i18n";
import { contactInfo } from "@/lib/i18n";

export default function Footer({ lang, d }: { lang: Locale; d: Dict }) {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="container-x grid gap-10 py-12 md:py-16 md:grid-cols-3">
        <div>
          <Image src="/img/logo.jpg" alt="Life Now" width={720} height={560} className="h-20 w-auto rounded-xl" />
          <p className="mt-5 max-w-xs text-lg font-semibold">{d.footer.tagline}</p>
        </div>
        <div className="space-y-2 text-white/80">
          <Link className="block hover:text-white" href={`/${lang}/urunler`}>{d.nav.products}</Link>
          <Link className="block hover:text-white" href={`/${lang}/hakkimizda`}>{d.nav.about}</Link>
          <Link className="block hover:text-white" href={`/${lang}/iletisim`}>{d.nav.contact}</Link>
          <a className="block hover:text-white" href="/Katalog_2026.pdf" target="_blank">{d.nav.catalog}</a>
        </div>
        <div className="space-y-2 text-white/80" dir="ltr" style={{ textAlign: lang === "ar" ? "right" : "left" }}>
          <p dir={lang === "ar" ? "rtl" : "ltr"}>{d.contact.addr}</p>
          {contactInfo.phones.map((p) => (
            <a key={p} className="block hover:text-white" href={`tel:${p.replace(/\s/g, "")}`}>{p}</a>
          ))}
          <a className="block hover:text-white" href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-white/60">
        © 2026 {d.about.company}. {d.footer.rights}
      </div>
    </footer>
  );
}

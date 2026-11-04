import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { catalog, catIds, getDict, isLocale, locales, contactInfo, type CatId } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

const find = (slug: string) => catalog.find((c) => c.id === slug);

export function generateStaticParams() {
  return locales.flatMap((lang) => catIds.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/urunler/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const c = find(slug);
  if (!isLocale(lang) || !c) return {};
  const d = getDict(lang);
  const cat = d.cats[c.id as CatId];
  const title = `${cat.name} – ${cat.sub} | Life Now`;
  const description = `${cat.name} (${cat.sub}): ${c.sizes.join(", ")}. ${d.meta.description}`;
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/urunler/${c.id}`,
      languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}/urunler/${c.id}`])),
    },
    openGraph: { title, description, images: [`${SITE_URL}/img/${c.image}.jpg`] },
  };
}

export default async function ProductPage({ params }: PageProps<"/[lang]/urunler/[slug]">) {
  const { lang, slug } = await params;
  const c = find(slug);
  if (!isLocale(lang) || !c) notFound();
  const d = getDict(lang);
  const cat = d.cats[c.id as CatId];
  const others = catalog.filter((x) => x.id !== c.id).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${cat.name} – ${cat.sub}`,
    brand: { "@type": "Brand", name: "Life Now" },
    manufacturer: { "@type": "Organization", name: "Life Now Global" },
    image: `${SITE_URL}/img/${c.image}.jpg`,
    description: d.meta.description,
    url: `${SITE_URL}/${lang}/urunler/${c.id}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-paper">
        <div className="container-x py-8 md:py-12">
          <Link href={`/${lang}/urunler`} className="text-sm font-semibold text-navy hover:text-brand">
            <span className="rtl-flip">←</span> {d.products.back}
          </Link>
        </div>
      </section>

      <section className="container-x grid items-center gap-8 py-10 md:grid-cols-2 md:gap-12 md:py-16">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-paper">
          <Image src={`/img/${c.image}.jpg`} alt={`${cat.name} ${cat.sub}`} fill priority sizes="(min-width:768px) 600px, 100vw" className="object-contain p-4 mix-blend-multiply" />
        </div>
        <div>
          <p className="eyebrow">{cat.sub}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">{cat.name}</h1>
          <p className="eyebrow mt-8">{d.products.sizes}</p>
          <ul className="mt-3 flex flex-wrap gap-2" dir="ltr">
            {c.sizes.map((s) => (
              <li key={s} className="rounded-full bg-paper px-4 py-1.5 text-sm font-semibold text-navy">{s}</li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={`/${lang}/iletisim`} className="btn btn-red">{d.products.quote}</Link>
            <a href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-navy">
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-x grid gap-6 py-12 sm:grid-cols-3 md:py-16">
          {others.map((o) => (
            <Link key={o.id} href={`/${lang}/urunler/${o.id}`} className="group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[16/10] bg-paper">
                <Image src={`/img/${o.image}.jpg`} alt={d.cats[o.id].name} fill sizes="400px" className="object-contain p-4 mix-blend-multiply" />
              </div>
              <div className="p-5">
                <h2 className="font-semibold text-navy">{d.cats[o.id].name}</h2>
                <p className="text-sm text-muted">{d.cats[o.id].sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { catalog, catIds, getDict, isLocale, locales, type CatId, type Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import { barcodeLabel, findProduct, groupTitles, productImage, products } from "@/lib/products";
import Barcode from "@/components/Barcode";
import { callLabel, telHref, waHref } from "@/lib/contact";

const find = (slug: string) => catalog.find((c) => c.id === slug);

export function generateStaticParams() {
  return locales.flatMap((lang) => [...catIds, ...products.map((p) => p.slug)].map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/urunler/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const prod = findProduct(slug);
  if (isLocale(lang) && prod) {
    const d = getDict(lang);
    const title = `${prod.name[lang]} ${prod.variant[lang]} ${prod.size} | Life Now`;
    const description = `${prod.name[lang]} (${prod.variant[lang]}, ${prod.size}). ${d.meta.description}`;
    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/${lang}/urunler/${prod.slug}`,
        languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}/urunler/${prod.slug}`])),
      },
      openGraph: { title, description, images: [`${SITE_URL}${productImage(prod)}`] },
    };
  }
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
  const prod = findProduct(slug);
  if (isLocale(lang) && prod) return <SingleProduct lang={lang} slug={prod.slug} />;
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
            <a href={waHref(lang, `${cat.name} ${cat.sub}`)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-navy">
              WhatsApp
            </a>
            <a href={telHref} className="btn btn-ghost text-navy">{callLabel[lang]}</a>
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

function SingleProduct({ lang, slug }: { lang: Locale; slug: string }) {
  const p = findProduct(slug)!;
  const d = getDict(lang);
  const title = `${p.name[lang]} – ${p.variant[lang]}`;
  const related = products.filter((x) => x.group === p.group && x.slug !== p.slug);
  const more = related.length ? related : products.filter((x) => x.slug !== p.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${title} ${p.size}`,
    ...(p.barcode ? { gtin13: p.barcode } : {}),
    brand: { "@type": "Brand", name: "Life Now" },
    manufacturer: { "@type": "Organization", name: "Life Now Global" },
    image: `${SITE_URL}${productImage(p)}`,
    description: d.meta.description,
    url: `${SITE_URL}/${lang}/urunler/${p.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-paper">
        <div className="container-x py-8 md:py-12">
          <Link href={`/${lang}/urunler#${p.group}`} className="text-sm font-semibold text-navy hover:text-brand">
            <span className="rtl-flip">←</span> {d.products.back}
          </Link>
        </div>
      </section>

      <section className="container-x grid items-center gap-8 py-10 md:grid-cols-2 md:gap-12 md:py-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-paper">
          <Image src={productImage(p)} alt={`${title} ${p.size}`} fill priority sizes="(min-width:768px) 560px, 100vw" className="object-contain p-8 mix-blend-multiply" />
        </div>
        <div>
          <p className="eyebrow">{groupTitles[p.group][lang]}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">{p.name[lang]}</h1>
          <p className="mt-2 text-lg text-muted">{p.variant[lang]}</p>
          <p className="eyebrow mt-8">{d.products.sizes}</p>
          <ul className="mt-3 flex flex-wrap gap-2" dir="ltr">
            <li className="rounded-full bg-paper px-4 py-1.5 text-sm font-semibold text-navy">{p.size}</li>
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={`/${lang}/iletisim`} className="btn btn-red">{d.products.quote}</Link>
            <a href={waHref(lang, `${p.name[lang]} ${p.variant[lang]} ${p.size}`)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-navy">
              WhatsApp
            </a>
            <a href={telHref} className="btn btn-ghost text-navy">{callLabel[lang]}</a>
          </div>
          {p.barcode && (
            <>
          <p className="eyebrow mt-10">{barcodeLabel[lang]}</p>
          <div className="mt-3 inline-block rounded-2xl border border-black/10 bg-white p-3">
            <Barcode code={p.barcode} label={barcodeLabel[lang]} />
          </div>
            </>
          )}
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-x grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3 md:py-16">
          {more.map((o) => (
            <Link key={o.slug} href={`/${lang}/urunler/${o.slug}`} className="group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[4/5] bg-paper">
                <Image src={productImage(o)} alt={`${o.name[lang]} ${o.variant[lang]} ${o.size}`} fill sizes="400px" className="object-contain p-6 mix-blend-multiply" />
              </div>
              <div className="p-5">
                <h2 className="font-semibold text-navy">{o.name[lang]}</h2>
                <p className="text-sm text-muted">{o.variant[lang]} · <span dir="ltr">{o.size}</span></p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { catalog, getDict, isLocale } from "@/lib/i18n";
import { groupTitles, productGroups, productImage, products } from "@/lib/products";

export default async function Products({ params }: PageProps<"/[lang]/urunler">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);

  return (
    <>
      <section className="bg-paper">
        <div className="container-x py-12 md:py-20">
          <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl">{d.products.title}</h1>
          <p className="mt-4 max-w-xl text-lg text-muted">{d.products.text}</p>
          <a href="/Katalog_2026.pdf" target="_blank" className="btn btn-red mt-8">{d.products.download}</a>
        </div>
      </section>

      {productGroups.map((g) => (
        <section key={g} id={g} className="container-x scroll-mt-28 pb-10 first:pt-10 md:pb-16 md:first:pt-16">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">{groupTitles[g][lang]}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.filter((p) => p.group === g).map((p) => (
              <Link
                key={p.slug}
                href={`/${lang}/urunler/${p.slug}`}
                className="group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/5] bg-paper">
                  <Image src={productImage(p)} alt={`${p.name[lang]} ${p.variant[lang]} ${p.size}`} fill sizes="(min-width:1024px) 360px, (min-width:640px) 45vw, 100vw" className="object-contain p-6 mix-blend-multiply" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-navy">{p.name[lang]}</h3>
                  <p className="text-sm text-muted">{p.variant[lang]}</p>
                  <span className="mt-3 inline-block rounded-full bg-paper px-3 py-1 text-sm font-semibold text-navy" dir="ltr">{p.size}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <div className="container-x space-y-6 pb-10 pt-4 md:pb-16">
        {catalog.map((c, i) => (
          <article
            key={c.id}
            id={c.id}
            className={`grid scroll-mt-28 items-center gap-8 overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-sm md:grid-cols-2 ${
              i % 2 ? "md:[&>div:first-child]:order-2" : ""
            }`}
          >
            <div className="relative aspect-[16/10] bg-paper">
              <Image src={`/img/${c.image}.jpg`} alt={d.cats[c.id].name} fill sizes="(min-width:768px) 600px, 100vw" className="object-contain p-4 mix-blend-multiply" />
            </div>
            <div className="p-8 md:p-10">
              <h2 className="text-3xl font-bold text-navy">
                <Link href={`/${lang}/urunler/${c.id}`} className="hover:text-brand">{d.cats[c.id].name}</Link>
              </h2>
              <p className="mt-1 text-muted">{d.cats[c.id].sub}</p>
              <p className="eyebrow mt-8">{d.products.sizes}</p>
              <ul className="mt-3 flex flex-wrap gap-2" dir="ltr">
                {c.sizes.map((s) => (
                  <li key={s} className="rounded-full bg-paper px-4 py-1.5 text-sm font-semibold text-navy">{s}</li>
                ))}
              </ul>
              <Link href={`/${lang}/urunler/${c.id}`} className="btn btn-ghost mt-7 text-navy !py-2.5 text-sm">{d.products.detail} <span className="rtl-flip">→</span></Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

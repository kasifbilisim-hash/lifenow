import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { categories, type CategoryId } from "@/lib/categories";
import { productImage, products } from "@/lib/products";

export default async function CategoryPage({ params, id }: { params: Promise<{ lang: string }>; id: CategoryId }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);
  const c = categories.find((x) => x.id === id)!;
  return (
    <>
      <section className="bg-paper">
        <div className="container-x py-12 md:py-16">
          <Link href={`/${lang}/urunler`} className="text-sm font-semibold text-brand">← {d.nav.products}</Link>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">{c.title[lang]}</h1>
        </div>
      </section>
      <section className="container-x py-10 md:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.filter((p) => c.groups.includes(p.group)).map((p) => (
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
    </>
  );
}

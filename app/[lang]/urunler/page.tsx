import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { categories } from "@/lib/categories";

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

      <section className="container-x py-10 md:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/${lang}/urunler/${c.id}`}
              className="group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] bg-paper">
                <Image src={c.image} alt={c.title[lang]} fill sizes="(min-width:1024px) 400px, (min-width:640px) 45vw, 100vw" className="object-contain p-6 mix-blend-multiply" />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold text-navy">{c.title[lang]}</h2>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

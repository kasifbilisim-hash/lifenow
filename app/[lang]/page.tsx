import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { catalog, getDict, isLocale } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-paper">
        <div className="container-x grid items-center gap-10 py-10 md:grid-cols-2 md:py-24">
          <div>
            <p className="eyebrow">{d.hero.eyebrow}</p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-7xl">
              {d.hero.title}
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted">{d.hero.text}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={`/${lang}/urunler`} className="btn btn-red">
                {d.hero.cta1} <span className="rtl-flip">→</span>
              </Link>
              <a href="/Katalog_2026.pdf" target="_blank" className="btn btn-ghost text-navy">
                {d.hero.cta2}
              </a>
            </div>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm sm:aspect-[5/6] md:max-w-md overflow-hidden rounded-[2.5rem] shadow-2xl">
            <Image src="/img/hero.jpg" alt="Life Now" fill priority sizes="(min-width:768px) 450px, 90vw" className="object-cover object-top" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-x py-14 md:py-24">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl md:text-5xl">{d.values.title}</h2>
            <p className="mt-5 text-lg text-muted">{d.values.text}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 [grid gap-4 sm:grid-cols-3>div]:p-5">
            {d.values.items.map((it, i) => (
              <div key={i} className="rounded-3xl bg-paper p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand font-bold text-white">{i + 1}</span>
                <h3 className="mt-5 text-lg font-semibold">{it.t}</h3>
                <p className="mt-2 text-sm text-muted">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lineup */}
      <section className="bg-navy-deep text-white">
        <div className="mx-auto max-w-[1360px] px-0 py-8 sm:px-6 md:py-20">
          <div className="relative mx-auto aspect-[3200/1464] overflow-hidden sm:rounded-[2rem]">
            <Image src="/img/row1.webp" alt="Life Now" fill sizes="(min-width:1360px) 1360px, 100vw" className="object-contain" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-x py-14 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">{d.home.catTitle}</h2>
            <p className="mt-4 max-w-xl text-lg text-muted">{d.home.catText}</p>
          </div>
          <Link href={`/${lang}/urunler`} className="btn btn-ghost text-navy">
            {d.home.all} <span className="rtl-flip">→</span>
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {catalog.slice(0, 6).map((c) => (
            <Link key={c.id} href={`/${lang}/urunler/${c.id}`} className="group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[16/10] bg-paper">
                <Image src={`/img/${c.image}.jpg`} alt={d.cats[c.id].name} fill sizes="400px" className="object-contain p-4 mix-blend-multiply" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-navy">{d.cats[c.id].name}</h3>
                <p className="text-sm text-muted">{d.cats[c.id].sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="bg-paper">
        <div className="container-x py-14 md:py-24">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">{d.home.stepsTitle}</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {d.home.steps.map((s, i) => (
              <div key={i}>
                <div className="text-6xl font-bold text-brand/20">0{i + 1}</div>
                <h3 className="mt-2 text-xl font-semibold text-navy">{s.t}</h3>
                <p className="mt-2 text-muted">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="relative isolate overflow-hidden">
        <Image src="/img/lifestyle.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover object-top" />
        <div className="absolute inset-0 -z-10 bg-navy-deep/70" />
        <div className="container-x py-20 md:py-32 text-center">
          <p className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-6xl">{d.banner}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x py-14 md:py-24 text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">{d.cta.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted">{d.cta.text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={`/${lang}/iletisim`} className="btn btn-red">{d.cta.b1}</Link>
          <a href="/Katalog_2026.pdf" target="_blank" className="btn btn-ghost text-navy">{d.cta.b2}</a>
        </div>
      </section>
    </>
  );
}

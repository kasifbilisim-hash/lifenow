import Image from "next/image";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";

export default async function About({ params }: PageProps<"/[lang]/hakkimizda">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);

  return (
    <>
      <section className="bg-paper">
        <div className="container-x py-12 md:py-20">
          <p className="eyebrow">{d.about.company}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl lg:text-6xl">{d.about.title}</h1>
          <p className="mt-5 max-w-2xl text-xl text-muted">{d.about.lead}</p>
        </div>
      </section>
      <section className="container-x grid items-center gap-8 py-12 md:grid-cols-2 md:gap-12 md:py-20">
        <div className="space-y-6 text-lg leading-relaxed text-ink/80">
          {d.about.p.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </div>
        <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] shadow-2xl">
          <Image src="/img/lifestyle.jpg" alt="" fill sizes="(min-width:768px) 500px, 100vw" className="object-cover" />
        </div>
      </section>
    </>
  );
}

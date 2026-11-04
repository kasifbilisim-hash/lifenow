import { notFound } from "next/navigation";
import { contactInfo, getDict, isLocale } from "@/lib/i18n";
import { callLabel, telHref, waHref } from "@/lib/contact";

export default async function Contact({ params }: PageProps<"/[lang]/iletisim">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);

  const rows = [
    { label: d.contact.address, node: <span>{d.contact.addr}</span> },
    {
      label: d.contact.phone,
      node: (
        <span dir="ltr" className="flex flex-col">
          {contactInfo.phones.map((p) => (
            <a key={p} className="hover:text-brand" href={`tel:${p.replace(/\s/g, "")}`}>{p}</a>
          ))}
        </span>
      ),
    },
    { label: d.contact.email, node: <a className="hover:text-brand" href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a> },
  ];

  return (
    <>
      <section className="bg-paper">
        <div className="container-x py-12 md:py-20">
          <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl">{d.contact.title}</h1>
          <p className="mt-4 max-w-xl text-lg text-muted">{d.contact.text}</p>
        </div>
      </section>
      <section className="container-x py-10 md:py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {rows.map((r) => (
            <div key={r.label} className="rounded-3xl border border-black/5 p-8 shadow-sm">
              <p className="eyebrow">{r.label}</p>
              <div className="mt-3 text-lg font-medium text-navy">{r.node}</div>
            </div>
          ))}
        </div>
        <a
          href={waHref(lang)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-red mt-8"
        >
          {d.contact.whatsapp}
        </a>
        <a href={telHref} className="btn btn-ghost mt-8 ms-3 text-navy">
          {callLabel[lang]}
        </a>
      </section>
    </>
  );
}

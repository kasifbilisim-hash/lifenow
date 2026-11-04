import type { Locale } from "./i18n";

/** Sitenin tek iletişim hattı: arama ve WhatsApp bu numara üzerinden. */
export const PHONE_DISPLAY = "+90 541 825 67 64";
export const PHONE_E164 = "+905418256764";
export const WA_NUMBER = "905418256764";
export const telHref = `tel:${PHONE_E164}`;

export const callLabel: Record<Locale, string> = { tr: "Ara", en: "Call", ru: "Позвонить", ar: "اتصل" };

const generic: Record<Locale, string> = {
  tr: "Merhaba, Life Now ürünleri hakkında bilgi almak istiyorum.",
  en: "Hello, I would like information about Life Now products.",
  ru: "Здравствуйте, хочу узнать о продукции Life Now.",
  ar: "مرحبًا، أود الحصول على معلومات عن منتجات Life Now.",
};

const about: Record<Locale, (s: string) => string> = {
  tr: (s) => `Merhaba, ${s} hakkında bilgi ve fiyat almak istiyorum.`,
  en: (s) => `Hello, I would like information and a price for: ${s}.`,
  ru: (s) => `Здравствуйте, хочу узнать цену и условия: ${s}.`,
  ar: (s) => `مرحبًا، أود الحصول على معلومات وسعر عن: ${s}.`,
};

/** WhatsApp bağlantısı; ürün adı verilirse mesaj o ürünle hazır gelir. */
export function waHref(lang: Locale, subject?: string) {
  const text = subject ? about[lang](subject) : generic[lang];
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

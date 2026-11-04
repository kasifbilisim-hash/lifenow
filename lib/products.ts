import type { Locale } from "./i18n";

type L = Record<Locale, string>;

export const productGroups = ["bulasik", "bidon", "sabun", "yumusatici"] as const;
export type ProductGroup = (typeof productGroups)[number];

export const groupTitles: Record<ProductGroup, L> = {
  bulasik: { tr: "Sıvı Bulaşık & Genel Temizlik", en: "Dishwashing & Cleaning Liquids", ru: "Средства для посуды и уборки", ar: "سائل الأطباق والتنظيف العام" },
  bidon: { tr: "Ekonomik Boy Sıvılar", en: "Economy Size Liquids", ru: "Экономичные канистры", ar: "سوائل بأحجام اقتصادية" },
  sabun: { tr: "Sıvı Sabun", en: "Liquid Soap", ru: "Жидкое мыло", ar: "صابون سائل" },
  yumusatici: { tr: "Yumuşatıcı", en: "Laundry Softener", ru: "Кондиционер для белья", ar: "منعم الأقمشة" },
};

export type Product = {
  slug: string;
  group: ProductGroup;
  size: string;
  barcode: string;
  name: L;
  variant: L;
};

const dish: L = { tr: "Bulaşık Deterjanı", en: "Dishwashing Liquid", ru: "Средство для мытья посуды", ar: "سائل غسيل الأطباق" };
const lemon: L = { tr: "Limon Kokulu", en: "Lemon scented", ru: "С ароматом лимона", ar: "برائحة الليمون" };
const asprin: L = { tr: "Asprin Çok Amaçlı Temizlik Sıvısı", en: "Asprin Multi-Purpose Cleaner", ru: "Asprin универсальное чистящее средство", ar: "Asprin منظف متعدد الاستخدامات" };
const soap: L = { tr: "Sıvı Sabun", en: "Liquid Soap", ru: "Жидкое мыло", ar: "صابون سائل" };
const lavGarden: L = { tr: "Lavanta Bahçesi", en: "Lavender Garden", ru: "Лавандовый сад", ar: "حديقة اللافندر" };
const roseGarden: L = { tr: "Gül Bahçesi", en: "Rose Garden", ru: "Розовый сад", ar: "حديقة الورد" };
const extraSoft: L = { tr: "Extra Yumuşatıcı", en: "Extra Laundry Softener", ru: "Кондиционер для белья Extra", ar: "منعم الأقمشة إكسترا" };
const soft: L = { tr: "Yumuşatıcı", en: "Laundry Softener", ru: "Кондиционер для белья", ar: "منعم الأقمشة" };
const lavScent: L = { tr: "Lavanta", en: "Lavender", ru: "Лаванда", ar: "لافندر" };
const roseScent: L = { tr: "Gül Kokulu", en: "Rose scent", ru: "Аромат розы", ar: "برائحة الورد" };
const spray: L = { tr: "Sprey", en: "Spray", ru: "Спрей", ar: "بخاخ" };
const economy: L = { tr: "Ekonomik Boy", en: "Economy size", ru: "Экономичная упаковка", ar: "عبوة اقتصادية" };

export const products: Product[] = [
  { slug: "bulasik-limon-650ml", group: "bulasik", size: "650 ml", barcode: "8684765129682", name: dish, variant: lemon },
  { slug: "asprin-sprey-750ml", group: "bulasik", size: "750 ml", barcode: "8684765129705", name: asprin, variant: spray },
  { slug: "ultra-guc-1000ml", group: "bulasik", size: "1000 ml", barcode: "8684765129668", name: { tr: "Ultra Güç", en: "Ultra Power", ru: "Ultra Güç", ar: "Ultra Güç" }, variant: spray },
  { slug: "bulasik-limon-4l", group: "bidon", size: "4 L", barcode: "8684765129699", name: dish, variant: { tr: "Limon Kokulu · Ekonomik Boy", en: "Lemon scented · Economy size", ru: "С ароматом лимона · Экономичная упаковка", ar: "برائحة الليمون · عبوة اقتصادية" } },
  { slug: "asprin-4l", group: "bidon", size: "4 L", barcode: "8684765129712", name: asprin, variant: economy },
  { slug: "ultra-yogun-camasir-suyu-4l", group: "bidon", size: "4 L", barcode: "8684765129729", name: { tr: "Ultra Yoğun Çamaşır Suyu", en: "Ultra Thick Bleach", ru: "Ультра густая белизна", ar: "مبيّض فائق التركيز" }, variant: { tr: "Ekstra Kıvam · Ekstra Hijyen", en: "Extra thick · Extra hygiene", ru: "Экстра густота · Экстра гигиена", ar: "كثافة إضافية · نظافة إضافية" } },
  { slug: "sivi-sabun-lavanta-3l", group: "sabun", size: "3 L", barcode: "8684765129651", name: soap, variant: lavGarden },
  { slug: "sivi-sabun-gul-3l", group: "sabun", size: "3 L", barcode: "8684765129651", name: soap, variant: roseGarden },
  { slug: "sivi-sabun-lavanta-500ml", group: "sabun", size: "500 ml", barcode: "8684765129644", name: soap, variant: lavGarden },
  { slug: "sivi-sabun-gul-500ml", group: "sabun", size: "500 ml", barcode: "8684765129644", name: soap, variant: roseGarden },
  { slug: "extra-yumusatici-gul-1440ml", group: "yumusatici", size: "1440 ml", barcode: "8684765129613", name: extraSoft, variant: roseScent },
  { slug: "extra-yumusatici-lavanta-1440ml", group: "yumusatici", size: "1440 ml", barcode: "8684765129606", name: extraSoft, variant: lavScent },
  { slug: "yumusatici-lavanta-3l", group: "yumusatici", size: "3 L", barcode: "8684765129620", name: soft, variant: lavScent },
  { slug: "yumusatici-gul-3l", group: "yumusatici", size: "3 L", barcode: "8684765129637", name: soft, variant: roseScent },
];

export const findProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productImage = (p: Product) => `/img/products/${p.slug}.webp`;

export const barcodeLabel: L = { tr: "Barkod (EAN-13)", en: "Barcode (EAN-13)", ru: "Штрихкод (EAN-13)", ar: "الباركود (EAN-13)" };

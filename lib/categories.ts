import type { ProductGroup } from "./products";

export type CategoryId = "matikler" | "elde-yikama" | "likitler";
type L4 = Record<"tr" | "en" | "ru" | "ar", string>;

export const categories: { id: CategoryId; title: L4; image: string; groups: ProductGroup[] }[] = [
  { id: "matikler", title: { tr: "Matikler", en: "Automatic Detergents", ru: "Автомат", ar: "الغسيل الأوتوماتيك" }, image: "/img/cat-matik.jpg", groups: ["matik", "kutu"] },
  { id: "elde-yikama", title: { tr: "Elde Yıkama", en: "Hand Wash", ru: "Ручная стирка", ar: "الغسيل اليدوي" }, image: "/img/cat-elde.jpg", groups: ["elde"] },
  { id: "likitler", title: { tr: "Likitler", en: "Liquids", ru: "Жидкие средства", ar: "السوائل" }, image: "/img/products/bulasik-limon-4l.webp", groups: ["bulasik", "bidon", "sabun", "yumusatici"] },
];

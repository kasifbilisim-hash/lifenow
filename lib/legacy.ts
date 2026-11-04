import type { CatId } from "./i18n";

/** Eski sitedeki ürün adresini (/u/<slug>-<id>) yeni sitedeki ürün grubuna eşler. */
export function legacyProductCategory(rawSlug: string): CatId | null {
  let s = rawSlug;
  try {
    s = decodeURIComponent(rawSlug);
  } catch {}
  s = s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ı/g, "i")
    .replace(/[–—]/g, "-");

  if (s.includes("elde")) return "elde";
  if (s.includes("kutu")) return s.includes("renkli") ? "kutu" : "kutu-beyaz";
  if (s.includes("paket") || s.includes("saset")) return "paket";
  if (s.includes("yumusat")) return "yumusatici";
  if (s.includes("sabun")) return "sabun";
  if (s.includes("bulasik") || s.includes("asprin") || s.includes("sari-guc")) return "bulasik";
  if (s.includes("camasir-suyu") || s.includes("bidon")) return "bidon";
  if (s.includes("beyazlar-ve-renkliler") || s.includes("renkliler-ve-beyazlar")) return "matik";
  if (s.includes("beyazlar")) return "matik-beyaz";
  if (s.includes("deterjan")) return "matik";
  return null;
}

/** Eski, sabit sayfa adresleri → yeni (Türkçe) sayfalar. */
export const legacyStaticPaths: Record<string, string> = {
  "/hakkimizda": "/tr/hakkimizda",
  "/iletisim": "/tr/iletisim",
  "/urunler": "/tr/urunler",
  "/anasayfa": "/tr",
  "/home": "/tr",
};

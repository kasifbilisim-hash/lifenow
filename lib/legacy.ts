
/** Eski sitedeki ürün adresini (/u/<slug>-<id>) yeni sitedeki ürün sayfasına (veya liste bölümüne) eşler. "/urunler/..." ile başlayan yol döndürür. */
export function legacyProductPath(rawSlug: string): string | null {
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

  const cat = (id: string) => `/urunler/${id}`;
  if (s.includes("elde")) return cat("elde");
  if (s.includes("kutu")) return cat(s.includes("renkli") ? "kutu" : "kutu-beyaz");
  if (s.includes("paket") || s.includes("saset")) return cat("paket");
  if (s.includes("yumusat")) return s.includes("extra") ? cat("extra-yumusatici-gul-1440ml") : cat("yumusatici-lavanta-3l");
  if (s.includes("sabun")) return cat("sivi-sabun-lavanta-3l");
  if (s.includes("sari-guc") || s.includes("ultra-guc")) return cat("ultra-guc-1000ml");
  if (s.includes("asprin")) return cat(s.includes("4") ? "asprin-4l" : "asprin-sprey-750ml");
  if (s.includes("bulasik")) return cat("bulasik-limon-650ml");
  if (s.includes("camasir-suyu") || s.includes("bidon")) return cat("ultra-yogun-camasir-suyu-4l");
  if (s.includes("beyazlar-ve-renkliler") || s.includes("renkliler-ve-beyazlar")) return cat("matik");
  if (s.includes("beyazlar")) return cat("matik-beyaz");
  if (s.includes("deterjan")) return cat("matik");
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

import type { MetadataRoute } from "next";
import { catIds, locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

const pages = ["", "/urunler", "/hakkimizda", "/iletisim", ...catIds.map((id) => `/urunler/${id}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((p) =>
    locales.map((l) => ({
      url: `${SITE_URL}/${l}${p}`,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : p.startsWith("/urunler/") ? 0.7 : 0.8,
      alternates: {
        languages: Object.fromEntries(locales.map((x) => [x, `${SITE_URL}/${x}${p}`])),
      },
    })),
  );
}

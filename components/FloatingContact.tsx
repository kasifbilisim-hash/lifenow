import type { Locale } from "@/lib/i18n";
import { callLabel, telHref, waHref } from "@/lib/contact";

const phoneIcon = "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-5.003-.766-8.97-4.733-9.736-9.736l1.293-.97c.362-.27.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z";
const chatIcon = "M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z";

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0" aria-hidden>
      <path d={d} />
    </svg>
  );
}

/** Mobilde altta sabit "Ara | WhatsApp" çubuğu; masaüstünde sağ altta yüzen iki düğme. */
export default function FloatingContact({ lang }: { lang: Locale }) {
  return (
    <>
      <div className="h-14 md:hidden" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-black/10 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,.08)] md:inset-x-auto md:bottom-6 md:end-6 md:flex md:flex-col md:gap-3 md:border-0 md:bg-transparent md:pb-0 md:shadow-none">
        <a
          href={telHref}
          className="flex h-14 items-center justify-center gap-2 bg-white font-semibold text-navy md:rounded-full md:border md:border-black/10 md:px-6 md:shadow-xl md:transition md:hover:-translate-y-0.5"
        >
          <Icon d={phoneIcon} />
          {callLabel[lang]}
        </a>
        <a
          href={waHref(lang)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 items-center justify-center gap-2 bg-[#25D366] font-semibold text-white md:rounded-full md:px-6 md:shadow-xl md:transition md:hover:-translate-y-0.5"
        >
          <Icon d={chatIcon} />
          WhatsApp
        </a>
      </div>
    </>
  );
}

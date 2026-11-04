export const locales = ["tr", "en", "ru", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

export const localeNames: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
  ru: "Русский",
  ar: "العربية",
};

export const isLocale = (v: string): v is Locale =>
  (locales as readonly string[]).includes(v);

export const dir = (l: Locale) => (l === "ar" ? "rtl" : "ltr");

export const catIds = [
  "matik",
  "matik-beyaz",
  "elde",
  "kutu",
  "kutu-beyaz",
  "paket",
  "bulasik",
  "bidon",
  "sabun",
  "yumusatici",
] as const;
export type CatId = (typeof catIds)[number];

type Cat = { name: string; sub: string };

export type Dict = {
  meta: { title: string; description: string };
  nav: { home: string; products: string; about: string; contact: string; catalog: string; menu: string };
  hero: { eyebrow: string; title: string; text: string; cta1: string; cta2: string };
  values: { title: string; text: string; items: { t: string; d: string }[] };
  home: { catTitle: string; catText: string; all: string; stepsTitle: string; steps: { t: string; d: string }[] };
  banner: string;
  cta: { title: string; text: string; b1: string; b2: string };
  products: { title: string; text: string; sizes: string; download: string; back: string; quote: string; detail: string };
  about: { title: string; lead: string; p: string[]; company: string };
  contact: { title: string; text: string; address: string; phone: string; email: string; whatsapp: string; addr: string };
  footer: { tagline: string; rights: string };
  cats: Record<CatId, Cat>;
};

const tr: Dict = {
  meta: {
    title: "Life Now – Her Yıkamada, Mükemmel Temizlik",
    description:
      "Life Now, ev ve endüstriyel kullanıma yönelik deterjan ve temizlik ürünleri markasıdır. Gaziantep'ten dünyaya.",
  },
  nav: { home: "Ana Sayfa", products: "Ürünler", about: "Hakkımızda", contact: "İletişim", catalog: "Katalog 2026", menu: "Menü" },
  hero: {
    eyebrow: "Life Now Global · Gaziantep",
    title: "Her yıkamada, mükemmel temizlik.",
    text: "Ev ve endüstriyel kullanım için yüksek kalitede, uygun fiyatlı deterjan ve temizlik ürünleri. Yerli üretim, çevreye duyarlı çözümler.",
    cta1: "Ürünleri keşfet",
    cta2: "Kataloğu indir",
  },
  values: {
    title: "Daha temiz bir gelecek için tasarlandı.",
    text: "Kurulduğumuz günden bu yana müşteri memnuniyetini ve ürün kalitesini ön planda tutuyoruz.",
    items: [
      { t: "Etkili temizlik", d: "Leke ve kirleri ilk yıkamada çözen güçlü formüller." },
      { t: "Çevreye duyarlı", d: "Etkili ve çevreye saygılı çözümler üretmeyi ilke edindik." },
      { t: "Uygun fiyat", d: "Yüksek kalite standartlarını herkes için ulaşılabilir kılıyoruz." },
    ],
  },
  home: {
    catTitle: "Ürün gruplarımız",
    catText: "Çamaşırdan bulaşığa, yüzey temizliğinden yumuşatıcıya tam bir temizlik ailesi.",
    all: "Tüm ürünler",
    stepsTitle: "Nasıl çalışırız?",
    steps: [
      { t: "Ürününüzü seçin", d: "Kataloğumuzdan ihtiyacınıza uygun ürün ve boyutu belirleyin." },
      { t: "Bizimle iletişime geçin", d: "Telefon, WhatsApp veya e-posta ile teklif talep edin." },
      { t: "Kapınıza gelsin", d: "Gaziantep'ten hızlı ve güvenilir sevkiyat sağlıyoruz." },
    ],
  },
  banner: "Çamaşırlarınız tertemiz, mis gibi.",
  cta: {
    title: "Life Now ile tanışmaya hazır mısınız?",
    text: "Toptan satış ve iş birliği için ekibimizle görüşün.",
    b1: "Bize ulaşın",
    b2: "Kataloğu indir",
  },
  products: {
    title: "Ürünler",
    text: "2026 kataloğumuzdaki tüm ürün grupları ve ambalaj boyutları.",
    sizes: "Ambalaj boyutları",
    download: "Katalog 2026 (PDF)",
    back: "Tüm ürünler",
    quote: "Teklif iste",
    detail: "Detayları gör",
  },
  about: {
    title: "Hakkımızda",
    lead: "Gaziantep'te kurulmuş yerli bir temizlik ürünleri üreticisiyiz.",
    p: [
      "Life Now Global, Gaziantep'te kurulmuş yerli bir temizlik ürünleri üreticisidir. Ev ve endüstriyel kullanıma yönelik deterjan ve temizlik ürünlerini, yüksek kalite standartlarında ve uygun fiyatlarla müşterilerine sunmaktadır.",
      "Kurulduğu günden bu yana müşteri memnuniyetini ve ürün kalitesini ön planda tutan firmamız, çevreye duyarlı ve etkili çözümler üretmeyi ilke edinmiştir. Life Now Global, güvenilir hizmet anlayışıyla temizlik sektöründe kalıcı bir yer edinmeyi ve daha temiz bir gelecek için çalışmayı sürdürmektedir.",
    ],
    company: "Life Now Global",
  },
  contact: {
    title: "İletişim",
    text: "Sorularınız, teklif talepleriniz ve iş birliği için bize yazın veya arayın.",
    address: "Adres",
    phone: "Telefon",
    email: "E-posta",
    whatsapp: "WhatsApp ile yaz",
    addr: "Taşlıca Mah. 70154 Cadde No:10/B10 Şehitkamil / Gaziantep",
  },
  footer: { tagline: "Her Yıkamada, Mükemmel Temizlik.", rights: "Tüm hakları saklıdır." },
  cats: {
    matik: { name: "Matik Deterjan", sub: "Beyazlar ve Renkliler" },
    "matik-beyaz": { name: "Matik Deterjan", sub: "Beyazlar" },
    elde: { name: "Matik ve Elde Yıkama", sub: "Beyazlar ve Renkliler" },
    kutu: { name: "Matik Deterjan Kutu", sub: "Beyazlar ve Renkliler" },
    "kutu-beyaz": { name: "Matik Deterjan Kutu", sub: "Beyazlar" },
    paket: { name: "Matik Deterjan Paket", sub: "Renkliler ve Beyazlar" },
    bulasik: { name: "Sıvı Bulaşık & Genel Temizlik", sub: "Bulaşık deterjanı, Asprin sprey, Sarı Güç" },
    bidon: { name: "Ekonomik Boy Sıvılar", sub: "Bulaşık deterjanı, Asprin, Ultra Yoğun Çamaşır Suyu" },
    sabun: { name: "Sıvı Sabun", sub: "Gül Bahçesi · Lavanta Bahçesi" },
    yumusatici: { name: "Yumuşatıcı", sub: "Extra Yumuşatıcı · Gül · Lavanta" },
  },
};

const en: Dict = {
  meta: {
    title: "Life Now – Perfect Cleaning, Every Wash",
    description:
      "Life Now is the household and industrial detergent and cleaning brand of Life Now Global, made in Gaziantep, Turkey.",
  },
  nav: { home: "Home", products: "Products", about: "About us", contact: "Contact", catalog: "Catalogue 2026", menu: "Menu" },
  hero: {
    eyebrow: "Life Now Global · Gaziantep, Türkiye",
    title: "Perfect cleaning, every wash.",
    text: "High-quality, affordable detergents and cleaning products for household and industrial use. Locally made, eco-friendly solutions.",
    cta1: "Explore products",
    cta2: "Download catalogue",
  },
  values: {
    title: "Engineered for a cleaner future.",
    text: "Since day one we have put customer satisfaction and product quality first.",
    items: [
      { t: "Effective cleaning", d: "Powerful formulas that tackle stains and dirt from the first wash." },
      { t: "Eco-conscious", d: "We make it our principle to create effective, environmentally friendly solutions." },
      { t: "Affordable", d: "High quality standards, within everyone's reach." },
    ],
  },
  home: {
    catTitle: "Our product ranges",
    catText: "A complete cleaning family, from laundry and dishes to surfaces and softeners.",
    all: "All products",
    stepsTitle: "How it works",
    steps: [
      { t: "Pick your product", d: "Choose the product and size that fits your needs from our catalogue." },
      { t: "Get in touch", d: "Request a quote by phone, WhatsApp or e-mail." },
      { t: "We deliver", d: "Fast and reliable shipping from Gaziantep." },
    ],
  },
  banner: "Spotless laundry, fresh as can be.",
  cta: {
    title: "Ready to meet Life Now?",
    text: "Talk to our team about wholesale and partnerships.",
    b1: "Contact us",
    b2: "Download catalogue",
  },
  products: {
    title: "Products",
    text: "All product ranges and pack sizes from our 2026 catalogue.",
    sizes: "Pack sizes",
    download: "Catalogue 2026 (PDF)",
    back: "All products",
    quote: "Request a quote",
    detail: "View details",
  },
  about: {
    title: "About us",
    lead: "A local cleaning products manufacturer based in Gaziantep.",
    p: [
      "Life Now Global is a local cleaning products manufacturer based in Gaziantep, Turkey. We offer household and industrial cleaning solutions that meet high quality standards at affordable prices.",
      "Since the day we were founded, our company has prioritized customer satisfaction and product quality, producing effective and eco-friendly solutions. Life Now Global aims to establish a lasting presence in the cleaning industry and is committed to working toward a cleaner future.",
    ],
    company: "Life Now Global",
  },
  contact: {
    title: "Contact",
    text: "Write or call us for questions, quotes and partnerships.",
    address: "Address",
    phone: "Phone",
    email: "E-mail",
    whatsapp: "Chat on WhatsApp",
    addr: "Taşlıca Mah. 70154 Cadde No:10/B10 Şehitkamil / Gaziantep, Türkiye",
  },
  footer: { tagline: "Perfect Cleaning, Every Wash.", rights: "All rights reserved." },
  cats: {
    matik: { name: "Laundry Detergent", sub: "Whites and Colors" },
    "matik-beyaz": { name: "Laundry Detergent", sub: "Whites" },
    elde: { name: "Machine & Hand Wash", sub: "Whites and Colors" },
    kutu: { name: "Machine Detergent Box", sub: "Whites and Colors" },
    "kutu-beyaz": { name: "Machine Detergent Box", sub: "Whites" },
    paket: { name: "Machine Detergent Pack", sub: "Colors and Whites" },
    bulasik: { name: "Dishwashing & Cleaning Liquids", sub: "Dish detergent, Asprin spray, Ultra Power spray" },
    bidon: { name: "Economy Size Liquids", sub: "Dish detergent, Asprin, Ultra Thick Bleach" },
    sabun: { name: "Liquid Soap", sub: "Rose Garden · Lavender Garden" },
    yumusatici: { name: "Laundry Softener", sub: "Extra Softener · Rose · Lavender" },
  },
};

const ru: Dict = {
  meta: {
    title: "Life Now – Идеальная чистота при каждой стирке",
    description:
      "Life Now — бренд бытовых и промышленных моющих и чистящих средств компании Life Now Global, Газиантеп, Турция.",
  },
  nav: { home: "Главная", products: "Продукция", about: "О нас", contact: "Контакты", catalog: "Каталог 2026", menu: "Меню" },
  hero: {
    eyebrow: "Life Now Global · Газиантеп, Турция",
    title: "Идеальная чистота при каждой стирке.",
    text: "Качественные моющие и чистящие средства по доступным ценам для дома и промышленности. Местное производство, экологичные решения.",
    cta1: "Смотреть продукцию",
    cta2: "Скачать каталог",
  },
  values: {
    title: "Создано для более чистого будущего.",
    text: "С момента основания мы ставим удовлетворённость клиентов и качество продукции на первое место.",
    items: [
      { t: "Эффективная чистота", d: "Мощные формулы справляются с пятнами и загрязнениями с первой стирки." },
      { t: "Забота об экологии", d: "Наш принцип — эффективные и экологичные решения." },
      { t: "Доступные цены", d: "Высокие стандарты качества — для каждого." },
    ],
  },
  home: {
    catTitle: "Наши линейки",
    catText: "Полная линейка средств: от стирки и мытья посуды до чистки поверхностей и кондиционеров.",
    all: "Вся продукция",
    stepsTitle: "Как мы работаем",
    steps: [
      { t: "Выберите продукт", d: "Подберите продукт и фасовку в нашем каталоге." },
      { t: "Свяжитесь с нами", d: "Запросите предложение по телефону, WhatsApp или e-mail." },
      { t: "Мы доставим", d: "Быстрая и надёжная отгрузка из Газиантепа." },
    ],
  },
  banner: "Бельё идеально чистое и свежее.",
  cta: {
    title: "Готовы познакомиться с Life Now?",
    text: "Свяжитесь с нашей командой по вопросам опта и сотрудничества.",
    b1: "Связаться с нами",
    b2: "Скачать каталог",
  },
  products: {
    title: "Продукция",
    text: "Все линейки и фасовки из каталога 2026.",
    sizes: "Фасовки",
    download: "Каталог 2026 (PDF)",
    back: "Вся продукция",
    quote: "Запросить предложение",
    detail: "Подробнее",
  },
  about: {
    title: "О нас",
    lead: "Местный производитель чистящих средств из Газиантепа.",
    p: [
      "Компания Life Now Global — это местный производитель чистящих средств, базирующийся в Газиантепе, Турция. Мы предлагаем бытовые и промышленные средства для чистки, соответствующие высоким стандартам качества по доступным ценам.",
      "С момента основания наша компания делает акцент на удовлетворении потребностей клиентов и качестве продукции, разрабатывая эффективные и экологичные решения. Life Now Global стремится занять прочное место в сфере чистящих средств и продолжает работать ради более чистого будущего.",
    ],
    company: "Life Now Global",
  },
  contact: {
    title: "Контакты",
    text: "Пишите или звоните нам по вопросам, коммерческим предложениям и сотрудничеству.",
    address: "Адрес",
    phone: "Телефон",
    email: "E-mail",
    whatsapp: "Написать в WhatsApp",
    addr: "Taşlıca Mah. 70154 Cadde No:10/B10 Şehitkamil / Gaziantep, Турция",
  },
  footer: { tagline: "Идеальная чистота при каждой стирке.", rights: "Все права защищены." },
  cats: {
    matik: { name: "Стиральный порошок", sub: "Белое и цветное бельё" },
    "matik-beyaz": { name: "Стиральный порошок", sub: "Белизна" },
    elde: { name: "Для машинной и ручной стирки", sub: "Белое и цветное бельё" },
    kutu: { name: "Порошок в коробке", sub: "Белое и цветное бельё" },
    "kutu-beyaz": { name: "Порошок в коробке", sub: "Белизна" },
    paket: { name: "Порошок в пакете", sub: "Цветное и белое бельё" },
    bulasik: { name: "Средства для посуды и уборки", sub: "Для посуды, Asprin спрей, Ultra Güç спрей" },
    bidon: { name: "Экономичные канистры", sub: "Для посуды, Asprin, Ультра густая белизна" },
    sabun: { name: "Жидкое мыло", sub: "Розовый сад · Лавандовый сад" },
    yumusatici: { name: "Кондиционер для белья", sub: "Extra · Роза · Лаванда" },
  },
};

const ar: Dict = {
  meta: {
    title: "لايف ناو – تنظيف مثالي مع كل غسلة",
    description:
      "لايف ناو هي علامة منظفات ومنتجات تنظيف منزلية وصناعية من شركة Life Now Global في غازي عنتاب، تركيا.",
  },
  nav: { home: "الرئيسية", products: "المنتجات", about: "من نحن", contact: "اتصل بنا", catalog: "كتالوج 2026", menu: "القائمة" },
  hero: {
    eyebrow: "Life Now Global · غازي عنتاب، تركيا",
    title: "تنظيف مثالي مع كل غسلة.",
    text: "منظفات ومنتجات تنظيف عالية الجودة وبأسعار مناسبة للاستخدام المنزلي والصناعي. إنتاج محلي وحلول صديقة للبيئة.",
    cta1: "اكتشف المنتجات",
    cta2: "حمّل الكتالوج",
  },
  values: {
    title: "صُمّم لمستقبل أنظف.",
    text: "منذ تأسيسنا نضع رضا العملاء وجودة المنتجات على رأس أولوياتنا.",
    items: [
      { t: "تنظيف فعّال", d: "تركيبات قوية تزيل البقع والأوساخ من الغسلة الأولى." },
      { t: "صديق للبيئة", d: "نحرص على تقديم حلول فعّالة وصديقة للبيئة." },
      { t: "أسعار مناسبة", d: "معايير جودة عالية في متناول الجميع." },
    ],
  },
  home: {
    catTitle: "مجموعات منتجاتنا",
    catText: "عائلة تنظيف متكاملة: من الغسيل والأطباق إلى الأسطح والمنعمات.",
    all: "جميع المنتجات",
    stepsTitle: "كيف نعمل",
    steps: [
      { t: "اختر منتجك", d: "حدد المنتج والحجم المناسب من كتالوجنا." },
      { t: "تواصل معنا", d: "اطلب عرض سعر عبر الهاتف أو واتساب أو البريد الإلكتروني." },
      { t: "نحن نوصّل", d: "شحن سريع وموثوق من غازي عنتاب." },
    ],
  },
  banner: "غسيلك نظيف تمامًا وبرائحة منعشة.",
  cta: {
    title: "هل أنت مستعد للتعرف على لايف ناو؟",
    text: "تواصل مع فريقنا للبيع بالجملة والشراكات.",
    b1: "تواصل معنا",
    b2: "حمّل الكتالوج",
  },
  products: {
    title: "المنتجات",
    text: "جميع مجموعات المنتجات وأحجام العبوات في كتالوج 2026.",
    sizes: "أحجام العبوات",
    download: "كتالوج 2026 (PDF)",
    back: "جميع المنتجات",
    quote: "اطلب عرض سعر",
    detail: "عرض التفاصيل",
  },
  about: {
    title: "من نحن",
    lead: "شركة محلية لتصنيع منتجات التنظيف في غازي عنتاب.",
    p: [
      "شركة Life Now Global هي شركة محلية متخصصة في صناعة منتجات التنظيف، ومقرها في غازي عنتاب، تركيا. نقدم حلول تنظيف منزلية وصناعية بجودة عالية وأسعار مناسبة.",
      "منذ تأسيسنا، نضع رضا العملاء وجودة المنتجات على رأس أولوياتنا، ونحرص على تقديم حلول فعّالة وصديقة للبيئة. تسعى Life Now Global إلى ترسيخ مكانتها في قطاع التنظيف، وتواصل العمل من أجل مستقبل أنظف.",
    ],
    company: "Life Now Global",
  },
  contact: {
    title: "اتصل بنا",
    text: "راسلنا أو اتصل بنا للاستفسارات وطلبات الأسعار والشراكات.",
    address: "العنوان",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    whatsapp: "راسلنا عبر واتساب",
    addr: "Taşlıca Mah. 70154 Cadde No:10/B10 Şehitkamil / Gaziantep، تركيا",
  },
  footer: { tagline: "تنظيف مثالي مع كل غسلة.", rights: "جميع الحقوق محفوظة." },
  cats: {
    matik: { name: "مسحوق غسيل أوتوماتيك", sub: "الأبيض والملون" },
    "matik-beyaz": { name: "مسحوق غسيل أوتوماتيك", sub: "الأبيض" },
    elde: { name: "للغسيل الآلي واليدوي", sub: "الأبيض والملون" },
    kutu: { name: "علبة منظف الغسيل الآلي", sub: "الأبيض والملون" },
    "kutu-beyaz": { name: "علبة منظف الغسيل الآلي", sub: "الأبيض" },
    paket: { name: "عبوة منظف الغسيل الآلي", sub: "الملون والأبيض" },
    bulasik: { name: "سائل الأطباق والتنظيف العام", sub: "سائل الأطباق، بخاخ Asprin، بخاخ Ultra Güç" },
    bidon: { name: "سوائل بأحجام اقتصادية", sub: "سائل الأطباق، Asprin، مبيّض فائق التركيز" },
    sabun: { name: "صابون سائل", sub: "حديقة الورد · حديقة اللافندر" },
    yumusatici: { name: "منعم الأقمشة", sub: "إكسترا · ورد · لافندر" },
  },
};

export const dictionaries: Record<Locale, Dict> = { tr, en, ru, ar };
export const getDict = (l: Locale) => dictionaries[l];

export const catalog: { id: CatId; image: string; sizes: string[] }[] = [
  { id: "matik", image: "cat-matik", sizes: ["1,5 kg", "3 kg", "5 kg", "7 kg", "9 kg", "10 kg"] },
  { id: "matik-beyaz", image: "cat-matik-beyaz", sizes: ["1,5 kg", "3 kg", "5 kg", "7 kg", "9 kg", "10 kg"] },
  { id: "elde", image: "cat-elde", sizes: ["1 kg", "1,5 kg", "3 kg", "4 L"] },
  { id: "kutu", image: "cat-kutu", sizes: ["100 g", "250 g", "450 g", "500 g", "1 kg", "1,5 kg", "2,5 kg", "3 kg", "4,5 kg"] },
  { id: "kutu-beyaz", image: "cat-kutu-beyaz", sizes: ["100 g", "250 g", "450 g", "500 g", "1 kg", "1,5 kg", "2,5 kg", "3 kg", "4,5 kg"] },
  { id: "paket", image: "cat-paket", sizes: ["10 g", "17 g", "20 g", "80 g", "100 g"] },
  { id: "bulasik", image: "cat-bulasik", sizes: ["650 ml", "750 ml", "1000 ml"] },
  { id: "bidon", image: "cat-bidon", sizes: ["4000 ml", "4 L"] },
  { id: "sabun", image: "cat-sabun", sizes: ["500 ml", "3 L"] },
  { id: "yumusatici", image: "row3", sizes: ["1440 ml", "3 L", "4 L"] },
];

export const contactInfo = {
  email: "info@lifenow.com.tr",
  phones: ["+90 546 601 16 63", "+90 541 825 67 64"],
  whatsapp: "905466011663",
};

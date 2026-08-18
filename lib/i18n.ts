export const locales = ["tr", "en", "de", "fr", "ar", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const isLocale = (value: string | undefined): value is Locale =>
  !!value && locales.includes(value as Locale);

export const languageNames: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
  de: "Deutsch",
  fr: "Français",
  ar: "العربية",
  ru: "Русский",
};

export const localeMeta: Record<Locale, { html: string; og: string; dir: "ltr" | "rtl" }> = {
  tr: { html: "tr", og: "tr_TR", dir: "ltr" },
  en: { html: "en", og: "en_US", dir: "ltr" },
  de: { html: "de", og: "de_DE", dir: "ltr" },
  fr: { html: "fr", og: "fr_FR", dir: "ltr" },
  ar: { html: "ar", og: "ar_SA", dir: "rtl" },
  ru: { html: "ru", og: "ru_RU", dir: "ltr" },
};

export type LocalizedText = Record<Locale, string>;

export const ui: Record<Locale, {
  nav: { experience: string; menu: string; story: string; craft: string; venue: string; blogs: string; contact: string };
  mainMenu: string;
  language: string;
  map: string;
  blogEyebrow: string;
  blogTitle: string;
  blogLead: string;
  readArticle: string;
  allArticles: string;
  published: string;
  readingTime: string;
  nextArticle: string;
  author: string;
  footerSite: string;
  footerContact: string;
  footerAddress: string;
  backTop: string;
  loading: string;
  loadingTitle: string;
  loadingMeta: string;
  locationTag: string;
  notFoundLabel: string;
  notFoundTitle: string;
  notFoundText: string;
  home: string;
  notFoundLinks: string;
}> = {
  tr: {
    nav: { experience: "Deneyim", menu: "Menü", story: "Hikayemiz", craft: "İşçilik", venue: "Mekân", blogs: "Blogs", contact: "İletişim" },
    mainMenu: "Ana menü", language: "Dil", map: "Konuma git", blogEyebrow: "Yazılar · Pizza La Fin", blogTitle: "Mutfak üzerine notlar", blogLead: "Mutfağımızın günlük pratiğinden; fermantasyon, Napoli işçiliği, malzeme ve eşleşmeler üzerine editoryal yazılar.", readArticle: "Yazıyı oku", allArticles: "Tüm yazılar", published: "Yayın", readingTime: "dk okuma", nextArticle: "Sıradaki yazı", author: "Yazar", footerSite: "Site", footerContact: "İletişim", footerAddress: "Adres", backTop: "Yukarı çık", loading: "Fırın ısınıyor", loadingTitle: "Napoli pizza zamanı", loadingMeta: "Salı–Pazar · Pizza La Fin", locationTag: "Yeldeğirmeni · Kadıköy", notFoundLabel: "404", notFoundTitle: "Sayfa bulunamadı", notFoundText: "Aradığınız sayfa taşınmış, yeniden adlandırılmış veya menüden kalkmış olabilir.", home: "Ana sayfa", notFoundLinks: "Devam et",
  },
  en: {
    nav: { experience: "Experience", menu: "Menu", story: "Our Story", craft: "Craft", venue: "Space", blogs: "Blogs", contact: "Contact" },
    mainMenu: "Main menu", language: "Language", map: "Get directions", blogEyebrow: "Journal · Pizza La Fin", blogTitle: "Kitchen notes", blogLead: "Editorial stories from our daily kitchen practice, exploring fermentation, Neapolitan craft, ingredients and pairings.", readArticle: "Read article", allArticles: "All articles", published: "Published", readingTime: "min read", nextArticle: "Next article", author: "Author", footerSite: "Site", footerContact: "Contact", footerAddress: "Address", backTop: "Back to top", loading: "The oven is warming", loadingTitle: "Neapolitan pizza time", loadingMeta: "Tuesday–Sunday · Pizza La Fin", locationTag: "Yeldeğirmeni · Kadıköy", notFoundLabel: "404", notFoundTitle: "Page not found", notFoundText: "The page may have moved, been renamed or left the menu.", home: "Home", notFoundLinks: "Continue",
  },
  de: {
    nav: { experience: "Erlebnis", menu: "Menü", story: "Unsere Geschichte", craft: "Handwerk", venue: "Raum", blogs: "Blogs", contact: "Kontakt" },
    mainMenu: "Hauptmenü", language: "Sprache", map: "Route öffnen", blogEyebrow: "Journal · Pizza La Fin", blogTitle: "Notizen aus der Küche", blogLead: "Editoriale Geschichten aus unserer täglichen Küchenpraxis über Fermentation, neapolitanisches Handwerk, Zutaten und Begleitungen.", readArticle: "Artikel lesen", allArticles: "Alle Artikel", published: "Veröffentlicht", readingTime: "Min. Lesezeit", nextArticle: "Nächster Artikel", author: "Autor", footerSite: "Seite", footerContact: "Kontakt", footerAddress: "Adresse", backTop: "Nach oben", loading: "Der Ofen wird warm", loadingTitle: "Zeit für neapolitanische Pizza", loadingMeta: "Dienstag–Sonntag · Pizza La Fin", locationTag: "Yeldeğirmeni · Kadıköy", notFoundLabel: "404", notFoundTitle: "Seite nicht gefunden", notFoundText: "Die Seite wurde möglicherweise verschoben, umbenannt oder von der Karte genommen.", home: "Startseite", notFoundLinks: "Weiter",
  },
  fr: {
    nav: { experience: "Expérience", menu: "Menu", story: "Notre histoire", craft: "Savoir-faire", venue: "Lieu", blogs: "Blogs", contact: "Contact" },
    mainMenu: "Menu principal", language: "Langue", map: "Itinéraire", blogEyebrow: "Journal · Pizza La Fin", blogTitle: "Notes de cuisine", blogLead: "Des récits éditoriaux issus de notre cuisine quotidienne, autour de la fermentation, du geste napolitain, des ingrédients et des accords.", readArticle: "Lire l’article", allArticles: "Tous les articles", published: "Publié", readingTime: "min de lecture", nextArticle: "Article suivant", author: "Auteur", footerSite: "Site", footerContact: "Contact", footerAddress: "Adresse", backTop: "Retour en haut", loading: "Le four chauffe", loadingTitle: "L’heure de la pizza napolitaine", loadingMeta: "Mardi–Dimanche · Pizza La Fin", locationTag: "Yeldeğirmeni · Kadıköy", notFoundLabel: "404", notFoundTitle: "Page introuvable", notFoundText: "La page a peut-être été déplacée, renommée ou retirée de la carte.", home: "Accueil", notFoundLinks: "Continuer",
  },
  ar: {
    nav: { experience: "التجربة", menu: "القائمة", story: "قصتنا", craft: "الحرفة", venue: "المكان", blogs: "المدونة", contact: "التواصل" },
    mainMenu: "القائمة الرئيسية", language: "اللغة", map: "الاتجاهات", blogEyebrow: "المجلة · Pizza La Fin", blogTitle: "ملاحظات من المطبخ", blogLead: "حكايات تحريرية من ممارستنا اليومية في المطبخ حول التخمير والحرفة النابولية والمكونات والتوافقات.", readArticle: "اقرأ المقال", allArticles: "كل المقالات", published: "نُشر", readingTime: "دقائق قراءة", nextArticle: "المقال التالي", author: "الكاتب", footerSite: "الموقع", footerContact: "التواصل", footerAddress: "العنوان", backTop: "إلى الأعلى", loading: "الفرن يسخن", loadingTitle: "وقت البيتزا النابولية", loadingMeta: "الثلاثاء–الأحد · Pizza La Fin", locationTag: "Yeldeğirmeni · Kadıköy", notFoundLabel: "404", notFoundTitle: "الصفحة غير موجودة", notFoundText: "ربما نُقلت الصفحة أو تغير اسمها أو أزيلت من القائمة.", home: "الرئيسية", notFoundLinks: "المتابعة",
  },
  ru: {
    nav: { experience: "Впечатление", menu: "Меню", story: "Наша история", craft: "Мастерство", venue: "Пространство", blogs: "Блоги", contact: "Контакты" },
    mainMenu: "Главное меню", language: "Язык", map: "Маршрут", blogEyebrow: "Журнал · Pizza La Fin", blogTitle: "Заметки о кухне", blogLead: "Редакционные истории из повседневной практики нашей кухни: ферментация, неаполитанское ремесло, продукты и сочетания.", readArticle: "Читать", allArticles: "Все статьи", published: "Опубликовано", readingTime: "мин чтения", nextArticle: "Следующая статья", author: "Автор", footerSite: "Сайт", footerContact: "Контакты", footerAddress: "Адрес", backTop: "Наверх", loading: "Печь разогревается", loadingTitle: "Время неаполитанской пиццы", loadingMeta: "Вторник–Воскресенье · Pizza La Fin", locationTag: "Yeldeğirmeni · Kadıköy", notFoundLabel: "404", notFoundTitle: "Страница не найдена", notFoundText: "Возможно, страница была перемещена, переименована или убрана из меню.", home: "Главная", notFoundLinks: "Продолжить",
  },
};

export const siteDescriptions: Record<Locale, string> = {
  tr: "Pizza La Fin, salıdan pazara Napoli pizzası sunar.",
  en: "Pizza La Fin serves Neapolitan pizza Tuesday through Sunday.",
  de: "Pizza La Fin serviert von Dienstag bis Sonntag neapolitanische Pizza.",
  fr: "Pizza La Fin sert des pizzas napolitaines du mardi au dimanche.",
  ar: "يقدّم Pizza La Fin البيتزا النابولية من الثلاثاء إلى الأحد.",
  ru: "Pizza La Fin подаёт неаполитанскую пиццу со вторника по воскресенье.",
};

export function localizedPath(locale: Locale, suffix = "") {
  const normalized = suffix && !suffix.startsWith("/") ? `/${suffix}` : suffix;
  return `/${locale}${normalized}`;
}

export function alternateLanguages(suffix = "") {
  return {
    "x-default": localizedPath(defaultLocale, suffix),
    ...Object.fromEntries(locales.map((locale) => [locale, localizedPath(locale, suffix)])),
  };
}

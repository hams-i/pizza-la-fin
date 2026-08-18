"use client";

import {
  ArrowUp,
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  Menu,
  Phone,
  Play,
  X,
} from "lucide-react";
import {
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import type { StyleSpecification } from "maplibre-gl";
import { HeroSignature } from "@/components/hero-signature";
import { LoadingExperience } from "@/components/loading-experience";
import { scrollPageTo } from "@/components/smooth-scroll";
import { localeStorageKey, persistLocalePreference } from "@/lib/client-locale";
import { defaultLocale, isLocale, languageNames, locales, ui, type Locale } from "@/lib/i18n";
import {
  Map as MapCn,
  MapControls,
  MapMarker,
  MarkerContent,
} from "@/components/ui/map";

type Localized = Record<Exclude<Locale, "fr">, string> & { fr?: string };

type MenuItem = {
  name: string;
  price: string;
  calories: string;
  description: Localized;
  ingredients: Localized;
  allergens: Localized;
  image: string;
};

const localized = (tr: string, en: string, ru: string, de: string, ar: string, fr = en): Localized => ({
  tr,
  en,
  ru,
  de,
  ar,
  fr,
});

const publicAsset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const product = (slug: string) => ({
  image: publicAsset(`/media/products/${slug}.webp`),
});

const pizzas: MenuItem[] = [
  {
    name: "Marinara Del Mare",
    price: "₺490",
    calories: "≈ 720 kcal",
    description: localized(
      "Denizin tuzlu karakterini San Marzano’nun canlı asiditesiyle buluşturan yalın ve zarif bir klasik.",
      "A refined classic balancing the sea’s salinity with the bright acidity of San Marzano tomatoes.",
      "Изящная классика, где морская солоноватость встречается с яркой кислотностью томатов Сан-Марцано.",
      "Ein klarer Klassiker, der maritime Salzigkeit mit der lebendigen Säure von San-Marzano-Tomaten verbindet.",
      "طبق كلاسيكي أنيق يجمع ملوحة البحر مع حموضة طماطم سان مارزانو النابضة."
    ),
    ingredients: localized(
      "San Marzano domates sosu, kuru kekik, taze sarımsak, ançuez, zeytinyağı",
      "San Marzano tomato sauce, oregano, fresh garlic, anchovy, olive oil",
      "Соус из томатов Сан-Марцано, орегано, свежий чеснок, анчоус, оливковое масло",
      "San-Marzano-Tomatensauce, Oregano, frischer Knoblauch, Sardelle, Olivenöl",
      "صلصة طماطم سان مارزانو، أوريغانو، ثوم طازج، أنشوجة، زيت زيتون"
    ),
    allergens: localized("Gluten · Balık", "Gluten · Fish", "Глютен · Рыба", "Gluten · Fisch", "غلوتين · سمك"),
    ...product("marinara-del-mare"),
  },
  {
    name: "Margherita Basilic",
    price: "₺530",
    calories: "≈ 860 kcal",
    description: localized(
      "Napoli geleneğinin en dürüst ifadesi. Domates, fesleğen ve iki peynir arasında kusursuz denge.",
      "The purest expression of Naples: a precise balance of tomato, basil and two cheeses.",
      "Самое честное выражение Неаполя: точный баланс томатов, базилика и двух сыров.",
      "Der ehrlichste Ausdruck Neapels: die präzise Balance aus Tomate, Basilikum und zwei Käsesorten.",
      "أنقى تعبير عن نابولي: توازن دقيق بين الطماطم والريحان ونوعين من الجبن."
    ),
    ingredients: localized(
      "San Marzano domates sosu, taze fesleğen, fior di latte, Reggiano parmesan, zeytinyağı",
      "San Marzano tomato sauce, fresh basil, fior di latte, Reggiano parmesan, olive oil",
      "Соус Сан-Марцано, свежий базилик, фьор ди латте, пармезан Реджано, оливковое масло",
      "San-Marzano-Sauce, Basilikum, Fior di Latte, Reggiano Parmesan, Olivenöl",
      "صلصة سان مارزانو، ريحان طازج، فيور دي لاتيه، بارميزان ريجيانو، زيت زيتون"
    ),
    allergens: localized("Gluten · Süt ürünleri", "Gluten · Dairy", "Глютен · Молочные продукты", "Gluten · Milchprodukte", "غلوتين · ألبان"),
    ...product("margherita-basilic"),
  },
  {
    name: "Pepperoni Dolce Fuoco",
    price: "₺640",
    calories: "≈ 1.050 kcal",
    description: localized(
      "Önce sıcak, sonra tatlı. Dana pepperoninin baharatı çiçek balının zarif dokunuşuyla uzuyor.",
      "Heat first, sweetness after. Spiced beef pepperoni lingers with a delicate touch of blossom honey.",
      "Сначала острота, затем сладость. Пряная говяжья пепперони смягчается цветочным мёдом.",
      "Erst Schärfe, dann Süße. Würzige Rinder-Pepperoni klingt mit feinem Blütenhonig aus.",
      "حرارة أولاً ثم حلاوة؛ يمتد مذاق الببروني البقري المتبّل بلمسة رقيقة من عسل الزهور."
    ),
    ingredients: localized(
      "San Marzano sos, fesleğen, parmesan, dana pepperoni, fior di latte, acı çiçek balı",
      "San Marzano sauce, basil, parmesan, beef pepperoni, fior di latte, hot blossom honey",
      "Соус Сан-Марцано, базилик, пармезан, говяжья пепперони, фьор ди латте, острый цветочный мёд",
      "San-Marzano-Sauce, Basilikum, Parmesan, Rinder-Pepperoni, Fior di Latte, scharfer Blütenhonig",
      "صلصة سان مارزانو، ريحان، بارميزان، ببروني بقري، فيور دي لاتيه، عسل زهور حار"
    ),
    allergens: localized("Gluten · Süt ürünleri", "Gluten · Dairy", "Глютен · Молочные продукты", "Gluten · Milchprodukte", "غلوتين · ألبان"),
    ...product("pepperoni-dolce-fuoco"),
  },
  {
    name: "Margherita Funghi La Fin",
    price: "₺640",
    calories: "≈ 920 kcal",
    description: localized(
      "Ormanın katmanlı aromalarını Pizza La Fin’in zarif dengesiyle taşıyan imza pizza.",
      "A signature pizza carrying layered forest aromas with Pizza La Fin’s elegant balance.",
      "Фирменная пицца с многослойными лесными ароматами и изящным балансом Pizza La Fin.",
      "Eine Signature-Pizza mit Waldaromen und der eleganten Balance von Pizza La Fin.",
      "بيتزا مميزة تحمل طبقات من عبير الغابة مع توازن بيتزا لا فين الأنيق."
    ),
    ingredients: localized(
      "Yaban mersininde marine Kalamata zeytin ezmesi, sarımsak, fesleğen, fior di latte, yabani mantarlar",
      "Blueberry-marinated Kalamata olive paste, garlic, basil, fior di latte, wild mushrooms",
      "Паста из оливок Каламата с черникой, чеснок, базилик, фьор ди латте, лесные грибы",
      "Kalamata-Olivenpaste mit Heidelbeere, Knoblauch, Basilikum, Fior di Latte, Wildpilze",
      "معجون زيتون كالاماتا منقوع بالتوت، ثوم، ريحان، فيور دي لاتيه، فطر بري"
    ),
    allergens: localized("Gluten · Süt ürünleri", "Gluten · Dairy", "Глютен · Молочные продукты", "Gluten · Milchprodukte", "غلوتين · ألبان"),
    ...product("margherita-funghi-savelia"),
  },
  {
    name: "Fresca Riviera",
    price: "₺780",
    calories: "≈ 1.120 kcal",
    description: localized(
      "Kremamsı, parlak ve ferah. Pesto, renkli domatesler ve stracciatella ile yaz gibi bir tabak.",
      "Creamy, vivid and fresh. Pesto, colourful tomatoes and stracciatella make it taste like summer.",
      "Сливочная, яркая и свежая. Песто, цветные томаты и страчателла создают вкус лета.",
      "Cremig, leuchtend und frisch. Pesto, bunte Tomaten und Stracciatella schmecken nach Sommer.",
      "كريمية ومشرقة ومنعشة؛ بيستو وطماطم ملوّنة وستراتشاتيلا بطعم الصيف."
    ),
    ingredients: localized(
      "Pesto kreması, fior di latte, renkli cherry domates, stracciatella, kavrulmuş yer fıstığı",
      "Pesto cream, fior di latte, colourful cherry tomatoes, stracciatella, roasted peanuts",
      "Крем с песто, фьор ди латте, разноцветные черри, страчателла, жареный арахис",
      "Pestocreme, Fior di Latte, bunte Kirschtomaten, Stracciatella, geröstete Erdnüsse",
      "كريمة بيستو، فيور دي لاتيه، طماطم كرزية ملوّنة، ستراتشاتيلا، فول سوداني محمّص"
    ),
    allergens: localized("Gluten · Süt ürünleri · Yer fıstığı", "Gluten · Dairy · Peanuts", "Глютен · Молочные продукты · Арахис", "Gluten · Milchprodukte · Erdnüsse", "غلوتين · ألبان · فول سوداني"),
    ...product("fresca-riviera"),
  },
  {
    name: "Quattro Formaggi Dorée",
    price: "₺560",
    calories: "≈ 1.080 kcal",
    description: localized(
      "Dört peynirin dokusu; rokforun keskinliği, scamorzanın isi ve parmesanın uzun bitişi.",
      "Four cheese textures: Roquefort’s edge, smoked scamorza and a long parmesan finish.",
      "Четыре текстуры сыра: острота рокфора, дымная скаморца и долгое послевкусие пармезана.",
      "Vier Käsetexturen: Roquefort-Würze, geräucherte Scamorza und ein langer Parmesan-Abgang.",
      "أربع قوامات للجبن: حدّة الروكفور ودخان السكَمورزا ونهاية طويلة للبارميزان."
    ),
    ingredients: localized(
      "Rokfor kreması, fior di latte, isli scamorza, Reggiano parmesan",
      "Roquefort cream, fior di latte, smoked scamorza, Reggiano parmesan",
      "Крем рокфор, фьор ди латте, копчёная скаморца, пармезан Реджано",
      "Roquefortcreme, Fior di Latte, geräucherte Scamorza, Reggiano Parmesan",
      "كريمة روكفور، فيور دي لاتيه، سكامورزا مدخنة، بارميزان ريجيانو"
    ),
    allergens: localized("Gluten · Süt ürünleri", "Gluten · Dairy", "Глютен · Молочные продукты", "Gluten · Milchprodukte", "غلوتين · ألبان"),
    ...product("quattro-formaggi-doree"),
  },
  {
    name: "Pancetta Dorée",
    price: "₺890",
    calories: "≈ 1.180 kcal",
    description: localized(
      "Kuzu pancetta ve zerdeçallı beşamel; güçlü, isli ve baharatlı bir karakter.",
      "Lamb pancetta and turmeric béchamel create a smoky, spiced and confident character.",
      "Панчетта из ягнёнка и бешамель с куркумой создают дымный и пряный характер.",
      "Lamm-Pancetta und Kurkuma-Béchamel ergeben einen kräftigen, rauchigen Charakter.",
      "بانشيتا لحم الضأن وبشاميل الكركم يمنحانها طابعاً قوياً ومدخناً ومتبّلاً."
    ),
    ingredients: localized(
      "Kuzu pancetta, zerdeçallı beşamel, fior di latte, kırmızı soğan, taze kekik, isli paprika",
      "Lamb pancetta, turmeric béchamel, fior di latte, red onion, thyme, smoked paprika",
      "Панчетта из ягнёнка, бешамель с куркумой, фьор ди латте, красный лук, тимьян, копчёная паприка",
      "Lamm-Pancetta, Kurkuma-Béchamel, Fior di Latte, rote Zwiebel, Thymian, Rauchpaprika",
      "بانشيتا ضأن، بشاميل بالكركم، فيور دي لاتيه، بصل أحمر، زعتر، بابريكا مدخنة"
    ),
    allergens: localized("Gluten · Süt ürünleri", "Gluten · Dairy", "Глютен · Молочные продукты", "Gluten · Milchprodukte", "غلوتين · ألبان"),
    ...product("pancetta-doree"),
  },
  {
    name: "Verde Jardin",
    price: "₺550",
    calories: "≈ 880 kcal",
    description: localized(
      "Ispanak ve kabağın yumuşak gövdesi, Roma usulü enginarın zarif asiditesiyle canlanıyor.",
      "Spinach and courgette gain brightness from the elegant acidity of Roman-style artichoke.",
      "Шпинат и цукини оживают благодаря изящной кислотности артишока по-римски.",
      "Spinat und Zucchini gewinnen durch die feine Säure römischer Artischocken an Frische.",
      "يضيء السبانخ والكوسا بفضل الحموضة الأنيقة للخرشوف على الطريقة الرومانية."
    ),
    ingredients: localized(
      "Ispanak ve kabak sofrita, fior di latte, kök ıspanak, Roma usulü enginar, karabiber",
      "Spinach and courgette sofrito, fior di latte, baby spinach, Roman artichoke, black pepper",
      "Софрито из шпината и цукини, фьор ди латте, молодой шпинат, римский артишок, чёрный перец",
      "Spinat-Zucchini-Sofrito, Fior di Latte, junger Spinat, römische Artischocke, Pfeffer",
      "سوفريتو السبانخ والكوسا، فيور دي لاتيه، سبانخ صغيرة، خرشوف روماني، فلفل أسود"
    ),
    allergens: localized("Gluten · Süt ürünleri", "Gluten · Dairy", "Глютен · Молочные продукты", "Gluten · Milchprodukte", "غلوتين · ألبان"),
    ...product("verde-jardin"),
  },
  {
    name: "Mortadella Pistacchio",
    price: "₺680",
    calories: "≈ 1.160 kcal",
    description: localized(
      "İpeksi ricotta, dana mortadella ve limon kabuğuyla dengelenen zengin, aromatik bir favori.",
      "A rich, aromatic favourite balanced by silky ricotta, beef mortadella and lemon zest.",
      "Насыщенная ароматная пицца с шелковистой рикоттой, говяжьей мортаделлой и цедрой лимона.",
      "Ein aromatischer Favorit, balanciert mit Ricotta, Rindermortadella und Zitronenzeste.",
      "مفضلة غنية وعطرية تتوازن بالريكوتا الحريرية ومورتاديلا البقر وبرش الليمون."
    ),
    ingredients: localized(
      "Konfi sarımsaklı parmesan kreması, fior di latte, dana mortadella, ricotta, limon zest, Antep fıstığı",
      "Confit garlic parmesan cream, fior di latte, beef mortadella, ricotta, lemon zest, pistachio",
      "Пармезановый крем с чесноком конфи, фьор ди латте, говяжья мортаделла, рикотта, лимон, фисташка",
      "Parmesancreme mit Knoblauch-Confit, Fior di Latte, Rindermortadella, Ricotta, Zitrone, Pistazie",
      "كريمة بارميزان بالثوم الكونفي، فيور دي لاتيه، مورتاديلا بقر، ريكوتا، ليمون، فستق"
    ),
    allergens: localized("Gluten · Süt ürünleri · Antep fıstığı", "Gluten · Dairy · Pistachio", "Глютен · Молочные продукты · Фисташка", "Gluten · Milchprodukte · Pistazie", "غلوتين · ألبان · فستق"),
    ...product("mortadella-pistacchio"),
  },
];

const desserts: MenuItem[] = [
  {
    name: "Lemon Soufflé",
    price: "₺390",
    calories: "≈ 480 kcal",
    description: localized(
      "Hafif limon aromasıyla kabaran, pizzanın ardından zarif bir final.",
      "A light lemon-scented rise — an elegant finale after the pizza.",
      "Лёгкий лимонный суфле — изящный финал после пиццы.",
      "Leichtes Zitronensoufflé — ein elegantes Finale nach der Pizza.",
      "سوفليه ليمون خفيف — ختام أنيق بعد البيتزا."
    ),
    ingredients: localized(
      "Limon, yumurta, şeker, tereyağı, un",
      "Lemon, egg, sugar, butter, flour",
      "Лимон, яйцо, сахар, масло, мука",
      "Zitrone, Ei, Zucker, Butter, Mehl",
      "ليمون، بيض، سكر، زبدة، دقيق"
    ),
    allergens: localized("Gluten · Süt ürünleri · Yumurta", "Gluten · Dairy · Egg", "Глютен · Молочные продукты · Яйцо", "Gluten · Milchprodukte · Ei", "غلوتين · ألبان · بيض"),
    ...product("lemon-souffle"),
  },
  {
    name: "Sour Cherry Soufflé",
    price: "₺410",
    calories: "≈ 500 kcal",
    description: localized(
      "Vişnenin canlı asiditesiyle yükselen yumuşak, dengeli bir tatlı.",
      "A soft, balanced dessert lifted by the bright acidity of sour cherry.",
      "Мягкий сбалансированный десерт с яркой кислотностью вишни.",
      "Ein weiches, ausgewogenes Dessert mit der lebendigen Säure der Sauerkirsche.",
      "حلوى ناعمة ومتوازنة ترتفع بحموضة الكرز الحامض."
    ),
    ingredients: localized(
      "Vişne, yumurta, şeker, tereyağı, un",
      "Sour cherry, egg, sugar, butter, flour",
      "Вишня, яйцо, сахар, масло, мука",
      "Sauerkirsche, Ei, Zucker, Butter, Mehl",
      "كرز حامض، بيض، سكر، زبدة، دقيق"
    ),
    allergens: localized("Gluten · Süt ürünleri · Yumurta", "Gluten · Dairy · Egg", "Глютен · Молочные продукты · Яйцо", "Gluten · Milchprodukte · Ei", "غلوتين · ألبان · بيض"),
    ...product("sour-cherry-souffle"),
  },
  {
    name: "Lemon Cheesecake",
    price: "₺420",
    calories: "≈ 540 kcal",
    description: localized(
      "Kremsi doku ve limonun ferah bitişiyle sakin, zarif bir tatlı.",
      "A calm, elegant dessert with a creamy body and a bright lemon finish.",
      "Спокойный изящный десерт с кремовой текстурой и лимонным послевкусием.",
      "Ein ruhiges, elegantes Dessert mit cremiger Textur und hellem Zitronenabschluss.",
      "حلوى هادئة وأنيقة بقوام كريمي ونهاية ليمون منعشة."
    ),
    ingredients: localized(
      "Krema peyniri, limon, bisküvi tabanı, şeker",
      "Cream cheese, lemon, biscuit base, sugar",
      "Сливочный сыр, лимон, бисквитная основа, сахар",
      "Frischkäse, Zitrone, Keksboden, Zucker",
      "جبن كريمي، ليمون، قاعدة بسكويت، سكر"
    ),
    allergens: localized("Gluten · Süt ürünleri · Yumurta", "Gluten · Dairy · Egg", "Глютен · Молочные продукты · Яйцо", "Gluten · Milchprodukte · Ei", "غلوتين · ألبان · بيض"),
    ...product("lemon-cheesecake"),
  },
  {
    name: "Pistachio Pomegranate Cheesecake",
    price: "₺450",
    calories: "≈ 580 kcal",
    description: localized(
      "Antep fıstığının derinliği ve narın parlak asiditesiyle katmanlı bir final.",
      "A layered finale with pistachio depth and the bright acidity of pomegranate.",
      "Многослойный финал с глубиной фисташки и яркой кислотностью граната.",
      "Ein geschichtetes Finale mit Pistazientiefe und heller Granatapfelsäure.",
      "ختام متعدد الطبقات بعمق الفستق وحموضة الرمان المشرقة."
    ),
    ingredients: localized(
      "Krema peyniri, Antep fıstığı, nar, bisküvi tabanı",
      "Cream cheese, pistachio, pomegranate, biscuit base",
      "Сливочный сыр, фисташка, гранат, бисквитная основа",
      "Frischkäse, Pistazie, Granatapfel, Keksboden",
      "جبن كريمي، فستق، رمان، قاعدة بسكويت"
    ),
    allergens: localized("Gluten · Süt ürünleri · Antep fıstığı · Yumurta", "Gluten · Dairy · Pistachio · Egg", "Глютен · Молочные продукты · Фисташка · Яйцо", "Gluten · Milchprodukte · Pistazie · Ei", "غلوتين · ألبان · فستق · بيض"),
    ...product("pistachio-pomegranate-cheesecake"),
  },
];

const drinks: MenuItem[] = [
  {
    name: "Limonata",
    price: "₺180",
    calories: "≈ 120 kcal",
    description: localized(
      "Taze limonla hazırlanan ferah, dengeli bir içecek.",
      "A bright, balanced drink made with fresh lemon.",
      "Свежий сбалансированный напиток на основе лимона.",
      "Ein frisches, ausgewogenes Getränk mit Zitrone.",
      "مشروب منعش ومتوازن من الليمون الطازج."
    ),
    ingredients: localized("Limon, su, şeker", "Lemon, water, sugar", "Лимон, вода, сахар", "Zitrone, Wasser, Zucker", "ليمون، ماء، سكر"),
    allergens: localized("—", "—", "—", "—", "—"),
    ...product("lemonade"),
  },
  {
    name: "Filtre Kahve",
    price: "₺160",
    calories: "≈ 5 kcal",
    description: localized(
      "Temiz gövde ve uzun bitişli günlük filtre kahve.",
      "A clean-bodied daily filter coffee with a long finish.",
      "Чистый фильтр-кофе с долгим послевкусием.",
      "Klarer Filterkaffee mit langem Abgang.",
      "قهوة فلتر يومية بنكهة نظيفة ونهاية طويلة."
    ),
    ingredients: localized("Öğütülmüş kahve, sıcak su", "Ground coffee, hot water", "Молотый кофе, горячая вода", "Kaffeepulver, heißes Wasser", "بن مطحون، ماء ساخن"),
    allergens: localized("—", "—", "—", "—", "—"),
    ...product("filter-coffee"),
  },
  {
    name: "Çay",
    price: "₺90",
    calories: "≈ 2 kcal",
    description: localized(
      "Sıcak ve sade; sofranın yumuşak ritmine eşlik eden klasik çay.",
      "Hot and simple — classic tea for the quiet rhythm of the table.",
      "Горячий и простой классический чай к спокойному ритму стола.",
      "Heiß und schlicht — klassischer Tee für den ruhigen Tischrhythmus.",
      "شاي كلاسيكي ساخن وبسيط يرافق إيقاع المائدة الهادئ."
    ),
    ingredients: localized("Siyah çay, sıcak su", "Black tea, hot water", "Чёрный чай, горячая вода", "Schwarzer Tee, heißes Wasser", "شاي أسود، ماء ساخن"),
    allergens: localized("—", "—", "—", "—", "—"),
    ...product("tea"),
  },
  {
    name: "Cola",
    price: "₺140",
    calories: "≈ 140 kcal",
    description: localized(
      "Soğuk servis edilen klasik gazlı içecek.",
      "A classic soft drink served cold.",
      "Классический охлаждённый газированный напиток.",
      "Klassisches kalt serviertes Erfrischungsgetränk.",
      "مشروب غازي كلاسيكي يُقدَّم بارداً."
    ),
    ingredients: localized("Gazlı içecek", "Soft drink", "Газированный напиток", "Erfrischungsgetränk", "مشروب غازي"),
    allergens: localized("—", "—", "—", "—", "—"),
    ...product("cola"),
  },
];

const allMenuItems = [...pizzas, ...desserts, ...drinks];
const phoneUrl = "tel:+905372180613";
const whatsappUrl = "https://wa.me/905372180613";
const mapUrl = "https://www.google.com/maps/search/?api=1&query=Yeldegirmeni+Kadikoy";
const instagramUrl = "https://www.instagram.com/pizzalafin/";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.14 6.44 2.14 11.9c0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-6.99ZM12.05 20.15h-.01a8.18 8.18 0 0 1-4.17-1.14l-.3-.18-3.14.82.84-3.06-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.25 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.76-1.85-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74 1.49.64 1.9.64 2.25.58.36-.06 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.17-.47-.29Z"
      />
    </svg>
  );
}
const mapStyle: StyleSpecification = {
  version: 8,
  sources: {
    openStreetMap: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [
    {
      id: "open-street-map",
      type: "raster",
      source: "openStreetMap",
      paint: {
        "raster-saturation": -1,
        "raster-contrast": -0.18,
        "raster-brightness-min": 0.58,
        "raster-brightness-max": 1,
        "raster-opacity": 0.72,
      },
    },
  ],
};
const localeList: Array<{ code: Locale; short: string; label: string }> = locales.map((code) => ({
  code,
  short: code.toUpperCase(),
  label: languageNames[code],
}));

const copy = {
  tr: {
    skip: "İçeriğe geç",
    menuOpen: "Menüyü aç",
    menuClose: "Menüyü kapat",
    mainMenu: "Ana menü",
    language: "Dil",
    map: "Konuma git",
    discover: "Keşfet",
    nav: { experience: "Deneyim", menu: "Menü", story: "Hikayemiz", craft: "İşçilik", venue: "Mekân", blogs: "Blogs", contact: "İletişim" },
    heroEyebrow: "Pizza La Fin · Yeldeğirmeni",
    heroTitle: "Napoli Pizza Zamanı",
    heroLine: "Napoli Pizza Zamanı",
    heroNote: "Napoli pizza; salıdan pazara, her gün kendi saatinde.",
    filmLine: "Sadece pizza yapmıyor, günün lezzetli anlarını yaratıyoruz.",
    experience: "Deneyim",
    experienceTitle: "Üç farklı lezzet, aynı masa.",
    experienceLead: "Pizza La Fin’de Napoli pizzası, mutfağın ritmi ve paylaşmanın keyfiyle buluşur.",
    experienceText: [
      "Salıdan cumartesiye 14.30–22.30, pazar günü 14.00–22.00 arasında açığız. Pazartesi günleri kapalıyız.",
      "Son paylaşımlarda Berry White ve Cotto Pesca; pizza oylamasında Butter Chicken, Pesto Rosso, Cheesquake ve Surprise öne çıkıyor.",
      "Hamurun hazırlığından son dilime kadar Pizza La Fin’den bir gün, her lokmada bir dilim daha istemek üzerine."
    ],
    pizzasKicker: "Pizzalar",
    pizzasTitle: "Az malzeme. Çok karakter.",
    pizzasNote: "Her pizza kendi dengesini anlatır. Ayrıntıları ve büyük görseli görmek için karta dokunun.",
    dessertsKicker: "Tatlılar",
    dessertsTitle: "Yumuşak bir final.",
    dessertsNote: "Her tatlı kendi ritmini taşır. Ayrıntıları ve büyük görseli görmek için karta dokunun.",
    drinksKicker: "İçecekler",
    drinksTitle: "Sofraya eşlik.",
    drinksNote: "Her içecek kendi temposunu taşır. Ayrıntıları görmek için karta dokunun.",
    enlarge: "İncele",
    calorieNote: "Kalori değerleri porsiyon reçetesine göre yaklaşık verilmiştir.",
    craftKicker: "Hamur, fermentasyon ve ateş",
    craftTitle: "İyi pizza, hamurun hazırlandığı ilk anda başlar.",
    craftLead: "Zamanı hızlandırmıyor; hamurun kendi ritmini dinliyoruz.",
    craftParagraphs: [
      "Unun protein yapısı, suyun sıcaklığı ve ortamın nemi her gün yeniden okunur. Tek bir değişmez reçeteden çok, hamurun o gün ne söylediğine kulak veririz.",
      "Uzun ve kontrollü fermentasyon, yalnızca kabaran bir kenar değil; daha derin aroma, hafif doku ve dengeli bir ısırık yaratır.",
      "Son karar ateşindir. Yüksek ısı, hamuru saniyeler içinde mühürler; içini nemli, kenarını hafif isli bırakır."
    ],
    craftSteps: [["Hamur", "Un, su ve günlük denge."], ["Fermentasyon", "Aroma için acele etmeyen zaman."], ["Ateş", "Son karakteri veren yüksek ısı."]],
    ingredientsKicker: "Seçkin malzemeler",
    ingredientsTitle: "Her malzeme kendi sesini duyurur.",
    ingredientsNote: "Kaliteyi kalabalıkta değil; doğru ürünü, doğru teknikle ve doğru ölçüde buluşturmakta arıyoruz.",
    ingredients: [["İtalyan unu", "İnce öğütülmüş, güçlü ama zarif yapılı un; uzun fermentasyonda esnekliğini koruyan, hafif ve aromatik hamurumuzun temelini kurar."], ["San Marzano", "Güneşte olgunlaşan domateslerin canlı asiditesi ve doğal tatlılığı, sosumuza temiz, parlak ve uzun bir bitiş kazandırır."], ["Taze otlar", "Fesleğen ve mevsim otlarını servise en yakın anda kullanır; pizzaya ferah, canlı ve katmanlı bir koku ekleriz."], ["Fior di latte", "Dengeli nem oranı, ipeksi lifleri ve zarif süt aromasıyla yüksek ısıda akışkan ama ölçülü bir erime sunar."], ["Zeytinyağı", "Meyvemsi karakteri ve hafif biberimsi bitişiyle her pizzanın aromasını bir araya getiren son, parlak dokunuştur."], ["Yabani mantar", "Mevsiminde seçilen mantarlar; topraksı derinliği, güçlü dokusu ve umami karakteriyle reçeteye doğal bir yoğunluk verir."]],
    storyKicker: "Hikayemiz",
    story: "Pizza La Fin, Napoli pizza mutfağının ritmini hamurun hazırlığından son dilime kadar paylaşır. Son paylaşımlar mutfaktan bir günü, yeni lezzetleri ve misafirlerle birlikte seçilen pizza seçeneklerini gösterir.",
    storySign: "Pizza La Fin mutfağından",
    venueKicker: "Mekân ve atmosfer",
    venueTitle: "Küçük bir mekân. Büyük bir tutku.",
    venueNote: "Hamurun ritmi, ateşin ışığı ve paylaşımın sakin hali. Her köşe, yemeği zarif ve samimi bir deneyime dönüştürür.",
    venueEditorial: "Pizza La Fin’in mutfak ritmini ve günlük anlarını anlatan atmosfer seçkisi.",
    venueLabels: ["Napoli pizza", "San Marzano", "Berry White", "Cotto Pesca", "Butter Chicken", "Pesto Rosso"],
    instagramKicker: "Instagram Köşesi",
    instagramTitleA: "Mutfak, pizza",
    instagramTitleB: "ve La Fin’den günlük anlar.",
    instagramNote: "@pizzalafin hesabından mutfak, yeni lezzetler ve Pizza La Fin’in günlük ritmi.",
    instagramWatch: "İncele",
    instagramFollow: "Bizi Takip Edin",
    reviewsKicker: "Misafir yorumları",
    ratingText: "Misafirlerimizin ortak hissi.",
    reviews: ["Zarif, dengeli ve unutulmaz bir pizza deneyimi. Margherita Basilic ve limon soufflé harikaydı.", "Pepperoni Dolce Fuoco önce hafif acı, ardından balın tadıyla geliyor. Mortadella Pistacchio da şahane.", "Her pizza özenle hazırlanmış; hamur, ateş ve malzeme aynı dilde konuşuyor."],
    guest: "Misafir",
    contactKicker: "Konum ve iletişim",
    contactTitle: "Yeldeğirmeni’nde buluşalım.",
    contactNote: "Kadıköy · Yeldeğirmeni.",
    address: "Adres",
    hours: "Çalışma saatleri",
    weekdays: "Salı — Cumartesi",
    weekend: "Pazar · Pazartesi kapalı",
    email: "E-posta",
    phone: "Telefon",
    whatsapp: "WhatsApp",
    instagram: "Telefon",
    mapsOpen: "Google Maps’te aç",
    details: "Detaylar",
    ingredientsLabel: "İçindekiler",
    allergensLabel: "Alerjenler",
    close: "Kapat",
    previous: "Önceki",
    next: "Sonraki",
    footerLine: "Pizza La Fin · Yeldeğirmeni",
    backTop: "Yukarı çık",
    footerNote: "Ustalık · Zaman · Ateş",
    footerSite: "Site",
    footerSocial: "İletişim",
    footerContact: "Adres",
    heroParis: "KADIKÖY 2026",
    openDaily: "Salı–Cumartesi 14.30–22.30 · Pazar 14.00–22.00 · Pazartesi kapalı",
    mapCity: "Yeldeğirmeni / Kadıköy",
  },
  en: {
    skip: "Skip to content", menuOpen: "Open menu", menuClose: "Close menu", mainMenu: "Main menu", language: "Language", map: "Get directions", discover: "Discover",
    nav: { experience: "Experience", menu: "Menu", story: "Our Story", craft: "Craft", venue: "Space", blogs: "Blogs", contact: "Contact" },
    heroEyebrow: "Pizza La Fin · Yeldeğirmeni", heroTitle: "Neapolitan Pizza Time", heroLine: "Neapolitan Pizza Time", heroNote: "Neapolitan pizza, Tuesday through Sunday.", filmLine: "We do not just make pizza; we create the delicious moments of your day.",
    experience: "Experience", experienceTitle: "Three different forms of flavour.", experienceLead: "At Pizza La Fin, Neapolitan pizza meets the rhythm of the kitchen and the pleasure of sharing.", experienceText: ["We are open Tuesday through Saturday from 2:30 PM to 10:30 PM and Sunday from 2 PM to 10 PM. We are closed on Mondays.", "Recent posts feature Berry White and Cotto Pesca, while Butter Chicken, Pesto Rosso, Cheesquake and Surprise appear in the pizza voting line-up.", "From preparing the dough to the final slice, a day at Pizza La Fin is about wanting just one more bite."],
    pizzasKicker: "Pizzas", pizzasTitle: "Few ingredients. Full character.", pizzasNote: "Every pizza tells its own balance. Tap a card for the full image and details.", dessertsKicker: "Desserts", dessertsTitle: "A soft finale.", dessertsNote: "Every dessert carries its own rhythm. Tap a card for the full image and details.", drinksKicker: "Drinks", drinksTitle: "To accompany the table.", drinksNote: "Every drink carries its own tempo. Tap a card for details.", enlarge: "Explore", calorieNote: "Calories are approximate and based on the portion recipe.",
    craftKicker: "Dough, fermentation and fire", craftTitle: "Great pizza begins the moment the dough is made.", craftLead: "We do not rush time; we listen to the dough’s own rhythm.", craftParagraphs: ["The flour’s protein, water temperature and room humidity are read every day. We listen to what the dough needs rather than force one fixed recipe.", "Long, controlled fermentation creates more than an airy rim: it builds deeper aroma, a lighter texture and a balanced bite.", "Fire makes the final decision. High heat seals the dough in seconds, leaving the centre moist and the edge gently charred."], craftSteps: [["Dough", "Flour, water and daily balance."], ["Fermentation", "Time that never rushes aroma."], ["Fire", "High heat gives the final character."]],
    ingredientsKicker: "Selected ingredients", ingredientsTitle: "Every ingredient speaks in its own voice.", ingredientsNote: "Quality is not abundance. It is the right product, the right technique and the right measure.", ingredients: [["Italian flour", "Finely milled and quietly strong, our flour keeps its elasticity through long fermentation and builds a light, aromatic dough."], ["San Marzano", "Sun-ripened tomatoes bring vivid acidity and natural sweetness, giving our sauce a bright and lingering finish."], ["Fresh herbs", "Basil and seasonal herbs are added close to service for a fresh, layered and unmistakably vivid aroma."], ["Fior di latte", "Balanced moisture, silky fibres and a delicate milk flavour create a fluid yet measured melt under high heat."], ["Olive oil", "Fruity with a gentle peppery finish, it is the final luminous touch that brings every aroma together."], ["Wild mushrooms", "Selected in season, they add earthy depth, confident texture and a natural umami intensity to the recipe."]],
    storyKicker: "Our Story", story: "Pizza La Fin shares the rhythm of its Neapolitan pizza kitchen from dough preparation to the final slice. Recent posts follow a day in the kitchen, new flavours and pizza options chosen together with guests.", storySign: "From the Pizza La Fin kitchen",
    venueKicker: "Space and atmosphere", venueTitle: "A small room. A great passion.", venueNote: "The rhythm of dough, the light of fire and the calm of sharing. Every corner turns dinner into an elegant, sincere experience.", venueEditorial: "An atmosphere series showing Pizza La Fin’s kitchen rhythm and daily moments.", venueLabels: ["Neapolitan pizza", "San Marzano", "Berry White", "Cotto Pesca", "Butter Chicken", "Pesto Rosso"],
    instagramKicker: "Instagram Corner", instagramTitleA: "Kitchen, pizza", instagramTitleB: "and daily moments at La Fin.", instagramNote: "Kitchen scenes, new flavours and Pizza La Fin’s daily rhythm from @pizzalafin.", instagramWatch: "Explore", instagramFollow: "Follow us",
    reviewsKicker: "Guest reviews", ratingText: "A shared feeling among our guests.", reviews: ["An elegant, balanced and unforgettable pizza experience. Margherita Basilic and the lemon soufflé were wonderful.", "Pepperoni Dolce Fuoco begins gently spicy, then honey comes through. Mortadella Pistacchio is excellent too.", "Every pizza is carefully made — dough, fire and ingredients speak the same language."], guest: "Guest",
    contactKicker: "Location and contact", contactTitle: "Meet us in Yeldeğirmeni.", contactNote: "Kadıköy · Yeldeğirmeni.", address: "Address", hours: "Opening hours", weekdays: "Tuesday — Saturday", weekend: "Sunday · Monday closed", email: "Email", phone: "Phone", whatsapp: "WhatsApp", instagram: "Phone", mapsOpen: "Open in Google Maps", details: "Details", ingredientsLabel: "Ingredients", allergensLabel: "Allergens", close: "Close", previous: "Previous", next: "Next", footerLine: "Pizza La Fin · Yeldeğirmeni", backTop: "Back to top", footerNote: "Craft · Time · Fire", footerSite: "Site", footerSocial: "Contact", footerContact: "Address", heroParis: "KADIKÖY 2026", openDaily: "Tue–Sat 2:30–10:30 PM · Sun 2–10 PM · Closed Monday", mapCity: "Yeldeğirmeni / Kadıköy",
  },
  ru: {
    skip: "Перейти к содержанию", menuOpen: "Открыть меню", menuClose: "Закрыть меню", mainMenu: "Главное меню", language: "Язык", map: "Маршрут", discover: "Смотреть",
    nav: { experience: "Впечатление", menu: "Меню", story: "Наша история", craft: "Мастерство", venue: "Пространство", blogs: "Блоги", contact: "Контакты" },
    heroEyebrow: "Pizza La Fin · Yeldeğirmeni", heroTitle: "Время неаполитанской пиццы", heroLine: "Время неаполитанской пиццы", heroNote: "Неаполитанская пицца со вторника по воскресенье.", filmLine: "Мы не просто готовим пиццу — мы создаём вкусные моменты вашего дня.",
    experience: "Впечатление", experienceTitle: "Три формы вкуса.", experienceLead: "В Pizza La Fin неаполитанская пицца встречается с ритмом кухни и радостью общей трапезы.", experienceText: ["Мы открыты со вторника по субботу с 14:30 до 22:30 и в воскресенье с 14:00 до 22:00. Понедельник — выходной.", "В последних публикациях представлены Berry White и Cotto Pesca, а в голосовании за пиццу — Butter Chicken, Pesto Rosso, Cheesquake и Surprise.", "От подготовки теста до последнего кусочка день в Pizza La Fin оставляет желание взять ещё один ломтик."],
    pizzasKicker: "Пицца", pizzasTitle: "Мало ингредиентов. Много характера.", pizzasNote: "У каждой пиццы свой баланс. Нажмите на карточку, чтобы увидеть фото и детали.", dessertsKicker: "Десерты", dessertsTitle: "Мягкий финал.", dessertsNote: "У каждого десерта свой ритм. Нажмите на карточку, чтобы увидеть фото и детали.", drinksKicker: "Напитки", drinksTitle: "К столу.", drinksNote: "У каждого напитка свой темп. Нажмите на карточку для деталей.", enlarge: "Подробнее", calorieNote: "Калорийность указана приблизительно.",
    craftKicker: "Тесто, ферментация и огонь", craftTitle: "Хорошая пицца начинается в момент замеса.", craftLead: "Мы не торопим время — слушаем собственный ритм теста.", craftParagraphs: ["Структуру муки, температуру воды и влажность мы оцениваем каждый день. Вместо одной жёсткой формулы слушаем, что нужно тесту сегодня.", "Долгая контролируемая ферментация создаёт глубокий аромат, лёгкую текстуру и сбалансированный укус.", "Последнее слово за огнём. Сильный жар запечатывает тесто за секунды, сохраняя влажную середину и слегка обугленный край."], craftSteps: [["Тесто", "Мука, вода и ежедневный баланс."], ["Ферментация", "Время, которое не торопит аромат."], ["Огонь", "Сильный жар формирует характер."]],
    ingredientsKicker: "Отборные продукты", ingredientsTitle: "Каждый ингредиент звучит самостоятельно.", ingredientsNote: "Качество — не изобилие, а верный продукт, техника и мера.", ingredients: [["Итальянская мука", "Тонкий помол и сильная структура сохраняют эластичность при долгой ферментации и создают лёгкое ароматное тесто."], ["Сан-Марцано", "Созревшие на солнце томаты дают соусу яркую кислотность, природную сладость и долгое чистое послевкусие."], ["Свежая зелень", "Базилик и сезонные травы добавляются ближе к подаче, сохраняя свежий, живой и многослойный аромат."], ["Фьор ди латте", "Точная влажность, шелковистые волокна и нежный молочный вкус обеспечивают равномерное плавление при сильном жаре."], ["Оливковое масло", "Фруктовый вкус и лёгкая перечная нота связывают ароматы и становятся последним сияющим штрихом."], ["Лесные грибы", "Сезонный отбор приносит землистую глубину, выразительную текстуру и естественную насыщенность умами."]],
    storyKicker: "Наша история", story: "Pizza La Fin показывает ритм своей неаполитанской пиццерии — от подготовки теста до последнего кусочка. Последние публикации рассказывают о дне на кухне, новых вкусах и вариантах пиццы, выбранных вместе с гостями.", storySign: "Из кухни Pizza La Fin",
    venueKicker: "Пространство и атмосфера", venueTitle: "Маленький зал. Большая страсть.", venueNote: "Ритм теста, свет огня и спокойствие совместной трапезы. Каждый угол превращает ужин в изящное и искреннее впечатление.", venueEditorial: "Атмосферная серия о ритме кухни и буднях Pizza La Fin.", venueLabels: ["Неаполитанская пицца", "San Marzano", "Berry White", "Cotto Pesca", "Butter Chicken", "Pesto Rosso"],
    instagramKicker: "Уголок Instagram", instagramTitleA: "Кухня, пицца", instagramTitleB: "и будни La Fin.", instagramNote: "Кухня, новые вкусы и ежедневный ритм Pizza La Fin из @pizzalafin.", instagramWatch: "Смотреть", instagramFollow: "Подписаться",
    reviewsKicker: "Отзывы гостей", ratingText: "Общее впечатление наших гостей.", reviews: ["Изящный, сбалансированный и незабываемый опыт. Margherita Basilic и лимонное суфле были великолепны.", "Pepperoni Dolce Fuoco сначала слегка острая, затем раскрывается мёд. Mortadella Pistacchio тоже отличная.", "Каждая пицца приготовлена с заботой — тесто, огонь и продукты говорят на одном языке."], guest: "Гость",
    contactKicker: "Адрес и контакты", contactTitle: "Встретимся в Yeldeğirmeni.", contactNote: "Kadıköy · Yeldeğirmeni.", address: "Адрес", hours: "Часы работы", weekdays: "Вторник — Суббота", weekend: "Воскресенье · Понедельник закрыто", email: "Почта", phone: "Телефон", whatsapp: "WhatsApp", instagram: "Телефон", mapsOpen: "Открыть Google Maps", details: "Подробности", ingredientsLabel: "Состав", allergensLabel: "Аллергены", close: "Закрыть", previous: "Назад", next: "Далее", footerLine: "Pizza La Fin · Yeldeğirmeni", backTop: "Наверх", footerNote: "Мастерство · Время · Огонь", footerSite: "Сайт", footerSocial: "Контакты", footerContact: "Адрес", heroParis: "KADIKÖY 2026", openDaily: "Вт–Сб 14:30–22:30 · Вс 14:00–22:00 · Пн закрыто", mapCity: "Yeldeğirmeni / Kadıköy",
  },
  de: {
    skip: "Zum Inhalt", menuOpen: "Menü öffnen", menuClose: "Menü schließen", mainMenu: "Hauptmenü", language: "Sprache", map: "Route öffnen", discover: "Entdecken",
    nav: { experience: "Erlebnis", menu: "Menü", story: "Unsere Geschichte", craft: "Handwerk", venue: "Raum", blogs: "Blogs", contact: "Kontakt" },
    heroEyebrow: "Pizza La Fin · Yeldeğirmeni", heroTitle: "Zeit für neapolitanische Pizza", heroLine: "Zeit für neapolitanische Pizza", heroNote: "Neapolitanische Pizza von Dienstag bis Sonntag.", filmLine: "Wir machen nicht nur Pizza – wir schaffen die köstlichen Momente des Tages.",
    experience: "Erlebnis", experienceTitle: "Drei Formen von Geschmack.", experienceLead: "Bei Pizza La Fin trifft neapolitanische Pizza auf Küchenrhythmus und die Freude am Teilen.", experienceText: ["Wir öffnen Dienstag bis Samstag von 14:30 bis 22:30 Uhr und Sonntag von 14:00 bis 22:00 Uhr. Montag ist Ruhetag.", "In den neuesten Beiträgen erscheinen Berry White und Cotto Pesca; beim Pizza-Voting stehen Butter Chicken, Pesto Rosso, Cheesquake und Surprise zur Wahl.", "Von der Teigvorbereitung bis zum letzten Stück macht ein Tag bei Pizza La Fin Lust auf noch einen Bissen."],
    pizzasKicker: "Pizzen", pizzasTitle: "Wenige Zutaten. Viel Charakter.", pizzasNote: "Jede Pizza erzählt ihre eigene Balance. Karte antippen für Bild und Details.", dessertsKicker: "Desserts", dessertsTitle: "Ein sanftes Finale.", dessertsNote: "Jedes Dessert trägt seinen eigenen Rhythmus. Karte antippen für Bild und Details.", drinksKicker: "Getränke", drinksTitle: "Zur Begleitung der Tafel.", drinksNote: "Jedes Getränk trägt sein eigenes Tempo. Karte antippen für Details.", enlarge: "Entdecken", calorieNote: "Kalorienangaben sind ungefähre Werte der Portionsrezeptur.",
    craftKicker: "Teig, Fermentation und Feuer", craftTitle: "Gute Pizza beginnt mit dem ersten Moment des Teigs.", craftLead: "Wir beschleunigen die Zeit nicht – wir hören auf den Rhythmus des Teigs.", craftParagraphs: ["Proteinstruktur des Mehls, Wassertemperatur und Luftfeuchte werden täglich neu gelesen. Statt einer starren Formel hören wir darauf, was der Teig braucht.", "Lange, kontrollierte Fermentation schafft tiefes Aroma, leichte Textur und einen ausgewogenen Biss.", "Die letzte Entscheidung trifft das Feuer. Hohe Hitze versiegelt den Teig in Sekunden und lässt die Mitte saftig, den Rand fein geröstet."], craftSteps: [["Teig", "Mehl, Wasser und tägliche Balance."], ["Fermentation", "Zeit, die Aroma nicht hetzt."], ["Feuer", "Hohe Hitze gibt Charakter."]],
    ingredientsKicker: "Ausgewählte Zutaten", ingredientsTitle: "Jede Zutat spricht mit eigener Stimme.", ingredientsNote: "Qualität ist nicht Fülle, sondern das richtige Produkt, die richtige Technik und das richtige Maß.", ingredients: [["Italienisches Mehl", "Fein gemahlen und zugleich kräftig, bewahrt es bei langer Fermentation Elastizität und schafft einen leichten, aromatischen Teig."], ["San Marzano", "Sonnengereifte Tomaten geben der Sauce lebendige Säure, natürliche Süße und ein klares, langes Finish."], ["Frische Kräuter", "Basilikum und Saisonkräuter kommen kurz vor dem Servieren hinzu und bewahren ihr frisches, vielschichtiges Aroma."], ["Fior di Latte", "Ausgewogene Feuchtigkeit, seidige Fasern und eine feine Milchnote sorgen bei hoher Hitze für kontrollierte Schmelze."], ["Olivenöl", "Fruchtig und sanft pfeffrig verbindet es alle Aromen und setzt den letzten leuchtenden Akzent."], ["Wildpilze", "Saisonal ausgewählt bringen sie erdige Tiefe, kraftvolle Textur und natürliche Umami-Intensität."]],
    storyKicker: "Unsere Geschichte", story: "Pizza La Fin zeigt den Rhythmus seiner neapolitanischen Pizzaküche von der Teigvorbereitung bis zum letzten Stück. Die neuesten Beiträge begleiten einen Tag in der Küche, neue Aromen und gemeinsam mit Gästen gewählte Pizzaoptionen.", storySign: "Aus der Küche von Pizza La Fin",
    venueKicker: "Raum und Atmosphäre", venueTitle: "Ein kleiner Raum. Eine große Leidenschaft.", venueNote: "Der Rhythmus des Teigs, das Licht des Feuers und die Ruhe des Teilens. Jede Ecke macht das Essen elegant und nahbar.", venueEditorial: "Eine Atmosphärenserie über Küchenrhythmus und Alltag bei Pizza La Fin.", venueLabels: ["Neapolitanische Pizza", "San Marzano", "Berry White", "Cotto Pesca", "Butter Chicken", "Pesto Rosso"],
    instagramKicker: "Instagram-Ecke", instagramTitleA: "Küche, Pizza", instagramTitleB: "und Alltag bei La Fin.", instagramNote: "Küche, neue Aromen und der tägliche Rhythmus von Pizza La Fin aus @pizzalafin.", instagramWatch: "Entdecken", instagramFollow: "Folgen Sie uns",
    reviewsKicker: "Gästestimmen", ratingText: "Das gemeinsame Gefühl unserer Gäste.", reviews: ["Ein elegantes, ausgewogenes und unvergessliches Pizzaerlebnis. Margherita Basilic und das Zitronensoufflé waren großartig.", "Pepperoni Dolce Fuoco beginnt leicht scharf, dann kommt der Honig. Auch Mortadella Pistacchio ist wunderbar.", "Jede Pizza ist sorgfältig gemacht — Teig, Feuer und Zutaten sprechen dieselbe Sprache."], guest: "Gast",
    contactKicker: "Standort und Kontakt", contactTitle: "Treffen wir uns in Yeldeğirmeni.", contactNote: "Kadıköy · Yeldeğirmeni.", address: "Adresse", hours: "Öffnungszeiten", weekdays: "Dienstag — Samstag", weekend: "Sonntag · Montag geschlossen", email: "E-Mail", phone: "Telefon", whatsapp: "WhatsApp", instagram: "Telefon", mapsOpen: "In Google Maps öffnen", details: "Details", ingredientsLabel: "Zutaten", allergensLabel: "Allergene", close: "Schließen", previous: "Zurück", next: "Weiter", footerLine: "Pizza La Fin · Yeldeğirmeni", backTop: "Nach oben", footerNote: "Handwerk · Zeit · Feuer", footerSite: "Seite", footerSocial: "Kontakt", footerContact: "Adresse", heroParis: "KADIKÖY 2026", openDaily: "Di–Sa 14:30–22:30 · So 14:00–22:00 · Mo geschlossen", mapCity: "Yeldeğirmeni / Kadıköy",
  },
  fr: {
    skip: "Aller au contenu", menuOpen: "Ouvrir le menu", menuClose: "Fermer le menu", mainMenu: "Menu principal", language: "Langue", map: "Itinéraire", discover: "Découvrir",
    nav: { experience: "Expérience", menu: "Menu", story: "Notre histoire", craft: "Savoir-faire", venue: "Lieu", blogs: "Blogs", contact: "Contact" },
    heroEyebrow: "Pizza La Fin · Yeldeğirmeni", heroTitle: "L’heure de la pizza napolitaine", heroLine: "L’heure de la pizza napolitaine", heroNote: "Pizza napolitaine du mardi au dimanche.", filmLine: "Nous ne faisons pas que des pizzas ; nous créons les délicieux moments de votre journée.",
    experience: "Expérience", experienceTitle: "Trois formes de saveur.", experienceLead: "Chez Pizza La Fin, la pizza napolitaine rencontre le rythme de la cuisine et le plaisir du partage.", experienceText: ["Nous sommes ouverts du mardi au samedi de 14 h 30 à 22 h 30 et le dimanche de 14 h à 22 h. Fermé le lundi.", "Les dernières publications présentent Berry White et Cotto Pesca ; Butter Chicken, Pesto Rosso, Cheesquake et Surprise figurent dans le vote des pizzas.", "De la préparation de la pâte à la dernière part, une journée chez Pizza La Fin donne envie d’une bouchée de plus."],
    pizzasKicker: "Menu", pizzasTitle: "Peu d’ingrédients. Beaucoup de caractère.", pizzasNote: "Chaque pizza raconte son propre équilibre. Touchez une carte pour voir l’image et les détails.", dessertsKicker: "Desserts", dessertsTitle: "Une finale tout en douceur.", dessertsNote: "Chaque dessert suit son propre rythme. Touchez une carte pour voir l’image et les détails.", drinksKicker: "Boissons", drinksTitle: "Pour accompagner la table.", drinksNote: "Chaque boisson a son tempo. Touchez une carte pour les détails.", enlarge: "Découvrir", calorieNote: "Les calories sont des valeurs approximatives établies selon la recette de la portion.",
    craftKicker: "Pâte, fermentation et feu", craftTitle: "Une grande pizza commence dès le premier geste sur la pâte.", craftLead: "Nous ne pressons pas le temps ; nous écoutons le rythme de la pâte.", craftParagraphs: ["La force de la farine, la température de l’eau et l’humidité ambiante sont relues chaque jour. Plutôt qu’une formule figée, nous écoutons ce dont la pâte a besoin.", "La fermentation longue et contrôlée ne crée pas seulement une corniche aérienne : elle construit un arôme profond, une texture légère et une bouchée équilibrée.", "Le dernier mot appartient au feu. La haute température saisit la pâte en quelques secondes, garde le centre humide et marque délicatement la corniche."], craftSteps: [["Pâte", "Farine, eau et équilibre quotidien."], ["Fermentation", "Un temps qui ne presse jamais l’arôme."], ["Feu", "La haute température donne le caractère final."]],
    ingredientsKicker: "Ingrédients choisis", ingredientsTitle: "Chaque ingrédient fait entendre sa voix.", ingredientsNote: "La qualité ne vient pas de l’abondance, mais du bon produit, du bon geste et de la juste mesure.", ingredients: [["Farine italienne", "Finement moulue et discrètement puissante, elle garde son élasticité pendant la fermentation longue et crée une pâte légère et aromatique."], ["San Marzano", "Mûries au soleil, les tomates apportent une acidité vive et une douceur naturelle pour une finale claire et longue."], ["Herbes fraîches", "Le basilic et les herbes de saison sont ajoutés au plus près du service afin de préserver un parfum frais et complexe."], ["Fior di latte", "Son humidité équilibrée, ses fibres soyeuses et sa délicate saveur lactée offrent une fonte fluide mais mesurée."], ["Huile d’olive", "Fruitée avec une légère finale poivrée, elle réunit les arômes dans une dernière touche lumineuse."], ["Champignons sauvages", "Choisis en saison, ils apportent une profondeur terrienne, une texture affirmée et une intensité umami naturelle."]],
    storyKicker: "Notre histoire", story: "Pizza La Fin partage le rythme de sa cuisine de pizza napolitaine, de la préparation de la pâte à la dernière part. Les publications récentes suivent une journée en cuisine, de nouvelles saveurs et des options de pizza choisies avec les convives.", storySign: "Depuis la cuisine de Pizza La Fin",
    venueKicker: "Lieu et atmosphère", venueTitle: "Une petite salle. Une grande passion.", venueNote: "Le rythme de la pâte, la lumière du feu et le calme du partage. Chaque détail transforme le repas en une expérience élégante et sincère.", venueEditorial: "Une série d’atmosphère sur le rythme quotidien de la cuisine Pizza La Fin.", venueLabels: ["Pizza napolitaine", "San Marzano", "Berry White", "Cotto Pesca", "Butter Chicken", "Pesto Rosso"],
    instagramKicker: "Coin Instagram", instagramTitleA: "Cuisine, pizza", instagramTitleB: "et quotidien de La Fin.", instagramNote: "Cuisine, nouvelles saveurs et rythme quotidien de Pizza La Fin depuis @pizzalafin.", instagramWatch: "Découvrir", instagramFollow: "Suivez-nous",
    reviewsKicker: "Avis des convives", ratingText: "Un sentiment partagé par nos convives.", reviews: ["Une expérience de pizza élégante, équilibrée et inoubliable. La Margherita Basilic et le soufflé au citron étaient merveilleux.", "La Pepperoni Dolce Fuoco commence légèrement épicée, puis le miel apparaît. La Mortadella Pistacchio est excellente aussi.", "Chaque pizza est préparée avec soin : la pâte, le feu et les ingrédients parlent la même langue."], guest: "Convive",
    contactKicker: "Lieu et contact", contactTitle: "Retrouvons-nous à Yeldeğirmeni.", contactNote: "Kadıköy · Yeldeğirmeni.", address: "Adresse", hours: "Horaires", weekdays: "Mardi — Samedi", weekend: "Dimanche · Fermé lundi", email: "E-mail", phone: "Téléphone", whatsapp: "WhatsApp", instagram: "Téléphone", mapsOpen: "Ouvrir dans Google Maps", details: "Détails", ingredientsLabel: "Ingrédients", allergensLabel: "Allergènes", close: "Fermer", previous: "Précédent", next: "Suivant", footerLine: "Pizza La Fin · Yeldeğirmeni", backTop: "Retour en haut", footerNote: "Savoir-faire · Temps · Feu", footerSite: "Site", footerSocial: "Contact", footerContact: "Adresse", heroParis: "KADIKÖY 2026", openDaily: "Mar–Sam 14 h 30–22 h 30 · Dim 14 h–22 h · Fermé lundi", mapCity: "Yeldeğirmeni / Kadıköy",
  },
  ar: {
    skip: "الانتقال إلى المحتوى", menuOpen: "فتح القائمة", menuClose: "إغلاق القائمة", mainMenu: "القائمة الرئيسية", language: "اللغة", map: "الاتجاهات", discover: "اكتشف",
    nav: { experience: "التجربة", menu: "القائمة", story: "قصتنا", craft: "الحرفة", venue: "المكان", blogs: "المدونة", contact: "التواصل" },
    heroEyebrow: "Pizza La Fin · Yeldeğirmeni", heroTitle: "وقت البيتزا النابولية", heroLine: "وقت البيتزا النابولية", heroNote: "بيتزا نابولية من الثلاثاء إلى الأحد.", filmLine: "لا نصنع البيتزا فقط؛ بل نصنع لحظات يومكم اللذيذة.",
    experience: "التجربة", experienceTitle: "ثلاثة أشكال مختلفة للنكهة.", experienceLead: "في Pizza La Fin تلتقي البيتزا النابولية بإيقاع المطبخ ومتعة المشاركة.", experienceText: ["نفتح من الثلاثاء إلى السبت من 14:30 حتى 22:30، والأحد من 14:00 حتى 22:00. نغلق يوم الاثنين.", "تظهر Berry White وCotto Pesca في أحدث المنشورات، بينما تشارك Butter Chicken وPesto Rosso وCheesquake وSurprise في تصويت البيتزا.", "من تحضير العجين إلى آخر شريحة، يوم في Pizza La Fin يجعلك ترغب في لقمة أخرى."],
    pizzasKicker: "البيتزا", pizzasTitle: "مكونات قليلة. شخصية كبيرة.", pizzasNote: "لكل بيتزا توازنها الخاص. اضغط على البطاقة للصورة الكبيرة والتفاصيل.", dessertsKicker: "الحلويات", dessertsTitle: "ختام ناعم.", dessertsNote: "لكل حلوى إيقاعها الخاص. اضغط على البطاقة للصورة الكبيرة والتفاصيل.", drinksKicker: "المشروبات", drinksTitle: "لمرافقة المائدة.", drinksNote: "لكل مشروب إيقاعه. اضغط على البطاقة للتفاصيل.", enlarge: "استكشف", calorieNote: "قيم السعرات تقريبية وفق وصفة الحصة.",
    craftKicker: "العجين والتخمير والنار", craftTitle: "تبدأ البيتزا الجيدة منذ اللحظة الأولى لإعداد العجين.", craftLead: "لا نستعجل الوقت؛ نستمع إلى إيقاع العجين.", craftParagraphs: ["نقرأ بنية الدقيق وحرارة الماء ورطوبة المكان كل يوم. نصغي لما يحتاجه العجين بدلاً من فرض وصفة جامدة.", "التخمير الطويل والمتحكم به يصنع عطراً أعمق وقواماً أخف ولقمة متوازنة.", "القرار الأخير للنار. الحرارة العالية تغلق العجين خلال ثوانٍ، وتُبقي الوسط رطباً والحافة محمّرة برفق."], craftSteps: [["العجين", "دقيق وماء وتوازن يومي."], ["التخمير", "وقت لا يستعجل العطر."], ["النار", "حرارة عالية تمنح الشخصية الأخيرة."]],
    ingredientsKicker: "مكونات مختارة", ingredientsTitle: "لكل مكوّن صوته الخاص.", ingredientsNote: "الجودة ليست في الكثرة، بل في المنتج الصحيح والتقنية الصحيحة والقدر الصحيح.", ingredients: [["دقيق إيطالي", "طحن ناعم وبنية قوية تحفظ المرونة خلال التخمير الطويل وتؤسس لعجين خفيف وغني بالعطر."], ["سان مارزانو", "طماطم ناضجة تحت الشمس تمنح الصلصة حموضة مشرقة وحلاوة طبيعية ونهاية نظيفة وطويلة."], ["أعشاب طازجة", "نضيف الريحان والأعشاب الموسمية قريباً من التقديم للحفاظ على عطرها الحي والمنعش والمتعدد الطبقات."], ["فيور دي لاتيه", "رطوبة متوازنة وألياف حريرية ونكهة حليب رقيقة تمنح ذوباناً منضبطاً تحت الحرارة العالية."], ["زيت الزيتون", "طابع فاكهي ونهاية فلفلية خفيفة تجمع النكهات في لمسة أخيرة مشرقة."], ["فطر بري", "اختيار موسمي يضيف عمقاً ترابياً وقواماً واضحاً وكثافة أومامي طبيعية للوصفة."]],
    storyKicker: "قصتنا", story: "يشارك Pizza La Fin إيقاع مطبخ البيتزا النابولية من تحضير العجين إلى آخر شريحة. تتابع المنشورات الأخيرة يوماً في المطبخ ونكهات جديدة وخيارات بيتزا يختارها الضيوف معاً.", storySign: "من مطبخ Pizza La Fin",
    venueKicker: "المكان والأجواء", venueTitle: "مكان صغير. شغف كبير.", venueNote: "إيقاع العجين وضوء النار وهدوء المشاركة. كل زاوية تحول العشاء إلى تجربة أنيقة وصادقة.", venueEditorial: "مشاهد من إيقاع المطبخ ويوميات Pizza La Fin.", venueLabels: ["بيتزا نابولية", "San Marzano", "Berry White", "Cotto Pesca", "Butter Chicken", "Pesto Rosso"],
    instagramKicker: "ركن إنستغرام", instagramTitleA: "المطبخ والبيتزا", instagramTitleB: "ويوميات La Fin.", instagramNote: "المطبخ والنكهات الجديدة والإيقاع اليومي لـ Pizza La Fin من @pizzalafin.", instagramWatch: "استكشف", instagramFollow: "تابعونا",
    reviewsKicker: "آراء الضيوف", ratingText: "الشعور المشترك لضيوفنا.", reviews: ["تجربة بيتزا أنيقة ومتوازنة ولا تُنسى. كانت مارغريتا بازيليك وسوفليه الليمون رائعة.", "يبدأ ببروني دولتشي فوكو بحرارة خفيفة ثم يظهر العسل. ومورتاديلا بيستاكو ممتازة أيضاً.", "كل بيتزا مُعدّة بعناية؛ العجين والنار والمكونات تتحدث اللغة نفسها."], guest: "ضيف",
    contactKicker: "الموقع والتواصل", contactTitle: "نلتقي في Yeldeğirmeni.", contactNote: "Kadıköy · Yeldeğirmeni.", address: "العنوان", hours: "ساعات العمل", weekdays: "الثلاثاء — السبت", weekend: "الأحد · مغلق الاثنين", email: "البريد الإلكتروني", phone: "الهاتف", whatsapp: "واتساب", instagram: "الهاتف", mapsOpen: "فتح في خرائط Google", details: "التفاصيل", ingredientsLabel: "المكونات", allergensLabel: "مسببات الحساسية", close: "إغلاق", previous: "السابق", next: "التالي", footerLine: "Pizza La Fin · Yeldeğirmeni", backTop: "إلى الأعلى", footerNote: "حرفة · وقت · نار", footerSite: "الموقع", footerSocial: "التواصل", footerContact: "العنوان", heroParis: "KADIKÖY 2026", openDaily: "الثلاثاء–السبت 14:30–22:30 · الأحد 14:00–22:00 · مغلق الاثنين", mapCity: "Yeldeğirmeni / Kadıköy",
  },
} as const;

const ingredientImages = ["flour", "tomatoes", "basil", "mozzarella", "olive-oil", "mushrooms"];
const venueImages = [
  "venue/open-kitchen.webp",
  "venue/dough-oven.webp",
  "venue/counter.webp",
  "venue/dining-room.webp",
  "venue/table-setting.webp",
  "venue/evening-exterior.webp",
];
const galleryPosts = [
  { image: publicAsset("/media/instagram-track/post-01.jpg"), url: "https://www.instagram.com/p/DcG8sh5KMH4/", handle: "Pizza La Fin · 01" },
  { image: publicAsset("/media/instagram-track/post-02.jpg"), url: "https://www.instagram.com/p/DcB4OeOgMLR/", handle: "Pizza La Fin · 02" },
  { image: publicAsset("/media/instagram-track/post-03.jpg"), url: "https://www.instagram.com/p/DcBNEV-ttgx/", handle: "Pizza La Fin · 03" },
  { image: publicAsset("/media/instagram-track/post-04.jpg"), url: "https://www.instagram.com/p/Db-m095CvGn/", handle: "Pizza La Fin · 04" },
  { image: publicAsset("/media/instagram-track/post-05.jpg"), url: "https://www.instagram.com/p/Db5uBrnsSvT/", handle: "Pizza La Fin · 05" },
  { image: publicAsset("/media/instagram-track/post-06.jpg"), url: "https://www.instagram.com/p/Db3EE3xCyMx/", handle: "Pizza La Fin · 06" },
  { image: publicAsset("/media/instagram-track/post-07.jpg"), url: "https://www.instagram.com/p/Db0VwXAjORq/", handle: "Pizza La Fin · 07" },
  { image: publicAsset("/media/instagram-track/post-08.jpg"), url: "https://www.instagram.com/p/DbvCI3_MGIR/", handle: "Pizza La Fin · 08" },
  { image: publicAsset("/media/instagram-track/post-09.jpg"), url: "https://www.instagram.com/p/DbskX02Cml2/", handle: "Pizza La Fin · 09" },
  { image: publicAsset("/media/instagram-track/post-10.jpg"), url: "https://www.instagram.com/p/DbqMEv-Aiwc/", handle: "Pizza La Fin · 10" },
  { image: publicAsset("/media/instagram-track/post-11.jpg"), url: "https://www.instagram.com/p/DblCiPBMdGX/", handle: "Pizza La Fin · 11" },
  { image: publicAsset("/media/instagram-track/post-12.jpg"), url: "https://www.instagram.com/p/Dbfs3q6MiVO/", handle: "Pizza La Fin · 12" },
  { image: publicAsset("/media/instagram-track/post-13.jpg"), url: "https://www.instagram.com/p/DbdB80jM1-g/", handle: "Pizza La Fin · 13" },
];


export default function Home() {
  const pathname = usePathname() ?? "/";
  const routeSegment = pathname.split("/").filter(Boolean)[0];
  const routeLocale = isLocale(routeSegment) ? routeSegment : undefined;
  const isLocaleRoot = pathname === "/";
  const locale: Locale = routeLocale ?? defaultLocale;
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [headerDark, setHeaderDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("experience");
  const [storyProgress, setStoryProgress] = useState(0);
  const storyRef = useRef<HTMLElement>(null);
  const instagramTrackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const dragThreshold = 8;
  const lightboxSwipeRef = useRef({ startX: 0, startY: 0 });
  const c = copy[locale];
  const filmFontVw = Math.min(5.2, Math.max(1.65, 180 / c.filmLine.length));
  const currentLocale = localeList.find((entry) => entry.code === locale) ?? localeList[0];
  const storyWords = c.story.split(" ");

  const navItems = [
    { key: "experience", label: c.nav.experience, href: "#experience" },
    { key: "menu", label: c.nav.menu, href: "#pizzas" },
    { key: "story", label: c.nav.story, href: "#story" },
    { key: "craft", label: c.nav.craft, href: "#craft" },
    { key: "venue", label: c.nav.venue, href: "#venue" },
    { key: "blogs", label: c.nav.blogs, href: `/${locale}/blogs` },
    { key: "contact", label: c.nav.contact, href: "#contact" },
  ];

  const moveLightbox = (direction: number) => {
    setActiveItem((current) => current === null ? null : (current + direction + allMenuItems.length) % allMenuItems.length);
  };

  useEffect(() => {
    if (!isLocaleRoot) return;
    const saved = window.localStorage.getItem(localeStorageKey);
    const browserLocale = window.navigator.language.toLowerCase().split("-")[0];
    const preferred = isLocale(saved ?? undefined)
      ? saved
      : isLocale(browserLocale)
        ? browserLocale
        : defaultLocale;
    persistLocalePreference(preferred);
    window.location.replace(`/${preferred}${window.location.hash}`);
  }, [isLocaleRoot]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 921px)");
    const closeMobileMenu = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    closeMobileMenu();
    desktop.addEventListener("change", closeMobileMenu);
    return () => desktop.removeEventListener("change", closeMobileMenu);
  }, []);

  useEffect(() => {
    let ticking = false;
    const measure = () => {
      const themePoint = 38;
      let nextDark = false;
      document.querySelectorAll<HTMLElement>("[data-header-theme]").forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= themePoint && rect.bottom > themePoint) {
          nextDark = section.dataset.headerTheme === "dark";
        }
      });
      setHeaderDark(nextDark);
      setScrolled(window.scrollY > 18);

      const navPoint = window.innerHeight * 0.42;
      let nextNav: string | null = null;
      document.querySelectorAll<HTMLElement>("[data-nav]").forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= navPoint && rect.bottom > navPoint && section.dataset.nav) {
          nextNav = section.dataset.nav;
        }
      });
      if (nextNav) setActiveNav(nextNav);

      if (storyRef.current) {
        const rect = storyRef.current.getBoundingClientRect();
        const travel = Math.max(rect.height - window.innerHeight, 1);
        setStoryProgress(Math.min(1, Math.max(0, -rect.top / travel)));
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(measure);
      }
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [locale]);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-group]");
    let observer: IntersectionObserver | null = null;
    const start = () => {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -12% 0px" });
      targets.forEach((target) => observer?.observe(target));
    };

    if (document.documentElement.classList.contains("is-loading")) {
      window.addEventListener("la-savelia:ready", start, { once: true });
    } else {
      start();
    }
    return () => {
      window.removeEventListener("la-savelia:ready", start);
      observer?.disconnect();
    };
  }, [locale]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || activeItem !== null ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setActiveItem(null);
      }
      if (activeItem !== null && event.key === "ArrowLeft") moveLightbox(-1);
      if (activeItem !== null && event.key === "ArrowRight") moveLightbox(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, activeItem]);

  const setLanguage = (nextLocale: Locale) => {
    persistLocalePreference(nextLocale);
    setMenuOpen(false);
    const parts = pathname.split("/").filter(Boolean);
    const rest = isLocale(parts[0]) ? parts.slice(1) : parts;
    const nextPath = `/${nextLocale}${rest.length ? `/${rest.join("/")}` : ""}${window.location.hash}`;
    window.location.assign(nextPath);
  };

  const scrollToTop = () => {
    scrollPageTo(0, { duration: 1.4 });
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  };

  const onDragStart = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    if (event.button !== 0) return;
    const track = instagramTrackRef.current;
    if (!track) return;
    dragRef.current = { active: true, startX: event.clientX, startScroll: track.scrollLeft, moved: false };
  };

  const onDragMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = instagramTrackRef.current;
    if (!track || !dragRef.current.active) return;
    const distance = event.clientX - dragRef.current.startX;
    if (!dragRef.current.moved) {
      if (Math.abs(distance) < dragThreshold) return;
      dragRef.current.moved = true;
      track.setPointerCapture(event.pointerId);
    }
    track.scrollLeft = dragRef.current.startScroll - distance;
  };

  const onDragEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const track = instagramTrackRef.current;
    if (track?.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    dragRef.current.active = false;
    window.setTimeout(() => {
      dragRef.current.moved = false;
    }, 0);
  };

  const onLightboxSwipeStart = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    lightboxSwipeRef.current = { startX: event.clientX, startY: event.clientY };
  };

  const onLightboxSwipeEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    const deltaX = event.clientX - lightboxSwipeRef.current.startX;
    const deltaY = event.clientY - lightboxSwipeRef.current.startY;
    if (Math.abs(deltaX) > 55 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      moveLightbox(deltaX < 0 ? 1 : -1);
    }
  };

  if (isLocaleRoot) {
    return <LoadingExperience locale={locale} logoSrc={publicAsset("/media/pizza-la-fin-logo.png")} />;
  }

  return (
    <>
      <a className="skip-link" href="#main-content">{c.skip}</a>

      <header className={`site-header ${headerDark ? "is-dark" : ""} ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "menu-is-open" : ""}`}>
        <button className="brand-link" type="button" onClick={scrollToTop} aria-label="Pizza La Fin">
          <img src={publicAsset("/media/pizza-la-fin-logo.png")} alt="Pizza La Fin" />
        </button>
        <nav className="desktop-nav" aria-label={c.mainMenu}>
          {navItems.map((item) => (
            <a key={item.key} href={item.href} className={activeNav === item.key ? "is-active" : ""} aria-current={activeNav === item.key ? "location" : undefined}>
              {item.label}
            </a>
          ))}
        </nav>
          <div className="header-actions">
          <div className="language-switcher" aria-label={c.language}>
            <button type="button" className="language-current" aria-label={c.language}>
              <span className="language-current-label">{currentLocale.label}</span>
              <span className="language-current-code"><strong>{locale.toUpperCase()}</strong><i aria-hidden="true" /></span>
            </button>
            <div className="language-popover">
              {localeList.map((entry, index) => (
                <button key={entry.code} type="button" className={locale === entry.code ? "is-selected" : ""} onClick={() => setLanguage(entry.code)}>
                  <small>0{index + 1}</small><span>{entry.label}</span><strong>{entry.short}</strong>
                </button>
              ))}
            </div>
          </div>
        </div>
        <button className="menu-button" type="button" aria-label={menuOpen ? c.menuClose : c.menuOpen} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen} data-lenis-prevent>
        <nav aria-label={c.mainMenu}>
          {navItems.map((item, index) => (
            <a key={item.key} href={item.href} className={activeNav === item.key ? "is-active" : ""} onClick={() => setMenuOpen(false)}>
              <span>0{index + 1}</span>{item.label}
            </a>
          ))}
        </nav>
        <div className="mobile-languages" aria-label={c.language}>
          {localeList.map((entry) => <button key={entry.code} type="button" className={locale === entry.code ? "is-selected" : ""} onClick={() => setLanguage(entry.code)}>{entry.short}</button>)}
        </div>
        <div className="mobile-menu-foot">
          <p>{ui[locale].locationTag}</p>
          <a href={mapUrl} target="_blank" rel="noreferrer">{c.map} <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </div>

      <main id="main-content">
        <section id="top" className="hero" data-header-theme="light">
          <div className="hero-copy">
            <p className="hero-eyebrow">{c.heroEyebrow}</p>
            <h1>{c.heroTitle}</h1>
          </div>
          <figure className="hero-wide-image">
            <video autoPlay muted loop playsInline preload="metadata" poster={publicAsset("/media/hero-section-poster.webp")} aria-label="Pizza La Fin">
              <source src={publicAsset("/media/hero-section.webm")} type="video/webm" />
              <source src={publicAsset("/media/hero-section.mp4")} type="video/mp4" />
            </video>
            <figcaption>
              <span>{c.heroParis}</span>
              <span aria-hidden="true" />
              <span>{c.openDaily}</span>
            </figcaption>
          </figure>
          <HeroSignature />
        </section>

        <section id="experience" className="experience-section" data-header-theme="light" data-nav="experience">
          <div className="section-kicker" data-reveal><span>§ 01</span><span>{c.experience}</span></div>
          <div className="section-heading" data-reveal>
            <h2>{c.experienceTitle}</h2>
            <p>{c.experienceLead}</p>
          </div>
          <div className="experience-copy" data-reveal-group>
            {c.experienceText.map((paragraph, index) => <article key={paragraph}><span>0{index + 1}</span><p>{paragraph}</p></article>)}
          </div>
        </section>

        <section id="pizzas" className="pizza-section" data-header-theme="light" data-nav="menu">
          <div className="section-kicker" data-reveal><span>§ 02</span><span>{c.pizzasKicker}</span></div>
          <div className="section-heading" data-reveal>
            <h2>{c.pizzasTitle}</h2>
            <p>{c.pizzasNote}</p>
          </div>
          <div className="pizza-grid">
            {pizzas.map((pizza, index) => (
              <article className="pizza-card" key={pizza.name} data-reveal>
                <button className="pizza-image-button" type="button" onClick={() => setActiveItem(index)} aria-label={`${pizza.name} — ${c.enlarge}`}>
                  <img src={pizza.image} alt={pizza.name} loading="lazy" />
                  <span>0{index + 1}</span><span className="image-action">{c.enlarge} ↗</span>
                </button>
                <div className="pizza-card-body">
                  <h3>{pizza.name}</h3>
                  <p className="pizza-description">{pizza.description[locale]}</p>
                  <p className="pizza-ingredients">{pizza.ingredients[locale]}</p>
                  <p className="pizza-allergens">{c.allergensLabel}: {pizza.allergens[locale]}</p>
                  <div className="pizza-card-meta"><span>{pizza.calories}</span><strong>{pizza.price}</strong></div>
                </div>
              </article>
            ))}
          </div>
          <div className="dessert-block">
            <div className="section-kicker" data-reveal><span>§ 02.1</span><span>{c.dessertsKicker}</span></div>
            <div className="section-heading" data-reveal>
              <h2>{c.dessertsTitle}</h2>
              <p>{c.dessertsNote}</p>
            </div>
          </div>
          <div className="pizza-grid">
            {desserts.map((dessert, index) => (
              <article className="pizza-card" key={dessert.name} data-reveal>
                <button className="pizza-image-button" type="button" onClick={() => setActiveItem(pizzas.length + index)} aria-label={`${dessert.name} — ${c.enlarge}`}>
                  <img src={dessert.image} alt={dessert.name} loading="lazy" />
                  <span>{String(index + 1).padStart(2, "0")}</span><span className="image-action">{c.enlarge} ↗</span>
                </button>
                <div className="pizza-card-body">
                  <h3>{dessert.name}</h3>
                  <p className="pizza-description">{dessert.description[locale]}</p>
                  <p className="pizza-ingredients">{dessert.ingredients[locale]}</p>
                  <p className="pizza-allergens">{c.allergensLabel}: {dessert.allergens[locale]}</p>
                  <div className="pizza-card-meta"><span>{dessert.calories}</span><strong>{dessert.price}</strong></div>
                </div>
              </article>
            ))}
          </div>

          <div className="dessert-block">
            <div className="section-kicker" data-reveal><span>§ 02.2</span><span>{c.drinksKicker}</span></div>
            <div className="section-heading" data-reveal>
              <h2>{c.drinksTitle}</h2>
              <p>{c.drinksNote}</p>
            </div>
          </div>
          <div className="pizza-grid">
            {drinks.map((drink, index) => (
              <article className="pizza-card" key={drink.name} data-reveal>
                <button className="pizza-image-button" type="button" onClick={() => setActiveItem(pizzas.length + desserts.length + index)} aria-label={`${drink.name} — ${c.enlarge}`}>
                  <img src={drink.image} alt={drink.name} loading="lazy" />
                  <span>{String(index + 1).padStart(2, "0")}</span><span className="image-action">{c.enlarge} ↗</span>
                </button>
                <div className="pizza-card-body">
                  <h3>{drink.name}</h3>
                  <p className="pizza-description">{drink.description[locale]}</p>
                  <p className="pizza-ingredients">{drink.ingredients[locale]}</p>
                  <p className="pizza-allergens">{c.allergensLabel}: {drink.allergens[locale]}</p>
                  <div className="pizza-card-meta"><span>{drink.calories}</span><strong>{drink.price}</strong></div>
                </div>
              </article>
            ))}
          </div>

          <p className="calorie-note">* {c.calorieNote}</p>
        </section>

        <section id="fire-film" className="film-banner" data-header-theme="dark" aria-label="Pizza La Fin">
          <video autoPlay muted loop playsInline preload="metadata" poster={publicAsset("/media/film-poster.webp")}>
            <source src={publicAsset("/media/la-savelia-banner.webm")} type="video/webm" />
            <source src={publicAsset("/media/la-savelia-banner.mp4")} type="video/mp4" />
          </video>
          <div className="film-overlay" />
          <p data-reveal style={{ fontSize: `clamp(7px, ${filmFontVw}vw, 72px)` }}>{c.filmLine}</p>
          <span>{ui[locale].locationTag}</span>
        </section>

        <section id="story" ref={storyRef} className="chef-story" data-header-theme="dark" data-nav="story" aria-label={c.storyKicker}>
          <div className="story-sticky">
            <div className="section-kicker light story-kicker"><span>§ 03</span><span>{c.storyKicker}</span></div>
            <div className="story-layout">
              <p className="story-text" aria-label={c.story}>
                {storyWords.map((word, index) => {
                  const threshold = ((index + 1) / storyWords.length) * 0.88;
                  return <span key={`${word}-${index}`} className={storyProgress > threshold ? "is-filled" : ""} aria-hidden="true">{word} </span>;
                })}
              </p>
              <p className="story-sign">— {c.storySign}</p>
            </div>
          </div>
        </section>

        <section id="craft" className="craft-section" data-header-theme="light" data-nav="craft">
          <div className="section-kicker" data-reveal><span>§ 04</span><span>{c.craftKicker}</span></div>
          <div className="craft-heading" data-reveal><h2>{c.craftTitle}</h2><p>{c.craftLead}</p></div>
          <div className="craft-editorial-copy" data-reveal-group>
            {c.craftParagraphs.map((paragraph, index) => <article key={paragraph}><span>0{index + 1}</span><p>{paragraph}</p></article>)}
          </div>
          <div className="craft-steps" data-reveal-group>
            {c.craftSteps.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="ingredients-section" data-header-theme="light" data-nav="craft">
          <div className="section-kicker" data-reveal><span>§ 05</span><span>{c.ingredientsKicker}</span></div>
          <div className="ingredients-intro" data-reveal><h2>{c.ingredientsTitle}</h2><p>{c.ingredientsNote}</p></div>
          <div className="ingredient-strip" data-reveal-group>
            {c.ingredients.map(([title, text], index) => (
              <article className="ingredient-card" key={title}>
                <img src={publicAsset(`/media/ingredients/${ingredientImages[index]}.webp`)} alt={title} loading="lazy" />
                <div><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section id="venue" className="venue-section" data-header-theme="light" data-nav="venue">
          <div className="section-kicker" data-reveal><span>§ 06</span><span>{c.venueKicker}</span></div>
          <div className="venue-title" data-reveal><h2>{c.venueTitle}</h2><div><p>{c.venueNote}</p><span>{c.venueEditorial}</span></div></div>
          <div className="venue-gallery" data-reveal-group>
            {venueImages.map((imageName, index) => (
              <figure key={imageName} className={`venue-shot venue-shot-${index + 1}`}>
                <img src={publicAsset(`/media/${imageName}`)} alt={c.venueLabels[index]} loading="lazy" />
                <figcaption><span>0{index + 1}</span>{c.venueLabels[index]}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="instagram-section" data-header-theme="light" data-nav="venue">
          <div className="section-kicker" data-reveal><span>§ 07</span><span>{c.instagramKicker}</span></div>
          <div className="section-heading instagram-heading" data-reveal>
            <h2>{c.instagramTitleA} <em>{c.instagramTitleB}</em></h2>
            <p>{c.instagramNote}</p>
          </div>
          <div ref={instagramTrackRef} className="instagram-track" data-reveal-group data-lenis-prevent onPointerDown={onDragStart} onPointerMove={onDragMove} onPointerUp={onDragEnd} onPointerCancel={onDragEnd}>
            {galleryPosts.map((post, index) => (
              <a key={`${post.url}-${post.handle}`} href={post.url} target="_blank" rel="noreferrer" draggable={false} onClick={(event) => { if (dragRef.current.moved) event.preventDefault(); }}>
                <div className="instagram-media"><img src={post.image} alt={`${post.handle} · ${c.instagramKicker} ${index + 1}`} loading="lazy" draggable={false} /><span className="instagram-number">{String(index + 1).padStart(2, "0")}</span><span className="play-button"><Play aria-hidden="true" /></span></div>
                <strong>{post.handle}</strong><span>{c.instagramWatch}</span>
              </a>
            ))}
          </div>
          <a className="instagram-follow" href={instagramUrl} target="_blank" rel="noreferrer">{c.instagramFollow} <ArrowUpRight aria-hidden="true" /></a>
        </section>

        <section className="reviews-section" data-header-theme="dark" data-nav="contact">
          <div className="section-kicker light" data-reveal><span>§ 08</span><span>{c.reviewsKicker}</span></div>
          <div className="rating-block" data-reveal><div><strong>4.8</strong><span>★★★★★</span></div><p>{c.ratingText}</p></div>
          <div className="reviews-track" data-reveal-group>
            {c.reviews.map((quote, index) => <blockquote key={quote}><span>0{index + 1}</span><p>“{quote}”</p><footer>{c.guest}</footer></blockquote>)}
          </div>
        </section>

        <section id="contact" className="contact-section" data-header-theme="light" data-nav="contact">
          <div className="section-kicker" data-reveal><span>§ 09</span><span>{c.contactKicker}</span></div>
          <div className="contact-heading" data-reveal><h2>{c.contactTitle}</h2><p>{c.contactNote}</p></div>
          <div className="contact-grid" data-reveal-group>
            <div className="map-shell" aria-label="Pizza La Fin" data-lenis-prevent>
              <MapCn className="contact-map" styles={{ light: mapStyle, dark: mapStyle }} center={[29.02958, 40.99371]} zoom={15.9} pitch={0} bearing={0} theme="light" minZoom={12} maxZoom={19}>
                <MapMarker longitude={29.02958} latitude={40.99371}>
                  <MarkerContent>
                    <div className="map-info-card" aria-label="Pizza La Fin">
                      <strong>Pizza La Fin</strong>
                      <span>{c.mapCity}</span>
                      <em>{c.openDaily}</em>
                    </div>
                  </MarkerContent>
                </MapMarker>
                <MapControls position="bottom-right" showZoom />
              </MapCn>
              <a className="map-link" href={mapUrl} target="_blank" rel="noreferrer">{c.mapsOpen} <ArrowUpRight aria-hidden="true" /></a>
            </div>
            <div className="contact-details">
              <div className="contact-detail"><MapPin aria-hidden="true" /><div><span>{c.address}</span><p>Yeldeğirmeni, Kadıköy, İstanbul</p></div></div>
              <div className="contact-detail"><Clock3 aria-hidden="true" /><div><span>{c.hours}</span><p>{c.openDaily}</p></div></div>
              <a className="contact-detail contact-link" href="mailto:pmrt276@gmail.com"><Mail aria-hidden="true" /><div><span>{c.email}</span><p>pmrt276@gmail.com</p></div><ArrowUpRight className="contact-external" aria-hidden="true" /></a>
              <a className="contact-detail contact-link" href={phoneUrl}><Phone aria-hidden="true" /><div><span>{c.phone}</span><p>+90 537 218 06 13</p></div><ArrowUpRight className="contact-external" aria-hidden="true" /></a>
              <a className="contact-detail contact-link" href={whatsappUrl} target="_blank" rel="noreferrer"><WhatsAppIcon /><div><span>{c.whatsapp}</span><p>+90 537 218 06 13</p></div><ArrowUpRight className="contact-external" aria-hidden="true" /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" data-header-theme="dark">
        <div className="footer-inner">
          <div className="footer-directory" data-reveal-group>
            <section className="footer-column">
              <h2>{c.footerSite}</h2>
              <nav aria-label={c.footerSite}>
                {navItems.map((item) => <a key={item.key} href={item.href}>{item.label}</a>)}
              </nav>
            </section>
            <section className="footer-column">
              <h2>{c.footerSocial}</h2>
              <div>
                <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram <span aria-hidden="true">↗</span></a>
                <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp <span aria-hidden="true">↗</span></a>
                <a href={mapUrl} target="_blank" rel="noreferrer">Google Maps <span aria-hidden="true">↗</span></a>
                <p>pmrt276@gmail.com</p>
              </div>
            </section>
            <section className="footer-column">
              <h2>{c.footerContact}</h2>
              <div>
                <a href="mailto:pmrt276@gmail.com">pmrt276@gmail.com <span aria-hidden="true">↗</span></a>
                <p>Yeldeğirmeni<br />Kadıköy, İstanbul</p>
                <p>{c.openDaily}</p>
              </div>
            </section>
          </div>
          <div className="footer-legal">
            <span>© 2026 Pizza La Fin</span>
            <span>{c.openDaily}</span>
            <button type="button" onClick={scrollToTop}>{c.backTop} <ArrowUp aria-hidden="true" /></button>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">Pizza La Fin<span>.</span></div>
      </footer>

      {activeItem !== null && (() => {
        const item = allMenuItems[activeItem];
        return (
          <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${item.name} — ${c.details}`} data-lenis-prevent>
            <button className="lightbox-close" type="button" onClick={() => setActiveItem(null)} aria-label={c.close}><span className="minimal-close" aria-hidden="true" /></button>
            <button className="lightbox-nav prev" type="button" onClick={() => moveLightbox(-1)} aria-label={c.previous}><span className="minimal-arrow left" aria-hidden="true" /></button>
            <div className="lightbox-image" onPointerDown={onLightboxSwipeStart} onPointerUp={onLightboxSwipeEnd}><img src={item.image} alt={item.name} /><span>{String(activeItem + 1).padStart(2, "0")} / {String(allMenuItems.length).padStart(2, "0")}</span></div>
            <div className="lightbox-details">
              <span className="lightbox-kicker">{activeItem < pizzas.length ? c.pizzasKicker : activeItem < pizzas.length + desserts.length ? c.dessertsKicker : c.drinksKicker}</span>
              <h2>{item.name}</h2><p className="lightbox-description">{item.description[locale]}</p>
              <dl><div><dt>{c.ingredientsLabel}</dt><dd>{item.ingredients[locale]}</dd></div><div><dt>{c.allergensLabel}</dt><dd>{item.allergens[locale]}</dd></div><div><dt>Enerji</dt><dd>{item.calories}</dd></div></dl>
              <strong className="lightbox-price">{item.price}</strong>
            </div>
            <button className="lightbox-nav next" type="button" onClick={() => moveLightbox(1)} aria-label={c.next}><span className="minimal-arrow right" aria-hidden="true" /></button>
          </div>
        );
      })()}
    </>
  );
}

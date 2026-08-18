"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";

const faqContent: Record<Locale, {
  label: string;
  title: string;
  lead: string;
  items: Array<{ question: string; answer: string }>;
}> = {
  tr: {
    label: "S.S.S.",
    title: "Sıkça sorulan sorular.",
    lead: "Aradığınız yanıt burada yoksa bizimle doğrudan iletişime geçebilirsiniz.",
    items: [
      { question: "Pizza La Fin hamuru neden uzun süre fermente ediliyor?", answer: "Uzun fermantasyon; hamurun aromasını, esnek dokusunu ve hafifliğini birlikte geliştirir. Süreyi sabit bir saate değil, hamurun sıcaklık ve neme verdiği tepkiye göre yönetiriz." },
      { question: "Napoli pizzasını farklı yapan nedir?", answer: "İnce ve esnek merkez, havadar cornicione, ölçülü malzeme ve yüksek ısıda kısa pişirme Napoli pizzasının temel dengesini kurar." },
      { question: "Menüde vejetaryen seçenekler bulunuyor mu?", answer: "Evet. Domates, peynir, mantar ve mevsim ürünleri etrafında hazırlanan farklı vejetaryen seçenekler menümüzde yer alır." },
      { question: "Blog yazılarındaki bilgiler mutfağınızın gerçek pratiğine mi dayanıyor?", answer: "Evet. Yazılarımız günlük üretim kayıtları, malzeme seçimleri, pişirme gözlemleri ve servis deneyimimizden beslenir." },
      { question: "Pizza La Fin’e nasıl ulaşabilirim?", answer: "İletişim bölümündeki telefon, e-posta ve WhatsApp bağlantılarından bize doğrudan ulaşabilirsiniz." },
    ],
  },
  en: {
    label: "F.A.Q.", title: "Frequently asked questions.", lead: "If your answer is not here, you can contact us directly.",
    items: [
      { question: "Why is Pizza La Fin dough fermented for so long?", answer: "Long fermentation develops aroma, supple texture and lightness together. We follow the dough’s response to temperature and humidity rather than forcing it into a fixed schedule." },
      { question: "What makes Neapolitan pizza different?", answer: "A thin supple centre, airy cornicione, restrained toppings and a short bake at high heat create its essential balance." },
      { question: "Are vegetarian choices available?", answer: "Yes. Our menu includes vegetarian recipes built around tomato, cheese, mushrooms and seasonal produce." },
      { question: "Do the journal articles reflect your real kitchen practice?", answer: "Yes. Every article draws on production notes, ingredient decisions, baking observations and service experience." },
      { question: "How can I contact Pizza La Fin?", answer: "Use the phone, email or WhatsApp links in the contact section to reach us directly." },
    ],
  },
  de: {
    label: "FAQ", title: "Häufig gestellte Fragen.", lead: "Falls Ihre Antwort hier nicht steht, können Sie uns direkt kontaktieren.",
    items: [
      { question: "Warum wird der Teig von Pizza La Fin so lange fermentiert?", answer: "Lange Fermentation entwickelt Aroma, elastische Textur und Leichtigkeit zugleich. Maßgeblich ist die Reaktion des Teigs auf Temperatur und Feuchtigkeit." },
      { question: "Was macht neapolitanische Pizza besonders?", answer: "Eine dünne, geschmeidige Mitte, ein luftiger Rand, maßvolle Zutaten und kurze Backzeit bei hoher Hitze bilden ihre Balance." },
      { question: "Gibt es vegetarische Optionen?", answer: "Ja. Unsere Karte enthält vegetarische Rezepte mit Tomate, Käse, Pilzen und saisonalen Produkten." },
      { question: "Beruhen die Artikel auf echter Küchenpraxis?", answer: "Ja. Die Texte entstehen aus Produktionsnotizen, Zutatenentscheidungen, Backbeobachtungen und Serviceerfahrung." },
      { question: "Wie erreiche ich Pizza La Fin?", answer: "Über Telefon, E-Mail oder WhatsApp im Kontaktbereich erreichen Sie uns direkt." },
    ],
  },
  fr: {
    label: "F.A.Q.", title: "Questions fréquentes.", lead: "Si votre réponse ne se trouve pas ici, contactez-nous directement.",
    items: [
      { question: "Pourquoi la pâte Pizza La Fin fermente-t-elle si longtemps ?", answer: "La fermentation longue développe à la fois le parfum, la souplesse et la légèreté. Nous suivons la réaction de la pâte à la température et à l’humidité." },
      { question: "Qu’est-ce qui distingue la pizza napolitaine ?", answer: "Un centre fin et souple, une corniche aérienne, des garnitures mesurées et une cuisson brève à haute température composent son équilibre." },
      { question: "Proposez-vous des choix végétariens ?", answer: "Oui. Notre carte comprend des recettes végétariennes autour de la tomate, du fromage, des champignons et des produits de saison." },
      { question: "Les articles reflètent-ils votre vraie pratique en cuisine ?", answer: "Oui. Ils s’appuient sur nos notes de production, nos choix d’ingrédients, nos observations de cuisson et le service." },
      { question: "Comment contacter Pizza La Fin ?", answer: "Les liens téléphone, e-mail et WhatsApp de la rubrique contact permettent de nous joindre directement." },
    ],
  },
  ar: {
    label: "الأسئلة الشائعة", title: "أسئلة تتكرر كثيراً.", lead: "إن لم تجد إجابتك هنا يمكنك التواصل معنا مباشرة.",
    items: [
      { question: "لماذا تُخمّر عجينة Pizza La Fin وقتاً طويلاً؟", answer: "يطوّر التخمير الطويل العطر والمرونة والخفة معاً، ونراقب استجابة العجين للحرارة والرطوبة بدلاً من فرض وقت ثابت." },
      { question: "ما الذي يميز البيتزا النابولية؟", answer: "مركز رقيق ومرن وحافة هوائية ومكونات محسوبة وخَبز قصير بحرارة عالية تصنع توازنها الأساسي." },
      { question: "هل تتوفر خيارات نباتية؟", answer: "نعم، تتضمن قائمتنا وصفات نباتية تعتمد على الطماطم والجبن والفطر والمنتجات الموسمية." },
      { question: "هل تعكس المقالات ممارسة المطبخ الفعلية؟", answer: "نعم، تستند المقالات إلى سجلات الإنتاج واختيارات المكونات وملاحظات الخَبز وخبرة الخدمة." },
      { question: "كيف أتواصل مع Pizza La Fin؟", answer: "يمكنك استخدام روابط الهاتف أو البريد الإلكتروني أو واتساب في قسم التواصل." },
    ],
  },
  ru: {
    label: "Вопросы", title: "Часто задаваемые вопросы.", lead: "Если ответа здесь нет, свяжитесь с нами напрямую.",
    items: [
      { question: "Почему тесто Pizza La Fin ферментируется так долго?", answer: "Долгая ферментация одновременно развивает аромат, эластичность и лёгкость. Мы ориентируемся на реакцию теста на температуру и влажность." },
      { question: "Чем отличается неаполитанская пицца?", answer: "Тонкий гибкий центр, воздушный бортик, сдержанная начинка и короткая выпечка при высокой температуре создают её баланс." },
      { question: "Есть ли в меню вегетарианские позиции?", answer: "Да. В меню есть рецепты с томатами, сыром, грибами и сезонными продуктами." },
      { question: "Основаны ли статьи на реальной практике кухни?", answer: "Да. Материалы опираются на производственные записи, выбор ингредиентов, наблюдения за выпечкой и опыт сервиса." },
      { question: "Как связаться с Pizza La Fin?", answer: "Используйте телефон, электронную почту или WhatsApp в разделе контактов." },
    ],
  },
};

export function BlogFaq({ locale }: { locale: Locale }) {
  const content = faqContent[locale];
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="blog-faq" aria-labelledby="blog-faq-title" data-header-theme="light">
      <div className="blog-faq-intro" data-reveal>
        <p>{content.label}</p>
        <h2 id="blog-faq-title">{content.title}</h2>
        <span>{content.lead}</span>
      </div>
      <div className="blog-faq-list" data-reveal-group>
        {content.items.map((item, index) => (
          <div className={`blog-faq-item ${openIndex === index ? "is-open" : ""}`} key={item.question}>
            <button
              type="button"
              aria-expanded={openIndex === index}
              aria-controls={`blog-faq-panel-${index}`}
              onClick={() => setOpenIndex((current) => current === index ? -1 : index)}
            >
              <span>{item.question}</span><i aria-hidden="true">+</i>
            </button>
            <div className="blog-faq-panel" id={`blog-faq-panel-${index}`} aria-hidden={openIndex !== index}>
              <div><p>{item.answer}</p></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import type { LocalizedText } from "./i18n";

export type BlogSection = {
  heading: LocalizedText;
  body: LocalizedText;
};

export type BlogPost = {
  slug: string;
  image: string;
  detailImage: string;
  date: string;
  readingMinutes: number;
  title: LocalizedText;
  excerpt: LocalizedText;
  sections: BlogSection[];
  keywords: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "the-art-of-long-fermentation",
    image: "/media/blog/the-art-of-long-fermentation.webp",
    detailImage: "/media/blog/the-art-of-long-fermentation-detail.webp",
    date: "2026-08-01",
    readingMinutes: 8,
    title: {
      tr: "Uzun Fermantasyon",
      en: "Long Fermentation",
      de: "Lange Fermentation",
      fr: "Fermentation longue",
      ar: "التخمير الطويل",
      ru: "Долгая ферментация",
    },
    excerpt: {
      tr: "Uzun fermantasyon yalnızca kabarık bir kenar yaratmaz; aroma, doku ve sindirilebilirlik arasında kurulan hassas dengenin temelidir.",
      en: "Long fermentation does more than create an airy rim; it builds the delicate balance between aroma, texture and digestibility.",
      de: "Lange Fermentation schafft mehr als einen luftigen Rand: Sie bildet das feine Gleichgewicht aus Aroma, Textur und Bekömmlichkeit.",
      fr: "La fermentation longue ne crée pas seulement une corniche aérienne ; elle construit l’équilibre entre arôme, texture et digestibilité.",
      ar: "لا يصنع التخمير الطويل حافة هوائية فحسب، بل يؤسس توازناً دقيقاً بين العطر والقوام وسهولة الهضم.",
      ru: "Долгая ферментация создаёт не только воздушный бортик, но и тонкий баланс аромата, текстуры и лёгкости.",
    },
    sections: [
      {
        heading: { tr: "Zaman bir malzemedir", en: "Time is an ingredient", de: "Zeit ist eine Zutat", fr: "Le temps est un ingrédient", ar: "الوقت مكوّن", ru: "Время — это ингредиент" },
        body: {
          tr: "Un, su, tuz ve maya görünür malzemelerdir; zaman ise reçetenin sessiz bileşenidir. Hamur dinlendikçe enzimler nişastayı daha küçük şekerlere dönüştürür, maya kontrollü biçimde çalışır ve karmaşık aromalar oluşur. Süreci hızlandırmak mümkün görünse de aynı derinliği yalnızca daha fazla maya kullanarak elde edemezsiniz.",
          en: "Flour, water, salt and yeast are visible ingredients; time is the quiet one. As dough rests, enzymes turn starch into simpler sugars, yeast works steadily and complex aromas develop. The process can appear easy to accelerate, yet adding more yeast never produces the same depth.",
          de: "Mehl, Wasser, Salz und Hefe sind sichtbare Zutaten; Zeit ist die stille. Während der Ruhe wandeln Enzyme Stärke in einfachere Zucker um, die Hefe arbeitet kontrolliert und komplexe Aromen entstehen. Mehr Hefe beschleunigt den Prozess, ersetzt aber niemals seine Tiefe.",
          fr: "La farine, l’eau, le sel et la levure sont visibles ; le temps est l’ingrédient silencieux. Au repos, les enzymes transforment l’amidon, la levure travaille avec mesure et les arômes se complexifient. Ajouter davantage de levure accélère le processus sans jamais produire la même profondeur.",
          ar: "الدقيق والماء والملح والخميرة مكونات ظاهرة، أما الوقت فهو المكوّن الصامت. أثناء الراحة تحوّل الإنزيمات النشا إلى سكريات أبسط، وتعمل الخميرة بهدوء وتتكوّن روائح معقدة. زيادة الخميرة قد تسرّع العملية لكنها لا تمنح العمق نفسه.",
          ru: "Мука, вода, соль и дрожжи заметны, а время остаётся тихим ингредиентом. Во время отдыха ферменты расщепляют крахмал, дрожжи работают размеренно, формируя сложный аромат. Ускорить процесс дополнительными дрожжами можно, но такой же глубины не получится.",
        },
      },
      {
        heading: { tr: "Takvim değil, hamur karar verir", en: "The dough, not the clock, decides", de: "Der Teig entscheidet, nicht die Uhr", fr: "La pâte décide, pas l’horloge", ar: "العجين يقرر لا الساعة", ru: "Решает тесто, а не часы" },
        body: {
          tr: "Fermantasyon sabit bir saate indirgenemez. Unun gücü, suyun sıcaklığı, mutfağın nemi ve gün içindeki ısı değişimi aynı reçeteyi farklı davranmaya zorlar. Bu yüzden hamuru yalnızca kronometreyle değil; yüzeyindeki gerilim, hacim artışı, koku ve dokunulduğunda verdiği tepkiyle okuruz.",
          en: "Fermentation cannot be reduced to a fixed number of hours. Flour strength, water temperature, humidity and the day’s changing warmth make the same formula behave differently. We therefore read surface tension, volume, aroma and the dough’s response to touch—not the stopwatch alone.",
          de: "Fermentation lässt sich nicht auf eine feste Stundenzahl reduzieren. Mehlstärke, Wassertemperatur, Luftfeuchte und wechselnde Raumwärme verändern dieselbe Rezeptur. Deshalb lesen wir Spannung, Volumen, Duft und Reaktion auf Berührung – nicht nur die Uhr.",
          fr: "La fermentation ne se résume pas à un nombre d’heures. La force de la farine, la température de l’eau, l’humidité et la chaleur ambiante font varier une même formule. Nous lisons donc la tension, le volume, le parfum et la réponse au toucher, pas seulement le chronomètre.",
          ar: "لا يمكن اختزال التخمير في عدد ثابت من الساعات. قوة الدقيق وحرارة الماء والرطوبة وتبدل حرارة المطبخ تجعل الوصفة نفسها تتصرف بشكل مختلف. لذلك نقرأ شد السطح والحجم والرائحة واستجابة العجين للمس، لا الساعة وحدها.",
          ru: "Ферментацию нельзя свести к фиксированному числу часов. Сила муки, температура воды, влажность и тепло кухни меняют поведение одной и той же формулы. Поэтому мы оцениваем натяжение поверхности, объём, аромат и отклик на прикосновение, а не только время.",
        },
      },
      {
        heading: { tr: "Doku fırında görünür", en: "Texture reveals itself in the oven", de: "Die Textur zeigt sich im Ofen", fr: "La texture se révèle au four", ar: "القوام يظهر في الفرن", ru: "Текстура раскрывается в печи" },
        body: {
          tr: "Doğru olgunlaşmış hamur yüksek ısıyla buluştuğunda kenar hızlıca yükselir, içerideki gaz hücreleri genişler ve dış yüzey ince bir kabuk oluşturur. Amaç kuru ve gevrek bir ekmek değil; ince merkezli, esnek, nemini koruyan ve hafif is lekeleri taşıyan canlı bir pizzadır.",
          en: "When mature dough meets high heat, the rim rises quickly, internal gas cells expand and a delicate outer skin forms. The goal is not dry, brittle bread but a lively pizza with a thin centre, supple bite, retained moisture and gentle char.",
          de: "Trifft reifer Teig auf hohe Hitze, hebt sich der Rand schnell, Gaszellen dehnen sich und eine feine Außenhaut entsteht. Das Ziel ist kein trockenes Brot, sondern eine lebendige Pizza mit dünner Mitte, elastischem Biss, Feuchtigkeit und sanfter Röstung.",
          fr: "Quand une pâte mûre rencontre la haute température, la corniche monte vite, les alvéoles s’ouvrent et une fine peau se forme. Le but n’est pas un pain sec, mais une pizza vivante, au centre fin, souple, encore humide et délicatement marqué par le feu.",
          ar: "حين يلتقي العجين الناضج بالحرارة العالية ترتفع الحافة سريعاً وتتوسع فقاعات الغاز وتتكوّن قشرة رقيقة. الهدف ليس خبزاً جافاً وهشاً، بل بيتزا حية ذات مركز رقيق وقوام مرن ورطوبة محفوظة وآثار تحمير لطيفة.",
          ru: "Когда зрелое тесто встречается с высокой температурой, бортик быстро поднимается, газовые ячейки расширяются, а снаружи появляется тонкая оболочка. Нужен не сухой хлеб, а живая пицца с тонким центром, упругой текстурой, влагой и мягкими подпалинами.",
        },
      },
      {
        heading: { tr: "Sabır lezzete dönüşür", en: "Patience becomes flavour", de: "Geduld wird zu Geschmack", fr: "La patience devient saveur", ar: "الصبر يتحول إلى نكهة", ru: "Терпение становится вкусом" },
        body: {
          tr: "Pizza La Fin’de uzun fermantasyon bir pazarlama ifadesi değil, günlük üretim disiplinidir. Her parti kayıt altına alınır, sıcaklığa göre yeniden planlanır ve servis saatine zorla uydurulmaz. Sonuç daha belirgin buğday aroması, dengeli bir ısırık ve masada ağırlık bırakmayan bir pizzadır.",
          en: "At Pizza La Fin, long fermentation is not a marketing phrase but a daily production discipline. Every batch is recorded, adjusted to temperature and never forced to fit service. The result is clearer wheat aroma, a balanced bite and a pizza that leaves the table feeling light.",
          de: "Bei Pizza La Fin ist lange Fermentation kein Werbesatz, sondern tägliche Disziplin. Jede Charge wird dokumentiert, an die Temperatur angepasst und nie gewaltsam in den Serviceplan gedrückt. Das Ergebnis: klares Weizenaroma, ausgewogener Biss und angenehme Leichtigkeit.",
          fr: "Chez Pizza La Fin, la fermentation longue n’est pas un argument marketing mais une discipline quotidienne. Chaque lot est suivi, ajusté à la température et jamais forcé pour le service. Le résultat offre un goût de blé plus net, une bouchée équilibrée et une pizza qui reste légère.",
          ar: "في Pizza La Fin ليس التخمير الطويل عبارة تسويقية، بل انضباط يومي في الإنتاج. نتابع كل دفعة ونعدّلها وفق الحرارة ولا نجبرها على موعد الخدمة. والنتيجة عطر قمح أوضح ولقمة متوازنة وبيتزا خفيفة على المائدة.",
          ru: "В Pizza La Fin долгая ферментация — не рекламная формула, а ежедневная дисциплина. Каждую партию фиксируют, корректируют по температуре и не подгоняют силой к сервису. Результат — ясный аромат пшеницы, сбалансированный вкус и приятная лёгкость.",
        },
      },
    ],
    keywords: ["long fermentation pizza", "pizza dough", "Neapolitan pizza", "pizza fermentation"],
  },
  {
    slug: "from-flour-to-fire",
    image: "/media/blog/from-flour-to-fire.webp",
    detailImage: "/media/blog/from-flour-to-fire-detail.webp",
    date: "2026-07-24",
    readingMinutes: 8,
    title: {
      tr: "Undan Ateşe",
      en: "From Flour to Fire",
      de: "Vom Mehl zum Feuer",
      fr: "De la farine au feu",
      ar: "من الدقيق إلى النار",
      ru: "От муки до огня",
    },
    excerpt: {
      tr: "İyi pizza tek bir sırrın değil; un seçiminden fırındaki son saniyeye kadar birbirini tamamlayan küçük, doğru kararların sonucudur.",
      en: "Great pizza has no single secret; it is the result of small, precise decisions that support one another from flour selection to the final second in the oven.",
      de: "Große Pizza hat kein einzelnes Geheimnis. Sie entsteht aus kleinen, präzisen Entscheidungen vom Mehl bis zur letzten Sekunde im Ofen.",
      fr: "Une grande pizza n’a pas un secret unique : elle naît de décisions précises, de la farine à la dernière seconde au four.",
      ar: "لا تملك البيتزا الرائعة سراً واحداً، بل هي نتيجة قرارات صغيرة ودقيقة من اختيار الدقيق حتى آخر ثانية في الفرن.",
      ru: "У отличной пиццы нет одного секрета: она рождается из точных решений от выбора муки до последней секунды в печи.",
    },
    sections: [
      {
        heading: { tr: "Un yapıyı kurar", en: "Flour builds the structure", de: "Mehl baut die Struktur", fr: "La farine construit la structure", ar: "الدقيق يبني الهيكل", ru: "Мука создаёт структуру" },
        body: {
          tr: "Uzun fermantasyona dayanacak un güçlü olmalı, fakat hamuru sertleştirmemelidir. Protein yapısı suyu taşımalı; öğütme inceliği esnekliği ve ağız hissini desteklemelidir. Doğru un, şekillendirirken yırtılmayan ama fırında özgürce genişleyen bir hamurun temelini oluşturur.",
          en: "Flour for long fermentation needs strength without making dough tough. Its protein must carry water while the milling supports elasticity and a delicate mouthfeel. The right flour produces dough that resists tearing during shaping yet expands freely in the oven.",
          de: "Mehl für lange Fermentation braucht Kraft, ohne den Teig zäh zu machen. Das Protein muss Wasser tragen, die Mahlung Elastizität und Mundgefühl fördern. Gutes Mehl ergibt einen Teig, der beim Formen nicht reißt und sich im Ofen frei entfaltet.",
          fr: "Une farine destinée à une fermentation longue doit être forte sans durcir la pâte. Ses protéines portent l’eau tandis que la mouture soutient l’élasticité. La bonne farine donne une pâte qui ne se déchire pas au façonnage et s’ouvre librement au four.",
          ar: "يجب أن يكون دقيق التخمير الطويل قوياً من دون أن يجعل العجين قاسياً. تحمل بروتيناته الماء وتدعم نعومة الطحن المرونة. الدقيق الصحيح يعطي عجيناً لا يتمزق أثناء التشكيل ويتمدد بحرية في الفرن.",
          ru: "Мука для долгой ферментации должна быть сильной, но не делать тесто жёстким. Белок удерживает воду, а тонкость помола поддерживает эластичность. Правильное тесто не рвётся при формовке и свободно раскрывается в печи.",
        },
      },
      {
        heading: { tr: "El, hamurun havasını korur", en: "Hands protect the dough’s air", de: "Hände bewahren die Luft im Teig", fr: "La main préserve l’air de la pâte", ar: "اليد تحفظ هواء العجين", ru: "Руки сохраняют воздух в тесте" },
        body: {
          tr: "Napoli usulü açmada amaç hamuru düzleştirmek değil, içeride biriken havayı kenara yönlendirmektir. Merkez parmak uçlarıyla inceltilir; cornicione bastırılmaz. Oklava kullanmamak romantik bir kural değil, fermantasyon boyunca oluşan gaz yapısını koruyan teknik bir tercihtir.",
          en: "Neapolitan shaping is not about flattening dough; it moves accumulated air toward the rim. Fingertips thin the centre while the cornicione remains untouched. Avoiding a rolling pin is not romantic tradition but a technical choice that protects the gas structure built during fermentation.",
          de: "Beim neapolitanischen Formen wird der Teig nicht plattgedrückt; die Luft wandert zum Rand. Fingerspitzen dünnen die Mitte aus, die Cornicione bleibt unberührt. Der Verzicht aufs Nudelholz schützt technisch die während der Fermentation entstandene Gasstruktur.",
          fr: "Le façonnage napolitain ne cherche pas à aplatir la pâte, mais à pousser l’air vers la corniche. Le centre s’affine du bout des doigts sans écraser le bord. L’absence de rouleau protège simplement la structure gazeuse créée pendant la fermentation.",
          ar: "لا يهدف التشكيل النابولي إلى تسطيح العجين، بل إلى دفع الهواء المتراكم نحو الحافة. تُرقق الأطراف المركز وتبقى الحافة من دون ضغط. عدم استخدام الشوبك قرار تقني يحمي بنية الغاز المتكوّنة أثناء التخمير.",
          ru: "Неаполитанская формовка не расплющивает тесто, а направляет воздух к бортику. Центр истончают пальцами, не давя на корничоне. Отказ от скалки — технический выбор, сохраняющий газовую структуру ферментации.",
        },
      },
      {
        heading: { tr: "Malzeme dengeyi izler", en: "Ingredients follow balance", de: "Zutaten folgen der Balance", fr: "Les ingrédients suivent l’équilibre", ar: "المكونات تتبع التوازن", ru: "Ингредиенты следуют балансу" },
        body: {
          tr: "İyi bir taban, ağır bir malzeme yığını taşımak zorunda değildir. Domatesin asiditesi, peynirin nemi, yağın meyvemsiliği ve otların tazeliği aynı anda düşünülür. Her ürün, diğerinin sesini bastırmadan bütüne katkı verir; sadelik ancak ölçü doğru olduğunda karaktere dönüşür.",
          en: "A good base should not carry a heavy pile of toppings. Tomato acidity, cheese moisture, fruity oil and fresh herbs are considered together. Each ingredient contributes without silencing another; simplicity becomes character only when the measure is right.",
          de: "Ein guter Boden muss keinen schweren Belag tragen. Säure der Tomate, Feuchtigkeit des Käses, Fruchtigkeit des Öls und frische Kräuter werden gemeinsam gedacht. Jede Zutat trägt bei, ohne eine andere zu übertönen; Einfachheit wird durch das richtige Maß zu Charakter.",
          fr: "Une bonne base n’a pas à porter une montagne de garniture. L’acidité de la tomate, l’humidité du fromage, le fruité de l’huile et la fraîcheur des herbes se pensent ensemble. Chaque ingrédient participe sans couvrir l’autre ; la simplicité devient caractère lorsque la mesure est juste.",
          ar: "لا تحتاج القاعدة الجيدة إلى حمل كومة ثقيلة من الإضافات. تُدرس حموضة الطماطم ورطوبة الجبن وفاكهية الزيت ونضارة الأعشاب معاً. يساهم كل مكوّن من دون إسكات الآخر، وتصبح البساطة شخصية حين يكون المقدار صحيحاً.",
          ru: "Хорошая основа не должна нести гору начинки. Кислотность томата, влажность сыра, фруктовость масла и свежесть трав рассматриваются вместе. Каждый продукт дополняет целое, не заглушая другой; простота становится характером при точной мере.",
        },
      },
      {
        heading: { tr: "Ateş son kararı verir", en: "Fire makes the final decision", de: "Das Feuer trifft die letzte Entscheidung", fr: "Le feu prend la décision finale", ar: "النار تتخذ القرار الأخير", ru: "Огонь принимает последнее решение" },
        body: {
          tr: "Yüksek ısıda pişirme çok kısa sürer ve bu nedenle hata payı küçüktür. Pizza sürekli çevrilir; tabanın rengi, kenarın yükselişi ve peynirin davranışı birlikte izlenir. Fırından doğru anda çıkan pizza, malzemeleri kurutmadan hamuru pişirir ve ateşin izini zarifçe taşır.",
          en: "High-heat baking is brief, leaving little room for error. The pizza is turned while the base colour, rising rim and cheese are read together. At the right moment, the oven cooks the dough without drying its toppings and leaves only an elegant trace of fire.",
          de: "Backen bei hoher Hitze ist kurz und verzeiht wenig. Die Pizza wird gedreht, während Bodenfarbe, steigender Rand und Käse gemeinsam gelesen werden. Im richtigen Moment gart der Ofen den Teig, ohne den Belag auszutrocknen, und hinterlässt eine elegante Spur des Feuers.",
          fr: "La cuisson à haute température est brève et laisse peu de place à l’erreur. On tourne la pizza en observant la couleur du dessous, la montée de la corniche et le fromage. Sortie au bon instant, elle est cuite sans être desséchée et porte une trace élégante du feu.",
          ar: "الخبز بحرارة عالية قصير ولا يترك مجالاً كبيراً للخطأ. تُدار البيتزا مع مراقبة لون القاعدة وارتفاع الحافة وسلوك الجبن معاً. في اللحظة الصحيحة يطهو الفرن العجين من دون تجفيف الإضافات ويترك أثراً أنيقاً للنار.",
          ru: "Выпечка при высокой температуре коротка и почти не прощает ошибок. Пиццу поворачивают, одновременно наблюдая за цветом дна, подъёмом бортика и сыром. В правильный момент тесто готово, начинка не пересушена, а огонь оставляет лишь изящный след.",
        },
      },
    ],
    keywords: ["Neapolitan pizza craft", "pizza making", "wood fired pizza", "pizza dough shaping"],
  },
  {
    slug: "what-to-drink-with-neapolitan-pizza",
    image: "/media/blog/what-to-drink-with-neapolitan-pizza.webp",
    detailImage: "/media/blog/what-to-drink-with-neapolitan-pizza-detail.webp",
    date: "2026-07-16",
    readingMinutes: 7,
    title: {
      tr: "Pizza Eşleşmeleri",
      en: "Pizza Pairings",
      de: "Pizza-Begleitungen",
      fr: "Accords avec la pizza",
      ar: "توافقات البيتزا",
      ru: "Сочетания с пиццей",
    },
    excerpt: {
      tr: "İyi bir eşleşme pizzanın sesini yükseltmez; domatesin asiditesini, peynirin dokusunu ve ateşin izini daha net duyurur.",
      en: "A good pairing does not speak over the pizza; it makes the tomato’s acidity, the cheese’s texture and the trace of fire easier to hear.",
      de: "Eine gute Begleitung übertönt die Pizza nicht; sie macht Tomatensäure, Käsetextur und die Spur des Feuers klarer.",
      fr: "Un bon accord ne couvre pas la pizza ; il révèle mieux l’acidité de la tomate, la texture du fromage et la trace du feu.",
      ar: "لا يطغى التوافق الجيد على البيتزا، بل يوضح حموضة الطماطم وقوام الجبن وأثر النار.",
      ru: "Хорошее сочетание не перекрывает пиццу, а яснее раскрывает кислотность томата, текстуру сыра и след огня.",
    },
    sections: [
      {
        heading: { tr: "Önce pizzanın karakterini okuyun", en: "Begin with the pizza’s character", de: "Zuerst den Charakter der Pizza lesen", fr: "Commencer par le caractère de la pizza", ar: "ابدأ بشخصية البيتزا", ru: "Сначала прочтите характер пиццы" },
        body: {
          tr: "Marinara’nın domates ve sarımsak canlılığı, dört peynirli bir pizzanın yoğunluğundan farklı bir eşlik ister. Acı bal, mantar veya mortadella gibi belirgin tatlar da içeceğin yönünü değiştirir. Eşleşmeye isimlerden değil; asidite, yağlılık, tuzluluk, acılık ve aromatik yoğunluktan başlamak daha güvenilir bir yoldur.",
          en: "Marinara’s bright tomato and garlic need a different companion from the richness of four cheeses. Hot honey, mushrooms or mortadella also change the direction. Pairing works best when it begins not with labels but with acidity, fat, salt, heat and aromatic intensity.",
          de: "Die Frische von Tomate und Knoblauch einer Marinara verlangt etwas anderes als die Fülle von vier Käsesorten. Auch scharfer Honig, Pilze oder Mortadella ändern die Richtung. Gute Begleitung beginnt bei Säure, Fett, Salz, Schärfe und aromatischer Intensität.",
          fr: "La vivacité tomate-ail d’une marinara appelle autre chose que la richesse de quatre fromages. Le miel pimenté, les champignons ou la mortadelle changent aussi la direction. L’accord commence avec l’acidité, le gras, le sel, le piquant et l’intensité aromatique.",
          ar: "تحتاج حيوية الطماطم والثوم في المارينارا إلى رفيق مختلف عن غنى بيتزا الأجبان الأربعة. كما يغيّر العسل الحار والفطر والمورتاديلا الاتجاه. يبدأ التوافق الجيد من الحموضة والدسم والملوحة والحرارة والكثافة العطرية.",
          ru: "Яркие томат и чеснок в маринаре требуют иного сопровождения, чем насыщенность четырёх сыров. Острый мёд, грибы или мортаделла также меняют направление. Надёжнее начинать с кислотности, жирности, соли, остроты и силы аромата.",
        },
      },
      {
        heading: { tr: "Asidite sofrayı tazeler", en: "Acidity refreshes the table", de: "Säure erfrischt die Tafel", fr: "L’acidité rafraîchit la table", ar: "الحموضة تنعش المائدة", ru: "Кислотность освежает стол" },
        body: {
          tr: "Domatesli ve peynirli pizzalarda ferah asidite, her lokmadan sonra damağı temizler. Limon dokunuşlu maden suyu, kuru ve canlı bir beyaz şarap ya da ölçülü bir spritz bu görevi farklı biçimlerde üstlenebilir. İçeceğin çok tatlı olması sosun canlılığını örter; aşırı meşe veya sert tanen ise hamurun inceliğini bastırır.",
          en: "With tomato and cheese, bright acidity resets the palate after every bite. Mineral water with lemon, a dry vivid white wine or a restrained spritz can each do the job. Too much sweetness hides the sauce; heavy oak or hard tannin overwhelms the dough’s delicacy.",
          de: "Zu Tomate und Käse reinigt lebendige Säure den Gaumen nach jedem Bissen. Mineralwasser mit Zitrone, ein trockener frischer Weißwein oder ein zurückhaltender Spritz erfüllen diese Aufgabe. Zu viel Süße verdeckt die Sauce; starkes Holz oder harte Tannine überdecken den feinen Teig.",
          fr: "Avec la tomate et le fromage, une acidité vive nettoie le palais après chaque bouchée. Eau minérale citronnée, blanc sec et tendu ou spritz mesuré remplissent ce rôle. Trop de sucre masque la sauce ; le bois marqué et les tanins durs écrasent la finesse de la pâte.",
          ar: "مع الطماطم والجبن تعيد الحموضة المشرقة انتعاش الحنك بعد كل لقمة. يمكن للمياه المعدنية مع الليمون أو النبيذ الأبيض الجاف أو مشروب فوّار خفيف أداء الدور. تخفي الحلاوة الزائدة الصلصة بينما يطغى الطعم الخشبي أو العفص القاسي على رقة العجين.",
          ru: "С томатом и сыром живая кислотность освежает вкус после каждого кусочка. Минеральная вода с лимоном, сухое яркое белое вино или лёгкий спритц решают эту задачу по-разному. Излишняя сладость скрывает соус, а тяжёлый дуб и жёсткий танин подавляют деликатность теста.",
        },
      },
      {
        heading: { tr: "Baloncuk, ağırlık değil ritim verir", en: "Bubbles bring rhythm, not weight", de: "Perlen geben Rhythmus statt Schwere", fr: "Les bulles donnent du rythme, pas du poids", ar: "الفقاعات تمنح إيقاعاً لا ثقلاً", ru: "Пузырьки дают ритм, а не тяжесть" },
        body: {
          tr: "İnce ve kuru köpüklü içecekler, kızarmış kenar ile yağlı dokular arasında hareket yaratır. Burada amaç gösterişli bir şişe seçmek değil; küçük ve düzenli baloncuklar, temiz bitiş ve ölçülü aroma bulmaktır. Alkolsüz seçeneklerde de şekeri düşük kombucha veya sade soda benzer bir denge sağlayabilir.",
          en: "Fine, dry bubbles create movement between a toasted rim and richer textures. The goal is not a showy bottle but small persistent bubbles, a clean finish and measured aroma. Low-sugar kombucha or plain soda can build a similar balance without alcohol.",
          de: "Feine, trockene Perlen schaffen Bewegung zwischen geröstetem Rand und reicheren Texturen. Gesucht werden keine großen Etiketten, sondern kleine beständige Bläschen, ein klares Finish und zurückhaltendes Aroma. Zuckerarme Kombucha oder Soda können alkoholfrei ähnlich ausgleichen.",
          fr: "Des bulles fines et sèches créent du mouvement entre la corniche toastée et les textures riches. Il ne s’agit pas d’une bouteille spectaculaire, mais de bulles régulières, d’une finale nette et d’un arôme mesuré. Kombucha peu sucré ou eau gazeuse offrent un équilibre comparable sans alcool.",
          ar: "تصنع الفقاعات الدقيقة والجافة حركة بين الحافة المحمّصة والقوام الغني. الهدف ليس زجاجة استعراضية، بل فقاعات ثابتة ونهاية نظيفة وعطر محسوب. ويمكن للكومبوتشا قليلة السكر أو الصودا أن تحقق توازناً مشابهاً من دون كحول.",
          ru: "Мелкие сухие пузырьки создают движение между поджаренным бортиком и насыщенными текстурами. Важна не эффектная бутылка, а стойкие пузырьки, чистый финиш и умеренный аромат. Комбуча с низким сахаром или простая газированная вода дают похожий баланс без алкоголя.",
        },
      },
      {
        heading: { tr: "En iyi eşleşme masaya uyar", en: "The best pairing suits the table", de: "Die beste Begleitung passt zur Tafel", fr: "Le meilleur accord convient à la table", ar: "أفضل توافق يناسب المائدة", ru: "Лучшее сочетание подходит столу" },
        body: {
          tr: "Tek bir doğru içecek yoktur. Paylaşılan birkaç pizza varsa nötr ve ferah bir seçenek masadaki geçişleri kolaylaştırır; tek bir güçlü reçete seçildiğinde daha belirgin bir eşleşme kurulabilir. Pizza La Fin’de ölçümüz basit: içecek bir sonraki lokmayı istemeli, pizzanın önüne geçmemelidir.",
          en: "There is no single correct drink. When several pizzas are shared, a neutral refreshing choice makes transitions easier; one assertive recipe can invite a more focused pairing. Our measure at Pizza La Fin is simple: the drink should make you want the next bite, never step in front of it.",
          de: "Es gibt nicht das eine richtige Getränk. Bei mehreren geteilten Pizzen erleichtert eine neutrale frische Wahl die Übergänge; eine markante Rezeptur erlaubt eine gezieltere Begleitung. Unser Maß bei Pizza La Fin: Das Getränk soll Lust auf den nächsten Bissen machen, nicht davorstehen.",
          fr: "Il n’existe pas une seule boisson juste. Quand plusieurs pizzas se partagent, un choix neutre et frais facilite les passages ; une recette affirmée appelle un accord plus précis. Chez Pizza La Fin, la règle est simple : la boisson doit donner envie de la bouchée suivante, jamais prendre sa place.",
          ar: "لا يوجد مشروب واحد صحيح. عند مشاركة عدة أنواع من البيتزا يسهل الخيار المحايد والمنعش الانتقال بينها، بينما تسمح وصفة قوية بتوافق أكثر تركيزاً. مقياسنا بسيط: يجب أن يدعوك المشروب إلى اللقمة التالية لا أن يتقدم عليها.",
          ru: "Единственно правильного напитка нет. Если за столом делят несколько пицц, нейтральный освежающий выбор упрощает переходы; к одной выразительной рецептуре можно подобрать более точную пару. Наш критерий прост: напиток должен приглашать к следующему кусочку, а не выходить вперёд.",
        },
      },
    ],
    keywords: ["pizza pairings", "what to drink with pizza", "Neapolitan pizza drinks", "pizza and wine"],
  },
  {
    slug: "how-to-recognize-a-great-neapolitan-pizza",
    image: "/media/blog/how-to-recognize-a-great-neapolitan-pizza.webp",
    detailImage: "/media/blog/how-to-recognize-a-great-neapolitan-pizza-detail.webp",
    date: "2026-07-08",
    readingMinutes: 7,
    title: {
      tr: "İyi Napoli Pizzası",
      en: "Great Neapolitan Pizza",
      de: "Große neapolitanische Pizza",
      fr: "Une grande pizza napolitaine",
      ar: "بيتزا نابولية رائعة",
      ru: "Отличная неаполитанская пицца",
    },
    excerpt: {
      tr: "Kabarık kenar tek başına kalite işareti değildir. İyi Napoli pizzası görünüş, doku, aroma ve dengeyi aynı lokmada buluşturur.",
      en: "An airy rim alone is not proof of quality. Great Neapolitan pizza brings appearance, texture, aroma and balance together in one bite.",
      de: "Ein luftiger Rand allein beweist keine Qualität. Große neapolitanische Pizza verbindet Optik, Textur, Aroma und Balance in einem Bissen.",
      fr: "Une corniche aérienne ne suffit pas à prouver la qualité. Une grande pizza napolitaine réunit aspect, texture, parfum et équilibre dans une même bouchée.",
      ar: "الحافة الهوائية وحدها ليست دليلاً على الجودة. تجمع البيتزا النابولية الرائعة المظهر والقوام والعطر والتوازن في لقمة واحدة.",
      ru: "Воздушный бортик сам по себе не доказывает качество. Отличная неаполитанская пицца соединяет внешний вид, текстуру, аромат и баланс в одном кусочке.",
    },
    sections: [
      {
        heading: { tr: "Kenar canlı, merkez ince olmalı", en: "A lively rim, a thin centre", de: "Lebendiger Rand, dünne Mitte", fr: "Une corniche vivante, un centre fin", ar: "حافة حية ومركز رقيق", ru: "Живой бортик и тонкий центр" },
        body: {
          tr: "Cornicione düzensiz ve doğal biçimde yükselmeli; her noktada aynı kalınlıkta fabrikasyon bir halka gibi görünmemelidir. Merkez ince, esnek ve malzemeyi taşıyacak kadar bütün kalır. Pizza dilimi kaldırıldığında yumuşakça eğilebilir; fakat ıslak, ham veya kolayca yırtılan bir tabana dönüşmemelidir.",
          en: "The cornicione should rise naturally and irregularly, not resemble a factory-made ring of identical thickness. The centre stays thin, supple and intact enough to carry its topping. A slice may fold gently when lifted, but the base should not be wet, raw or fragile.",
          de: "Die Cornicione soll natürlich und unregelmäßig aufgehen, nicht wie ein industrieller Ring gleicher Stärke. Die Mitte bleibt dünn, geschmeidig und stabil genug für den Belag. Ein Stück darf sich sanft biegen, aber der Boden soll weder nass noch roh oder brüchig sein.",
          fr: "La corniche doit lever de façon naturelle et irrégulière, pas comme un anneau industriel uniforme. Le centre reste fin, souple et assez solide pour porter la garniture. Une part peut plier doucement, mais le dessous ne doit être ni humide, ni cru, ni fragile.",
          ar: "ينبغي أن ترتفع الحافة طبيعياً وبشكل غير منتظم، لا كحلقة صناعية متساوية السماكة. يبقى المركز رقيقاً ومرناً ومتماسكاً بما يكفي لحمل الإضافات. قد تنحني الشريحة برفق، لكن يجب ألا تكون القاعدة رطبة أو نيئة أو سهلة التمزق.",
          ru: "Корничоне поднимается естественно и неровно, а не выглядит заводским кольцом одинаковой толщины. Центр остаётся тонким, гибким и достаточно цельным для начинки. Кусок может мягко согнуться, но основание не должно быть мокрым, сырым или хрупким.",
        },
      },
      {
        heading: { tr: "İs lekeleri ölçülü olmalı", en: "Char should be measured", de: "Röstspuren brauchen Maß", fr: "Les marques du feu restent mesurées", ar: "التحمير يجب أن يكون محسوباً", ru: "Подпалины должны быть умеренными" },
        body: {
          tr: "Leopar benekleri yüksek ısının izidir, fakat yanmış acılık kalite değildir. Kenardaki koyu noktalar açık altın yüzeyle dengelenmeli; taban tamamen kömürleşmemelidir. Güzel pişmiş hamur kavrulmuş tahıl, sıcak ekmek ve hafif duman çağrıştırır; keskin yanık kokusu bırakmaz.",
          en: "Leopard spotting records high heat, but burnt bitterness is not quality. Dark marks should balance a golden surface, and the base must not be uniformly black. Properly baked dough suggests toasted grain, warm bread and gentle smoke—not a sharp burnt smell.",
          de: "Leopardenflecken zeigen hohe Hitze, doch bittere Verbrennung ist keine Qualität. Dunkle Stellen sollen eine goldene Fläche ergänzen; der Boden darf nicht gleichmäßig schwarz sein. Guter Teig duftet nach geröstetem Getreide, warmem Brot und feinem Rauch.",
          fr: "Les taches léopard témoignent de la haute température, mais l’amertume brûlée n’est pas une qualité. Les marques sombres équilibrent une surface dorée sans noircir tout le dessous. Une bonne cuisson évoque le grain toasté, le pain chaud et une fumée légère.",
          ar: "تسجّل البقع الداكنة أثر الحرارة العالية، لكن المرارة المحروقة ليست جودة. يجب أن تتوازن العلامات مع سطح ذهبي وألا تصبح القاعدة سوداء بالكامل. يوحي العجين الجيد بحبوب محمّصة وخبز دافئ ودخان خفيف.",
          ru: "Леопардовые пятна говорят о высокой температуре, но горечь гари — не признак качества. Тёмные отметины должны сочетаться с золотистой поверхностью, а дно не должно быть сплошь чёрным. Хорошая выпечка пахнет зерном, тёплым хлебом и лёгким дымом.",
        },
      },
      {
        heading: { tr: "Malzemeler ayrı ayrı duyulur", en: "Ingredients remain distinct", de: "Zutaten bleiben unterscheidbar", fr: "Les ingrédients restent lisibles", ar: "تبقى المكونات واضحة", ru: "Ингредиенты остаются различимыми" },
        body: {
          tr: "İlk lokmada yalnızca tuz veya peynir ağırlığı değil, domatesin canlılığı, süt ürününün yumuşaklığı, zeytinyağının meyvemsiliği ve hamurun buğday aroması seçilebilmelidir. Hiçbir bileşen tek başına sahneyi işgal etmez. İyi reçete, az sayıda malzemeyle daha uzun ve temiz bir lezzet kurar.",
          en: "The first bite should reveal tomato brightness, soft dairy, fruity olive oil and the dough’s wheat aroma—not only salt or cheese. No component occupies the stage alone. A strong recipe creates a longer, cleaner flavour with relatively few ingredients.",
          de: "Der erste Bissen soll Tomatenfrische, weiche Milchigkeit, fruchtiges Olivenöl und Weizenaroma zeigen – nicht nur Salz oder Käse. Keine Zutat besetzt allein die Bühne. Eine gute Rezeptur erzeugt mit wenigen Produkten einen längeren, klareren Geschmack.",
          fr: "La première bouchée doit laisser lire la vivacité de la tomate, la douceur du lait, le fruité de l’huile et le blé de la pâte, pas seulement le sel ou le fromage. Aucun élément ne prend toute la scène. Une bonne recette crée une saveur plus longue et plus nette avec peu d’ingrédients.",
          ar: "يجب أن تكشف اللقمة الأولى حيوية الطماطم ونعومة الجبن وفاكهية زيت الزيتون وعطر قمح العجين، لا الملح أو الجبن وحدهما. لا يحتل أي عنصر المسرح منفرداً. تصنع الوصفة الجيدة طعماً أطول وأنظف بعدد قليل من المكونات.",
          ru: "В первом кусочке должны читаться яркость томата, мягкость молочного вкуса, фруктовость масла и пшеничный аромат теста, а не только соль или сыр. Ни один компонент не захватывает сцену. Хорошая рецептура даёт долгий чистый вкус немногими ингредиентами.",
        },
      },
      {
        heading: { tr: "Son lokma ilk lokma kadar önemlidir", en: "The last bite matters as much as the first", de: "Der letzte Bissen zählt wie der erste", fr: "La dernière bouchée compte autant que la première", ar: "اللقمة الأخيرة مهمة كالأولى", ru: "Последний кусочек важен не меньше первого" },
        body: {
          tr: "Gerçek denge pizza soğumaya başladığında anlaşılır. Hamur hemen sertleşmiyor, yağ tabakta ayrışmıyor ve tuz giderek baskınlaşmıyorsa reçete iyi kurulmuştur. İyi Napoli pizzası ilk görüntüsüyle heyecan verir; kalitesini ise son lokmada hâlâ uyumlu kalarak kanıtlar.",
          en: "Real balance becomes clear as pizza begins to cool. If the dough does not harden at once, oil does not separate across the plate and salt does not grow dominant, the recipe is well built. Great Neapolitan pizza excites at first sight and proves itself by the final bite.",
          de: "Die wahre Balance zeigt sich beim Abkühlen. Wird der Teig nicht sofort hart, trennt sich das Öl nicht auf dem Teller und dominiert das Salz nicht zunehmend, ist die Rezeptur gut gebaut. Große Pizza begeistert zuerst optisch und bestätigt sich im letzten Bissen.",
          fr: "Le véritable équilibre apparaît quand la pizza refroidit. Si la pâte ne durcit pas aussitôt, si l’huile ne se sépare pas et si le sel ne domine pas, la recette est juste. Une grande pizza napolitaine séduit au premier regard et se confirme à la dernière bouchée.",
          ar: "يظهر التوازن الحقيقي حين تبدأ البيتزا بالبرود. إذا لم يقسُ العجين فوراً ولم ينفصل الزيت في الطبق ولم تزد الملوحة، فالوصفة متماسكة. تثير البيتزا النابولية الرائعة الحماس من النظرة الأولى وتثبت جودتها في اللقمة الأخيرة.",
          ru: "Настоящий баланс проявляется при остывании. Если тесто не твердеет сразу, масло не отделяется на тарелке, а соль не начинает доминировать, рецептура построена правильно. Отличная пицца радует с первого взгляда и подтверждает качество последним кусочком.",
        },
      },
    ],
    keywords: ["great Neapolitan pizza", "pizza quality", "cornicione", "Neapolitan pizza guide"],
  },
];

export type Lang = "en" | "ar";

export type BrandItem = {
  name: string;
  label: string;
  description: string;
  gradient: string;
};

export type PhilosophyItem = {
  number: string;
  title: string;
  body: string;
};

export type AboutParagraph = {
  heading: string;
  body: string;
};

export type Dictionary = {
  nav: {
    brands: string;
    about: string;
    contact: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    scrollHint: string;
  };
  brands: {
    eyebrow: string;
    title: string;
    exploreLabel: string;
    items: BrandItem[];
  };
  map: {
    eyebrow: string;
    title: string;
    subtitle: string;
    kuwaitCity: string;
    officeLabel: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: AboutParagraph[];
  };
  philosophy: {
    eyebrow: string;
    title: string;
    items: PhilosophyItem[];
  };
  contact: {
    eyebrow: string;
    title: string;
    sub: string;
    name: string;
    email: string;
    whatsapp: string;
    inquiry: string;
    inquiryOptions: string[];
    message: string;
    submitLabel: string;
    successTitle: string;
    successBody: string;
    whatsappCta: string;
  };
  footer: {
    tagline: string;
    copy: string;
    socials: { label: string; href: string }[];
  };
  ui: {
    langSwitch: string;
    skipToContent: string;
  };
};

const en: Dictionary = {
  nav: {
    brands: "Brands",
    about: "About",
    contact: "Contact",
    cta: "Get in Touch",
  },
  hero: {
    eyebrow: "✦  Premium Beauty Holding",
    title: "Where Beauty Becomes a Story",
    subtitle:
      "ZoeyBloom is a Kuwait-based beauty house, curating heritage Korean and global brands for women who treat self-care as ceremony.",
    primaryCta: "Discover Brands",
    secondaryCta: "Get in Touch",
    scrollHint: "Scroll",
  },
  brands: {
    eyebrow: "Our House",
    title: "Three labels, one philosophy.",
    exploreLabel: "Explore",
    items: [
      {
        name: "SOLIDU",
        label: "COSMETICS",
        description:
          "Solid-format colour cosmetics — pigment-rich, plastic-free, made for the woman who edits her routine, not multiplies it.",
        gradient: "from-petal to-blush",
      },
      {
        name: "CLARALINE",
        label: "BEAUTY",
        description:
          "French-finished essentials that translate runway gloss into everyday wearability — designed in Paris, finished for the Gulf.",
        gradient: "from-blush to-pink/30",
      },
      {
        name: "EYENLIP",
        label: "SKINCARE",
        description:
          "K-beauty derma-formulas, clinically tested, glass-skin proven. The quiet science behind a luminous face.",
        gradient: "from-pink/20 to-petal",
      },
    ],
  },
  map: {
    eyebrow: "Our Location",
    title: "Rooted in Kuwait",
    subtitle: "Reaching beyond borders.",
    kuwaitCity: "Kuwait City",
    officeLabel: "ZoeyBloom HQ",
  },
  about: {
    eyebrow: "Our Story",
    title: "A house built around feeling, not formulas.",
    paragraphs: [
      {
        heading: "01 — Origin",
        body:
          "ZoeyBloom began as a quiet conversation between friends in Kuwait City — about why beauty in our region felt borrowed, never made for us. The answer became a brand.",
      },
      {
        heading: "02 — Curation",
        body:
          "We meet every founder in person. We test every formula on our own skin. Only the labels that pass — quietly, without performance — are invited into the house.",
      },
      {
        heading: "03 — Care",
        body:
          "Every box that leaves our studio is hand-checked. Every customer message reaches a real person. We treat distribution the way other houses treat couture.",
      },
      {
        heading: "✦",
        body:
          "Beauty, when handled with this much patience, stops being a product. It becomes a story you live inside.",
      },
    ],
  },
  philosophy: {
    eyebrow: "Philosophy",
    title: "Three rules we never break.",
    items: [
      {
        number: "01",
        title: "Curated Selection",
        body: "We say no to ninety brands so the three we say yes to can mean something.",
      },
      {
        number: "02",
        title: "Authentic Beauty",
        body: "No retouching the bottle. No retouching the face. The formula is the promise.",
      },
      {
        number: "03",
        title: "True Partnership",
        body: "We grow with our brands, not on top of them. A founder is a partner — never a vendor.",
      },
    ],
  },
  contact: {
    eyebrow: "Let’s Talk",
    title: "Tell us your story.",
    sub: "Retailers, founders, press, or simply curious — we read every message.",
    name: "Your Name",
    email: "Email Address",
    whatsapp: "WhatsApp (+965 …)",
    inquiry: "Inquiry Type",
    inquiryOptions: ["Retail / Distribution", "Brand Partnership", "Press & Media", "General"],
    message: "Tell us a little more",
    submitLabel: "Send Message",
    successTitle: "Message received.",
    successBody: "We’ll be in touch within one working day.",
    whatsappCta: "Or message us directly on WhatsApp →",
  },
  footer: {
    tagline: "ZoeyBloom — Kuwait’s house of considered beauty.",
    copy: "© 2026 ZoeyBloom Holding. All rights reserved.",
    socials: [
      { label: "Instagram", href: "https://instagram.com/" },
      { label: "TikTok", href: "https://tiktok.com/" },
      { label: "LinkedIn", href: "https://linkedin.com/" },
    ],
  },
  ui: {
    langSwitch: "AR",
    skipToContent: "Skip to content",
  },
};

const ar: Dictionary = {
  nav: {
    brands: "العلامات",
    about: "نبذة",
    contact: "تواصل",
    cta: "تواصل معنا",
  },
  hero: {
    eyebrow: "✦  دار جمال راقية",
    title: "حين يصبح الجمال حكاية",
    subtitle:
      "زوي بلوم دار جمال كويتية، تنتقي علامات كورية وعالمية للمرأة التي ترى في العناية بنفسها طقساً لا مهمة.",
    primaryCta: "اكتشفي العلامات",
    secondaryCta: "تواصلي معنا",
    scrollHint: "اسحبي للأسفل",
  },
  brands: {
    eyebrow: "بيتنا",
    title: "ثلاث علامات، فلسفة واحدة.",
    exploreLabel: "اكتشفي",
    items: [
      {
        name: "SOLIDU",
        label: "مستحضرات تجميل",
        description:
          "مستحضرات تجميل صلبة، غنية بالصبغة وخالية من البلاستيك — للمرأة التي تختصر روتينها بدل أن تضاعفه.",
        gradient: "from-petal to-blush",
      },
      {
        name: "CLARALINE",
        label: "الجمال",
        description:
          "أساسيات بلمسة فرنسية تُحوّل لمعان المنصات إلى يوميات قابلة للارتداء — صُمّمت في باريس، وأُعيدت بحس خليجي.",
        gradient: "from-blush to-pink/30",
      },
      {
        name: "EYENLIP",
        label: "العناية بالبشرة",
        description:
          "تركيبات كورية مُعتمدة سريرياً، تمنح البشرة بريق الزجاج. علم هادئ خلف وجه مضيء.",
        gradient: "from-pink/20 to-petal",
      },
    ],
  },
  map: {
    eyebrow: "موقعنا",
    title: "متجذرون في الكويت",
    subtitle: "نصل إلى ما وراء الحدود.",
    kuwaitCity: "مدينة الكويت",
    officeLabel: "مقر زوي بلوم",
  },
  about: {
    eyebrow: "حكايتنا",
    title: "بيتٌ مبنيٌّ على الإحساس، لا على الوصفات.",
    paragraphs: [
      {
        heading: "01 — البداية",
        body:
          "بدأت زوي بلوم بحوار هادئ بين صديقتين في الكويت — عن سبب شعورنا أن الجمال هنا مُستعار، لا يشبهنا. صار الجواب علامة.",
      },
      {
        heading: "02 — الانتقاء",
        body:
          "نلتقي بكل مؤسِّسة شخصياً. نختبر كل تركيبة على بشرتنا. لا تدخل الدار إلا العلامات التي تنجح بصمت، بلا استعراض.",
      },
      {
        heading: "03 — العناية",
        body:
          "كل علبة تخرج من الاستوديو تمر بفحص يدوي. كل رسالة تصل إلى إنسان حقيقي. نتعامل مع التوزيع كما تتعامل دور الأزياء مع الأوت كوتور.",
      },
      {
        heading: "✦",
        body:
          "الجمال، حين يُعامَل بهذا القدر من الصبر، يكفّ عن كونه منتجاً، ويصبح حكاية تعيشين داخلها.",
      },
    ],
  },
  philosophy: {
    eyebrow: "الفلسفة",
    title: "ثلاث قواعد لا نخالفها.",
    items: [
      {
        number: "٠١",
        title: "انتقاء مدروس",
        body: "نرفض تسعين علامة لتعني الثلاث التي اخترناها شيئاً حقيقياً.",
      },
      {
        number: "٠٢",
        title: "جمال صادق",
        body: "لا نُجمِّل العبوة، ولا نُجمِّل الوجه. التركيبة هي الوعد.",
      },
      {
        number: "٠٣",
        title: "شراكة حقيقية",
        body: "ننمو مع علاماتنا، لا فوقها. المؤسِّسة شريكة، لا مورِّدة.",
      },
    ],
  },
  contact: {
    eyebrow: "حدّثينا",
    title: "احكِ لنا قصتك.",
    sub: "تجّار التجزئة، المؤسِّسون، الصحافة، أو فضول صادق — نقرأ كل رسالة.",
    name: "الاسم",
    email: "البريد الإلكتروني",
    whatsapp: "واتساب (٩٦٥+ …)",
    inquiry: "نوع الاستفسار",
    inquiryOptions: ["تجزئة / توزيع", "شراكة علامة", "إعلام وصحافة", "استفسار عام"],
    message: "أخبرينا بمزيد من التفاصيل",
    submitLabel: "إرسال",
    successTitle: "وصلتنا رسالتك.",
    successBody: "سنعود إليك خلال يوم عمل واحد.",
    whatsappCta: "أو راسلينا مباشرة عبر واتساب ←",
  },
  footer: {
    tagline: "زوي بلوم — دار الجمال المدروس في الكويت.",
    copy: "© ٢٠٢٦ زوي بلوم القابضة. جميع الحقوق محفوظة.",
    socials: [
      { label: "إنستغرام", href: "https://instagram.com/" },
      { label: "تيك توك", href: "https://tiktok.com/" },
      { label: "لينكدإن", href: "https://linkedin.com/" },
    ],
  },
  ui: {
    langSwitch: "EN",
    skipToContent: "تخطّي إلى المحتوى",
  },
};

export const dictionaries: Record<Lang, Dictionary> = { en, ar };

export const defaultLang: Lang = "en";

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang] ?? dictionaries[defaultLang];
}

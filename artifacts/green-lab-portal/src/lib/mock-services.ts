export interface Service {
  id: string;
  category: "Pharma" | "Food" | "Water" | "Oud" | "Industrial" | "Consulting" | "Training" | "Analytical";
  title: { en: string; ar: string };
  tagline: { en: string; ar: string };
  keyTests: { en: string[]; ar: string[] };
  description: { en: string; ar: string };
  image: string;
  accent: string;
  texture: string;
  size: "large" | "medium" | "full";
  specs: {
    accreditations: string[];
    equipment: string[];
    tat: { standard: string; express: string; rush: string };
  };
}

export const mockServices: Service[] = [
  {
    id: "s-analytical",
    category: "Analytical",
    title: { en: "Analytical Services", ar: "الخدمات التحليلية" },
    tagline: { en: "Advanced chemical profiling for complex compounds.", ar: "توصيف كيميائي متقدم للمركبات المعقدة." },
    keyTests: {
      en: ["Method Development", "Unknown Identification", "Stability Testing"],
      ar: ["تطوير الأساليب", "تحديد المواد المجهولة", "اختبار الاستقرار"]
    },
    description: {
      en: "General analytical excellence providing the foundation for customized testing protocols.",
      ar: "تميز تحليلي عام يوفر الأساس لبروتوكولات الاختبار المخصصة."
    },
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=800",
    accent: "#2563EB",
    texture: "pharma-grid",
    size: "large",
    specs: {
      accreditations: ["ISO 17025", "GLP"],
      equipment: ["LC-MS/MS", "ICP-MS"],
      tat: { standard: "5-7d", express: "48h", rush: "24h" }
    }
  },
  {
    id: "s-pharma",
    category: "Pharma",
    title: { en: "Pharmaceutical Analysis", ar: "تحليل الأدوية" },
    tagline: { en: "Clinical grade testing for medicinal integrity.", ar: "اختبارات بدرجة سريرية للسلامة الدوائية." },
    keyTests: {
      en: ["Assay", "Impurity Profiling", "Dissolution"],
      ar: ["المقايسة", "توصيف الشوائب", "الذوبان"]
    },
    description: {
      en: "Ensuring regulatory compliance for drug products and active pharmaceutical ingredients.",
      ar: "ضمان الامتثال التنظيمي للمنتجات الدوائية والمكونات النشطة."
    },
    image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=800",
    accent: "#2563EB",
    texture: "pharma-grid",
    size: "large",
    specs: {
      accreditations: ["ISO 17025", "SFDA"],
      equipment: ["HPLC", "GC-MS/MS"],
      tat: { standard: "5-7d", express: "48h", rush: "24h" }
    }
  },
  {
    id: "s-food",
    category: "Food",
    title: { en: "Food Analysis", ar: "تحليل الأغذية" },
    tagline: { en: "Safety screening for nutritional distribution.", ar: "فحص السلامة للتوزيع الغذائي." },
    keyTests: {
      en: ["Pesticide residues", "Hormones", "Vitamins"],
      ar: ["بقايا المبيدات", "الهرمونات", "الفيتامينات"]
    },
    description: {
      en: "Protecting consumer health through rigorous food safety and quality testing.",
      ar: "حماية صحة المستهلك من خلال اختبارات صارمة لسلامة الأغذية وجودتها."
    },
    image: "/a/food.png",
    accent: "#0A5C36",
    texture: "food-leaf",
    size: "large",
    specs: {
      accreditations: ["ISO 17025", "SFDA"],
      equipment: ["ICP-MS", "HPLC"],
      tat: { standard: "3-5d", express: "24h", rush: "12h" }
    }
  },
  {
    id: "s-water",
    category: "Water",
    title: { en: "Water Analysis", ar: "تحليل المياه" },
    tagline: { en: "Purity monitoring for potable and waste water.", ar: "مراقبة النقاوة لمياه الشرب والصرف الصحي." },
    keyTests: {
      en: ["Heavy Metals", "COD/BOD", "Physical Properties"],
      ar: ["المعادن الثقيلة", "BOD/COD", "الخواص الفيزيائية"]
    },
    description: {
      en: "Comprehensive water quality assessment according to WHO and SASO standards.",
      ar: "تقييم شامل لجودة المياه وفقًا لمعايير منظمة الصحة العالمية وSASO."
    },
    image: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&q=80&w=800",
    accent: "#00C9B1",
    texture: "water-ripple",
    size: "medium",
    specs: {
      accreditations: ["ISO 17025", "EPA"],
      equipment: ["IC", "TOC Analyzer"],
      tat: { standard: "3-5d", express: "24h", rush: "8h" }
    }
  },
  {
    id: "s-micro",
    category: "Water",
    title: { en: "Microbiological Testing", ar: "اختبار الأحياء الدقيقة" },
    tagline: { en: "Biological load and pathogen quantification.", ar: "قياس الحمل البيولوجي ومسببات الأمراض." },
    keyTests: {
      en: ["Salmonella", "E.Coli", "Legionella"],
      ar: ["السالمونيلا", "إي كولاي", "الليجيونيلا"]
    },
    description: {
      en: "Advanced microbiological analytics for food, water, and environmental samples.",
      ar: "تحليلات ميكروبيولوجية متقدمة لعينات الأغذية والمياه والبيئة."
    },
    image: "/a/microbiological.png",
    accent: "#00C9B1",
    texture: "water-ripple",
    size: "medium",
    specs: {
      accreditations: ["ISO 17025"],
      equipment: ["Colony Counter", "Incubators"],
      tat: { standard: "3-5d", express: "24h", rush: "N/A" }
    }
  },
  {
    id: "s-cosmetic",
    category: "Pharma",
    title: { en: "Cosmetic Product Analysis", ar: "تحليل منتجات التجميل" },
    tagline: { en: "Safety verification for personal care items.", ar: "التحقق من سلامة منتجات العناية الشخصية." },
    keyTests: {
      en: ["Heavy Metals", "Preservative Efficacy", "Fragrance Allergens"],
      ar: ["المعادن الثقيلة", "فعالية المواد الحافظة", "مسببات الحساسية"]
    },
    description: {
      en: "Ensuring cosmetics meet high safety standards for consumer application.",
      ar: "ضمان استيفاء مستحضرات التجميل لمعايير السلامة العالية."
    },
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=800",
    accent: "#2563EB",
    texture: "pharma-grid",
    size: "medium",
    specs: {
      accreditations: ["ISO 17025", "SFDA"],
      equipment: ["HPLC", "FTIR"],
      tat: { standard: "5-7d", express: "48h", rush: "24h" }
    }
  },
  {
    id: "s-oud",
    category: "Oud",
    title: { en: "Oud Analysis", ar: "تحليل العود" },
    tagline: { en: "Purity check for high-value agarwood.", ar: "فحص النقاوة للعود ذو القيمة العالية." },
    keyTests: {
      en: ["Authentication", "Adulteration Check", "Essential Oil Yield"],
      ar: ["التوثيق", "كشف الغش", "إنتاجية الزيت العطري"]
    },
    description: {
      en: "Specialized analysis for top-tier Oud products to verify authenticity and quality.",
      ar: "تحليل متخصص لمنتجات العود عالية الجودة للتحقق من الأصالة."
    },
    image: "https://images.unsplash.com/photo-1518152002772-965306d8778f?auto=format&fit=crop&q=80&w=800",
    accent: "#D4AF37",
    texture: "oud-wisp",
    size: "medium",
    specs: {
      accreditations: ["ISO 17025"],
      equipment: ["GC-FID", "GC-MS/MS"],
      tat: { standard: "4-6d", express: "48h", rush: "N/A" }
    }
  },
  {
    id: "s-incense",
    category: "Oud",
    title: { en: "Incense Analysis", ar: "تحليل البخور" },
    tagline: { en: "Quality verification for traditional incense.", ar: "التحقق من جودة البخور التقليدي." },
    keyTests: {
      en: ["Burn rate", "Fragrance Identification", "Safety Profile"],
      ar: ["معدل الاحتراق", "تحديد الرائحة", "ملف السلامة"]
    },
    description: {
      en: "Protecting heritage through scientific verification of traditional scent profiles.",
      ar: "حماية التراث من خلال التحقق العلمي من روائح البخور التقليدية."
    },
    image: "https://images.unsplash.com/photo-1518152002772-965306d8778f?auto=format&fit=crop&q=80&w=800",
    accent: "#D4AF37",
    texture: "oud-wisp",
    size: "medium",
    specs: {
      accreditations: ["ISO 17025"],
      equipment: ["GC-FID", "FTIR"],
      tat: { standard: "4-6d", express: "N/A", rush: "N/A" }
    }
  },
  {
    id: "s-perfume",
    category: "Oud",
    title: { en: "Perfume Analysis", ar: "تحليل العطور" },
    tagline: { en: "Molecular profiling of luxury scents.", ar: "التوصيف الجزيئي للروائح الفاخرة." },
    keyTests: {
      en: ["Allergen Screening", "IFRA Compliance", "Alcohol Content"],
      ar: ["فحص مسببات الحساسية", "امتثال IFRA", "محتوى الكحول"]
    },
    description: {
      en: "Comprehensive chemical mapping for luxury perfume manufacturers.",
      ar: "رسم خرائط كيميائية شاملة لمصنعي العطور الفاخرة."
    },
    image: "https://images.unsplash.com/photo-1518152002772-965306d8778f?auto=format&fit=crop&q=80&w=800",
    accent: "#D4AF37",
    texture: "oud-wisp",
    size: "medium",
    specs: {
      accreditations: ["ISO 17025", "IFRA"],
      equipment: ["GC-MS/MS", "Headspace GC"],
      tat: { standard: "5-7d", express: "48h", rush: "24h" }
    }
  },
  {
    id: "s-training",
    category: "Training",
    title: { en: "Training Services", ar: "خدمات التدريب" },
    tagline: { en: "Scientific capacity building for lab teams.", ar: "بناء القدرات العلمية لفرق المختبرات." },
    keyTests: {
      en: ["ISO 17025 Workshops", "Method Validation", "Instrument Handling"],
      ar: ["ورش عمل ISO 17025", "تصديق الأساليب", "التعامل مع الأجهزة"]
    },
    description: {
      en: "Empowering professionals with practical scientific skills and regulatory knowledge.",
      ar: "تمكين المختصين بالمهارات العلمية العملية والمعرفة التنظيمية."
    },
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    accent: "#2563EB",
    texture: "roadmap-lines",
    size: "medium",
    specs: {
      accreditations: ["Certification of Completion"],
      equipment: ["Full Lab Access"],
      tat: { standard: "Varies", express: "N/A", rush: "N/A" }
    }
  },
  {
    id: "s-consult",
    category: "Consulting",
    title: { en: "Consulting and Registration Services", ar: "خدمات الاستشارات والتسجيل" },
    tagline: { en: "Your bridge to SFDA and regulatory success.", ar: "جسرك نحو الهيئة والنجاح التنظيمي." },
    keyTests: {
      en: ["SFDA Registration", "Gap Analysis", "Auditing"],
      ar: ["تسجيل الهيئة", "تحليل الفجوات", "التدقيق"]
    },
    description: {
      en: "Strategic consulting for market entry and continuous compliance in Saudi Arabia.",
      ar: "استشارات إستراتيجية لدخول السوق والامتثال المستمر في المملكة العربية السعودية."
    },
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    accent: "#2563EB",
    texture: "roadmap-lines",
    size: "full",
    specs: {
      accreditations: ["Approved Regulatory Body"],
      equipment: ["Consulting Suite"],
      tat: { standard: "Project-based", express: "N/A", rush: "N/A" }
    }
  }
];

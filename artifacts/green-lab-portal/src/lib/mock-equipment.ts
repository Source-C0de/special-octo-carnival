export interface Equipment {
  id: string;
  name: string;
  heroMetric: string;
  description: string;
  industries: ("Pharma" | "Food" | "Water" | "Cosmetics" | "Industrial" | "OilGas")[];
  image: string;
  specs: {
    iso17025: boolean;
    astm: string[];
    detectionLimit: string;
    sampleType: string[];
  };
  validationCta: string;
  portalBadge?: { text: string; color: "teal" | "gold" };
  status: "active" | "calibrating" | "maintenance";
}

export const mockEquipment: Equipment[] = [
  {
    id: "e-01",
    name: "Inductively Coupled Plasma Mass Spectrometry (ICP-MS)",
    heroMetric: "Ultra-Trace Elemental Analysis",
    description: "State-of-the-art elemental detection for heavy metals and trace elements in pharmaceutical and environmental matrices.",
    industries: ["Pharma", "Water", "Food"],
    image: "/equipment/icps.png",
    specs: {
      iso17025: true,
      astm: ["D5673", "E1621"],
      detectionLimit: "0.001 ppb",
      sampleType: ["Water", "Pharma Raw Materials", "Soil"]
    },
    validationCta: "Request Metal Profile",
    status: "active"
  },
  {
    id: "e-02",
    name: "High-Performance Liquid Chromatography (HPLC)",
    heroMetric: "Precision Gradient Separation",
    description: "Versatile chromatographic system for assay, purity, and related substances testing in pharmaceuticals and cosmetics.",
    industries: ["Pharma", "Cosmetics", "Food"],
    image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=800",
    specs: {
      iso17025: true,
      astm: ["E685", "E1151"],
      detectionLimit: "0.1 ppm",
      sampleType: ["Drug Formulations", "Cosmetic Actives"]
    },
    validationCta: "Request Assay Validation",
    status: "active"
  },
  {
    id: "e-03",
    name: "Liquid Chromatography with Mass Spectrometry (LC-MS/MS)",
    heroMetric: "Triple Quadrupole Sensitivity",
    description: "The gold standard for nitrosamine impurities and genotoxic impurity testing with ultra-high sensitivity.",
    industries: ["Pharma", "Food"],
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=800",
    specs: {
      iso17025: true,
      astm: ["E2108", "USP <232>"],
      detectionLimit: "0.01 ppb",
      sampleType: ["API", "Finished Products"]
    },
    validationCta: "Request Nitrosamine Scan",
    status: "active"
  },
  {
    id: "e-04",
    name: "Gas Chromatography with Mass Spectrometry (GC-MS/MS)",
    heroMetric: "Volatile Impurity Profiling",
    description: "Advanced identification of volatile and semi-volatile organic compounds in petrochemicals and food extracts.",
    industries: ["OilGas", "Food", "Industrial"],
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=800",
    specs: {
      iso17025: true,
      astm: ["D5769", "D8071"],
      detectionLimit: "0.05 ppb",
      sampleType: ["Fuel", "Natural Gas", "Aroma Extracts"]
    },
    validationCta: "Request VOC Profiling",
    status: "active"
  },
  {
    id: "e-05",
    name: "Gas Chromatography with Flame Ionization Detector (GC-FID)",
    heroMetric: "Hydrocarbon Quantitation",
    description: "Robust quantitation of organic compounds and residual solvents according to ICH Q3C guidelines.",
    industries: ["Pharma", "Industrial", "OilGas"],
    image: "https://images.unsplash.com/photo-1518152002772-965306d8778f?auto=format&fit=crop&q=80&w=800",
    specs: {
      iso17025: true,
      astm: ["D6730", "D7096"],
      detectionLimit: "1.0 ppm",
      sampleType: ["Solvents", "Polymers", "Petroleum"]
    },
    validationCta: "Request Solvent Analysis",
    status: "active"
  },
  {
    id: "e-06",
    name: "Gas Chromatography with Head Space (GC-HD)",
    heroMetric: "Residual Solvent Specialist",
    description: "Optimized for the analysis of volatile impurities in solid and liquid samples without direct injection.",
    industries: ["Pharma", "Cosmetics"],
    image: "https://images.unsplash.com/photo-1518152002772-965306d8778f?auto=format&fit=crop&q=80&w=800",
    specs: {
      iso17025: true,
      astm: ["E260", "USP <467>"],
      detectionLimit: "0.5 ppm",
      sampleType: ["Tablets", "Powders", "Packaging"]
    },
    validationCta: "Request Headspace Scan",
    status: "calibrating"
  },
  {
    id: "e-07",
    name: "Ion Chromatography (IC)",
    heroMetric: "Inorganic Ion Detection",
    description: "Precise measurement of common anions and cations in drinking water and industrial process water.",
    industries: ["Water", "Industrial"],
    image: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&q=80&w=800",
    specs: {
      iso17025: true,
      astm: ["D4327", "D6919"],
      detectionLimit: "0.01 mg/L",
      sampleType: ["Potable Water", "Industrial Effluent"]
    },
    validationCta: "Request Ion Profile",
    status: "active"
  },
  {
    id: "e-08",
    name: "Total Organic Carbon Analyzer (TOC Analyzer)",
    heroMetric: "Organic Load Assessment",
    description: "Measurement of total organic carbon for water purity verification and cleaning validation in pharma.",
    industries: ["Water", "Pharma"],
    image: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&q=80&w=800",
    specs: {
      iso17025: true,
      astm: ["D5904", "USP <643>"],
      detectionLimit: "0.1 ppm",
      sampleType: ["Purified Water", "WFI", "Rinse Water"]
    },
    validationCta: "Request TOC Analysis",
    status: "active"
  },
  {
    id: "e-09",
    name: "Fourier-Transform Infrared Spectroscopy (FTIR)",
    heroMetric: "Molecular Fingerprinting",
    description: "Identification of unknown substances, polymers, and verification of raw material identity.",
    industries: ["Pharma", "Industrial", "Cosmetics"],
    image: "https://images.unsplash.com/photo-1518152002772-965306d8778f?auto=format&fit=crop&q=80&w=800",
    specs: {
      iso17025: true,
      astm: ["E1252", "E168"],
      detectionLimit: "N/A (Ident)",
      sampleType: ["Solid Powders", "Films", "Liquids"]
    },
    validationCta: "Request Identity Test",
    status: "active"
  },
  {
    id: "e-10",
    name: "Colony Counter",
    heroMetric: "Microbial Load Quantification",
    description: "Automated counting of microbial colonies for bioburden and environmental monitoring studies.",
    industries: ["Food", "Water", "Pharma"],
    image: "https://images.unsplash.com/photo-1579154217064-0a47b3842407?auto=format&fit=crop&q=80&w=800",
    specs: {
      iso17025: true,
      astm: ["ISO 4833", "ISO 7218"],
      detectionLimit: "1 CFU",
      sampleType: ["Agar Plates", "Membrane Filters"]
    },
    validationCta: "Request Bioburden Count",
    status: "maintenance"
  }
];

export const industryFilters = [
  "All",
  "Pharma Compliance",
  "Water Safety",
  "Food Integrity",
  "Cosmetics QA",
  "Industrial Materials"
];

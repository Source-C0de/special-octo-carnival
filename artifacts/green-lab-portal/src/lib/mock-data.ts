export const services = [
  {
    id: "s-01",
    title: "Chemical Analysis",
    description: "Comprehensive chemical testing for diverse materials ensuring safety and compliance.",
    icon: "FlaskConical",
    tat: { standard: "3-5 days", express: "24h" },
    badges: ["ISO 17025", "ASTM", "SFDA"],
    industries: ["Pharmaceuticals", "Cosmetics", "Oil & Gas"],
    requirements: "Min 500g solid or 1L liquid sample",
    price: "$450"
  },
  {
    id: "s-02",
    title: "Microbiological Testing",
    description: "Detect and quantify pathogens and spoilage organisms in food and water.",
    icon: "Microscope",
    tat: { standard: "5-7 days", express: "48h" },
    badges: ["ISO 17025", "FDA", "SAC"],
    industries: ["Food & Beverage", "Water & Environment", "Pharmaceuticals"],
    requirements: "Min 250g sample in sterile container",
    price: "$320"
  },
  {
    id: "s-03",
    title: "Physical Testing",
    description: "Material characterization, viscosity, density, and particulate analysis.",
    icon: "Activity",
    tat: { standard: "2-4 days", express: "12h" },
    badges: ["ISO 17025", "ASTM"],
    industries: ["Construction", "Oil & Gas", "Cosmetics"],
    requirements: "Varies by specific test",
    price: "$280"
  },
  {
    id: "s-04",
    title: "Environmental Monitoring",
    description: "Air, water, and soil analysis to meet regulatory environmental standards.",
    icon: "Droplets",
    tat: { standard: "7-10 days", express: "3 days" },
    badges: ["EPA", "ISO 14001"],
    industries: ["Water & Environment", "Construction", "Oil & Gas"],
    requirements: "Specific sampling kits required",
    price: "$550"
  },
  {
    id: "s-05",
    title: "Food Nutritional Labeling",
    description: "Complete nutritional profile testing for product labeling compliance.",
    icon: "Apple",
    tat: { standard: "10-14 days", express: "5 days" },
    badges: ["SFDA", "FDA"],
    industries: ["Food & Beverage"],
    requirements: "Min 1kg final packaged product",
    price: "$890"
  },
  {
    id: "s-06",
    title: "Cosmetic Safety Testing",
    description: "Heavy metals, preservatives, and microbiological safety of personal care products.",
    icon: "Sparkles",
    tat: { standard: "5-7 days", express: "48h" },
    badges: ["SFDA", "ISO 22716"],
    industries: ["Cosmetics"],
    requirements: "3 retail units",
    price: "$600"
  }
];

export const industries = [
  "All",
  "Food & Beverage",
  "Pharmaceuticals",
  "Cosmetics",
  "Water & Environment",
  "Construction",
  "Oil & Gas"
];

export const gapAnalysisData = [
  { test: "Heavy Metals (Lead, Arsenic)", required: true, completed: false, status: "Missing", dueDate: "2025-05-15" },
  { test: "Microbial Limits (USP <61>)", required: true, completed: true, status: "Compliant", dueDate: "2025-08-20" },
  { test: "pH & Viscosity", required: true, completed: true, status: "Compliant", dueDate: "2026-01-10" },
  { test: "Preservative Efficacy", required: false, completed: false, status: "Optional", dueDate: null },
  { test: "Pesticide Residues", required: true, completed: false, status: "Missing", dueDate: "2025-04-30" }
];

export const analyticalTrends = [
  { month: "Jan", ph: 7.2, microbial: 120 },
  { month: "Feb", ph: 7.1, microbial: 110 },
  { month: "Mar", ph: 7.3, microbial: 90 },
  { month: "Apr", ph: 7.0, microbial: 150 },
  { month: "May", ph: 7.2, microbial: 80 },
  { month: "Jun", ph: 7.4, microbial: 95 }
];

export const expertProfiles = [
  {
    id: "e-01",
    name: "Dr. Ahmed Al-Farsi",
    role: "Chief Analytical Chemist",
    credentials: "Ph.D. Analytical Chemistry, 15+ years experience",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    id: "e-02",
    name: "Sarah Jenkins",
    role: "Head of Microbiology",
    credentials: "M.Sc. Microbiology, 10+ years experience",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    id: "e-03",
    name: "Khalid Bin Omar",
    role: "QA/QC Director",
    credentials: "Certified ISO 17025 Lead Assessor",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300"
  }
];

export const caseStudies = [
  {
    id: "c-01",
    title: "Accelerating Pharma Compliance",
    industry: "Pharmaceuticals",
    metric: "Reduced compliance risk by 94%",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: "c-02",
    title: "Safeguarding National Water Supply",
    industry: "Water & Environment",
    metric: "Processed 10,000+ samples with 99.9% accuracy",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: "c-03",
    title: "Food Export Certification",
    industry: "Food & Beverage",
    metric: "Shortened export TAT by 4 days",
    image: "https://images.unsplash.com/photo-1606854428728-5fe3eea23475?auto=format&fit=crop&q=80&w=600&h=400"
  }
];

export const testimonials = [
  {
    id: "t-01",
    quote: "Green Lab's precision and rapid turnaround have been instrumental in getting our products to market faster. Their client portal is a game changer for QA tracking.",
    author: "Fatima Al-Dosari",
    role: "Quality Manager",
    company: "Saudi BioTech Solutions",
    rating: 5
  },
  {
    id: "t-02",
    quote: "The level of expertise and regulatory knowledge demonstrated by the Green Lab team ensures we never have to worry about our export compliance.",
    author: "Michael Roberts",
    role: "Operations Director",
    company: "Global Food Exports",
    rating: 5
  }
];

export const aboutMilestones = [
  {
    year: "2012",
    title: "Green Lab founded",
    description: "Established to bring Saudi clients faster access to global-grade analytical testing.",
  },
  {
    year: "2018",
    title: "ISO/IEC 17025:2017 certified",
    description: "Expanded accredited capabilities across chemical, microbiological, and physical testing.",
  },
  {
    year: "2021",
    title: "SFDA-aligned expansion",
    description: "Strengthened compliance support for regulated industries serving the Kingdom.",
  },
  {
    year: "2030",
    title: "Vision 2030 partnership",
    description: "Supporting national transformation with precision, speed, and scientific trust.",
  },
];

export const aboutValues = [
  {
    title: "Precision with purpose",
    description: "Every result is handled with scientific discipline and commercial urgency.",
  },
  {
    title: "Local partnership",
    description: "We work closely with Saudi teams to reduce risk and move faster with confidence.",
  },
  {
    title: "Trusted compliance",
    description: "Our systems are built for regulated industries that need proof, traceability, and clarity.",
  },
];

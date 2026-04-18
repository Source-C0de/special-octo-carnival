import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import {
  ShieldCheck,
  Award,
  Search,
  FileText,
  Download,
  RefreshCw,
  Globe,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Filter,
  ArrowRight,
  Fingerprint,
  Calendar,
  Lock,
  BadgeCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/components/language-provider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import WorldMap from "@/components/ui/world-map";


// --- CUSTOM HOOKS ---

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);
  return count;
}

// --- MOCK DATA ---

const credentials = [
  {
    id: "iso-17025",
    type: "iso",
    name: "ISO/IEC 17025:2017",
    issuer: "Saudi Accreditation Center (SAAC)",
    validUntil: "2026-12-31",
    status: "Active",
    scope: "Chemical & Microbiological Testing",
    certNo: "ACC-0122",
    image: "/licences/ss1.png"
  },
  {
    id: "sfda-glp",
    type: "regional",
    name: "SFDA Good Laboratory Practice",
    issuer: "Saudi Food & Drug Authority",
    validUntil: "2026-06-15",
    status: "Active",
    scope: "Pharmaceutical & Food Analysis",
    certNo: "SFDA-GLP-2024",
    image: "/licences/ss2.png"
  },
  {
    id: "iso-9001",
    type: "iso",
    name: "ISO 9001:2015",
    issuer: "Intertek Certification",
    validUntil: "2025-05-20",
    status: "Critical",
    scope: "Quality Management Systems",
    certNo: "QMS-9981",
    image: "/licences/ss3.png"
  },
  {
    id: "halal-cert",
    type: "halal",
    name: "GSO Halal Certification",
    issuer: "Halal Center - Saudi Arabia",
    validUntil: "2027-01-10",
    status: "Active",
    scope: "Meat & Dairy Testing",
    certNo: "H-SA-442",
    image: "/licences/ss1.png"
  }
];

const scopeItems = [
  { id: 1, name: "Arsenic Detection", method: "ICP-MS (EPA 200.8)", limit: "0.01", unit: "µg/L", industries: ["Water", "Food"] },
  { id: 2, name: "Salmonella Pathogens", method: "ISO 6579-1", limit: "Absent", unit: "/25g", industries: ["Food", "Agri"] },
  { id: 3, name: "Formaldehyde Content", method: "HPLC-DAD", limit: "1.0", unit: "mg/kg", industries: ["Cosmetics", "Textiles"] },
  { id: 4, name: "Lead Trace Analysis", method: "AAS-Graphite", limit: "0.05", unit: "ppm", industries: ["Pharma", "Soil"] },
  { id: 5, name: "Ethylene Oxide", method: "GC-FID/Headspace", limit: "0.1", unit: "ppm", industries: ["Medical Devices", "Pharma"] },
];

// --- SUB-COMPONENTS ---

const CredentialCard = ({ cred, onClick }: { cred: typeof credentials[0], onClick: () => void }) => {
  const daysRemaining = Math.ceil((new Date(cred.validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const statusColor =
    daysRemaining > 90 ? "text-teal" :
      daysRemaining > 30 ? "text-amber-500" : "text-destructive";

  return (
    <motion.div
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald/0 via-emerald/0 to-emerald/0 group-hover:from-emerald/20 group-hover:via-primary/10 group-hover:to-teal/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

      <Card className="relative h-full border-[0.5px] border-emerald/10 bg-white/5 backdrop-blur-xl overflow-hidden rounded-2xl transition-colors group-hover:border-emerald/40 shadow-2xl shadow-primary/5">
        <div className="absolute top-0 right-0 p-8 select-none pointer-events-none overflow-hidden opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
          <span className="text-8xl font-black font-display rotate-12 block">VERIFIED</span>
        </div>

        <CardContent className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <Badge variant="outline" className={`border-none ${statusColor} bg-current/10 px-3 py-1 font-bold`}>
              {cred.status}
            </Badge>
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-emerald transition-colors">{cred.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">Issued by: {cred.issuer}</p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-emerald/10">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Accreditation ID</p>
                <p className="text-sm font-mono font-bold leading-none">{cred.certNo}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Standard Type</p>
                <p className="text-sm font-bold leading-none capitalize">{cred.type}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className={`w-4 h-4 ${statusColor}`} />
              <span className={`text-sm font-bold ${statusColor}`}>
                {daysRemaining} Days Left
              </span>
            </div>
            <div className="w-8 h-8 rounded-full border border-emerald/20 flex items-center justify-center text-emerald group-hover:bg-emerald group-hover:text-white transition-all">
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const MapPath = ({ d, delay }: { d: string; delay: number }) => (
  <motion.path
    d={d}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 0.4 }}
    transition={{ duration: 2, delay, ease: "easeInOut" }}
    className="text-primary hover:text-teal hover:opacity-100 transition-all cursor-crosshair"
  />
);

// --- MAIN PAGE COMPONENT ---

export default function Credentials() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCred, setSelectedCred] = useState<typeof credentials[0] | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Stats for the sticky header
  const accredCount = useCountUp(12);
  const successRate = useCountUp(100);
  const clientCount = useCountUp(580);

  const filteredScope = useMemo(() => {
    if (!searchQuery) return scopeItems;
    return scopeItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.method.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const stats = [
    { label: "Active Accreditations", value: `${accredCount}+`, icon: BadgeCheck },
    { label: "Audit Success", value: `${successRate}%`, icon: ShieldCheck },
    { label: "Client Portfolio", value: `${clientCount}+`, icon: Award },
    { label: "Global Agreements", value: "ILAC/MRA", icon: Globe },
  ];

  return (
    <div className={`flex flex-col min-h-screen bg-sand/30 font-sans ${language === "ar" ? "rtl" : "ltr"}`}>

      {/* 2A. STICKY STATUS BAR DASHBOARD */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b-[0.5px] border-emerald/10">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-8 min-w-max">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 pr-8 border-r last:border-0 border-emerald/5"
              >
                <div className="w-10 h-10 rounded-full bg-emerald/5 flex items-center justify-center text-emerald">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold leading-none mb-1">{stat.label}</p>
                  <p className="text-xl font-display font-bold leading-none">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-4 min-w-max ml-auto">
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-tighter text-muted-foreground">Verification Engine V2.4</span>
              <span className="text-xs font-mono font-bold flex items-center gap-1.5">
                Last Verified: <span className="text-teal">Real-Time</span>
                <motion.div
                  animate={isRefreshing ? { rotate: 360 } : {}}
                  transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0 }}
                  className="cursor-pointer"
                  onClick={() => {
                    setIsRefreshing(true);
                    setTimeout(() => setIsRefreshing(false), 2000);
                  }}
                >
                  <RefreshCw className="w-3 h-3" />
                </motion.div>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative py-24 overflow-hidden border-b bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="absolute inset-0 molecular-bg opacity-10" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Badge variant="outline" className="text-emerald border-emerald/20 bg-emerald/5 px-4 py-1 flex w-fit items-center gap-2">
                <Lock className="w-3.5 h-3.5" /> Institutional Credibility Node
              </Badge>
              <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-[1.1]">
                Precision Built on <span className="text-emerald italic">Global Authority.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Green Lab maintain rigorous ISO/IEC 17025:2017 accreditation standards, ensuring every test result delivered is recognized by global regulatory bodies from Riyadh to Rotterdam.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-24 space-y-32">

        {/* 2B. VERIFICATION GRID */}
        <section id="certifications">
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-2">
              <h2 className="text-4xl font-display font-bold">Active Accreditation Portfolio</h2>
              <p className="text-muted-foreground">Real-time status tracking via blockchain-encrypted verification.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-white">Filter Categories</Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {credentials.map((cred) => (
                <CredentialCard
                  key={cred.id}
                  cred={cred}
                  onClick={() => setSelectedCred(cred)}
                />
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* 2C. INTERACTIVE SCOPE EXPLORER */}
        <section id="scope">
          <Card className="border-[0.5px] border-emerald/20 overflow-hidden shadow-2xl">
            <CardContent className="p-0">
              <div className="bg-emerald text-white p-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div className="space-y-4">
                    <h2 className="text-4xl font-display font-bold">Scope of Accreditation Explorer</h2>
                    <p className="text-emerald-foreground/70 max-w-xl">Search through our 500+ validated analytical methods to verify specific detection limits and technical requirements.</p>
                  </div>
                  <div className="relative w-full max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-foreground" />
                    <Input
                      placeholder="Search parameters (e.g. Lead, Salmonella...)"
                      className="h-14 pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-emerald-foreground text-lg"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-8 overflow-x-auto no-scrollbar pb-2">
                  <div className="flex gap-2">
                    {["All Sectors", "Chemical", "Biological", "Physical", "Halal"].map((tab) => (
                      <Badge key={tab} variant="outline" className="cursor-pointer hover:bg-emerald/5 transition-colors px-4 py-2 text-sm">{tab}</Badge>
                    ))}
                  </div>
                  <Button variant="ghost" className="text-emerald font-bold flex items-center gap-2">
                    <Download className="w-4 h-4" /> Export Filtered Scope
                  </Button>
                </div>

                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {filteredScope.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-emerald/5 rounded-xl hover:border-emerald/30 hover:shadow-lg transition-all"
                      >
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-3">
                            <h4 className="text-lg font-bold group-hover:text-emerald transition-colors">{item.name}</h4>
                            {searchQuery && (item.name.toLowerCase() === searchQuery.toLowerCase() || item.method.toLowerCase() === searchQuery.toLowerCase()) && (
                              <Badge className="bg-teal animate-pulse">Scope Match</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground font-mono">{item.method}</p>
                        </div>

                        <div className="flex items-center gap-8 mt-4 md:mt-0">
                          <div className="text-right">
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Detection Limit</p>
                            <p className="font-bold">{item.limit} <span className="text-xs text-muted-foreground font-normal">{item.unit}</span></p>
                          </div>
                          <div className="flex gap-1">
                            {item.industries.map(ind => (
                              <div key={ind} className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald/5 text-emerald border border-emerald/10">{ind}</div>
                            ))}
                          </div>
                          <Button variant="ghost" size="icon" className="group-hover:bg-emerald group-hover:text-white rounded-full">
                            <ChevronRight className="w-5 h-5" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="mt-8 pt-8 border-t flex items-center justify-center">
                  <Button variant="link" className="text-muted-foreground">View full technical scope including uncertainty values (PDF 1.2MB)</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2D. GLOBAL RECOGNITION MAP */}
        <section id="recognition" className="relative py-24 bg-white rounded-[2.5rem] border border-emerald/5 shadow-inner">
          <div className="max-w-4xl mx-auto text-center mb-16 px-4">
            <h2 className="text-4xl font-display font-bold mb-4">Mutual Recognition Pacts</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">Through ILAC-MRA agreements, our reports are legally equivalent to certifications issued by equivalent bodies in North America, Europe, and Asia-Pacific.</p>
          </div>

          <div className="relative aspect-[16/9] w-full max-w-5xl mx-auto">
            <svg viewBox="0 0 1000 600" className="w-full h-full text-emerald/10 drop-shadow-sm">
              {/* Center Saudi Node */}
              <circle cx="500" cy="300" r="12" className="fill-emerald" />
              <circle cx="500" cy="300" r="24" className="fill-emerald/20 animate-ping pulse" />

              {/* Global Bodies Nodes */}
              <circle cx="300" cy="200" r="6" className="fill-primary" /> {/* Europe - EA */}
              <circle cx="200" cy="350" r="6" className="fill-primary" /> {/* USA - ANAB */}
              <circle cx="750" cy="250" r="6" className="fill-primary" /> {/* APAC - APAC */}
              <circle cx="650" cy="450" r="6" className="fill-primary" /> {/* MEA - ARAC */}

              {/* Dynamic Paths */}
              <MapPath d="M 500 300 Q 400 200 300 200" delay={0.5} />
              <MapPath d="M 500 300 Q 350 350 200 350" delay={0.8} />
              <MapPath d="M 500 300 Q 625 225 750 250" delay={1.1} />
              <MapPath d="M 500 300 Q 575 400 650 450" delay={1.4} />

              <g className="text-[10px] font-bold fill-primary pointer-events-none">
                <text x="500" y="340" textAnchor="middle">RIYADH HUB (GL)</text>
                <text x="300" y="180" textAnchor="middle">EUROPE (EA)</text>
                <text x="200" y="380" textAnchor="middle">AMERICAS (ILAC)</text>
                <text x="750" y="230" textAnchor="middle">ASIA PACIFIC</text>
              </g>
            </svg>

            {/* Float Labels */}
            <div className="absolute top-1/4 left-1/4 p-4 rounded-xl bg-white/70 backdrop-blur border border-emerald/10 shadow-lg text-[10px] max-w-[120px] hidden md:block">
              <p className="font-bold text-emerald mb-1">ILAC MRA</p>
              <p className="text-muted-foreground leading-tight">Reports recognized globally without re-testing.</p>
            </div>
          </div>
        </section>

        <section id="remote-connectivity" className="relative py-24 bg-white rounded-[2.5rem] border border-emerald/5 shadow-inner">
          <div className=" py-40 dark:bg-black bg-white w-full">
            <div className="max-w-7xl mx-auto text-center">
              <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
                Mutual Recognition{" "}
                <span className="text-neutral-400">
                  {"Pacts".split("").map((word, idx) => (
                    <motion.span
                      key={idx}
                      className="inline-block"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: idx * 0.04 }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              </p>
              <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
                Through ILAC-MRA agreements, our reports are legally equivalent to certifications issued by equivalent bodies in North America, Europe, and Asia-Pacific.
              </p>
            </div>
            <WorldMap
              dots={[
                {
                  start: {
                    lat: 64.2008,
                    lng: -149.4937,
                  }, // Alaska (Fairbanks)
                  end: {
                    lat: 34.0522,
                    lng: -118.2437,
                  }, // Los Angeles
                },
                {
                  start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
                  end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                },
                {
                  start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                  end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
                },
                {
                  start: { lat: 51.5074, lng: -0.1278 }, // London
                  end: { lat: 28.6139, lng: 77.209 }, // New Delhi
                },
                {
                  start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                  end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
                },
                {
                  start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                  end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
                },
              ]}
            />
          </div>
        </section>

      </main>

      {/* 2E. COMPLIANCE FAB & DOCUMENT MANAGEMENT */}
      <div className="fixed bottom-12 right-12 z-[100] group">
        <div className="absolute right-0 bottom-full mb-6 flex flex-col items-end gap-3 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <Badge className="bg-white text-emerald border-emerald/20 shadow-xl px-4 py-2 text-sm whitespace-nowrap">Full Compliance Pack (PDF/ZIP)</Badge>
          <div className="bg-white rounded-2xl p-6 shadow-2xl border border-emerald/5 space-y-4 w-72">
            <h4 className="font-bold flex items-center gap-2">
              <Fingerprint className="w-5 h-5 text-emerald" /> Digital Identity
            </h4>
            <p className="text-xs text-muted-foreground">Certified bundle containing ISO scope, Commercial Register, and Chamber of Commerce docs.</p>
            <Button
              className="w-full bg-emerald hover:bg-emerald/90 h-10 gap-2"
              onClick={() => {
                setIsDownloading(true);
                setTimeout(() => setIsDownloading(false), 3000);
              }}
              disabled={isDownloading}
            >
              {isDownloading ? "Bundling Files..." : <><Download className="w-4 h-4" /> Download Pack</>}
            </Button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => { }}
          className="w-16 h-16 rounded-full bg-emerald text-white flex items-center justify-center shadow-2xl shadow-emerald/30 border-4 border-white/50 relative"
        >
          {isDownloading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="w-8 h-8 opacity-50" />
            </motion.div>
          ) : (
            <Download className="w-8 h-8" />
          )}

          <div className="absolute -top-1 -right-1 w-5 h-5 bg-teal rounded-full border-2 border-white flex items-center justify-center">
            <CheckCircle2 className="w-3 h-3 text-white" />
          </div>
        </motion.button>
      </div>

      {/* MODAL PREVIEW */}
      <Dialog open={!!selectedCred} onOpenChange={(open) => !open && setSelectedCred(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-[2rem]">
          <div className="p-12 space-y-8 bg-white relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <DialogHeader>
              <Badge className="w-fit mb-4 bg-emerald/10 text-emerald border-none">ACC-AUTH-VERIFIED</Badge>
              <DialogTitle className="text-4xl font-display font-bold">{selectedCred?.name}</DialogTitle>
              <DialogDescription className="text-lg">
                Full Scope Summary & Digital Authenticated Certificate
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-8 py-8 border-y border-emerald/10">
              <div className="space-y-6">
                <div className="aspect-[3/4] rounded-xl overflow-hidden border-2 border-emerald/10 shadow-lg relative group bg-sand/20">
                  <img
                    src={selectedCred?.image}
                    alt="Accreditation Document"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-emerald/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="secondary" size="sm" onClick={() => window.open(selectedCred?.image, '_blank')}>
                      Enlarge Document
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Standard Body</p>
                  <p className="font-bold">{selectedCred?.issuer}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Standard Type</p>
                    <Badge className="bg-emerald/10 text-emerald hover:bg-emerald/20 border-none px-3">{selectedCred?.type.toUpperCase()}</Badge>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Expiry Date</p>
                    <p className="font-bold text-emerald flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> {selectedCred?.validUntil}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Authorized Scope</p>
                    <p className="font-bold leading-tight">{selectedCred?.scope}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Legal ID</p>
                    <p className="font-bold font-mono uppercase text-lg">{selectedCred?.certNo}</p>
                  </div>
                </div>

                <div className="p-4 bg-emerald/5 rounded-xl border border-emerald/10 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                  <p className="text-[10px] text-emerald/70 leading-relaxed font-bold uppercase italic">
                    This document is digitally verified and timestamped via the SAAC central registry.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1 h-14 bg-emerald">View PDF Document</Button>
              <Button variant="outline" className="flex-1 h-14 border-2">Request Hard Copy</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer Branding */}
      <footer className="py-12 border-t mt-12 mb-24">
        <div className="container mx-auto px-4 text-center space-y-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold italic">Aligned with Saudi Vision 2030 Institutional Quality Framework</p>
          <div className="flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="text-3xl font-bold font-display">ILAC-MRA</div>
            <div className="text-3xl font-bold font-display">SAAC</div>
            <div className="text-3xl font-bold font-display">ISO 17025</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

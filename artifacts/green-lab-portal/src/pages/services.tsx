import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, MessageSquare, FileText, ArrowRight, X, FlaskConical, Target, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useLanguage } from "@/components/language-provider";
import { useToast } from "@/hooks/use-toast";
import { mockServices, Service } from "@/lib/mock-services";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Roadmap } from "@/components/services/Roadmap";

export default function Services() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(mockServices.map(s => s.category)));
    return ["All", ...cats];
  }, []);

  const filteredServices = useMemo(() => {
    return mockServices.filter(s => {
      const matchesSearch = 
        s.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.title.ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tagline.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || s.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleConsultSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast({
      title: language === 'en' ? "Request Received" : "تم استلام الطلب",
      description: language === 'en' ? "Our technical team will reach out within 24 hours." : "سيتواصل معك فريقنا الفني خلال 24 ساعة.",
    });
  };

  return (
    <div className={`min-h-screen bg-sand/30 font-sans ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* 1. HERO & SEARCH */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b bg-white">
        <div className="absolute inset-0 molecular-bg opacity-5" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Badge variant="outline" className="text-[#00C9B1] border-[#00C9B1]/20 bg-[#00C9B1]/5 px-4 py-1">
                {language === 'en' ? 'Laboratory Solutions Ecosystem' : 'نظام حلول المختبرات المتكامل'}
              </Badge>
              <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight">
                {language === 'en' ? 'Smart Analytics for' : 'تحليلات ذكية لـ'} <span className="text-[#00C9B1] italic">{language === 'en' ? 'Global Impact.' : 'تأثير عالمي.'}</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {language === 'en' 
                  ? "Transforming raw data into regulatory trust. Explore our specialized analytical domains from clinical pharma to heritage oud."
                  : "تحويل البيانات الخام إلى ثقة تنظيمية. استكشف مجالاتنا التحليلية المتخصصة من الأدوية السريرية إلى العود التراثي."}
              </p>
            </motion.div>

            {/* EXPERT MATCHER - SEARCH BAR */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative max-w-2xl mx-auto"
            >
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[#00C9B1] group-hover:scale-110 transition-transform" />
                <Input 
                  placeholder={language === 'en' ? "Describe your need or search services..." : "صف حاجتك أو ابحث في الخدمات..."}
                  className="h-16 pl-16 pr-6 bg-white border-2 border-[#00C9B1]/10 shadow-xl rounded-2xl text-lg focus-visible:ring-[#00C9B1] focus-visible:border-[#00C9B1]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* FILTER PILLS */}
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                      activeCategory === cat 
                        ? 'bg-[#00C9B1] text-white shadow-lg' 
                        : 'bg-[#00C9B1]/5 text-[#00C9B1] hover:bg-[#00C9B1]/10 border border-[#00C9B1]/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. BENTO GRID */}
      <main className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onClick={() => setSelectedService(service)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* CONSULTING HUB SPECIAL FEATURE */}
        {activeCategory === "All" || activeCategory === "Consulting" ? (
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-24 bg-white rounded-[3rem] border border-emerald/5 shadow-2xl overflow-hidden"
          >
            <div className="grid lg:grid-cols-2">
              <div className="p-16 space-y-8">
                 <Badge className="bg-primary/10 text-primary border-none text-xs font-bold">Registration & Consulting Hub</Badge>
                 <h2 className="text-4xl font-display font-bold">Your Direct Path to <span className="text-primary italic">Compliance.</span></h2>
                 <p className="text-muted-foreground leading-relaxed">
                   We navigate the complexities of SFDA, GSO, and International regulatory bodies so you can focus on growth. From gap analysis to final approval.
                 </p>
                 <Button className="h-14 px-10 bg-primary text-white font-bold rounded-xl" onClick={handleConsultSubmit}>
                   Start Your Registration Journey
                 </Button>
              </div>
              <div className="bg-primary/5 flex items-center justify-center p-8">
                 <Roadmap color="#2563EB" />
              </div>
            </div>
          </motion.section>
        ) : null}
      </main>

      {/* 3. DUAL CTA SECTION - MODERATED PADDING */}
      <section className="bg-[#0A5C36] py-20 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl font-display font-bold">Ready to Scale Your Standards?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="h-14 px-10 bg-white text-emerald font-bold hover:bg-emerald-50 rounded-xl" onClick={handleConsultSubmit}>
                Request Proposal
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* DETAIL SIDE DRAWER */}
      <Sheet open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
        <SheetContent side={language === 'ar' ? 'left' : 'right'} className="w-full sm:max-w-xl p-0 border-none rounded-l-[3rem]">
          <div className="h-full flex flex-col bg-white">
            <div className="relative h-64">
               <img src={selectedService?.image} alt={selectedService?.title[language]} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
               <button 
                 onClick={() => setSelectedService(null)}
                 className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all"
               >
                 <X className="w-6 h-6" />
               </button>
            </div>

            <div className="p-10 flex-1 overflow-y-auto space-y-10">
               <div>
                  <Badge style={{ backgroundColor: selectedService?.accent }} className="text-white border-none mb-4 uppercase text-[10px] tracking-widest">
                    {selectedService?.category} Domain
                  </Badge>
                  <SheetTitle className="text-4xl font-display font-bold mb-4">{selectedService?.title[language]}</SheetTitle>
                  <SheetDescription className="text-lg leading-relaxed">{selectedService?.description[language]}</SheetDescription>
               </div>

               <div className="grid grid-cols-2 gap-8 py-8 border-y border-emerald/5">
                  <div className="space-y-4">
                     <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Scope of Accreditation</p>
                     <div className="flex flex-wrap gap-2">
                        {selectedService?.specs.accreditations.map(acc => (
                          <Badge key={acc} variant="secondary" className="bg-emerald/5 text-emerald border-none font-bold">
                             <ShieldCheck className="w-3 h-3 mr-1.5" /> {acc}
                          </Badge>
                        ))}
                     </div>
                  </div>
                  <div className="space-y-4">
                     <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Turnaround Time</p>
                     <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-xs">
                           <span className="text-muted-foreground">Standard</span>
                           <span className="font-bold">{selectedService?.specs.tat.standard}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-primary">
                           <span className="font-bold">Express Delivery</span>
                           <span className="font-black underline">{selectedService?.specs.tat.express}</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Required Infrastructure</p>
                  <div className="flex flex-wrap gap-3">
                     {selectedService?.specs.equipment.map(eq => (
                        <div key={eq} className="flex items-center gap-3 p-3 bg-sand/20 rounded-xl border border-emerald/5">
                           <Microscope className="w-5 h-5 text-emerald" />
                           <span className="text-sm font-bold">{eq}</span>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="pt-10">
                  <Button className="w-full h-16 bg-emerald text-white font-bold text-xl rounded-2xl shadow-xl shadow-emerald/10" onClick={handleConsultSubmit}>
                     Request Method Validation
                  </Button>
               </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

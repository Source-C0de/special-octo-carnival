import { useParams, Link } from "wouter";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { mockServices } from "@/lib/mock-services";
import { 
  ArrowLeft, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  FlaskConical, 
  Download, 
  Microscope, 
  Activity, 
  Droplets,
  Zap,
  Layers,
  ChevronRight,
  FileSearch,
  Dna
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { ChromatographyPreview } from "@/components/services/ChromatographyPreview";

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const service = mockServices.find(s => s.id === id);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) return null;

  const t = {
    en: {
      back: "Back to Ecosystem",
      accreditation: "Accreditation Scope",
      equipment: "Laboratory Infrastructure",
      tat: "Turnaround Intelligence",
      standard: "Standard Delivery",
      express: "Express Lane",
      rush: "Critical Rush",
      workflow: "Analytical Workflow",
      request: "Initiate Validation",
      download: "Download Full Scope"
    },
    ar: {
      back: "العودة للخدمات",
      accreditation: "نطاق الاعتماد",
      equipment: "البنية التحتية للمختبر",
      tat: "ذكاء وقت الإنجاز",
      standard: "التسليم القياسي",
      express: "المسار السريع",
      rush: "الاستعجال الحرج",
      workflow: "سير العمل التحليلي",
      request: "بدء عملية التصديق",
      download: "تحميل النطاق الكامل"
    }
  }[language];

  return (
    <div ref={containerRef} className={`min-h-screen bg-white font-sans overflow-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      
      {/* 1. IMMERSIVE HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
        {/* Animated Molecular Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,201,177,0.15)_0,transparent_70%)]" />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" 
          />
        </div>

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="container relative z-10 mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <Link href="/services">
              <button className="group flex items-center gap-2 text-teal font-bold mb-8 hover:opacity-80 transition-all mx-auto">
                <ArrowLeft className={`w-5 h-5 transition-transform group-hover:-translate-x-1 ${language === 'ar' ? 'rotate-180' : ''}`} />
                {t.back}
              </button>
            </Link>

            <Badge className="px-6 py-2 bg-teal/10 text-teal border border-teal/20 backdrop-blur-md rounded-full text-xs font-black tracking-widest uppercase mb-4">
              {service.category} Analytical Domain
            </Badge>

            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-none mb-8">
              {service.title[language]}
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
              {service.tagline[language]}
            </p>

            <div className="pt-12 flex flex-wrap justify-center gap-6">
              <Button size="lg" className="h-16 px-10 bg-teal hover:bg-teal/90 text-white font-bold text-xl rounded-2xl shadow-2xl shadow-teal/20">
                {t.request}
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-10 border-white/20 text-white font-bold text-xl rounded-2xl hover:bg-white/5 backdrop-blur-md">
                <Download className="w-6 h-6 mr-3" /> {t.download}
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Decorative Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-[10%] w-64 h-64 bg-teal/20 blur-[100px] rounded-full"
        />
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 left-[5%] w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full"
        />
      </section>

      {/* 2. SPECIFICATIONS & INFRASTRUCTURE */}
      <section className="py-32 relative bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            
            {/* Left: Interactive Infrastructure Showcase */}
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-display font-bold text-slate-900">{t.equipment}</h2>
                <div className="h-1 w-20 bg-teal" />
              </div>

              <div className="grid grid-cols-1 gap-6">
                {service.specs.equipment.map((eq, idx) => (
                  <motion.div 
                    key={eq}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative p-8 rounded-[2rem] bg-slate-50 border border-slate-100 overflow-hidden hover:border-teal/30 hover:bg-white hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-teal/10 flex items-center justify-center text-teal group-hover:bg-teal group-hover:text-white transition-all duration-500 shadow-inner">
                          <Microscope className="w-8 h-8" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-slate-900">{eq} System</h4>
                          <p className="text-slate-500 text-sm">Ultra-precision quantitative analysis</p>
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-teal group-hover:translate-x-2 transition-all" />
                    </div>
                    {/* Animated Wave on Hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Technical Matrix & Accreditation */}
            <div className="space-y-12">
               <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-teal/10 blur-[80px] -translate-y-1/2 translate-x-1/2" />
                  
                  <div className="relative z-10 space-y-10">
                    <div className="space-y-2">
                      <h3 className="text-3xl font-display font-bold">{t.accreditation}</h3>
                      <p className="text-slate-400">Validated under international regulatory frameworks.</p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      {service.specs.accreditations.map(acc => (
                        <div key={acc} className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 hover:bg-white/10 transition-colors">
                           <ShieldCheck className="w-6 h-6 text-teal" />
                           <span className="font-bold tracking-widest">{acc}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-10 border-t border-white/10 grid grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <div className="flex items-center gap-2 text-teal text-[10px] font-black uppercase tracking-widest">
                            <Clock className="w-3 h-3" /> {t.standard}
                          </div>
                          <div className="text-4xl font-bold">{service.specs.tat.standard}</div>
                       </div>
                       <div className="space-y-2">
                          <div className="flex items-center gap-2 text-teal text-[10px] font-black uppercase tracking-widest">
                            <Zap className="w-3 h-3" /> {t.express}
                          </div>
                          <div className="text-4xl font-bold text-teal">{service.specs.tat.express}</div>
                       </div>
                    </div>
                  </div>
               </div>

               <div className="p-10 rounded-[2rem] border-2 border-dashed border-slate-200 bg-sand/10 flex items-center gap-8">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-xl shrink-0">
                    <FileSearch className="w-10 h-10 text-teal" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900">Custom Protocol Development</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">Need a methodology not listed? Our team develops custom SOPs for specialized industrial applications.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ANALYTICAL WORKFLOW (FLOWING PATH) */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
           <div className="text-center mb-24 space-y-4">
              <h2 className="text-5xl font-display font-bold text-slate-900">{t.workflow}</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">From sample receipt to institutional validation—a journey of precision.</p>
           </div>

           <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Connector Line */}
              <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-slate-200" />
              
              {[
                { icon: Layers, label: "Sample Receipt", desc: "Chain-of-custody logging" },
                { icon: Activity, label: "Preparation", desc: "Extraction & purification" },
                { icon: Dna, label: "Instrumentation", desc: "Molecular profiling" },
                { icon: ShieldCheck, label: "QA Review", desc: "Institutional validation" }
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="relative z-10 text-center space-y-6"
                >
                  <div className="w-24 h-24 rounded-full bg-white border border-slate-100 shadow-xl flex items-center justify-center mx-auto group hover:bg-teal transition-all duration-500">
                    <step.icon className="w-10 h-10 text-teal group-hover:text-white transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-slate-900">{step.label}</h4>
                    <p className="text-slate-500 text-sm px-4">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION SHOWROOM */}
      <section className="py-32 bg-teal relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0,transparent_60%)]" />
         <div className="container relative z-10 mx-auto px-4 text-center text-white space-y-12">
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight">
               Precision is a <br /> <span className="text-slate-900 italic">Decision.</span>
            </h2>
            <p className="text-teal-50/70 text-xl max-w-2xl mx-auto leading-relaxed">
               Partner with Green Lab for results that stand up to global scrutiny and regulatory audits.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-6">
              <Button size="lg" className="h-16 px-12 bg-slate-900 text-white font-bold text-2xl rounded-2xl hover:bg-slate-800 transition-all shadow-2xl">
                 Request Meeting
              </Button>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-16 px-12 border-white/20 text-white font-bold text-2xl rounded-2xl hover:bg-white/10 backdrop-blur-sm">
                   Contact Lab
                </Button>
              </Link>
            </div>
         </div>
      </section>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, Award, Building2, CheckCircle2, FlaskConical,
  MapPin, ShieldCheck, Users, Target, Zap, Globe,
  Microscope, Beaker, ClipboardCheck, MessageSquare, FileText,
  Linkedin, Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { aboutMilestones, aboutValues, expertProfiles } from "@/lib/mock-data";

// Reusable Counter Component
const MetricCounter = ({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center md:text-left space-y-1">
      <div className="text-4xl md:text-5xl font-display font-bold text-emerald flex items-center justify-center md:justify-start gap-1">
        {count}{suffix}
      </div>
      <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/60">{label}</p>
    </div>
  );
};

const milestones = [
  {
    year: "2018",
    title: { en: "The Foundation", ar: "التأسيس" },
    desc: "Laid the first stones of Saudi-owned precision testing.",
    icon: Beaker,
  },
  {
    year: "2019",
    title: { en: "Accreditation Leap", ar: "قفزة الاعتماد" },
    desc: "ISO/IEC 17025 certification achieved.",
    icon: Award,
  },
  {
    year: "2021",
    title: { en: "State Recognition", ar: "الاعتراف الحكومي" },
    desc: "SFDA authorization secured.",
    icon: ClipboardCheck,
  },
  {
    year: "2024",
    title: { en: "Saudi Vision Era", ar: "عصر رؤية السعودية" },
    desc: "Expansion into NEOM & futuristic projects.",
    icon: Microscope,
  },
];

export default function About() {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef(null);

  /* Scroll Progress */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  /* Line Draw Progress */
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  /* Detect Active Stage */
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const total = milestones.length;
      const step = Math.min(
        total - 1,
        Math.floor(v * total)
      );
      setActiveIndex(step);
    });

    return () => unsubscribe();
  }, [scrollYProgress, milestones.length]);

  // 🔥 Auto step progression
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev < milestones.length - 1 ? prev + 1 : prev
      );
    }, 1200);

    return () => clearInterval(interval);
  }, []);


  const t = {
    en: {
      heroTag: "Pioneering Analytical Quality",
      heroTitle: "Advancing Science for a Better Tomorrow",
      heroDesc: "Green Lab is the Kingdom's premier destination for high-precision analytical services, bridging the gap between global laboratory standards and Saudi Arabia's Vision 2030.",
      visionTitle: "Scientific Leadership",
      visionDesc: "Our vision is to be the benchmark of analytical excellence in the Middle East, empowering industries through data-driven trust.",
      valuesTitle: "Institutional Core Values",
      milestonesTitle: "The Journey of Precision",
      leadershipTitle: "Expertise & Local Impact",
      leadershipDesc: "Scientific leadership meets regional operational excellence to support Saudi Arabia's industrial transformation.",
      journeyTitle: "The Partner Journey",
    },
    ar: {
      heroTag: "ريادة الجودة التحليلية",
      heroTitle: "تطوير العلم لمستقبل أفضل",
      heroDesc: "جرين لاب هو الوجهة الرائدة في المملكة للخدمات التحليلية عالية الدقة، حيث يسد الفجوة بين معايير المختبرات العالمية ورؤية السعودية 2030.",
      visionTitle: "القيادة العلمية",
      visionDesc: "رؤيتنا هي أن نكون المرجع للتميز التحليلي في الشرق الأوسط، لتمكين الصناعات من خلال الثقة القائمة على البيانات.",
      valuesTitle: "القيم المؤسسية الأساسية",
      milestonesTitle: "رحلة الدقة",
      leadershipTitle: "الخبرة والأثر المحلي",
      leadershipDesc: "تترابط القيادة العلمية مع التميز التشغيلي الإقليمي لدعم التحول الصناعي في المملكة.",
      journeyTitle: "رحلة الشريك",
    }
  }[language];

  const { scrollYProgress: windowScroll } = useScroll();
  const yParallax = useTransform(windowScroll, [0, 1], [0, -200]);

  return (
    <div className={`min-h-screen bg-sand/30 font-sans overflow-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`}>

      {/* 1. PREMIUM HERO SECTION */}
      <section className="relative pt-32 pb-24 lg:pt-24 lg:pb-16 overflow-hidden bg-white bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-pharma-grid" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <Badge className="bg-emerald/10 text-emerald border-none px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
                {t.heroTag}
              </Badge>
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight text-foreground">
                {t.heroTitle.split(' ').map((word, i) => (
                  <span key={i} className={word === 'Tomorrow' || word === 'أفضل' ? 'text-emerald italic' : ''}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                {t.heroDesc}
              </p>

              {/* ANIMATED METRICS COUNTER */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-emerald/5">
                <MetricCounter value={500} suffix="+" label="Clients" />
                <MetricCounter value={100} suffix="%" label="Audit Success" />
                <MetricCounter value={12} suffix="+" label="Sectors" />
                <MetricCounter value={10} suffix="k+" label="Tests / Year" />
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="h-14 px-10 bg-emerald rounded-2xl font-bold shadow-xl shadow-emerald/10 hover:bg-emerald/90">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-10 border-emerald/10 text-primary rounded-2xl font-bold">
                  View Certifications
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-emerald/10 aspect-[4/5] lg:aspect-square border-[0.5px] border-emerald/10">
                <img src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=1200" alt="Lab Excellence" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-emerald/10 mix-blend-multiply" />
              </div>

              {/* Floating trust card */}
              <motion.div
                style={{ y: yParallax }}
                className="absolute -bottom-10 -left-10 z-20 bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-emerald/5 max-w-xs"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald/10 flex items-center justify-center text-emerald">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="font-display font-bold text-xl uppercase tracking-tighter">Global Compliance</div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Every batch processed aligns with international ISO 17025 standards and SFDA regulatory requirements.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. VALUES SECTION */}
      <section className="py-32 container mx-auto px-4">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold">{t.valuesTitle}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Foundational principles that drive our analytical precision and industry leadership.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {aboutValues.map((value, index) => (
            <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Card className="h-full border-emerald/5 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all rounded-[2rem] p-8 overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 select-none pointer-events-none opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <span className="text-7xl font-black font-display rotate-12 block"></span>
                </div>
                <div className="relative z-10">
                  <div className="mb-6 w-14 h-14 items-center justify-center flex rounded-2xl bg-emerald/10 text-emerald">
                    {index === 0 ? <CheckCircle2 className="w-7 h-7" /> : index === 1 ? <Users className="w-7 h-7" /> : <ShieldCheck className="w-7 h-7" />}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. CLIENT JOURNEY (THE PARTNER PATH) */}
      {/* <section className="py-32 overflow-hidden bg-white border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-4">
            <Badge className="bg-primary/10 text-primary border-none text-[10px] font-black tracking-widest uppercase px-4 py-1">{t.journeyTitle}</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold">From Inquiry to <span className="text-primary italic">Compliance.</span></h2>
          </div>

          <div className="relative">
            <div className="absolute top-[45px] left-0 right-0 h-[2px] bg-emerald/5 hidden lg:block">
              <motion.div
                className="h-full bg-emerald shadow-[0_0_15px_#10b981]"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 relative z-10">
              {[
                { id: "01", icon: MessageSquare, title: { en: "Consultation", ar: "الاستشارة" }, desc: { en: "Strategic technical alignment.", ar: "التوافق الفني الاستراتيجي." } },
                { id: "02", icon: ShieldCheck, title: { en: "Logistics", ar: "اللوجستيات" }, desc: { en: "Secure sample chain-of-custody.", ar: "سلسلة الحيازة الآمنة للعينات." } },
                { id: "03", icon: Microscope, title: { en: "Analysis", ar: "التحليل" }, desc: { en: "High-precision instrumentation.", ar: "أجهزة عالية الدقة." } },
                { id: "04", icon: ClipboardCheck, title: { en: "Verification", ar: "التحقق" }, desc: { en: "Strict ISO/SFDA local audit.", ar: "تدقيق محلي صارم." } },
                { id: "05", icon: FileText, title: { en: "Reporting", ar: "التقارير" }, desc: { en: "Instant digital records.", ar: "سجلات رقمية فورية." } }
              ].map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="w-24 h-24 rounded-3xl bg-white border-2 border-emerald/10 flex items-center justify-center text-emerald mb-6 group-hover:border-emerald group-hover:bg-emerald/5 transition-all shadow-xl shadow-emerald/5 group-hover:scale-110">
                      <Icon className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-primary/40 uppercase tracking-tighter">Phase {step.id}</span>
                      <h4 className="text-xl font-bold">{step.title[language]}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed px-4">{step.desc[language]}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section> */}
      <section className="py-32 bg-white border-y overflow-hidden">
        <div className="container mx-auto px-4">

          {/* Header */}
          <div className="text-center mb-24 space-y-4">
            <Badge className="bg-primary/10 text-primary border-none text-[10px] font-black tracking-widest uppercase px-4 py-1">
              {t.journeyTitle}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              From Inquiry to <span className="text-primary italic">Compliance.</span>
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">

            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-[2px] h-full bg-emerald/10">
              <motion.div
                className="w-full bg-emerald shadow-[0_0_20px_#10b981]"
                initial={{ height: "0%" }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-24">
              {[
                {
                  id: "01",
                  icon: MessageSquare,
                  title: { en: "Consultation", ar: "الاستشارة" },
                  desc: {
                    en: "Strategic technical alignment.",
                    ar: "التوافق الفني الاستراتيجي.",
                  },
                },
                {
                  id: "02",
                  icon: ShieldCheck,
                  title: { en: "Logistics", ar: "اللوجستيات" },
                  desc: {
                    en: "Secure sample chain-of-custody.",
                    ar: "سلسلة الحيازة الآمنة للعينات.",
                  },
                },
                {
                  id: "03",
                  icon: Microscope,
                  title: { en: "Analysis", ar: "التحليل" },
                  desc: {
                    en: "High-precision instrumentation.",
                    ar: "أجهزة عالية الدقة.",
                  },
                },
                {
                  id: "04",
                  icon: ClipboardCheck,
                  title: { en: "Verification", ar: "التحقق" },
                  desc: {
                    en: "Strict ISO/SFDA local audit.",
                    ar: "تدقيق محلي صارم.",
                  },
                },
                {
                  id: "05",
                  icon: FileText,
                  title: { en: "Reporting", ar: "التقارير" },
                  desc: {
                    en: "Instant digital records.",
                    ar: "سجلات رقمية فورية.",
                  },
                },
              ].map((step, i) => {
                const Icon = step.icon;
                const isLeft = i % 2 === 0;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    className={`relative flex items-center ${isLeft ? "justify-start" : "justify-end"
                      }`}
                  >

                    {/* Content Card */}
                    <div className="w-full md:w-1/2 px-6">
                      <div className="bg-white border border-emerald/10 rounded-2xl p-6 shadow-xl hover:shadow-emerald/10 transition-all group">

                        <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest">
                          Phase {step.id}
                        </span>

                        <h4 className="text-xl font-bold mt-2">
                          {step.title[language]}
                        </h4>

                        <p className="text-sm text-muted-foreground mt-2">
                          {step.desc[language]}
                        </p>
                      </div>
                    </div>

                    {/* Center Icon */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                      <div className="w-20 h-20 rounded-2xl bg-white border-2 border-emerald/20 flex items-center justify-center text-emerald shadow-lg group-hover:scale-110 transition-all">
                        <Icon className="w-8 h-8" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/*<section className="bg-sand/30 py-40 border-y">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-24 space-y-4">
            <Badge variant="outline" className="border-emerald/20 text-emerald uppercase text-[10px] font-black tracking-[0.2em]">{t.milestonesTitle}</Badge>
            <h2 className="text-5xl font-display font-bold">Chronicles of Evolution</h2>
          </div>

          <div className="relative space-y-24">
            <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-px bg-emerald/10 -translate-x-1/2 hidden md:block" />

            {[
              { year: "2018", title: { en: "The Foundation", ar: "التأسيس" }, desc: "Laid the first stones of Saudi-owned precision testing.", icon: Beaker, align: "right" },
              { year: "2019", title: { en: "Accreditation Leap", ar: "قفزة الاعتماد" }, desc: "Attained ISO/IEC 17025 certification across core scopes.", icon: Award, align: "left" },
              { year: "2021", title: { en: "State Recognition", ar: "الاعتراف الحكومي" }, desc: "SFDA authorization for drug and food safety analytics.", icon: ClipboardCheck, align: "right" },
              { year: "2024", title: { en: "Saudi Vision Era", ar: "عصر رؤية السعودية" }, desc: "Expansion into futurist projects and NEOM specialized support.", icon: Microscope, align: "left" },
            ].map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: milestone.align === 'left' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={`relative flex items-center justify-center md:justify-between w-full md:even:flex-row-reverse`}
              >
                <div className="hidden md:flex flex-1" />
                <div className="relative z-10 w-16 h-16 rounded-[2rem] bg-emerald text-white flex items-center justify-center mx-10 shadow-2xl shadow-emerald/30 border-4 border-white">
                  <milestone.icon className="w-7 h-7" />
                </div>
                <div className="flex-1 bg-white p-10 rounded-[3rem] shadow-xl border border-emerald/5 hover:border-emerald/20 transition-colors">
                  <span className="text-emerald font-mono font-bold text-xl mb-3 block">{milestone.year}</span>
                  <h4 className="text-2xl font-bold mb-3">{milestone.title[language]}</h4>
                  <p className="text-muted-foreground leading-relaxed">{milestone.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}


      <section
        ref={sectionRef}
        className="bg-sand/30 py-40 border-y overflow-hidden relative"
      >
        {/* Heading */}
        <div className="container mx-auto px-4 text-center mb-24">
          <h2 className="text-5xl font-display font-bold">
            Chronicles of Evolution
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto px-6">

          {/* SVG Continuous Path */}
          <svg
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none"
            viewBox="0 0 1000 1800"
            preserveAspectRatio="none"
          >
            {/* Background Line */}
            <path
              d="
              M500 50
              Q800 150 700 300
              Q500 450 300 600
              Q200 750 500 900
              Q800 1050 700 1200
              Q500 1350 300 1500
              Q200 1650 500 1750
            "
              fill="none"
              stroke="#d1d5db"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Active Animated Line */}
            <motion.path
              d="
              M500 50
              Q800 150 700 300
              Q500 450 300 600
              Q200 750 500 900
              Q800 1050 700 1200
              Q500 1350 300 1500
              Q200 1650 500 1750
            "
              fill="none"
              stroke="url(#grad)"
              strokeWidth="5"
              strokeLinecap="round"
              style={{ pathLength }}
            />

            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
          </svg>

          {/* Nodes */}
          <div className="relative flex flex-col gap-32">
            {milestones.map((item, i) => {
              const Icon = item.icon;
              const isActive = i <= activeIndex;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 ${i % 2 === 0
                    ? "justify-start"
                    : "justify-end"
                    }`}
                >
                  {/* Card + Node Side */}
                  <div
                    className={`flex items-center gap-6 ${i % 2 === 0
                      ? "flex-row"
                      : "flex-row-reverse"
                      }`}
                  >
                    {/* Node */}
                    <div
                      className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all duration-500 z-10
                    ${isActive
                          ? "bg-gradient-to-br from-emerald to-green-500 shadow-emerald/40 scale-110"
                          : "bg-gray-300"
                        }`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>

                    {/* Card */}
                    <div
                      className={`bg-white p-6 rounded-2xl shadow-lg border max-w-sm transition-all duration-500
                    ${isActive
                          ? "border-emerald/20 opacity-100"
                          : "opacity-40"
                        }`}
                    >
                      <span className="text-emerald font-mono font-bold block">
                        {item.year}
                      </span>

                      <h4 className="font-bold text-lg mt-1">
                        {item.title[language]}
                      </h4>

                      <p className="text-sm text-muted-foreground mt-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. LEADERSHIP & SCIENTIFIC EXPERTS (REDESIGNED) */}
      <section className="py-32 container mx-auto px-4">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-20 items-end mb-20">
          <div className="space-y-6">
            <Badge variant="outline" className="text-emerald border-emerald/20 uppercase tracking-widest text-[10px] font-black">Leadership</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">{t.leadershipTitle}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{t.leadershipDesc}</p>
          </div>
          <div className="flex justify-end">
            <Button variant="outline" className="h-14 px-8 border-emerald/10 rounded-2xl group">
              View All Scientific Staff <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {expertProfiles.map((expert, i) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Card className="overflow-hidden border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] bg-white">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={expert.image} alt={expert.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald/90 via-emerald/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8 gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-white hover:text-emerald transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-white hover:text-emerald transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-8 text-center md:text-left space-y-2">
                  <div className="flex items-center justify-center md:justify-between mb-2">
                    <p className="font-display font-bold text-2xl">{expert.name}</p>
                    <Badge className="bg-emerald/5 text-emerald border-none hidden md:flex">CORE EXPERT</Badge>
                  </div>
                  <p className="text-emerald font-black uppercase tracking-widest text-[10px]">{expert.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">{expert.credentials}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. LOCAL IMPACT & SCIENTIFIC HUBS (BENTO REDESIGN) */}
      {/* <section className="py-32 bg-[#0A5C36] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-pharma-grid" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-16">
            <div className="space-y-6">
              <Badge className="bg-teal/20 text-teal-300 border-none px-4 py-1 text-[10px] font-black tracking-widest uppercase">Local Impact</Badge>
              <h2 className="text-4xl md:text-5xl font-display font-bold">Kingdom-Wide <br /> Scientific Presence.</h2>
            </div>
            <p className="text-emerald-50 text-xl leading-relaxed opacity-80">
              Our regional hubs catalyze Saudi Vision 2030 by bringing high-precision analytical science to every corner of the Kingdom, from industrial zones to futuristic mega-projects.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { id: "rh", hub: "Riyadh Central", role: "Pharmaceutical HQ", capacity: "Full-Spectrum", size: "md:col-span-2" },
              { id: "jh", hub: "Jeddah Logistics", role: "Vessel Sampling", capacity: "Fast-Track Port Access", size: "md:col-span-1" },
              { id: "dh", hub: "Dammam Hub", role: "Industrial Corridor", capacity: "Polymer & Oil Specialists", size: "md:col-span-1" },
              { id: "nh", hub: "NEOM Project Support", role: "Future Cities", capacity: "Sustainable Technology Support", size: "md:col-span-2" },
              { id: "gh", hub: "National Network", role: "Impact Factor", capacity: "100% Regional Coverage", size: "md:col-span-2" }
            ].map((node, i) => (
              <motion.div
                key={node.id}
                className={`${node.size} bg-white/5 backdrop-blur-md rounded-[2.5rem] p-10 border border-white/10 hover:bg-white/10 transition-all group`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-teal-300 group-hover:scale-110 transition-transform">
                    {i === 3 ? <Target className="w-7 h-7" /> : <MapPin className="w-7 h-7" />}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300/60">Node {node.id.toUpperCase()}</span>
                  </div>
                </div>
                <h3 className="text-3xl font-display font-bold mb-2">{node.hub}</h3>
                <p className="text-teal-300 font-bold text-sm mb-6">{node.role}</p>
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <div className="w-2 h-2 rounded-full bg-emerald shadow-[0_0_8px_#10b981]" />
                  {node.capacity}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* 6. MILESTONE CHRONICLES */}

      {/* 7. CTA - FINAL PRECISION CALL */}
      {/* <section className="py-32 container mx-auto px-4">
        <div className="bg-[#0A5C36] text-white rounded-[3.5rem] p-16 md:p-32 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 molecular-bg opacity-10 pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-12 relative z-10"
          >
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight">Experience <span className="text-teal-300 italic">Scientific Harmony.</span></h2>
            <p className="text-xl text-emerald-100/70 leading-relaxed font-medium">
              Join 500+ corporate partners who rely on our institutional quality and accredited precision to drive the future of Saudi industry.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="h-16 px-12 bg-white text-emerald rounded-[1.5rem] font-bold text-lg hover:bg-emerald-50 transition-all hover:scale-105">
                Request Global Consultation
              </Button>
              <Link href="/services">
                <Button size="lg" variant="outline" className="h-16 px-12 border-white/20 text-white rounded-[1.5rem] font-bold text-lg hover:bg-white/10 transition-all">
                  Explore Solution Grid
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section> */}



    </div>
  );
}
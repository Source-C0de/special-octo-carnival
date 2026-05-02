import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, animate } from "framer-motion";
import { ArrowRight, FileText, CheckCircle2, Award, ShieldCheck, Microscope, FlaskConical, Stethoscope, Activity, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { services, industries, caseStudies, expertProfiles, testimonials } from "@/lib/mock-data";
import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble";

function AnimatedCounter({ value, label, prefix = "", suffix = "" }: { value: number, label: string, prefix?: string, suffix?: string }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLDivElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (val) => {
          setCount(Math.round(val));
        }
      });
      return controls.stop;
    }
  }, [inView, value]);

  return (
    <div ref={nodeRef} className="flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl relative overflow-hidden group transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#00C9B1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="text-5xl md:text-6xl font-display font-bold text-[#00C9B1] mb-2 flex items-center drop-shadow-sm">
        {prefix}{count}{suffix}
      </div>
      <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground font-semibold text-center mt-2 group-hover:text-foreground transition-colors">
        {label}
      </p>
    </div>
  );
}

function ServiceCardHome({ service, index }: { service: any, index: number }) {
  const [hovered, setHovered] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "FlaskConical": return <FlaskConical className="w-6 h-6" />;
      case "Microscope": return <Microscope className="w-6 h-6" />;
      case "Activity": return <Activity className="w-6 h-6" />;
      case "Droplets": return <Droplets className="w-6 h-6" />;
      default: return <FlaskConical className="w-6 h-6" />;
    }
  };

  const getColors = (id: string) => {
    const colors: Record<string, { bg: string, border: string, text: string }> = {
      "s-01": { bg: "bg-emerald-50/50", border: "border-emerald-200", text: "text-emerald-600" },
      "s-02": { bg: "bg-blue-50/50", border: "border-blue-200", text: "text-blue-600" },
      "s-03": { bg: "bg-orange-50/50", border: "border-orange-200", text: "text-orange-600" },
      "s-04": { bg: "bg-cyan-50/50", border: "border-cyan-200", text: "text-cyan-600" },
      "s-05": { bg: "bg-rose-50/50", border: "border-rose-200", text: "text-rose-600" },
      "s-06": { bg: "bg-purple-50/50", border: "border-purple-200", text: "text-purple-600" },
    };
    return colors[id] || colors["s-01"];
  };

  const colorSet = getColors(service.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group h-full"
    >
      <Card className={`h-full relative overflow-hidden transition-all duration-500 border-2 ${colorSet.bg} ${colorSet.border} group-hover:shadow-2xl group-hover:-translate-y-2`}>
        {/* SVG Flowing Border */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none">
          <motion.rect
            x="0" y="0" width="100%" height="100%"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="100, 1000"
            className={`${colorSet.text} opacity-0 group-hover:opacity-100`}
            animate={hovered ? { strokeDashoffset: [-1000, 0] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        <CardHeader>
          <div className={`w-14 h-14 rounded-2xl ${colorSet.bg} ${colorSet.text} flex items-center justify-center mb-4 shadow-inner border border-white/50 group-hover:scale-110 transition-transform duration-500`}>
            {getIcon(service.icon)}
          </div>
          <CardTitle className="text-2xl font-display font-bold">{service.title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            {service.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {service.badges.map((b: string) => (
              <Badge key={b} variant="outline" className={`border-none ${colorSet.bg} ${colorSet.text} font-bold text-[10px] uppercase tracking-wider`}>
                {b}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-black/5">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">Accuracy</span>
              <span className="font-bold text-sm">99.9% Reliable</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">TAT</span>
              <span className="font-bold text-sm text-[#00C9B1]">{service.tat.standard}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <Link href={`/services/${service.id}`} className="w-full">
            <Button variant="ghost" className={`w-full justify-between rounded-xl group-hover:bg-white/80 ${colorSet.text} font-bold`}>
              Explore Analytical Scope
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </CardFooter>
      </Card>

      {/* Background Glow */}
      <div className={`absolute -inset-2 ${colorSet.bg} blur-2xl opacity-0 group-hover:opacity-20 transition-opacity rounded-[3rem] -z-10`} />
    </motion.div>
  );
}


export default function Home() {
  const [activeIndustry, setActiveIndustry] = useState("All");
  const [mounted, setMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setMounted(true);
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2500);

    return () => {
      clearInterval(stepInterval);
    };
  }, []);

  const filteredServices = activeIndustry === "All"
    ? services.slice(0, 6)
    : services.filter(s => s.industries.includes(activeIndustry));

  const clientList = [
    "Green Lab Group", "Saudi BioTech Solutions", "Al-Noor Pharmaceuticals", "Middle East Food Industries",
    "Gulf Petrochem", "Arammed Healthcare", "Riyadh Water Authority",
    "Vision Environmental Labs", "Qassim Agricultural", "Jeddah Cosmetics Co.",
    "Desert Springs Water", "Saudi Advanced Materials", "Red Sea Agritech",
    "Taiba Pharma", "KSA Industrial Group", "National Polymers"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* HERO SECTION */}
      <section className="relative min-h-[78vh] flex items-center justify-center overflow-hidden">
        {/* Background layer */}
        <div className="absolute inset-0 z-0">
          <BubbleBackground className="absolute inset-0 opacity-50" interactive={true} />
        </div>
        <div className="absolute inset-0 bg-secondary/30 pointer-events-none z-0">
          <div className="absolute inset-0 molecular-bg opacity-30" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />
        </div>

        <div className="container relative z-10 mx-auto px-4 pt-28 pb-14 text-center lg:text-left flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 max-w-3xl space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00C9B1]/10 text-[#00C9B1] font-medium text-sm border border-[#00C9B1]/20 backdrop-blur-sm"
            >
              <Award className="w-4 h-4" />
              ISO/IEC 17025:2017 Certified
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2, delayChildren: 0.1 }
                }
              }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-[1.1] tracking-tight"
            >
              <motion.span className="inline-block" variants={{ hidden: { opacity: 0, y: 30, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 3.6, ease: "easeOut" } } }}>Precision Testing.</motion.span> <br />
              <motion.span className="inline-block text-[#00C9B1]" variants={{ hidden: { opacity: 0, y: 30, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 3.6, ease: "easeOut" } } }}>Trusted Results.</motion.span> <br />
              <motion.span className="inline-block" variants={{ hidden: { opacity: 0, y: 30, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 3.6, ease: "easeOut" } } }}>Global Standards.</motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Saudi Arabia's premier analytical laboratory supporting Vision 2030. We deliver uncompromised quality and speed for pharmaceuticals, food, water, and industrial sectors.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" className="w-full sm:w-auto text-base h-14 px-8 bg-[#00C9B1] hover:bg-[#00C9B1]/90 shadow-xl shadow-[#00C9B1]/20 hover:scale-[1.02] transition-transform">
                Get a Quick Quote
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-14 px-8 border-2 border-[#00C9B1]/10 text-primary" asChild>
                <Link href="/services">Explore Services</Link>
              </Button>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base h-14 px-8" asChild>
                <Link href="/about">About Green Lab</Link>
              </Button>
            </motion.div>


            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="pt-8 flex flex-wrap justify-center lg:justify-start items-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500"
            >
              <div className="flex items-center gap-2 font-bold text-xl"><ShieldCheck className="w-6 h-6" /> SFDA</div>
              <div className="flex items-center gap-2 font-bold text-xl"><Award className="w-6 h-6" /> SAC</div>
              <div className="flex items-center gap-2 font-bold text-xl"><CheckCircle2 className="w-6 h-6" /> ISO 17025</div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 hidden lg:block"
            style={{ perspective: "1200px" }}
          >
            {/* Abstract visual representation of a lab dashboard/portal */}
            <motion.div
              animate={{ y: [-15, 15, -15], rotateZ: [-1, 1, -1] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
              className="relative w-full max-w-lg mx-auto aspect-square"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="w-full h-full"
                whileHover={{ rotateX: 12, rotateY: -18, scale: 1.05, z: 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-3xl" />
                <div className="relative h-full w-full border border-border/50 bg-card/40 backdrop-blur-xl rounded-2xl shadow-2xl p-6 flex flex-col gap-4 overflow-hidden">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <Badge variant="outline" className="font-mono">Portal Preview</Badge>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground">Compliance Score</h4>
                        <p className="text-3xl font-display font-bold text-primary">94<span className="text-xl text-muted-foreground">%</span></p>
                      </div>
                      <div className="w-16 h-16 rounded-full border-4 border-primary border-t-accent flex items-center justify-center">
                        <span className="font-bold">A+</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Heavy Metals Analysis</span>
                        <span className="text-green-500 font-medium">Compliant</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={mounted ? { width: "100%" } : {}}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-green-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Microbial Limits</span>
                        <span className="text-accent font-medium">Processing</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={mounted ? { width: "65%" } : {}}
                          transition={{ duration: 1, delay: 0.7 }}
                          className="h-full bg-accent relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse" />
                        </motion.div>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-border/50">
                      <Button variant="secondary" className="w-full text-xs h-8" asChild>
                        <Link href="/dashboard">Access Full Dashboard →</Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Floating decorative elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-4 top-12 bg-background border shadow-lg rounded-xl p-3 flex items-center gap-3"
                >
                  <div className="p-2 bg-green-100 text-green-700 rounded-lg dark:bg-green-900/30 dark:text-green-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">Batch #4829</p>
                    <p className="text-[10px] text-muted-foreground">Cleared for export</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -left-8 bottom-24 bg-background border shadow-lg rounded-xl p-3 flex items-center gap-3"
                >
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">New CoA Generated</p>
                    <p className="text-[10px] text-muted-foreground">2 mins ago</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 🤝 STRATEGIC VISION & STATS SEGMENT */}
      <section className="relative py-24 bg-card border-b overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto space-y-8"
          >
            <div>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none mb-4 uppercase tracking-widest px-4 py-1.5 shadow-none">
                Our Impact
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground">Driving National Excellence</h2>
              <p className="text-muted-foreground mt-4 text-lg">We are committed to delivering uncompromised quality and speed to actively align with Saudi Vision 2030.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8">
              <AnimatedCounter value={2019} label="Year Established" />
              <AnimatedCounter value={105} label="Precision Instruments" suffix="+" />
              <AnimatedCounter value={4} label="Global Accreditations" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🔬 SYSTEM GRID SERVICES */}
      <section id="services" className="py-32 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Comprehensive Testing Solutions</h2>
            <p className="text-muted-foreground">Browse our ISO 17025 accredited testing services tailored to your industry's specific regulatory requirements.</p>
          </div>

          <div className="flex overflow-x-auto pb-4 mb-12 gap-2 hide-scrollbar justify-start md:justify-center">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setActiveIndustry(ind)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border
                  ${activeIndustry === ind
                    ? "bg-[#00C9B1] text-white border-[#00C9B1] shadow-md"
                    : "bg-background hover:bg-secondary border-border text-foreground"
                  }`}
              >
                {ind}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, i) => (
              <ServiceCardHome key={service.id} service={service} index={i} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" variant="outline" className="border-2" asChild>
              <Link href="/contact">Can't find your test? Contact us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / LOGISTICS */}
      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Automated Client Workflow</h2>
            <p className="text-muted-foreground">A streamlined, transparent process engineered to deliver compliance results with unparalleled speed and precision.</p>
          </div>

          <div className="relative pt-8">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-border/60 hidden md:block -translate-y-1/2 z-0 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                animate={{ width: `${(activeStep / 3) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              {[
                { step: "01", title: "Submit Request", desc: "Request a quote or login to portal to initiate a job." },
                { step: "02", title: "Sample Collection", desc: "Drop off or request our controlled logistics pickup." },
                { step: "03", title: "Precision Testing", desc: "Track progress live as our ISO-certified labs execute." },
                { step: "04", title: "Review & Audit", desc: "Download instantly verified digital CoAs and CoCs." },
                { step: "05", title: "Report Delivery", desc: "Download instantly verified digital CoAs and CoCs." }
              ].map((s, i) => {
                const isActive = activeStep >= i;
                const isCurrent = activeStep === i;

                return (
                  <motion.div
                    key={s.step}
                    animate={{
                      y: isCurrent ? -10 : 0,
                      scale: isCurrent ? 1.05 : 1,
                      borderColor: isActive ? "hsl(var(--primary) / 0.5)" : "hsl(var(--border))",
                      boxShadow: isCurrent ? "0 20px 25px -5px hsl(var(--primary) / 0.15), 0 8px 10px -6px hsl(var(--primary) / 0.1)" : "0 1px 3px 0 rgb(0 0 0 / 0.1)"
                    }}
                    transition={{ duration: 0.5 }}
                    className={`bg-card border-2 rounded-2xl p-6 text-center relative transition-colors duration-500`}
                  >
                    <motion.div
                      animate={{
                        backgroundColor: isActive ? "hsl(var(--primary))" : "hsl(var(--muted))",
                        color: isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
                        scale: isCurrent ? 1.15 : 1
                      }}
                      className="w-12 h-12 mx-auto font-display font-bold rounded-full flex items-center justify-center mb-6 border-4 border-background shadow-md md:-mt-12 relative z-10"
                    >
                      {s.step}
                    </motion.div>
                    <h3 className={`font-bold text-lg mb-2 transition-colors duration-500 ${isActive ? "text-primary" : "text-foreground"}`}>{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>

                    {isCurrent && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-[2px] left-8 right-8 h-1 bg-primary rounded-t-full"
                      />
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTS & TRUST */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">Backed by Leading Minds in Science</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our analytical team consists of Ph.D. chemists, certified microbiologists, and industry veterans dedicated to uncovering the truth in every sample.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {expertProfiles.slice(0, 2).map(expert => (
                  <div key={expert.id} className="flex gap-4 items-start">
                    <img src={expert.image} alt={expert.name} className="w-16 h-16 rounded-full object-cover border-2 border-border shadow-sm" />
                    <div>
                      <h4 className="font-bold text-foreground">{expert.name}</h4>
                      <p className="text-xs text-primary font-medium mb-1">{expert.role}</p>
                      <p className="text-xs text-muted-foreground">{expert.credentials}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t">
                <blockquote className="italic text-muted-foreground relative pl-4 border-l-4 border-primary/30">
                  "Green Lab's precision and rapid turnaround have been instrumental in getting our products to market faster. Their client portal is a game changer."
                  <footer className="mt-4 text-sm font-medium not-italic text-foreground">
                    — Fatima Al-Dosari, Quality Manager, Saudi BioTech Solutions
                  </footer>
                </blockquote>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="relative group h-[450px] md:h-[500px] w-full max-w-lg mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl cursor-pointer"
            >
              {/* Front Face */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent flex flex-col items-center justify-center p-8 text-center transition-transform duration-700 ease-in-out group-hover:-translate-y-full z-10">
                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mb-6 backdrop-blur-md shadow-lg shadow-black/10">
                  <Award className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-3">CEO's Vision</h3>
                <p className="text-primary-foreground/90 font-medium tracking-wide">Hover to read the commitment to Saudi Vision 2030</p>
              </div>

              {/* Back Face (Hover Content) */}
              <div className="absolute inset-0 bg-card border-2 flex flex-col p-8 md:p-10 transition-transform duration-700 ease-in-out translate-y-full group-hover:translate-y-0 overflow-y-auto hide-scrollbar z-0">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border/80 shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-lg shadow-primary/30">
                    <Award className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg font-display text-foreground leading-none mb-1">Chief Executive Officer</h4>
                    <p className="text-primary uppercase tracking-[0.2em] text-[10px] font-bold">Green Lab Group</p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-foreground/80 font-medium leading-relaxed pb-4">
                  <h3 className="text-lg font-display font-bold text-primary leading-tight">
                    Green Lab... A Commitment to Quality, Leadership Support, and Achieving Saudi Vision 2030
                  </h3>
                  <p>
                    In alignment with Saudi Arabia's ambitious Vision 2030, Green Lab stands as a trusted partner in promoting innovation, sustainability, and actively contributing to public health protection. We don't just follow the vision; we help shape it. Through our dedication to quality and the development of effective national strategies, we empower businesses to thrive and grow in accordance with the highest standards.
                  </p>
                  <p>
                    At Green Lab, quality is at the heart of every process. We elevate national products and services to be globally competitive, contributing to Vision 2030's goals by enabling organizations to excel and grow, while adding sustainable value to the national economy.
                  </p>
                  <p className="font-semibold text-primary italic mt-4">
                    Choose Green Lab as your partner on the journey to excellence. Together, we will create the future that Saudi Arabia deserves.
                  </p>
                </div>
              </div>

              {/* Decorative blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl -z-20 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION - COMPACT */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 molecular-bg opacity-20" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h2 className="text-4xl font-bold font-display tracking-tight">Ready to elevate your quality standards?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-primary shadow-xl">
                Quick Quote
              </Button>
              <Button size="lg" className="h-14 px-8 bg-transparent border-2 border-primary-foreground/30 hover:bg-primary-foreground/10 text-primary-foreground" asChild>
                <Link href="/dashboard">Access Portal</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🤝 CLIENTS SHOWCASE / LOGO MARQUEE */}
      <section className="py-12 bg-white border-b border-border/50 overflow-hidden select-none">
        <div className="container mx-auto px-4 mb-8">
          <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em]">
            Trusted by 500+ compliance leaders across the Kingdom
          </p>
        </div>
        <div className="relative w-full flex items-center h-20">
          {/* Edge Gradients for seamless fading */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 50, repeat: Infinity }}
            className="flex flex-nowrap items-center gap-16 pr-16 w-max"
          >
            {[...clientList, ...clientList].map((client, i) => {
              const isGreenLab = client === "Green Lab Group";
              return (
                <motion.div
                  key={i}
                  initial={{ filter: "grayscale(100%)", opacity: 0.3, scale: 0.95 }}
                  whileInView={{ filter: "grayscale(0%)", opacity: 1, scale: 1.1 }}
                  viewport={{ root: null, margin: "0px -40% 0px -40%" }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-3 cursor-pointer text-foreground drop-shadow-sm transition-colors"
                >
                  <div className="w-8 h-8 rounded flex items-center justify-center bg-primary/10 text-primary">
                    {isGreenLab ? (
                      <img src="/gl-3.jpeg" alt="Green Lab" className="w-8 h-8 object-cover rounded mix-blend-multiply dark:invert" />
                    ) : (
                      <ShieldCheck className="w-4 h-4" />
                    )}
                  </div>
                  <span className={`font-display font-bold tracking-tight text-xl ${isGreenLab ? "text-primary" : ""}`}>
                    {client}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

    </div>
  );
}

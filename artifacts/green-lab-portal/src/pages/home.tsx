import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, animate } from "framer-motion";
import { ArrowRight, FileText, CheckCircle2, Award, ShieldCheck, Microscope, FlaskConical, Stethoscope, Activity, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { services, industries, caseStudies, expertProfiles, testimonials } from "@/lib/mock-data";

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
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="text-5xl md:text-6xl font-display font-bold text-primary mb-2 flex items-center drop-shadow-sm">
        {prefix}{count}{suffix}
      </div>
      <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground font-semibold text-center mt-2 group-hover:text-foreground transition-colors">
        {label}
      </p>
    </div>
  );
}

export default function Home() {
  const [activeIndustry, setActiveIndustry] = useState("All");
  const [mounted, setMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activeClient, setActiveClient] = useState(0);

  useEffect(() => {
    setMounted(true);
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2500);

    const clientInterval = setInterval(() => {
      setActiveClient((prev) => (prev + 1) % 15);
    }, 1500);

    return () => {
      clearInterval(stepInterval);
      clearInterval(clientInterval);
    };
  }, []);

  const filteredServices = activeIndustry === "All"
    ? services.slice(0, 6)
    : services.filter(s => s.industries.includes(activeIndustry));

  const clientList = [
    "Saudi BioTech Solutions", "Al-Noor Pharmaceuticals", "Middle East Food Industries",
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
        <div className="absolute inset-0 bg-secondary/30">
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
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm border border-primary/20 backdrop-blur-sm"
            >
              <Award className="w-4 h-4" />
              ISO/IEC 17025:2017 Certified
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-[1.1] tracking-tight"
            >
              Precision Testing. <br />
              <span className="text-primary">Trusted Results.</span> <br />
              Global Standards.
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
              <Button size="lg" className="w-full sm:w-auto text-base h-14 px-8 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
                Get a Quick Quote
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-14 px-8 border-2" asChild>
                <Link href="#services">Explore Services</Link>
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
          >
            {/* Abstract visual representation of a lab dashboard/portal */}
            <div className="relative w-full max-w-lg mx-auto aspect-square">
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
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🤝 STRATEGIC VISION & STATS SEGMENT */}
      <section className="relative py-24 bg-card border-b overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* STATS COLUMN (Layout left) */}
            <div className="lg:col-span-4 space-y-8">
              <div className="mb-4">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none mb-4 uppercase tracking-widest px-4 py-1.5 shadow-none">
                  Our Impact
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground">Driving National Excellence</h2>
                <p className="text-muted-foreground mt-4">We are committed to delivering uncompromised quality and speed to actively align with Saudi Vision 2030.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <AnimatedCounter value={2019} label="Year Established" />
                <AnimatedCounter value={105} label="Precision Instruments" suffix="+" />
                <AnimatedCounter value={4} label="Global Accreditations" />
              </div>
            </div>

            {/* CEO VISION COLUMN (Layout right) */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="h-full"
              >
                <div className="h-full bg-gradient-to-br from-background to-secondary/30 border shadow-2xl p-8 md:p-12 lg:p-14 rounded-[2.5rem] relative overflow-hidden group">
                  {/* Glowing background effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Huge decorative quote mark */}
                  <div className="absolute -top-6 -left-6 md:-top-8 md:-left-8 text-primary opacity-[0.08] transform scale-[2] md:scale-150 rotate-12 group-hover:scale-[1.8] group-hover:rotate-0 transition-transform duration-700">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  <div className="space-y-6 text-[1.05rem] text-foreground/80 font-medium leading-relaxed relative z-10">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-primary mb-8 leading-tight tracking-tight">
                      Green Lab... A Commitment to Quality, Leadership Support, and Achieving Saudi Vision 2030
                    </h3>
                    
                    <p>
                      In alignment with Saudi Arabia's ambitious Vision 2030, Green Lab stands as a trusted partner in promoting innovation, sustainability, and actively contributing to public health protection. We don't just follow the vision; we help shape it. Through our dedication to quality and the development of effective national strategies, we empower businesses to thrive and grow in accordance with the highest standards.
                    </p>
                    
                    <p>
                      At Green Lab, quality is at the heart of every process. We elevate national products and services to be globally competitive, contributing to Vision 2030's goals by enabling organizations to excel and grow, while adding sustainable value to the national economy.
                    </p>
                    
                    <p className="font-semibold text-primary text-xl mt-8 italic">
                      Choose Green Lab as your partner on the journey to excellence. Together, we will create the future that Saudi Arabia deserves.
                    </p>
                  </div>

                  <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-border/80 relative z-10">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-[1rem] bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                        <Award className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg font-display text-foreground tracking-tight">Chief Executive Officer</h4>
                        <p className="text-primary uppercase tracking-[0.2em] text-[10px] sm:text-xs mt-1 font-bold">Green Lab Group</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
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
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-background hover:bg-secondary border-border text-foreground"
                  }`}
              >
                {ind}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full hover-elevate transition-all duration-300 border-border/50 hover:border-primary/30 group">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {service.icon === "FlaskConical" && <FlaskConical className="w-6 h-6" />}
                      {service.icon === "Microscope" && <Microscope className="w-6 h-6" />}
                      {service.icon === "Activity" && <Activity className="w-6 h-6" />}
                      {service.icon === "Droplets" && <Droplets className="w-6 h-6" />}
                      {service.icon === "Apple" && <FlaskConical className="w-6 h-6" />}
                      {service.icon === "Sparkles" && <FlaskConical className="w-6 h-6" />}
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.badges.map(b => (
                        <Badge key={b} variant="secondary" className="bg-secondary/50 font-medium">{b}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm pt-4 border-t border-border/50">
                      <span className="text-muted-foreground">Standard TAT</span>
                      <span className="font-medium text-foreground">{service.tat.standard}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full justify-between group-hover:text-primary group-hover:bg-primary/5" asChild>
                      <Link href={`/services/${service.id}`}>
                        Learn More <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
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
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Document Vault preview mockup */}
              <div className="bg-card border rounded-2xl p-2 shadow-2xl relative z-10 overflow-hidden max-w-md mx-auto">
                <div className="bg-secondary/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold">Recent Certificates</h3>
                    <Button variant="link" size="sm" className="text-primary h-auto p-0">View All</Button>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: "COA-8992", date: "Today", type: "Certificate of Analysis", status: "Verified" },
                      { id: "COC-4412", date: "Yesterday", type: "Chain of Custody", status: "Verified" },
                      { id: "REP-9001", date: "12 Oct 2023", type: "Audit Report", status: "Verified" }
                    ].map((doc, i) => (
                      <div key={i} className="bg-background rounded-lg p-3 flex items-center gap-3 border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div className="w-10 h-10 rounded bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{doc.id}</p>
                          <p className="text-xs text-muted-foreground">{doc.type}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs text-muted-foreground">{doc.date}</p>
                          <Badge variant="outline" className="text-[10px] mt-1 border-green-500 text-green-600 bg-green-50 dark:bg-green-900/20">{doc.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 molecular-bg opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent mix-blend-multiply" />

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight">Ready to elevate your quality standards?</h2>
            <p className="text-xl text-primary-foreground/80 font-medium">
              Join 500+ compliant enterprises across Saudi Arabia.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base h-14 px-8 text-primary shadow-xl">
                Request Quick Quote
              </Button>
              <Button size="lg" className="w-full sm:w-auto text-base h-14 px-8 bg-transparent border-2 border-primary-foreground/30 hover:bg-primary-foreground/10 text-primary-foreground" asChild>
                <Link href="/dashboard">Access Client Portal</Link>
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
              const isColored = (i % 15) === activeClient;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 transition-all duration-700 cursor-pointer ${isColored
                    ? "grayscale-0 opacity-100 scale-110 drop-shadow-md text-primary"
                    : "grayscale opacity-30 hover:grayscale-0 hover:opacity-100 text-foreground"
                    }`}
                >
                  <div className={`w-8 h-8 rounded flex items-center justify-center transition-colors duration-700 ${isColored ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}>
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="font-display font-bold tracking-tight text-xl">
                    {client}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

    </div>
  );
}

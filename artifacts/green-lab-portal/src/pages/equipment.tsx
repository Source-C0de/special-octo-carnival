import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, animate, useInView } from "framer-motion";
import { mockEquipment } from "@/lib/mock-equipment";
import EquipmentGrid from "@/components/equipment/EquipmentGrid";
import MethodologyMatcher from "@/components/equipment/MethodologyMatcher";
import EquipmentDrawer from "@/components/equipment/EquipmentDrawer";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, Target, Shield } from "lucide-react";

function AnimatedStat({ value, label, icon: Icon, suffix = "" }: { value: number | string, label: string, icon: any, suffix?: string }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLDivElement>(null);
  const inView = useInView(nodeRef, { once: true });
  
  useEffect(() => {
    if (inView && typeof value === 'number') {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (val) => setCount(Math.round(val))
      });
      return controls.stop;
    }
  }, [inView, value]);

  const displayValue = typeof value === 'number' ? count + suffix : value;

  return (
    <div ref={nodeRef} className="space-y-1 relative group p-4 -m-4 rounded-xl hover:bg-emerald/5 transition-colors border border-transparent hover:border-emerald/10 cursor-pointer">
      <div className="flex items-center gap-2 text-muted-foreground mb-1 group-hover:text-primary transition-colors">
        <Icon className="w-4 h-4" />
        <span className="text-[10px] uppercase font-bold tracking-widest">{label}</span>
      </div>
      <p className="text-3xl font-display font-bold text-foreground transition-transform duration-500 group-hover:scale-105 origin-left">
        {displayValue}
      </p>
    </div>
  );
}

export default function EquipmentPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeStats, setActiveStats] = useState(0);

  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    setActiveStats(mockEquipment.length);
  }, []);

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-sand/30 relative overflow-hidden">
      {/* 1. VISUAL FOUNDATION */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald/5 via-transparent to-transparent opacity-60" />
      
      {/* Molecular Grid Background */}
      <motion.div 
        style={{ y: yParallax }}
        className="absolute inset-0 pointer-events-none opacity-40"
      >
        <svg width="100%" height="100%" className="text-emerald/10">
          <pattern id="molecular-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
            <line x1="2" y1="2" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
            <circle cx="50" cy="50" r="1" fill="currentColor" />
            <line x1="50" y1="50" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#molecular-pattern)" />
        </svg>
      </motion.div>

      {/* HERO SECTION */}
      <header className="relative z-10 pt-32 pb-20 border-b border-emerald/10 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.2 }}
            className="max-w-4xl"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-6"
            >
              <Badge className="bg-emerald/5 text-primary border-emerald/10 px-4 py-1 text-xs font-bold uppercase tracking-widest">
                 Technical Infrastructure Hub
              </Badge>
              <div className="h-[1px] w-12 bg-emerald/20" />
              <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                  />
                ))}
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-display font-bold text-foreground tracking-tight leading-[1.1] mb-8"
            >
              High-Precision <br />
              <span className="text-primary italic">Analytical Platforms.</span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8"
            >
              {[
                { label: "Core Platforms", value: activeStats, icon: FlaskConical, suffix: "" },
                { label: "ISO-Validated Methods", value: 500, icon: Target, suffix: "+" },
                { label: "Global Compliance", value: 100, icon: Shield, suffix: "%" }
              ].map((stat, i) => (
                <AnimatedStat key={i} {...stat} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-4 py-16 relative z-10 min-h-[60vh]">
        <div className="flex flex-col gap-6 mb-12">
          <div className="space-y-1">
            <h2 className="text-foreground font-display font-bold text-3xl">Methodology Matcher</h2>
            <p className="text-muted-foreground text-sm max-w-xl">Aligning top-tier instrumentation with your industry's specific regulatory requirements for SFDA, USP, and EP standards.</p>
          </div>
          <MethodologyMatcher 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
          />
        </div>

        <EquipmentGrid 
          items={mockEquipment} 
          activeFilter={activeFilter} 
          onItemClick={handleItemClick}
        />
      </main>

      <EquipmentDrawer 
        item={selectedItem} 
        open={drawerOpen} 
        onOpenChange={setDrawerOpen} 
      />

      {/* FOOTER CTA */}
      <section className="relative z-10 py-24 bg-white border-t border-emerald/10 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h3 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight">
              Require Custom <br /> Method Validation?
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Our scientists specialize in developing and validating analytical protocols according to international guidelines for novel compounds and complex matrices.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="h-14 px-10 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all">
                Consult with an Expert
              </button>
              <button className="h-14 px-10 border-2 border-emerald/10 text-primary font-bold rounded-xl hover:bg-emerald/5 transition-all">
                View Accreditation Scope
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronRight, CheckCircle2, FlaskConical, ShieldCheck, Microscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import { Service } from "@/lib/mock-services";
import { ChromatographyPreview } from "./ChromatographyPreview";

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
}

export function ServiceCard({ service, onClick }: ServiceCardProps) {
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll rotation logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const listVariants = {
    initial: { height: 0, opacity: 0 },
    hover: { height: "auto", opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ rotate, y, opacity, scale, perspective: 1000 }}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative cursor-pointer group rounded-[2rem] overflow-hidden h-[500px] w-full"
    >
      {/* Flowing Border Animation (Matching Service Accent) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <svg className="absolute inset-0 w-full h-full" overflow="visible">
          <motion.rect
            x="0" y="0" width="100%" height="100%" rx="32" fill="none"
            stroke={service.accent} strokeWidth="3" strokeDasharray="120 400"
            animate={{ strokeDashoffset: -520 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="opacity-20 group-hover:opacity-100 transition-opacity duration-500"
          />
        </svg>
      </div>

      <Card className="h-full bg-white border-none shadow-sm group-hover:shadow-2xl group-hover:shadow-emerald/10 transition-all duration-500">
        <CardContent className="p-0 flex flex-col h-full">
          {/* TOP SECTION: IMAGE & ACCENT */}
          <div className="relative h-48 overflow-hidden">
             <img src={service.image} alt={service.title[language]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
             <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
             
             {/* CHROMATOGRAPHY PREVIEW */}
             {(service.category === 'Pharma' || service.category === 'Food') && (
               <div className="absolute bottom-4 left-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                 <ChromatographyPreview color={service.accent} />
               </div>
             )}
          </div>

          {/* BOTTOM SECTION: CONTENT */}
          <div className="p-8 flex-1 flex flex-col relative z-20">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: service.accent }} />
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">{service.category}</p>
            </div>

            <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-emerald transition-colors leading-tight">
              {service.title[language]}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
              {service.tagline[language]}
            </p>

            {/* EXPANDABLE KEY TESTS */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  variants={listVariants}
                  initial="initial"
                  animate="hover"
                  exit="initial"
                  className="overflow-hidden"
                >
                  <div className="space-y-3 pt-4 border-t border-emerald/10 mb-6">
                    <p className="text-[10px] uppercase font-black text-primary/60 tracking-widest">{language === 'en' ? 'Key Methodologies' : 'المنهجيات الأساسية'}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {service.keyTests[language].slice(0, 3).map((test, i) => (
                        <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-foreground">
                           <CheckCircle2 className="w-3 h-3 text-emerald" />
                           {test}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-auto flex items-center justify-between pt-4">
              <Badge variant="outline" className="text-emerald border-emerald/10 bg-emerald/5 px-3 py-1 text-[10px] font-bold">
                 {service.specs.accreditations[0]}
              </Badge>
              <Link href={`/services/${service.id}`}>
                <div className="flex items-center gap-2 text-primary font-bold text-xs group/btn">
                   {language === 'en' ? 'View Scope' : 'عرض النطاق'}
                   <ArrowRight className={`w-4 h-4 transition-transform group-hover/btn:translate-x-1 ${language === 'ar' ? 'rotate-180' : ''}`} />
                </div>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

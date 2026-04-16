import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, CheckCircle2, FlaskConical, ShieldCheck, Microscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import { Service } from "@/lib/mock-services";
import { ChromatographyPreview } from "./ChromatographyPreview";

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
  isLarge?: boolean;
}

export function ServiceCard({ service, onClick, isLarge }: ServiceCardProps) {
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -4, transition: { duration: 0.3 } }
  };

  const listVariants = {
    initial: { height: 0, opacity: 0 },
    hover: { height: "auto", opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const getTextureStyle = (serviceId: string) => {
    switch (serviceId) {
      case 's-pharma': return 'bg-pharma-grid';
      case 's-food': return 'bg-food-leaf';
      case 's-water': return 'bg-water-ripple';
      case 's-oud': return 'bg-oud-wisp';
      default: return '';
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative cursor-pointer group rounded-[2rem] overflow-hidden border border-emerald/5 h-full ${
        service.size === 'full' ? 'col-span-1 lg:col-span-3' : 
        service.size === 'large' ? 'col-span-1 lg:col-span-2' : 'col-span-1'
      }`}
    >
      {/* BACKGROUND TEXTURE OVERLAY */}
      <div className={`absolute inset-0 z-0 opacity-[0.05] pointer-events-none group-hover:opacity-[0.08] transition-opacity ${getTextureStyle(service.id)}`} />
      
      {/* SHIMMER BORDER FOR OUD */}
      {service.category === 'Oud' && (
        <div className="absolute inset-0 z-10 border-2 border-transparent group-hover:border-[#D4AF37]/30 rounded-[2rem] animate-pulse" />
      )}

      <Card className="h-full bg-white border-none shadow-sm group-hover:shadow-2xl group-hover:shadow-emerald/10 transition-shadow">
        <CardContent className="p-0 flex flex-col h-full">
          {/* TOP SECTION: IMAGE & ACCENT */}
          <div className="relative aspect-[21/9] overflow-hidden">
             <img src={service.image} alt={service.title[language]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
             <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
             
             {/* CHROMATOGRAPHY PREVIEW FOR ANALYTICAL SERVICES */}
             {(service.category === 'Pharma' || service.category === 'Food') && isHovered && (
               <div className="absolute bottom-4 left-6 right-6 z-20">
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

            <h3 className="text-3xl font-display font-bold mb-3 group-hover:text-emerald transition-colors leading-tight">
              {service.title[language]}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
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
                    <p className="text-[10px] uppercase font-black text-primary/60 tracking-widest">{language === 'en' ? 'Core Methodologies' : 'المنهجيات الأساسية'}</p>
                    <div className="grid grid-cols-2 gap-4">
                      {service.keyTests[language].map((test, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-bold text-foreground">
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
                 {service.specs.accreditations[0]} Certified
              </Badge>
              <div className="flex items-center gap-2 text-primary font-bold text-xs group/btn">
                 {language === 'en' ? 'Deep Dive' : 'تفاصيل أكثر'}
                 <ArrowRight className={`w-4 h-4 transition-transform group-hover/btn:translate-x-1 ${language === 'ar' ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

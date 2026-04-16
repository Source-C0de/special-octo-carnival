import { motion } from "framer-motion";
import { Equipment } from "@/lib/mock-equipment";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ShieldCheck, Microscope, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";

interface EquipmentCardProps {
  item: Equipment;
  onOpen: () => void;
  isFilteredOut?: boolean;
}

export default function EquipmentCard({ item, onOpen, isFilteredOut }: EquipmentCardProps) {
  const { user, isLoggedIn } = useAuth();
  
  const isRecommended = isLoggedIn && user?.industry && item.industries.includes(user.industry);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isFilteredOut ? 0.3 : 1, 
        scale: isFilteredOut ? 0.95 : 1,
        y: !isFilteredOut && isRecommended ? -8 : 0
      }}
      whileHover={{ 
        scale: isFilteredOut ? 0.95 : 1.02,
        boxShadow: !isFilteredOut ? "0 0 30px rgba(10, 92, 54, 0.1)" : "none"
      }}
      transition={{ duration: 0.3 }}
      className={`relative group overflow-hidden rounded-2xl border ${isRecommended ? 'border-primary/40 shadow-xl shadow-primary/5' : 'border-emerald/10'} bg-white/70 backdrop-blur-xl flex flex-col h-full`}
    >
      {/* LASER SCAN EFFECT */}
      <motion.div 
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ clipPath: "inset(0 0 0 0)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0 z-10 pointer-events-none"
      >
        <div className="absolute top-0 right-0 w-[2.5px] h-full bg-primary shadow-[0_0_15px_rgba(10,92,54,0.5)] z-20" />
      </motion.div>

      {/* TOP IMAGE */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        
        {/* STATUS LED */}
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-emerald/10 shadow-sm">
          <motion.div 
            animate={item.status === 'active' ? { scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className={`w-2 h-2 rounded-full ${
              item.status === 'active' ? 'bg-green-500' : 
              item.status === 'calibrating' ? 'bg-amber-500' : 'bg-red-500'
            }`}
          />
          <span className="text-[10px] font-bold text-foreground uppercase tracking-tighter">{item.status}</span>
        </div>

        {isRecommended && (
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-primary text-white border-none shadow-lg px-3 py-1 text-[10px] font-bold">
              RECOMMENDED FOR {user?.industry?.toUpperCase()}
            </Badge>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
             <p className="text-primary text-[10px] uppercase font-black tracking-widest">{item.heroMetric}</p>
             <div className="h-[1px] flex-1 bg-emerald/10" />
          </div>
          <h3 className="text-xl font-display font-bold leading-tight group-hover:text-primary transition-colors text-foreground">{item.name}</h3>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-6 leading-relaxed">
          {item.description}
        </p>

        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-9 h-9 rounded-lg bg-emerald/5 flex items-center justify-center border border-emerald/10 cursor-help hover:bg-emerald/10 transition-colors">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">ISO 17025 Accredited Method</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-9 h-9 rounded-lg bg-emerald/5 flex items-center justify-center border border-emerald/10 cursor-help hover:bg-emerald/10 transition-colors">
                      <Microscope className="w-4 h-4 text-primary" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">ASTM Compliant: {item.specs.astm.join(", ")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Button 
              variant="link" 
              className="p-0 h-auto text-primary hover:text-teal flex items-center gap-1 group/btn font-bold text-xs"
              onClick={onOpen}
            >
              Learn More <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>

          <Button 
            className="w-full h-11 bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20 transition-all font-bold group/cta rounded-xl"
            onClick={onOpen}
          >
            {item.validationCta}
            <Info className="w-4 h-4 ml-2 opacity-70 group-hover/cta:opacity-100" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

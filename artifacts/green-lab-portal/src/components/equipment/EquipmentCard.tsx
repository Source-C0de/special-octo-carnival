import { useState } from "react";
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
}

export default function EquipmentCard({ item, onOpen }: EquipmentCardProps) {
  const { user, isLoggedIn } = useAuth();
  const [isFlipped, setIsFlipped] = useState(false);
  
  const isRecommended = isLoggedIn && user?.industry && item.industries.includes(user.industry);

  return (
    <div 
      className="relative w-full h-[450px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ perspective: 2000 }}
    >
      <motion.div
        className="w-full h-full relative"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT SIDE */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-emerald/10 p-6 flex flex-col shadow-xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Flowing Border Animation (Front) */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="absolute inset-0 w-full h-full" overflow="visible">
              <motion.rect
                x="0" y="0" width="100%" height="100%" rx="16" fill="none"
                stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="100 300"
                animate={{ strokeDashoffset: -400 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                 <p className="text-primary text-[10px] uppercase font-black tracking-widest">{item.heroMetric}</p>
                 <div className="h-[1px] w-8 bg-emerald/10" />
              </div>
              
              {/* STATUS LED RESTORED */}
              <div className="flex items-center gap-2 bg-emerald/5 px-2 py-1 rounded-full border border-emerald/10">
                <motion.div 
                  animate={item.status === 'active' ? { scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-1.5 h-1.5 rounded-full ${
                    item.status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 
                    item.status === 'calibrating' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                  }`}
                />
                <span className="text-[9px] font-bold text-foreground uppercase tracking-tighter">{item.status}</span>
              </div>
            </div>
            
            <h3 className="text-2xl font-display font-bold leading-tight text-foreground mb-4">{item.name}</h3>
            
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-4">
              {item.description}
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-9 h-9 rounded-lg bg-emerald/5 flex items-center justify-center border border-emerald/10 hover:bg-emerald/10 transition-colors">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                </div>
                <div className="w-9 h-9 rounded-lg bg-emerald/5 flex items-center justify-center border border-emerald/10 hover:bg-emerald/10 transition-colors">
                  <Microscope className="w-4 h-4 text-primary" />
                </div>
              </div>
              {isRecommended && (
                <Badge className="bg-primary text-white text-[9px] px-2 py-0.5">MATCH</Badge>
              )}
            </div>
            <div className="text-[10px] text-muted-foreground font-bold flex items-center justify-center gap-2 bg-emerald/5 py-2 rounded-lg border border-emerald/5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              FLIP TO VIEW 3D SYSTEM
            </div>
          </div>
        </div>

        {/* BACK SIDE (3D IMAGE) */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-emerald/90 to-primary/90 p-8 flex flex-col items-center justify-center text-white shadow-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Flowing Border Animation (Back) */}
          <div className="absolute inset-0 pointer-events-none opacity-50">
            <svg className="absolute inset-0 w-full h-full" overflow="visible">
              <motion.rect
                x="0" y="0" width="100%" height="100%" rx="16" fill="none"
                stroke="white" strokeWidth="2" strokeDasharray="100 300"
                animate={{ strokeDashoffset: -400 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>

          <div className="relative w-full flex-1 flex items-center justify-center mb-8">
            <motion.img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)] z-10"
              animate={isFlipped ? { 
                y: [-12, 12, -12],
                rotateX: [6, -6, 6],
                rotateY: [-8, 8, -8]
              } : {}}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-white/20 blur-[80px] rounded-full z-0" />
          </div>

          <div className="w-full space-y-3 relative z-20">
            <Button 
              className="w-full h-12 bg-white text-primary hover:bg-white/90 shadow-xl font-bold rounded-xl transition-all active:scale-95"
              onClick={(e) => { e.stopPropagation(); onOpen(); }}
            >
              Request Validation
            </Button>
            <Button 
              variant="outline"
              className="w-full h-12 border-white/30 text-white hover:bg-white/10 font-bold rounded-xl backdrop-blur-sm transition-all active:scale-95"
              onClick={(e) => { e.stopPropagation(); onOpen(); }}
            >
              Full Specifications
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

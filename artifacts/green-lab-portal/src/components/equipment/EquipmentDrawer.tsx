import { Equipment } from "@/lib/mock-equipment";
import { motion } from "framer-motion";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  FileText, 
  Zap, 
  Layers, 
  Clock, 
  Settings,
  Download,
  CheckCircle2
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";

interface EquipmentDrawerProps {
  item: Equipment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EquipmentDrawer({ item, open, onOpenChange }: EquipmentDrawerProps) {
  const { language } = useLanguage();
  
  if (!item) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={language === 'ar' ? 'left' : 'right'} className="w-full sm:max-w-xl p-0 overflow-y-auto no-scrollbar border-emerald/10 bg-background/95 backdrop-blur-xl">
        <div className="relative h-80 w-full overflow-hidden bg-gradient-to-b from-primary/5 to-background flex items-center justify-center border-b border-emerald/10" style={{ perspective: 1200 }}>
          <motion.img 
            src={item.image} 
            alt={item.name} 
            className="w-3/4 h-3/4 object-contain drop-shadow-2xl z-10" 
            animate={{ 
              y: [-10, 10, -10],
              rotateX: [3, -3, 3],
              rotateY: [-3, 3, -3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full z-0 pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 z-20">
            <Badge className="bg-primary text-white border-none mb-3 shadow-lg shadow-primary/20">{item.heroMetric}</Badge>
            <SheetTitle className="text-3xl md:text-4xl font-display font-bold leading-tight">{item.name}</SheetTitle>
          </div>
        </div>

        <div className="p-8 space-y-10">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-teal">Technical Overview</h3>
            <p className="text-muted-foreground leading-relaxed">{item.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-secondary/20 border border-emerald/10">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-teal" />
                <span className="text-[10px] font-bold uppercase">Accreditation</span>
              </div>
              <p className="font-bold">{item.specs.iso17025 ? 'ISO/IEC 17025' : 'In Validation'}</p>
            </div>
            
            <div className="p-4 rounded-xl bg-secondary/20 border border-emerald/10">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-teal" />
                <span className="text-[10px] font-bold uppercase">Sensitivity</span>
              </div>
              <p className="font-bold">{item.specs.detectionLimit}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-teal">Methodology & Compliance</h3>
            <div className="space-y-3">
              {item.specs.astm.map(std => (
                <div key={std} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 group hover:border-teal/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-teal/10 flex items-center justify-center text-teal">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-sm">{std} Standard</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] opacity-60 group-hover:opacity-100">Validated</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-teal">Sample Compatibility</h3>
            <div className="flex flex-wrap gap-2">
              {item.specs.sampleType.map(type => (
                <Badge key={type} variant="secondary" className="px-3 py-1 bg-secondary text-primary border-primary/10">
                  <Layers className="w-3 h-3 mr-2" /> {type}
                </Badge>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-emerald/10 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Estimated Validation TAT: 2-4 Business Days</span>
              </div>
              <Button variant="ghost" size="sm" className="text-teal text-xs">
                <Download className="w-4 h-4 mr-2" /> Scope PDF
              </Button>
            </div>
            
            <div className="flex flex-col gap-3">
              <Button className="h-14 bg-emerald hover:bg-emerald/90 text-white font-bold gap-2">
                <CheckCircle2 className="w-5 h-5" /> Request Method Validation
              </Button>
              <Button variant="outline" className="h-14 border-2 font-bold">
                Add to Compliance Pack
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

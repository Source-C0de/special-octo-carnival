import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, Target } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const steps = [
  { id: 1, name: "Consultation", time: "1-2 Days", rate: "100%", icon: Circle },
  { id: 2, name: "Gap Analysis", time: "3-5 Days", rate: "98%", icon: Target },
  { id: 3, name: "Method Valid.", time: "10-15 Days", rate: "94%", icon: Clock },
  { id: 4, name: "SFDA Approval", time: "2-4 Weeks", rate: "91%", icon: CheckCircle2 },
];

export function Roadmap({ color }: { color: string }) {
  return (
    <div className="relative w-full py-12 px-4">
      <div className="flex items-center justify-between relative z-10">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center group relative">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className="w-12 h-12 rounded-full border-2 bg-white flex items-center justify-center transition-all duration-300 group-hover:scale-125 z-20 cursor-help"
                    style={{ borderColor: color, color: color }}
                  >
                    <step.icon className="w-6 h-6" />
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent className="bg-white border-emerald/10 shadow-xl p-4">
                  <div className="space-y-1">
                    <p className="font-bold text-primary">{step.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Timeline: {step.time}
                    </p>
                    <p className="text-[10px] text-emerald font-bold uppercase">Success Rate: {step.rate}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <span className="mt-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
              {step.name}
            </span>
          </div>
        ))}

        {/* CONNECTING LINE */}
        <div className="absolute top-6 left-6 right-6 h-[2px] bg-emerald/5 -z-0">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full origin-left"
            style={{ backgroundColor: color }}
          />
          {/* MOVING PULSE */}
          <motion.div
            animate={{ left: ["0%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full blur-sm opacity-50 z-10"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>
    </div>
  );
}

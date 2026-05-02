import { motion } from "framer-motion";
import { industryFilters } from "@/lib/mock-equipment";
import { Shield, Droplets, Target, Sparkles, Factory, Pill } from "lucide-react";

interface MethodologyMatcherProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filterIcons: Record<string, any> = {
  "All": Target,
  "Pharma Compliance": Pill,
  "Water Safety": Droplets,
  "Food Integrity": Shield,
  "Cosmetics QA": Sparkles,
  "Industrial Materials": Factory
};

export default function MethodologyMatcher({ activeFilter, onFilterChange }: MethodologyMatcherProps) {
  return (
    <div className="flex items-stretch gap-4 overflow-x-auto no-scrollbar pb-8 pt-4 snap-x">
      {industryFilters.map((filter) => {
        const isActive = activeFilter === filter;
        const Icon = filterIcons[filter] || Target;
        return (
          <motion.button
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`relative min-w-[200px] p-6 rounded-2xl cursor-pointer transition-all duration-300 snap-center text-left flex flex-col items-start overflow-hidden ${
              isActive 
                ? "shadow-xl shadow-primary/10" 
                : "border-2 border-border/50 bg-white hover:border-primary/30 hover:shadow-lg"
            }`}
          >
            {/* Flowing Border Background for Active State */}
            {isActive && (
              <div className="absolute inset-0 pointer-events-none">
                <svg className="absolute inset-0 w-full h-full" overflow="visible">
                  <motion.rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    rx="16"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    strokeDasharray="80 200"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -280 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </svg>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-primary/5 rounded-2xl" />
              </div>
            )}

            <div className={`relative z-10 w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-colors ${
              isActive ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-primary/10 text-primary"
            }`}>
              <Icon className="w-6 h-6" />
            </div>
            <h3 className={`relative z-10 font-bold text-lg leading-tight transition-colors ${
              isActive ? "text-primary" : "text-foreground"
            }`}>
              {filter}
            </h3>
          </motion.button>
        );
      })}
    </div>
  );
}

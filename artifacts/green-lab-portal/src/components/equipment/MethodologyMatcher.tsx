import { motion } from "framer-motion";
import { industryFilters } from "@/lib/mock-equipment";

interface MethodologyMatcherProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function MethodologyMatcher({ activeFilter, onFilterChange }: MethodologyMatcherProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-8 pt-4">
      {industryFilters.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className="relative whitespace-nowrap px-6 py-3 text-sm font-bold transition-all"
          >
            <span className={`relative z-10 transition-colors duration-300 ${isActive ? "text-white" : "text-muted-foreground hover:text-primary"}`}>
              {filter}
            </span>
            {isActive && (
              <motion.div
                layoutId="active-filter-bg"
                className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/20"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {!isActive && (
              <div className="absolute inset-0 bg-emerald/5 border border-emerald/10 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}

import { motion } from "framer-motion";
import { Equipment } from "@/lib/mock-equipment";
import EquipmentCard from "./EquipmentCard";

interface EquipmentGridProps {
  items: Equipment[];
  activeFilter: string;
  onItemClick: (item: Equipment) => void;
}

export default function EquipmentGrid({ items, activeFilter, onItemClick }: EquipmentGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[450px]">
      {items.map((item, index) => {
        // Industry mapping
        const filterMap: Record<string, string> = {
          "Pharma Compliance": "Pharma",
          "Water Safety": "Water",
          "Food Integrity": "Food",
          "Cosmetics QA": "Cosmetics",
          "Industrial Materials": "Industrial"
        };
        
        const mappedIndustry = filterMap[activeFilter];
        const isMatch = activeFilter === "All" || item.industries.includes(mappedIndustry as any);
        
        if (!isMatch) return null;

        return (
          <motion.div 
            layout
            key={item.id} 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="transition-all duration-500"
          >
            <EquipmentCard 
              item={item} 
              onOpen={() => onItemClick(item)}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

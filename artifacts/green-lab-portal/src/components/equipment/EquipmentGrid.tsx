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
        
        // Bento pattern: first item is large on desktop
        const isBentoLarge = index === 0 || index === 3;

        return (
          <div 
            key={item.id} 
            className={`
              ${isBentoLarge ? "md:col-span-2" : "md:col-span-1"}
              transition-all duration-500
            `}
          >
            <EquipmentCard 
              item={item} 
              onOpen={() => onItemClick(item)}
              isFilteredOut={!isMatch}
            />
          </div>
        );
      })}
    </div>
  );
}

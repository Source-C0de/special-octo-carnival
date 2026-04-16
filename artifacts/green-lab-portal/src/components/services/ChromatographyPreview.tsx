import { motion } from "framer-motion";

export function ChromatographyPreview({ color }: { color: string }) {
  return (
    <div className="w-full h-16 relative bg-white/50 backdrop-blur-sm rounded-xl border border-emerald/5 overflow-hidden p-2">
      <svg viewBox="0 0 400 60" className="w-full h-full preserve-3d">
        <defs>
          <linearGradient id="peakGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* BASELINE */}
        <line x1="0" y1="50" x2="400" y2="50" stroke={color} strokeWidth="0.5" strokeOpacity="0.2" />

        {/* ANALYTICAL PEAKS */}
        <motion.path
          d="M 0 50 L 50 50 L 80 45 L 100 10 L 120 45 L 150 50 L 200 50 L 220 40 L 235 25 L 250 40 L 270 50 L 320 50 L 340 35 L 355 5 L 370 35 L 400 50"
          fill="url(#peakGradient)"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* SCANNING LINE */}
        <motion.line
          x1="0" y1="0" x2="0" y2="60"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="2 2"
          animate={{ x: [0, 400] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      
      <div className="absolute top-2 right-3 flex items-center gap-1.5">
         <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
         <span className="text-[8px] font-mono font-bold text-muted-foreground uppercase">Real-Time Detection</span>
      </div>
    </div>
  );
}

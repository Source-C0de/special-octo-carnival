import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import WhatsAppButton from "../shared/WhatsAppButton";
import { useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";

export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-[100dvh] flex flex-col font-sans">
      <Navbar />
      
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.main 
          key={location}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="flex-1 flex flex-col pt-16"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

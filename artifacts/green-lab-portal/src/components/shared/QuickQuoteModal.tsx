import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function QuickQuoteModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [step, setStep] = useState<"form" | "loading" | "success">("form");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("loading");
    
    // Simulate API call
    setTimeout(() => {
      setStep("success");
      toast({
        title: "Request Received",
        description: "A representative will contact you within 2 business hours.",
      });
      
      setTimeout(() => {
        onOpenChange(false);
        setStep("form");
      }, 3000);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if(!v) setTimeout(() => setStep("form"), 300); onOpenChange(v); }}>
      <DialogContent className="sm:max-w-[425px]">
        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader>
                <DialogTitle>Request a Quick Quote</DialogTitle>
                <DialogDescription>
                  Get an estimate for your laboratory testing needs.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name / Company</Label>
                  <Input id="name" required placeholder="Saudi BioTech LLC" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" required placeholder="contact@company.sa" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="service">Service Category</Label>
                  <Select required>
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Select service category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chemical">Chemical Analysis</SelectItem>
                      <SelectItem value="micro">Microbiological Testing</SelectItem>
                      <SelectItem value="physical">Physical Testing</SelectItem>
                      <SelectItem value="environmental">Environmental</SelectItem>
                      <SelectItem value="other">Other / Not sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="details">Testing Requirements (Optional)</Label>
                  <Textarea id="details" placeholder="Describe the samples or standards required..." className="resize-none" />
                </div>
                
                <Button type="submit" className="w-full">Submit Request</Button>
              </form>
            </motion.div>
          )}
          
          {step === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 space-y-4"
            >
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <h3 className="font-semibold text-lg">Processing Request...</h3>
            </motion.div>
          )}
          
          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 space-y-4 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
              >
                <CheckCircle2 className="w-16 h-16 text-primary" />
              </motion.div>
              <h3 className="font-bold text-xl">Quote Requested Successfully</h3>
              <p className="text-muted-foreground text-sm">
                Our team is reviewing your requirements and will reach out shortly.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

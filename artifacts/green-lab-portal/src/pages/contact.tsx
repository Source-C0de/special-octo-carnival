import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. Our team will contact you shortly.",
      });
      
      // Reset form after delay
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* HERO */}
      <section className="bg-primary pt-24 pb-32 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 molecular-bg opacity-10" />
        <div className="container relative z-10 mx-auto px-4 max-w-4xl text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6"
          >
            Let's build a partnership.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-foreground/80 leading-relaxed"
          >
            Whether you need to request a quote, schedule a sample pickup, or speak with an analytical expert, we're here to help.
          </motion.p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="-mt-16 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            
            {/* Form Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <Card className="shadow-xl border-border/50">
                <CardContent className="p-8">
                  {isSuccess ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                        <CheckCircle2 className="w-16 h-16 text-green-500" />
                      </motion.div>
                      <h3 className="text-2xl font-bold font-display">Message Received</h3>
                      <p className="text-muted-foreground max-w-sm">We've received your inquiry and our team will get back to you within 24 business hours.</p>
                      <Button variant="outline" className="mt-4" onClick={() => setIsSuccess(false)}>Send Another Message</Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" required placeholder="Ahmed" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" required placeholder="Al-Farsi" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company">Company / Organization</Label>
                        <Input id="company" required placeholder="Saudi BioTech LLC" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email">Work Email</Label>
                          <Input id="email" type="email" required placeholder="ahmed@company.sa" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" type="tel" required placeholder="+966 5X XXX XXXX" dir="ltr" className="text-left" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">How can we help you?</Label>
                        <Textarea 
                          id="message" 
                          required 
                          placeholder="I would like to request testing for..." 
                          className="min-h-[150px] resize-y"
                        />
                      </div>
                      
                      <Button type="submit" size="lg" className="w-full h-14 text-base" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : (
                          <>Send Message <Send className="w-4 h-4 ml-2" /></>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Info Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              <Card className="bg-secondary/30 border-border/50">
                <CardContent className="p-6 space-y-8">
                  <div>
                    <h3 className="font-display font-bold text-xl mb-6">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-background border flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Central Laboratory</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Building 42, King Fahd Road<br />
                            Al Olaya District<br />
                            Riyadh 12211, Saudi Arabia
                          </p>
                          <Button variant="link" className="p-0 h-auto text-primary mt-1 text-xs">Get Directions</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-background border flex items-center justify-center shrink-0">
                          <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Phone</h4>
                          <p className="text-sm text-muted-foreground" dir="ltr">+966 11 123 4567</p>
                          <p className="text-xs text-muted-foreground mt-1">Toll Free: 800-123-4567</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-background border flex items-center justify-center shrink-0">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Email</h4>
                          <p className="text-sm text-muted-foreground">info@greenlab.sa</p>
                          <p className="text-sm text-muted-foreground">support@greenlab.sa</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="font-display font-bold text-xl mb-4">Business Hours</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Sunday - Thursday</span>
                        <span className="font-medium">08:00 AM - 05:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Friday - Saturday</span>
                        <span className="font-medium text-accent">Closed</span>
                      </div>
                      <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground bg-background p-3 rounded-lg border">
                        <Clock className="w-4 h-4 text-primary" />
                        Sample reception desk closes at 04:00 PM daily.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Map Placeholder */}
              <div className="h-[250px] w-full bg-muted rounded-xl border overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-50 grayscale" />
                <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[2px]">
                  <Button variant="secondary" className="shadow-lg"><MapPin className="w-4 h-4 mr-2" /> Open Google Maps</Button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}

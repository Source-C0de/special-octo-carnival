import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Globe, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";

function TypewriterText({ text, delay = 0 }: { text: string, delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const audioCtxRef = useRef<any>(null);

  useEffect(() => {
    try {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) { }

    const startTimeout = setTimeout(() => setHasStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);

        // play subtle typewriter tick
        if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
          try {
            const oscillator = audioCtxRef.current.createOscillator();
            const gainNode = audioCtxRef.current.createGain();
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(600 + Math.random() * 50, audioCtxRef.current.currentTime);
            gainNode.gain.setValueAtTime(0.02, audioCtxRef.current.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.05);
            oscillator.connect(gainNode);
            gainNode.connect(audioCtxRef.current.destination);
            oscillator.start();
            oscillator.stop(audioCtxRef.current.currentTime + 0.05);
          } catch (e) { }
        }
      }, 50 + Math.random() * 80); // random typing speed

      return () => clearTimeout(timeout);
    }
  }, [index, text, hasStarted]);

  return (
    <>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-1 h-[0.9em] bg-primary ml-1 align-middle -translate-y-0.5"
      />
    </>
  );
}

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

  const officeLocation = "4146 عبدالرحمن ابن مرشد، RNSA4146، 9303، المدينة الصناعية الثانية, Riyadh 14334, Riyadh 41434, Saudi Arabia";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* HEADER SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b bg-gradient-to-b from-primary/10 via-background to-background">
        {/* <div className="absolute inset-0 z-0 mix-blend-multiply dark:mix-blend-screen pointer-events-none">
          <StarsBackground className="absolute inset-0 opacity-40 bg-transparent" starColors={["#1E5A8E", "#0A5C36", "#00C9B1"]} />
        </div> */}
        <div className="absolute inset-0 molecular-bg opacity-20" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

        <div className="container relative z-10 mx-auto px-4 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5 px-4 py-1">Contact Green Lab</Badge>
            <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-6">
              Expert Guidance is <br />
              <span className="text-primary italic"><TypewriterText text="Just a Message Away." delay={600} /></span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Ready to elevate your quality standards? Our team of analytical experts and scientists is standing by to support your compliance needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CORE CONTACT SECTION */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-16 items-start">

            {/* Left: Info Cards */}
            <div className="lg:col-span-5 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="space-y-6">
                  <h2 className="text-3xl font-display font-bold">Visit Our Facility</h2>
                  <p className="text-muted-foreground">Experience precision in Saudi Arabia's premier analytical laboratory hub.</p>

                  <div className="grid gap-4">
                    <Card className="border-border/50 hover:border-primary/20 transition-all group overflow-hidden">
                      <CardContent className="p-6 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold">Central Laboratory</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {officeLocation}
                          </p>
                          <Button variant="link" className="p-0 h-auto text-primary text-xs flex items-center gap-1 mt-2" onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(officeLocation)}`, '_blank')}>
                            Open in Google Maps <ArrowRight className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Card className="border-border/50">
                        <CardContent className="p-6 flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
                            <Phone className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm">Call Us</h4>
                            <p className="text-xs text-muted-foreground mt-1" dir="ltr">+966 11 123 4567</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-border/50">
                        <CardContent className="p-6 flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm">Email Us</h4>
                            <p className="text-xs text-muted-foreground mt-1 text-primary hover:underline cursor-pointer">info@greenlab.sa</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="border-border/50 bg-secondary/20">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-background border flex items-center justify-center">
                            <Clock className="w-5 h-5 text-primary" />
                          </div>
                          <h4 className="font-bold">Business Hours</h4>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center border-b border-border/50 pb-2">
                            <span className="text-muted-foreground">Sun - Thu</span>
                            <span className="font-bold text-foreground">08:00 AM - 05:00 PM</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-border/50 pb-2">
                            <span className="text-muted-foreground">Fri - Sat</span>
                            <span className="font-bold text-accent">Closed</span>
                          </div>
                          <p className="text-[10px] text-muted-foreground italic mt-2 flex items-center gap-1">
                            <Globe className="w-3 h-3" /> All times are (GMT+3) Saudi Arabia
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Modern Form */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="shadow-2xl shadow-primary/5 border-primary/5 overflow-hidden">
                  <div className="h-2 bg-primary w-full" />
                  <CardContent className="p-8 md:p-12">
                    {isSuccess ? (
                      <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", bounce: 0.4 }}
                          className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center"
                        >
                          <CheckCircle2 className="w-12 h-12 text-green-500" />
                        </motion.div>
                        <div className="space-y-2">
                          <h3 className="text-3xl font-bold font-display tracking-tight text-foreground">Inquiry Received</h3>
                          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                            Thank you for reaching out. Your message has been routed to the appropriate department and a consultant will follow up with you within 24 business hours.
                          </p>
                        </div>
                        <Button variant="outline" className="h-12 px-8 border-2" onClick={() => setIsSuccess(false)}>
                          Send Another Request
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-2 text-left">
                          <h3 className="text-2xl font-bold font-display">Send a Direct Message</h3>
                          <p className="text-sm text-muted-foreground">Fill out the form below and our specialists will get back to you.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-sm font-semibold">First Name</Label>
                            <Input id="firstName" required placeholder="e.g., Ahmed" className="h-12 bg-secondary/20 focus-visible:ring-primary border-none" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-sm font-semibold">Last Name</Label>
                            <Input id="lastName" required placeholder="e.g., Al-Qahtani" className="h-12 bg-secondary/20 focus-visible:ring-primary border-none" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-sm font-semibold">Company Name</Label>
                          <Input id="company" required placeholder="Saudi BioTech Research Center" className="h-12 bg-secondary/20 focus-visible:ring-primary border-none" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-semibold">Work Email</Label>
                            <Input id="email" type="email" required placeholder="name@company.sa" className="h-12 bg-secondary/20 focus-visible:ring-primary border-none" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-semibold">Mobile Number</Label>
                            <Input id="phone" type="tel" required placeholder="+966 5X XXX XXXX" dir="ltr" className="h-12 bg-secondary/20 focus-visible:ring-primary border-none" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-sm font-semibold">Detailed Inquiry</Label>
                          <Textarea
                            id="message"
                            required
                            placeholder="Please provide details about your testing requirements, standards needed (ISO, SFDA, etc.), and sample volume."
                            className="min-h-[160px] bg-secondary/20 focus-visible:ring-primary border-none resize-none p-4"
                          />
                        </div>

                        <Button type="submit" size="lg" className="w-full h-14 text-base font-bold shadow-lg shadow-primary/20 hover-elevate" disabled={isSubmitting}>
                          {isSubmitting ? "Processing Inquiry..." : (
                            <span className="flex items-center gap-2">Initiate Contact <Send className="w-4 h-4" /></span>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP SECTION - FULL WIDTH */}
      <section className="py-24 bg-secondary/30 border-t">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="border-accent/30 text-accent bg-accent/5">Strategic Location</Badge>
              <h2 className="text-4xl font-display font-bold">Located at the Heart of Riyadh's Industrial Center</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our central facility in the Second Industrial City (Sudair/Modon) provides rapid access to Saudi Arabia's manufacturing and pharmaceutical hubs, ensuring temperature-controlled sample logistics and rapid turnaround.
              </p>
              <Card className="bg-background border-dashed border-2 p-6">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">Official Registered Address</p>
                    <p className="text-sm text-muted-foreground">{officeLocation}</p>
                  </div>
                </div>
              </Card>
            </div>

            <motion.div
              style={{ perspective: 1000 }}
              initial={{ opacity: 0, rotateY: 10 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              className="h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl relative border-4 border-background group"
            >
              {/* Virtual Map Illustration/Mock - in real app would be Google Maps Iframe */}
              <div className="absolute inset-0 bg-[#f8f9fa] flex items-center justify-center">
                {/* Background image representing a map/satellite view */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center grayscale opacity-30" />

                {/* Grid overlay */}
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.03 }} />

                {/* Laboratory pin */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <div className="absolute -inset-8 bg-primary/20 rounded-full blur-xl animate-pulse" />
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-2xl border-4 border-white relative">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-background border shadow-xl rounded-lg p-3 w-48 text-center">
                    <p className="font-bold text-xs uppercase tracking-widest text-primary mb-1">Green Lab Facility</p>
                    <p className="text-[10px] text-muted-foreground leading-tight">Second Industrial City, Riyadh</p>
                  </div>
                </motion.div>

                {/* Satellite label info */}
                <div className="absolute bottom-6 right-6 bg-background/80 backdrop-blur shadow rounded-md px-3 py-1 text-[10px] font-mono text-muted-foreground">
                  LAT: 24.5823 N | LNG: 46.8291 E
                </div>

                {/* Interaction overlay */}
                <div className="absolute inset-0 bg-primary/0 hover:bg-primary/5 transition-colors flex items-center justify-center group-hover:cursor-pointer" onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(officeLocation)}`, '_blank')}>
                  <div className="bg-background/90 backdrop-blur shadow-2xl rounded-full px-6 py-3 font-bold text-sm scale-0 group-hover:scale-100 transition-transform flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" /> View on Google Maps
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

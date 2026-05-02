import { Link } from "wouter";
import { 
  FlaskConical, MapPin, Phone, Mail, Instagram, 
  Linkedin, Twitter, ArrowRight, ShieldCheck, 
  Award, Globe, CheckCircle2 
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const { language } = useLanguage();
  const t = {
    en: {
      tagline: "Precision Testing. Trusted Results. Global Standards.",
      services: "Services",
      industries: "Industries",
      resources: "Resources",
      contact: "Contact",
      address: "King Fahd Road, Riyadh, Saudi Arabia",
      vision: "Powered by Saudi Vision 2030",
      subscribe: "Subscribe to our technical insights",
      emailPlaceholder: "Enter your email",
      join: "Join our network of 500+ leaders",
    },
    ar: {
      tagline: "اختبارات دقيقة. نتائج موثوقة. معايير عالمية.",
      services: "الخدمات",
      industries: "الصناعات",
      resources: "الموارد",
      contact: "اتصل بنا",
      address: "طريق الملك فهد، الرياض، المملكة العربية السعودية",
      vision: "بدعم من رؤية السعودية 2030",
      subscribe: "اشترك في رؤانا التقنية",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      join: "انضم إلى شبكتنا التي تضم 500+ قائد",
    }
  }[language];

  return (
    <footer className="bg-gradient-to-br from-[#0a1628] via-[#0a1628] to-[#022a2e] text-white border-t border-[#00C9B1]/10 relative overflow-hidden">
      {/* Decorative background glow - refined with brand colors */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00C9B1]/5 rounded-full blur-[140px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#1E5A8E]/10 rounded-full blur-[120px] translate-y-1/2 pointer-events-none" />
      
      {/* Top CTA Bar */}
      <div className="border-b border-white/5 py-12 relative z-10 backdrop-blur-3xl bg-white/[0.02]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <h3 className="text-2xl font-display font-bold mb-2 text-white">{t.subscribe}</h3>
              <p className="text-white/50">{t.join}</p>
            </div>
            <div className="flex w-full max-w-md gap-2">
              <Input 
                placeholder={t.emailPlaceholder} 
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#00C9B1]"
              />
              <Button className="bg-[#00C9B1] hover:bg-[#00C9B1]/90 text-[#0a1628] font-black shadow-[0_0_20px_rgba(0,201,177,0.3)]">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="inline-block relative group"
            >
              <Link href="/" className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute -inset-2 bg-[#00C9B1]/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img src="/gl-3.jpeg" alt="Green Lab Logo" className="h-20 w-auto rounded-xl object-cover relative z-10 border border-white/10 shadow-2xl" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-3xl tracking-tighter text-white">GREEN LAB</span>
                  <div className="flex items-center gap-2">
                    <div className="h-[2px] w-8 bg-[#00C9B1]" />
                    <span className="text-[10px] tracking-[0.3em] text-[#00C9B1] font-black uppercase">Analytical Portal</span>
                  </div>
                </div>
              </Link>
            </motion.div>
            
            <p className="text-white/60 text-lg leading-relaxed max-w-sm font-medium">
              {t.tagline}
            </p>

            <div className="flex gap-4">
              {[Linkedin, Twitter, Instagram].map((Icon, idx) => (
                <motion.a 
                  key={idx}
                  href="#" 
                  whileHover={{ y: -5, color: "#00C9B1", backgroundColor: "rgba(0, 201, 177, 0.15)" }}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:border-[#00C9B1]/40 transition-all shadow-xl"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-[#00C9B1]">{t.services}</h4>
            <ul className="space-y-4 text-white/40 font-medium">
              <li><Link href="/services" className="hover:text-white transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full bg-[#00C9B1] scale-0 group-hover:scale-100 transition-transform" /> Chemical Analysis</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full bg-[#00C9B1] scale-0 group-hover:scale-100 transition-transform" /> Microbiological</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full bg-[#00C9B1] scale-0 group-hover:scale-100 transition-transform" /> Physical Testing</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full bg-[#00C9B1] scale-0 group-hover:scale-100 transition-transform" /> Industrial Safety</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-[#00C9B1]">{t.resources}</h4>
            <ul className="space-y-4 text-white/40 font-medium">
              <li><Link href="/about" className="hover:text-white transition-colors">Our Evolution</Link></li>
              <li><Link href="/credentials" className="hover:text-white transition-colors">Accreditations</Link></li>
              <li><Link href="/equipment" className="hover:text-white transition-colors">Instrumental Suite</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Request Portal Access</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-[#00C9B1]">{t.contact}</h4>
            <ul className="space-y-6 text-white/40 font-medium">
              <li className="flex items-start gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#00C9B1]/30 transition-colors">
                  <MapPin className="w-4 h-4 text-[#00C9B1]" />
                </div>
                <span className="text-xs leading-relaxed group-hover:text-white transition-colors">{t.address}</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#00C9B1]/30 transition-colors">
                  <Phone className="w-4 h-4 text-[#00C9B1]" />
                </div>
                <span className="text-xs font-bold group-hover:text-white transition-colors" dir="ltr">+966 11 123 4567</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#00C9B1]/30 transition-colors">
                  <Mail className="w-4 h-4 text-[#00C9B1]" />
                </div>
                <span className="text-xs group-hover:text-white transition-colors">info@greenlab.sa</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-20 pt-10 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
               <div className="flex items-center gap-2 text-[10px] font-black tracking-tighter uppercase"><ShieldCheck className="w-3.5 h-3.5 text-[#00C9B1]" /> SFDA Certified</div>
               <div className="flex items-center gap-2 text-[10px] font-black tracking-tighter uppercase"><Award className="w-3.5 h-3.5 text-[#00C9B1]" /> ISO 17025</div>
               <div className="flex items-center gap-2 text-[10px] font-black tracking-tighter uppercase"><CheckCircle2 className="w-3.5 h-3.5 text-[#00C9B1]" /> SAC Accredited</div>
            </div>
            
            <div className="flex flex-col md:items-end gap-2">
              <div className="flex items-center gap-3 text-[#00C9B1] font-bold tracking-tight group cursor-default">
                <Globe className="w-4 h-4 animate-pulse" />
                <span className="text-sm uppercase tracking-widest">{t.vision}</span>
              </div>
              <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">© {new Date().getFullYear()} Green Lab Analytical Solutions. Riyadh, KSA.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


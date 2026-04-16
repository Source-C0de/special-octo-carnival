import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, ArrowRight, ShieldCheck, Globe, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const { language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast({
        title: language === "en" ? "Authentication Successful" : "تم التحقق بنجاح",
        description: language === "en" ? "Redirecting to your secure dashboard..." : "جاري توجيهك إلى لوحة القيادة الآمنة...",
      });
      setLocation("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const t = {
    en: {
      title: "Secure Portal Access",
      subtitle: "Enter your corporate credentials to access Green Lab's analytical infrastructure.",
      email: "Corporate Email",
      password: "Access Token / Password",
      submit: "Authorize Access",
      forgot: "Forgot Password?",
      trustLine: "Enterprise-grade encryption enabled",
      vision: "Supporting Saudi Vision 2030 Quality Standards"
    },
    ar: {
      title: "دخول البوابة الآمنة",
      subtitle: "أدخل بيانات اعتماد شركتك للوصول إلى البنية التحتية التحليلية لـ Green Lab.",
      email: "البريد الإلكتروني للشركة",
      password: "كلمة المرور / مفتاح الدخول",
      submit: "تصريح الدخول",
      forgot: "نسيت كلمة المرور؟",
      trustLine: "تشفير على مستوى المؤسسات مفعل",
      vision: "دعم معايير الجودة لرؤية السعودية 2030"
    }
  }[language];

  return (
    <div className={`min-h-screen flex font-sans ${language === "ar" ? "rtl" : "ltr"}`}>
      {/* LEFT PANEL - Branding & Visuals */}
      <div className="hidden lg:flex w-1/2 bg-[#0A5C36] relative overflow-hidden flex-col justify-between p-16">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="text-white">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3 mb-12">
             <img src="/gl-2.jpg" alt="Logo" className="h-12 w-auto rounded-lg" />
             <span className="text-2xl font-display font-bold text-white">Green Lab</span>
          </div>
          
          <h1 className="text-5xl font-display font-bold text-white leading-tight mb-6">
            Pioneering Analytical <span className="text-teal italic">Excellence</span> in the Kingdom.
          </h1>
          <p className="text-emerald-foreground/70 text-lg max-w-md leading-relaxed">
            Access secure testing reports, track batch progress, and manage compliance documents through our centralized laboratory engine.
          </p>
        </motion.div>

        <div className="relative z-10 grid grid-cols-2 gap-8 border-t border-white/10 pt-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-teal">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-bold text-white text-sm">ISO 17025 Authenticated</span>
            </div>
            <p className="text-xs text-white/50">Encrypted data transmission for all lab reports.</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-teal">
              <Globe className="w-5 h-5" />
              <span className="font-bold text-white text-sm">Global Recognition</span>
            </div>
            <p className="text-xs text-white/50">ILAC-MRA aligned documentation access.</p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Login Form */}
      <div className="w-full lg:w-1/2 bg-sand/20 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-foreground mb-3">{t.title}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{t.subtitle}</p>
          </div>

          <Card className="border-emerald/10 shadow-2xl shadow-emerald/5 rounded-3xl bg-white/80 backdrop-blur-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t.email}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@company.sa" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 pl-10 border-emerald/10 focus-visible:ring-primary rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t.password}</Label>
                    <button type="button" className="text-xs font-bold text-primary hover:underline">{t.forgot}</button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pl-10 border-emerald/10 focus-visible:ring-primary rounded-xl"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-14 bg-emerald hover:bg-emerald/90 text-white font-bold text-lg rounded-xl shadow-lg shadow-emerald/20 group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="flex items-center justify-center"
                    >
                      <Globe className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {t.submit} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-10 text-center space-y-4">
             <div className="flex items-center justify-center gap-2 text-primary font-bold text-xs uppercase tracking-tighter">
                <CheckCircle2 className="w-4 h-4" />
                {t.trustLine}
             </div>
             <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                {t.vision}
             </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Search, Globe, Moon, Sun, ChevronDown, FlaskConical, Microscope, Activity, Droplets, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/components/theme-provider";
import { useLanguage } from "@/components/language-provider";
import { useAuth } from "@/hooks/use-auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import QuickQuoteModal from "@/components/shared/QuickQuoteModal";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { isLoggedIn, logout } = useAuth();
  const [quoteOpen, setQuoteOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location === "/";
  const navBg = isScrolled ? "bg-background/95 backdrop-blur-md border-b shadow-sm" : isHome ? "bg-background/85 backdrop-blur-md border-b border-border/60" : "bg-background border-b";
  const textColor = "text-foreground hover:text-primary";

  const t = {
    en: { services: "Services", about: "About Us", dashboard: "Dashboard", contact: "Contact", search: "Search standards, tests...", login: "Client Login", quote: "Quick Quote" },
    ar: { services: "الخدمات", about: "من نحن", dashboard: "لوحة القيادة", contact: "اتصل بنا", search: "ابحث عن المعايير والاختبارات...", login: "تسجيل الدخول", quote: "اقتباس سريع" }
  }[language];

  const megaMenu = (
    <div className="grid grid-cols-4 gap-6 p-6 md:w-[600px] lg:w-[800px]">
      <div>
        <h4 className="font-semibold mb-4 flex items-center gap-2"><FlaskConical className="w-4 h-4 text-primary" /> Chemical</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link href="/services/s-01" className="hover:text-primary">Composition Analysis</Link></li>
          <li><Link href="/services/s-01" className="hover:text-primary">Heavy Metals</Link></li>
          <li><Link href="/services/s-01" className="hover:text-primary">Pesticides</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4 flex items-center gap-2"><Microscope className="w-4 h-4 text-primary" /> Microbiological</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link href="/services/s-02" className="hover:text-primary">Pathogen Detection</Link></li>
          <li><Link href="/services/s-02" className="hover:text-primary">Sterility Testing</Link></li>
          <li><Link href="/services/s-02" className="hover:text-primary">Environmental</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-primary" /> Physical</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link href="/services/s-03" className="hover:text-primary">Viscosity & Density</Link></li>
          <li><Link href="/services/s-03" className="hover:text-primary">Particle Size</Link></li>
          <li><Link href="/services/s-03" className="hover:text-primary">Tensile Strength</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4 flex items-center gap-2"><Droplets className="w-4 h-4 text-primary" /> Environmental</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link href="/services/s-04" className="hover:text-primary">Water Quality</Link></li>
          <li><Link href="/services/s-04" className="hover:text-primary">Soil Analysis</Link></li>
          <li><Link href="/services/s-04" className="hover:text-primary">Air Monitoring</Link></li>
        </ul>
      </div>
      <div className="col-span-4 mt-6 pt-6 border-t border-emerald/5 flex justify-end">
        <Link href="/services" className="text-primary font-bold flex items-center gap-2 group">
          Explore Solutions Ecosystem <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${navBg}`}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 lg:gap-10">
            <Link href="/" className={`flex items-center gap-3 transition-opacity hover:opacity-90 ${textColor}`}>
              <img src="/gl-3.jpeg" alt="Green Lab Logo" className="h-14 w-auto rounded-sm object-cover" />
              {/* <span className="font-display font-bold text-xl tracking-tight">Green Lab</span> */}
            </Link>

            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
              <Link href="/about" className={textColor}>{t.about}</Link>
              <DropdownMenu>
                <DropdownMenuTrigger className={`flex items-center gap-1 ${textColor} outline-none`}>
                  {t.services} <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-0 border-none shadow-xl mt-4" align="start">
                  {megaMenu}
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/credentials" className={textColor}>Credentials</Link>
              <Link href="/equipment" className={textColor}>{language === "en" ? "Equipment" : "الأجهزة"}</Link>
              {/* <Link href="/dashboard" className={textColor}>{t.dashboard}</Link> */}
              <Link href="/contact" className={textColor}>{t.contact}</Link>
            </nav>
          </div>

          <div className="hidden lg:flex items-center flex-1 max-w-sm ml-auto mr-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t.search}
                className="w-full pl-9 bg-background/50 focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={textColor}
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              title="Toggle Language"
            >
              <Globe className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={textColor}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            <div className="hidden md:flex gap-2">
              {isLoggedIn ? (
                <Button variant="outline" onClick={logout}>
                  {language === "en" ? "Sign Out" : "تسجيل الخروج"}
                </Button>
              ) : (
                <Button variant="outline" asChild>
                  <Link href="/login">{t.login}</Link>
                </Button>
              )}
              <Button onClick={() => setQuoteOpen(true)}>{t.quote}</Button>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={`lg:hidden ${textColor}`}>
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side={language === "ar" ? "right" : "left"} className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 py-6">
                  <Link href="/" className="flex items-center gap-3">
                    <img src="/gl-3.jpeg" alt="Green Lab Logo" className="h-12 w-auto rounded-md object-cover" />
                    <span className="font-display font-bold text-xl tracking-tight">Green Lab</span>
                  </Link>

                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder={t.search} className="w-full pl-9" />
                  </div>

                  <nav className="flex flex-col gap-4 text-lg font-medium">
                    <Link href="/about">{t.about}</Link>
                    <Link href="/services">{t.services}</Link>
                    <Link href="/credentials">{language === "en" ? "Credentials" : "الاعتمادات"}</Link>
                    <Link href="/equipment">{language === "en" ? "Equipment" : "الأجهزة"}</Link>
                    {/* <Link href="/dashboard">{t.dashboard}</Link> */}
                    <Link href="/contact">{t.contact}</Link>
                  </nav>

                  <div className="flex flex-col gap-2 mt-auto pt-6 border-t">
                    {isLoggedIn ? (
                      <Button variant="outline" onClick={logout} className="w-full justify-start">
                        {language === "en" ? "Sign Out" : "تسجيل الخروج"}
                      </Button>
                    ) : (
                      <Button variant="outline" asChild className="w-full justify-start">
                        <Link href="/login">{t.login}</Link>
                      </Button>
                    )}
                    <Button className="w-full justify-start" onClick={() => setQuoteOpen(true)}>
                      {t.quote}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <QuickQuoteModal open={quoteOpen} onOpenChange={setQuoteOpen} />
    </>
  );
}

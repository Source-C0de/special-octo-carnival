import { Link } from "wouter";
import { FlaskConical, MapPin, Phone, Mail, Instagram, Linkedin, Twitter } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

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
      vision: "Powered by Saudi Vision 2030"
    },
    ar: {
      tagline: "اختبارات دقيقة. نتائج موثوقة. معايير عالمية.",
      services: "الخدمات",
      industries: "الصناعات",
      resources: "الموارد",
      contact: "اتصل بنا",
      address: "طريق الملك فهد، الرياض، المملكة العربية السعودية",
      vision: "بدعم من رؤية السعودية 2030"
    }
  }[language];

  return (
    <footer className="bg-secondary/50 border-t pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4 transition-opacity hover:opacity-90">
              <img src="/gl-3.jpeg" alt="Green Lab Logo" className="h-16 w-auto rounded-md object-cover" />
              {/* <span className="font-display font-bold text-2xl tracking-tight">Green Lab</span> */}
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {t.tagline}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary transition-colors shadow-sm">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary transition-colors shadow-sm">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary transition-colors shadow-sm">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.services}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/services/s-01" className="hover:text-primary transition-colors">Chemical Analysis</Link></li>
              <li><Link href="/services/s-02" className="hover:text-primary transition-colors">Microbiological</Link></li>
              <li><Link href="/services/s-03" className="hover:text-primary transition-colors">Physical Testing</Link></li>
              <li><Link href="/services/s-04" className="hover:text-primary transition-colors">Environmental</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.industries}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Pharmaceuticals</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Food & Beverage</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cosmetics</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Oil & Gas</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.contact}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>{t.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span dir="ltr">+966 11 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>info@greenlab.sa</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Green Lab. All rights reserved.</p>
          <div className="flex items-center gap-2 font-medium text-primary">
            <span className="w-2 h-2 rounded-full bg-primary" />
            {t.vision}
          </div>
        </div>
      </div>
    </footer>
  );
}

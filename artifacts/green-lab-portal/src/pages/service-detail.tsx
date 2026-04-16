import { useParams, Link } from "wouter";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { services } from "@/lib/mock-data";
import { ArrowLeft, Clock, ShieldCheck, CheckCircle2, FlaskConical, Download, Microscope, Activity, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuickQuoteModal from "@/components/shared/QuickQuoteModal";

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const service = services.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold mb-4">Service not found</h2>
        <Button asChild><Link href="/">Return Home</Link></Button>
      </div>
    );
  }

  const renderIcon = () => {
    switch(service.icon) {
      case "FlaskConical": return <FlaskConical className="w-12 h-12 text-primary" />;
      case "Microscope": return <Microscope className="w-12 h-12 text-primary" />;
      case "Activity": return <Activity className="w-12 h-12 text-primary" />;
      case "Droplets": return <Droplets className="w-12 h-12 text-primary" />;
      default: return <FlaskConical className="w-12 h-12 text-primary" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* HERO */}
      <section className="bg-secondary/30 pt-12 pb-24 border-b">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="-ml-3 text-muted-foreground hover:text-foreground">
              <Link href="/"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Services</Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center justify-center p-3 bg-background border rounded-xl shadow-sm mb-4">
                {renderIcon()}
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">{service.title}</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">{service.description}</p>
              
              <div className="flex flex-wrap gap-3 pt-4">
                {service.badges.map(b => (
                  <Badge key={b} variant="secondary" className="px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                    {b} Compliant
                  </Badge>
                ))}
              </div>

              <div className="pt-6 flex gap-4">
                <Button size="lg" className="h-14 px-8" onClick={() => setQuoteOpen(true)}>Request Quote</Button>
                <Button size="lg" variant="outline" className="h-14 px-8 bg-background">Download Specs</Button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <Card className="shadow-xl border-primary/10 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
                <CardHeader className="bg-secondary/20 pb-8">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" /> Service Parameters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 -mt-4 bg-background">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
                      <p className="text-sm text-muted-foreground mb-1">Standard Turnaround</p>
                      <p className="text-lg font-bold">{service.tat.standard}</p>
                    </div>
                    <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                      <p className="text-sm text-accent mb-1">Express Available</p>
                      <p className="text-lg font-bold text-accent">{service.tat.express}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Sample Requirements</p>
                    <p className="text-sm text-muted-foreground bg-secondary/20 p-3 rounded-md border border-dashed">
                      {service.requirements}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Industries Served</p>
                    <div className="flex flex-wrap gap-2">
                      {service.industries.map(ind => (
                        <Badge key={ind} variant="outline">{ind}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TABS DETAILS */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full grid grid-cols-3 h-14 mb-8 bg-secondary/50">
              <TabsTrigger value="overview" className="text-base data-[state=active]:bg-background data-[state=active]:shadow-sm">Overview</TabsTrigger>
              <TabsTrigger value="methods" className="text-base data-[state=active]:bg-background data-[state=active]:shadow-sm">Testing Methods</TabsTrigger>
              <TabsTrigger value="compliance" className="text-base data-[state=active]:bg-background data-[state=active]:shadow-sm">Compliance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h3 className="text-2xl font-display font-bold">Comprehensive Analysis for Quality Assurance</h3>
                <p>
                  Our {service.title.toLowerCase()} services utilize state-of-the-art equipment and internationally recognized methodologies to ensure the highest level of accuracy and reliability. Whether you are conducting routine quality control, investigating a product failure, or developing a new formulation, our team of expert analysts provides actionable data.
                </p>
                <p>
                  We understand that in the {service.industries[0]} industry, time is often critical. That's why our laboratory operates with streamlined workflows optimized for rapid turnaround without compromising precision.
                </p>
                
                <h4 className="text-xl font-display font-bold mt-8">Key Benefits</h4>
                <ul className="space-y-2 mt-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span><strong>Accredited Results:</strong> Fully backed by ISO/IEC 17025:2017 accreditation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span><strong>Digital Integration:</strong> Access results instantly via the Green Lab Client Portal.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span><strong>Expert Consultation:</strong> Direct access to analysts for results interpretation.</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="methods" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card>
                <CardHeader>
                  <CardTitle>Analytical Techniques Employed</CardTitle>
                  <CardDescription>We employ validated instrumental techniques based on global pharmacopoeias and standards.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    {[1,2,3].map((i) => (
                      <div key={i} className="flex gap-4 items-start p-4 rounded-lg border bg-secondary/10">
                        <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold font-mono text-sm">
                          {i}
                        </div>
                        <div>
                          <h4 className="font-bold mb-1">Standard Method Component {i}</h4>
                          <p className="text-sm text-muted-foreground">High-performance instrumental analysis providing parts-per-billion level limits of detection.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compliance" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid sm:grid-cols-2 gap-4">
                {service.badges.map(b => (
                  <Card key={b}>
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold">{b} Standard</h4>
                        <p className="text-xs text-muted-foreground mt-1">Fully accredited scopes available upon request.</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-8 p-6 bg-secondary/30 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold">Need official accreditation documentation?</h4>
                  <p className="text-sm text-muted-foreground mt-1">Download our full ISO/IEC 17025 scope of accreditation.</p>
                </div>
                <Button variant="outline" className="shrink-0">
                  <Download className="w-4 h-4 mr-2" /> Download PDF
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <QuickQuoteModal open={quoteOpen} onOpenChange={setQuoteOpen} />
    </div>
  );
}

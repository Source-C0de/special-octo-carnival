import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Award, Building2, CheckCircle2, FlaskConical, MapPin, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { aboutMilestones, aboutValues, caseStudies, expertProfiles } from "@/lib/mock-data";

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="absolute inset-0 molecular-bg opacity-25" />
        <div className="container relative mx-auto px-4 py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-7">
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
                ISO/IEC 17025:2017 Certified | SFDA Approved
              </Badge>
              <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
                Green Lab: Your Gateway to Global Quality with a Local Vision
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                With a vision that combines innovation and precision, Green Lab offers advanced analytical solutions across pharmaceuticals, food, water, cosmetics, and industrial sectors — enhancing compliance, accelerating decisions, and supporting Saudi Vision 2030.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Request a Consultation <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/#services">View Testing Services</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.1 }}>
              <Card className="overflow-hidden border-primary/15 bg-background/85 shadow-2xl backdrop-blur">
                <CardHeader className="border-b bg-primary text-primary-foreground">
                  <CardTitle className="flex items-center gap-3 text-2xl font-display">
                    <FlaskConical className="h-6 w-6" />
                    The Visionary Lab
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      ["12+", "Regulated sectors served"],
                      ["99.9%", "Report traceability"],
                      ["24h", "Express testing support"],
                      ["2030", "Local vision alignment"],
                    ].map(([metric, label]) => (
                      <div key={label} className="rounded-xl border bg-secondary/40 p-5">
                        <p className="text-3xl font-display font-bold text-primary">{metric}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-5 md:grid-cols-3">
            {aboutValues.map((value, index) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                <Card className="h-full border-border/60 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                  <CardContent className="p-6">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {index === 0 ? <CheckCircle2 /> : index === 1 ? <Users /> : <ShieldCheck />}
                    </div>
                    <h2 className="text-xl font-semibold">{value.title}</h2>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <Badge variant="outline" className="mb-4">Milestone Timeline</Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold">A Saudi laboratory built for global confidence</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Our growth has been guided by accreditation, regulatory alignment, and practical partnership with quality teams across the Kingdom.
              </p>
            </div>
            <Card className="shadow-xl">
              <CardContent className="p-7">
                {aboutMilestones.map((item, index) => (
                  <div key={item.title} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="mt-1 h-4 w-4 rounded-full border-4 border-primary/20 bg-primary" />
                      {index < aboutMilestones.length - 1 && <div className="w-px flex-1 bg-primary/20" />}
                    </div>
                    <div className="pb-8 last:pb-0">
                      <p className="font-mono text-sm font-semibold text-primary">{item.year}</p>
                      <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                      <p className="mt-1 text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge variant="outline" className="mb-4">Leadership & Local Impact</Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold">Experts, hubs, and proof of impact</h2>
            </div>
            <Button variant="outline" asChild>
              <Link href="/contact">Meet All Experts</Link>
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="grid gap-5 md:grid-cols-3">
              {expertProfiles.map((expert) => (
                <Card key={expert.id} className="overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
                  <img src={expert.image} alt={expert.name} className="h-48 w-full object-cover" loading="lazy" />
                  <CardContent className="p-5">
                    <p className="font-semibold">{expert.name}</p>
                    <p className="text-sm text-primary">{expert.role}</p>
                    <p className="mt-3 text-sm text-muted-foreground">{expert.credentials}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-primary text-primary-foreground shadow-xl">
              <CardContent className="p-7">
                <div className="mb-6 flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-accent" />
                  <h3 className="text-2xl font-display font-bold">Saudi service hubs</h3>
                </div>
                <div className="space-y-4">
                  {["Riyadh central lab", "Jeddah sample logistics", "Dammam industrial corridor", "NEOM project support"].map((hub) => (
                    <div key={hub} className="flex items-center justify-between rounded-xl bg-white/10 p-4">
                      <span>{hub}</span>
                      <Building2 className="h-5 w-5 text-accent" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <Badge variant="outline" className="mb-4">Quality & Trust</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold">Accreditation-backed outcomes</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {caseStudies.map((study) => (
              <Card key={study.id} className="overflow-hidden">
                <img src={study.image} alt={study.title} className="h-44 w-full object-cover" loading="lazy" />
                <CardContent className="p-5">
                  <Badge variant="secondary">{study.industry}</Badge>
                  <h3 className="mt-4 font-semibold">{study.title}</h3>
                  <p className="mt-2 text-sm text-primary font-medium">{study.metric}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border bg-background p-6 text-center shadow-sm">
            <Award className="mx-auto mb-3 h-8 w-8 text-primary" />
            <p className="text-lg font-semibold">Verify our precision through accredited testing, documented traceability, and client-ready reporting.</p>
            <Button className="mt-5" asChild>
              <Link href="/#services">View Equipment & Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
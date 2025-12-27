import type React from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { LeadForm } from "@/components/lead-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Zap, ShieldCheck, BellRing, LayoutDashboard, FileSearch, ArrowRight, ChevronRight } from "lucide-react"

export default function LandingPage() {
  return (
    <main className="min-h-screen pt-16">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Decorative elements inspired by soft gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-accent rounded-full blur-[120px]" />
          <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-primary/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-xs font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Announcing LeadFlow AI for Material Brands
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Never Lose a <span className="text-muted-foreground/40">Lead</span> Again
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            AI-powered lead capture, follow-ups, and SLA enforcement specifically built for flooring, lighting, and
            interior material brands.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Button size="lg" className="rounded-full px-8 h-12 text-base">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base bg-white/50">
              See How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 border-y border-border/50 bg-white/30">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-medium text-muted-foreground/60 mb-8 tracking-widest uppercase">
            Built for high-volume brands & sales teams
          </p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale contrast-125">
            {/* Minimal Logo Placeholders */}
            <div className="text-xl font-bold italic">LUMINA</div>
            <div className="text-xl font-bold tracking-tighter">FLORALUX</div>
            <div className="text-xl font-bold uppercase">Integrit</div>
            <div className="text-xl font-bold tracking-widest">LAYER</div>
            <div className="text-xl font-bold">V-MAT</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Everything you need to convert</h2>
            <p className="text-muted-foreground">
              Automate the tedious parts of lead management and focus on closing deals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<ShieldCheck className="w-5 h-5" />}
              title="AI Lead Classification"
              description="Automatically classify inquiries by product type, urgency, and project scope using advanced NLP."
            />
            <FeatureCard
              icon={<Zap className="w-5 h-5" />}
              title="Instant Follow-ups"
              description="Send immediate, personalized responses to capture interest while it's at its peak."
            />
            <FeatureCard
              icon={<BellRing className="w-5 h-5" />}
              title="SLA Escalation Alerts"
              description="Never miss a deadline with automatic alerts when leads aren't handled within your SLA."
            />
            <FeatureCard
              icon={<LayoutDashboard className="w-5 h-5" />}
              title="Centralized Lead Dashboard"
              description="One beautiful interface to manage every inquiry across all your digital channels."
            />
            <FeatureCard
              icon={<FileSearch className="w-5 h-5" />}
              title="Full Audit Logs"
              description="Complete transparency into every touchpoint, from initial capture to final conversion."
            />
            <div className="p-8 rounded-2xl border border-dashed border-border flex flex-col items-center justify-center text-center space-y-4">
              <p className="text-sm text-muted-foreground font-medium">More features coming soon</p>
              <Button variant="link" className="text-primary font-semibold p-0">
                View Roadmap <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">How LeadFlow AI works</h2>
            <p className="text-muted-foreground">Simple three-step process to transform your sales pipeline.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <Step
              number="01"
              title="Customer submits inquiry"
              description="Our lightweight capture tool integrates seamlessly with your existing material brand website."
            />
            <Step
              number="02"
              title="AI classifies & schedules"
              description="LeadFlow AI analyzes the request, assigns it to the right specialist, and schedules follow-ups."
            />
            <Step
              number="03"
              title="Sales team converts faster"
              description="Armed with classified data and automated nudges, your team closes deals in record time."
            />
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-px bg-border -z-10" />
          </div>
        </div>
      </section>

      {/* Contact / Lead Capture Section */}
      <section id="contact" className="py-24 bg-white/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to capture more revenue?</h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Join the leading material brands using LeadFlow AI to streamline their sales process. Fill out the form
                and our team will get back to you within 24 hours.
              </p>
              <ul className="space-y-4 pt-4">
                {["99.9% uptime guaranteed", "Enterprise-grade security", "Seamless CRM integration"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-4 max-w-xs">
              <Link href="/" className="text-xl font-bold tracking-tight">
                LeadFlow<span className="text-muted-foreground/60">AI</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                AI-powered lead management for high-volume material brands and sales teams.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              <p className="text-sm font-medium">Contact</p>
              <a
                href="mailto:hello@leadflow.ai"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                hello@leadflow.ai
              </a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} LeadFlow AI. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="p-8 bg-white/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300 group">
      <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
        <div className="text-primary">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-3 tracking-tight">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </Card>
  )
}

function Step({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="space-y-6">
      <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-sm font-bold tracking-tighter shadow-sm relative z-10">
        {number}
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed text-pretty">{description}</p>
      </div>
    </div>
  )
}

function CheckCircle2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

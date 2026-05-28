import Link from "next/link";
import dynamic from "next/dynamic";
import { Search, Heart, ShieldCheck, Diamond, Star, UserPlus, MessageCircle, Sparkles, MapPin, Users, Briefcase, ChevronRight, BadgeCheck, Globe, BookOpen, ArrowRight } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { siteConfig } from "@/config/site";
import { HeroSearch } from "@/components/HeroSearch";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const BrowseCategories = dynamic(() => import("@/components/home/BrowseCategories").then(m => m.BrowseCategories), { ssr: true });
const TrustCounters = dynamic(() => import("@/components/home/TrustCounters").then(m => m.TrustCounters), { ssr: true });

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col min-h-screen">

      {/* ─── HERO ─── */}
      <section className="relative w-full overflow-hidden bg-background pt-10 sm:pt-16 pb-16 sm:pb-24">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-secondary/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

        <div className="container relative z-10 flex flex-col items-center text-center space-y-6 sm:space-y-10">
          <div className="space-y-3 sm:space-y-4 max-w-3xl px-2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground lg:text-7xl">
              Find your perfect <span className="text-secondary">match</span> with <span className="text-primary">trust</span>.
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
              Verified & curated profiles for Telugu, Kannada & Marathi communities. Built by the community, for the community.
            </p>
          </div>

          {/* Search Widget */}
          <HeroSearch isLoggedIn={!!session} />

          {/* CTA — Auth-aware */}
          {session ? (
            <Link href="/discover" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground shadow-lg hover:bg-primary/90 hover:scale-105 active:scale-[0.98] transition-all">
              Go to Discover <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <Link href="/register" className="inline-flex h-12 items-center justify-center rounded-full bg-secondary px-8 text-sm font-bold text-white shadow-lg hover:bg-secondary/90 hover:scale-105 active:scale-[0.98] transition-all">
                Register Free
              </Link>
              <span className="text-sm text-muted-foreground font-medium">Already a member? <Link href="/login" className="text-primary font-bold hover:underline">Login</Link></span>
            </div>
          )}
        </div>
      </section>

      {/* ─── TRUST COUNTERS ─── */}
      <TrustCounters />

      {/* ─── COMMUNITY PICKER ─── */}
      <section className="py-12 sm:py-20 bg-background">
        <div className="container">
          <div className="text-center mb-8 sm:mb-12 space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Choose Your Community</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">Start your search within your community or explore across communities.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              { lang: "Telugu", count: "1,000+", castes: "Reddy, Kamma, Kapu, Velama, Naidu", color: "from-orange-500/10 to-yellow-500/10", border: "border-orange-500/20", text: "text-orange-600 dark:text-orange-400" },
              { lang: "Kannada", count: "1,000+", castes: "Vokkaliga, Lingayat, Brahmin, Gowda", color: "from-red-500/10 to-pink-500/10", border: "border-red-500/20", text: "text-red-600 dark:text-red-400" },
              { lang: "Marathi", count: "1,000+", castes: "Maratha, Deshastha, Brahmin, Mali", color: "from-blue-500/10 to-indigo-500/10", border: "border-blue-500/20", text: "text-blue-600 dark:text-blue-400" },
            ].map((c) => (
              <Link key={c.lang} href={`/discover?community=${c.lang.toLowerCase()}`} className={`group relative bg-gradient-to-br ${c.color} border ${c.border} rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                <div className="space-y-3">
                  <h3 className={`text-2xl font-extrabold ${c.text}`}>{c.lang}</h3>
                  <p className="text-3xl font-black text-foreground">{c.count}</p>
                  <p className="text-xs text-muted-foreground font-medium">Profiles</p>
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-[11px] text-muted-foreground font-semibold">Top castes: {c.castes}</p>
                  </div>
                </div>
                <ChevronRight className="absolute top-6 right-5 w-5 h-5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BROWSE CATEGORIES ─── */}
      <BrowseCategories />

      {/* ─── DIFFERENTIATORS ─── */}
      <section className="py-12 sm:py-20 bg-background">
        <div className="container">
          <div className="text-center mb-8 sm:mb-12 space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Why choose {siteConfig.name}?</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">We combine modern technology with traditional values.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            <FeatureCard icon={<ShieldCheck className="h-7 w-7 sm:h-8 sm:w-8 text-green-500" />} title="Verified & Curated Profiles" description="Every profile undergoes manual verification with govt ID checks. Only genuine, quality profiles make it through." />
            <FeatureCard icon={<Sparkles className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />} title="AI Smart Matching" description="Our AI engine analyzes 50+ compatibility factors to find your most compatible matches automatically." />
            <FeatureCard icon={<Star className="h-7 w-7 sm:h-8 sm:w-8 text-accent" />} title="AI Kundali Matching" description="Advanced astrological compatibility analysis powered by AI. Get Guna Milan scores and Dosha insights instantly." />
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-10 sm:mb-14 space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">How it works</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">Your journey to finding the perfect life partner in four simple steps.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-border z-0" />
            {[
              { icon: UserPlus, title: "1. Create Profile", desc: "Register and build your detailed profile with photos and preferences.", color: "bg-primary/10 text-primary" },
              { icon: Sparkles, title: "2. AI & Astro Match", desc: "Let our AI and astrological engine find your most compatible matches.", color: "bg-accent/10 text-accent" },
              { icon: Search, title: "3. Search & Discover", desc: "Use advanced search and filters to explore profiles across communities.", color: "bg-secondary/10 text-secondary" },
              { icon: MessageCircle, title: "4. Connect", desc: "Initiate conversations, share details securely, and take the next step.", color: "bg-green-500/10 text-green-500" },
            ].map((step) => (
              <div key={step.title} className="relative z-10 flex flex-col items-center text-center space-y-3 sm:space-y-4">
                <div className={`w-16 h-16 sm:w-24 sm:h-24 rounded-full ${step.color} flex items-center justify-center shadow-sm border-4 sm:border-[6px] border-background`}>
                  <step.icon className="h-7 w-7 sm:h-10 sm:w-10" />
                </div>
                <h3 className="text-base sm:text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base px-0 sm:px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROFESSIONALS CALLOUT ─── */}
      <section className="py-12 sm:py-20 bg-background">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 border border-border/50 px-6 py-10 sm:px-12 sm:py-14 flex flex-col md:flex-row items-center gap-8">
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
            <div className="relative z-10 flex-1 space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                <Briefcase className="h-3.5 w-3.5" /> Coming Soon
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Exclusive Feed for Professionals
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-lg">
                A dedicated discovery feed for working professionals — Doctors, Engineers, IAS/IPS, CAs, MBAs, and Tech Leaders. Get matched with equally ambitious partners.
              </p>
              <Link href="/register" className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-md hover:scale-105 active:scale-[0.98] transition-all">
                Get Early Access
              </Link>
            </div>
            <div className="relative z-10 hidden md:flex gap-3">
              {["👨‍⚕️", "👩‍💻", "👨‍⚖️", "👩‍🔬"].map((emoji, i) => (
                <div key={i} className="w-16 h-16 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-center text-2xl hover:scale-110 transition-transform" style={{ animationDelay: `${i * 100}ms` }}>
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SUCCESS STORIES ─── */}
      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-8 sm:mb-12 space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Happy Stories, Real Trust</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">Read how {siteConfig.name} helped these couples find their happily ever after.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            <TestimonialCard name="Rahul & Priya" community="Telugu" story="We met on PremaJodi and instantly connected over our shared values and career goals. Thank you for making this happen!" />
            <TestimonialCard name="Aditya & Neha" community="Marathi" story="The verified profiles gave us peace of mind. The matchmaking algorithm is spot on. We are getting married next month!" />
            <TestimonialCard name="Suresh & Anjali" community="Kannada" story="Finding someone who respects traditional values while living a modern lifestyle was hard until I joined this platform." />
          </div>
          <div className="mt-8 sm:mt-12 text-center">
            <Link href="/success-stories" className="inline-flex items-center justify-center font-bold text-primary hover:text-primary/80 transition-colors">
              View more success stories &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-12 sm:py-20 bg-background">
        <div className="container max-w-3xl">
          <div className="text-center mb-8 sm:mb-12 space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <p className="text-base sm:text-lg text-muted-foreground">Find answers to common questions about {siteConfig.name}.</p>
          </div>
          <div className="bg-background rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-border/50 shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left font-bold text-base sm:text-lg">Is registration free on {siteConfig.name}?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm sm:text-[15px]">
                  Yes, creating a profile on {siteConfig.name} is completely free. You can register, set your preferences, and browse matches at no cost.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left font-bold text-base sm:text-lg">How do you verify profiles?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm sm:text-[15px]">
                  We have a strict manual verification process. Our team checks government-issued IDs, phone numbers, and cross-references data to ensure authenticity.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left font-bold text-base sm:text-lg">Can I search across communities?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm sm:text-[15px]">
                  Absolutely! While we specialize in Telugu, Kannada and Marathi communities, you can search across all three. A Telugu person can find a Kannada or Marathi partner and vice versa.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left font-bold text-base sm:text-lg">What is AI Kundali Matching?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm sm:text-[15px]">
                  Our AI-powered kundali matching analyzes astrological charts for Guna Milan scores, Mangal Dosha checks, and overall compatibility — giving you traditional insights with modern accuracy.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="mt-6 text-center">
              <Link href="/faq" className="inline-flex items-center justify-center font-bold text-primary hover:text-primary/80 transition-colors">View all FAQs &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MOBILE APP COMING SOON ─── */}
      <section className="py-12 sm:py-20 bg-background overflow-hidden">
        <div className="container">
          <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border border-border/50 px-6 py-10 sm:px-12 sm:py-16 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 sm:gap-12">
              {/* Content */}
              <div className="flex-1 text-center md:text-left space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold">
                  <Sparkles className="h-3.5 w-3.5" /> Coming Soon
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                  {siteConfig.name} on Your Phone
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-lg">
                  Get instant match notifications, chat on the go, and discover profiles anywhere. Our mobile app brings the full {siteConfig.name} experience to your fingertips.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-foreground text-background font-bold text-sm cursor-default opacity-70">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                    App Store
                  </div>
                  <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-foreground text-background font-bold text-sm cursor-default opacity-70">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302c.7.4.7 1.081 0 1.481l-2.302 1.302-2.532-2.542 2.532-2.543zM5.864 2.658L16.8 8.991l-2.302 2.302L5.864 2.658z"/></svg>
                    Google Play
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground font-medium">Be the first to know when we launch — register now to get notified!</p>
              </div>

              {/* Phone Mockup */}
              <div className="relative hidden md:block">
                <div className="w-48 h-80 lg:w-56 lg:h-96 rounded-[2rem] border-4 border-foreground/10 bg-card shadow-2xl flex flex-col items-center justify-center overflow-hidden">
                  <div className="w-20 h-1.5 bg-foreground/10 rounded-full mb-6" />
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm font-extrabold text-foreground">{siteConfig.name}</p>
                  <p className="text-[10px] text-muted-foreground font-medium mt-1">Find your match</p>
                  <div className="mt-6 w-3/4 space-y-2">
                    <div className="h-2 bg-muted rounded-full" />
                    <div className="h-2 bg-muted rounded-full w-2/3" />
                    <div className="h-2 bg-primary/20 rounded-full w-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ELITE BANNER ─── */}
      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-primary text-primary-foreground dark:bg-card dark:text-card-foreground dark:border dark:border-border px-5 py-10 sm:px-6 sm:py-16 md:px-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-background/20 dark:bg-primary/20 rounded-full blur-[80px] opacity-50" />
            <div className="relative z-10 space-y-4 sm:space-y-6 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs sm:text-sm font-bold">
                <Diamond className="h-4 w-4" /> Exclusive Service
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">Introducing Elite Matrimony</h2>
              <p className="text-base sm:text-lg text-primary-foreground/80 dark:text-muted-foreground leading-relaxed">
                A highly personalized matchmaking service for successful professionals, entrepreneurs, and high-net-worth individuals.
              </p>
              <Link href="/elite" className="inline-flex h-11 sm:h-12 items-center justify-center rounded-full bg-accent px-6 sm:px-8 text-sm font-bold text-accent-foreground shadow-lg transition-transform hover:scale-105">
                Explore Elite Services
              </Link>
            </div>
            <div className="relative z-10 hidden md:block">
              <div className="w-48 h-60 lg:w-64 lg:h-80 rounded-2xl border-4 border-accent/20 bg-background/10 backdrop-blur-sm flex items-center justify-center relative transform rotate-6 hover:rotate-0 transition-transform duration-500">
                <Diamond className="h-16 w-16 lg:h-24 lg:w-24 text-accent/50" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-background rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-muted/50 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{description}</p>
    </div>
  );
}

function TestimonialCard({ name, story, community }: { name: string; story: string; community: string }) {
  return (
    <div className="bg-background rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex text-accent">
            {[...Array(5)].map((_, i) => (<Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />))}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-full">{community}</span>
        </div>
        <p className="text-muted-foreground italic leading-relaxed text-sm sm:text-[15px]">&ldquo;{story}&rdquo;</p>
      </div>
      <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-border/50">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Heart className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
        </div>
        <div className="font-bold text-foreground text-sm sm:text-base">{name}</div>
      </div>
    </div>
  );
}

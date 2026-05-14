import Link from "next/link";
import { Search, Heart, ShieldCheck, Diamond, Star, UserPlus, MessageCircle, Users, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { HeroSearch } from "@/components/HeroSearch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-background pt-16 pb-32">
        {/* Subtle background decorative blobs for that calm/vibrant feel */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-secondary/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
        
        <div className="container relative z-10 flex flex-col items-center text-center space-y-10">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground sm:text-7xl">
              Find your perfect <span className="text-secondary">match</span> with trust.
            </h1>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
              The most trusted platform for Telugu & Marathi communities. Experience secure, verified, and personalized matchmaking.
            </p>
          </div>

          {/* Interactive Airbnb-style search widget */}
          <HeroSearch />
        </div>
      </section>

      {/* Trust & Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Why choose {siteConfig.name}?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We combine modern technology with traditional values to help you find your life partner safely.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="h-8 w-8 text-green-500" />}
              title="100% Verified Profiles"
              description="Every profile undergoes manual verification and ID checks to ensure a secure environment."
            />
            <FeatureCard 
              icon={<Heart className="h-8 w-8 text-secondary" />}
              title="Intelligent Matchmaking"
              description="Our advanced algorithms find highly compatible matches based on your preferences."
            />
            <FeatureCard 
              icon={<Star className="h-8 w-8 text-accent" />}
              title="Premium Experience"
              description="Enjoy a sleek, ad-free interface designed for a calm and focused search experience."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How it works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Your journey to finding the perfect life partner in four simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-border z-0" />
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-sm border-[6px] border-background">
                <UserPlus className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold">1. Create Profile</h3>
              <p className="text-muted-foreground leading-relaxed px-4">Register and create your detailed profile. Add photos and your partner preferences.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center text-accent shadow-sm border-[6px] border-background">
                <Sparkles className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold">2. AI & Astro Match</h3>
              <p className="text-muted-foreground leading-relaxed px-4">Set your preferences and let our AI and astrological engine find your most compatible matches.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shadow-sm border-[6px] border-background">
                <Search className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold">3. Search & Discover</h3>
              <p className="text-muted-foreground leading-relaxed px-4">Use our advanced search and intelligent matchmaking algorithms to find ideal matches.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shadow-sm border-[6px] border-background">
                <MessageCircle className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold">4. Connect</h3>
              <p className="text-muted-foreground leading-relaxed px-4">Initiate conversations, share contact details securely, and take the next big step.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Millions of Happy Stories</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Read how {siteConfig.name} helped these couples find their happily ever after.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Rahul & Priya"
              story="We met on PremaJodi and instantly connected over our shared values and career goals. Thank you for making this happen!"
            />
            <TestimonialCard 
              name="Aditya & Neha"
              story="The verified profiles gave us peace of mind. The matchmaking algorithm is spot on. We are getting married next month!"
            />
            <TestimonialCard 
              name="Suresh & Anjali"
              story="Finding someone who respects traditional Marathi values while living a modern lifestyle was hard until I joined this platform."
            />
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/success-stories" className="inline-flex items-center justify-center font-bold text-primary hover:text-primary/80 transition-colors">
              View more success stories &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="container max-w-3xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about {siteConfig.name}.
            </p>
          </div>

          <div className="bg-background rounded-3xl p-6 md:p-8 border border-border/50 shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left font-bold text-lg">Is registration free on {siteConfig.name}?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-[15px]">
                  Yes, creating a profile on {siteConfig.name} is completely free. You can register, set your preferences, and browse matches at no cost. However, to initiate conversations and view contact details, you will need to upgrade to a premium membership.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left font-bold text-lg">How do you verify profiles?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-[15px]">
                  We have a strict manual verification process. Our team checks government-issued IDs, phone numbers, and cross-references data to ensure the authenticity of profiles. Look for the "Verified" badge on profiles for added security.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left font-bold text-lg">What is Elite Matrimony?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-[15px]">
                  Elite Matrimony is our premium, personalized matchmaking service designed for successful professionals and high-net-worth individuals. It includes a dedicated relationship manager who handpicks matches for you.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-8 text-center">
              <Link href="/faq" className="inline-flex items-center justify-center font-bold text-primary hover:text-primary/80 transition-colors">
                View all FAQs &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Elite Banner */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl bg-[#10002b] text-white px-6 py-16 md:px-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary rounded-full blur-[80px] opacity-50" />
            
            <div className="relative z-10 space-y-6 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent text-sm font-bold">
                <Diamond className="h-4 w-4" /> Exclusive Service
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Introducing Elite Matrimony
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                A highly personalized matchmaking service tailored for successful professionals, entrepreneurs, and high-net-worth individuals.
              </p>
              <div className="pt-4">
                <Link href="/elite" className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-bold text-[#10002b] shadow-lg transition-transform hover:scale-105">
                  Explore Elite Services
                </Link>
              </div>
            </div>

            <div className="relative z-10 hidden md:block">
              {/* Decorative element for Elite */}
              <div className="w-64 h-80 rounded-2xl border-4 border-accent/20 bg-background/5 backdrop-blur-sm flex items-center justify-center relative transform rotate-6 hover:rotate-0 transition-transform duration-500">
                 <Diamond className="h-24 w-24 text-accent/50" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-background rounded-3xl p-8 border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="h-14 w-14 rounded-full bg-muted/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function TestimonialCard({ name, story }: { name: string, story: string }) {
  return (
    <div className="bg-background rounded-3xl p-8 border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="flex text-accent">
          <Star className="h-5 w-5 fill-current" />
          <Star className="h-5 w-5 fill-current" />
          <Star className="h-5 w-5 fill-current" />
          <Star className="h-5 w-5 fill-current" />
          <Star className="h-5 w-5 fill-current" />
        </div>
        <p className="text-muted-foreground italic leading-relaxed text-[15px]">
          "{story}"
        </p>
      </div>
      <div className="mt-8 flex items-center gap-4 pt-6 border-t border-border/50">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Heart className="h-5 w-5 fill-current" />
        </div>
        <div className="font-bold text-foreground">{name}</div>
      </div>
    </div>
  );
}

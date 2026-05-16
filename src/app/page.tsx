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
      <section className="relative w-full overflow-hidden bg-background pt-10 sm:pt-16 pb-16 sm:pb-32">
        {/* Subtle background decorative blobs for that calm/vibrant feel */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-secondary/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
        
        <div className="container relative z-10 flex flex-col items-center text-center space-y-6 sm:space-y-10">
          <div className="space-y-3 sm:space-y-4 max-w-3xl px-2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground lg:text-7xl">
              Find your perfect <span className="text-secondary">match</span> with trust.
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
              The most trusted platform for Telugu & Marathi communities. Experience secure, verified, and personalized matchmaking.
            </p>
          </div>

          {/* Interactive Airbnb-style search widget */}
          <HeroSearch />
        </div>
      </section>

      {/* Trust & Features Section */}
      <section className="py-12 sm:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Why choose {siteConfig.name}?</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">We combine modern technology with traditional values to help you find your life partner safely.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="h-7 w-7 sm:h-8 sm:w-8 text-green-500" />}
              title="100% Verified Profiles"
              description="Every profile undergoes manual verification and ID checks to ensure a secure environment."
            />
            <FeatureCard 
              icon={<Heart className="h-7 w-7 sm:h-8 sm:w-8 text-secondary" />}
              title="Intelligent Matchmaking"
              description="Our advanced algorithms find highly compatible matches based on your preferences."
            />
            <FeatureCard 
              icon={<Star className="h-7 w-7 sm:h-8 sm:w-8 text-accent" />}
              title="Premium Experience"
              description="Enjoy a sleek, ad-free interface designed for a calm and focused search experience."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">How it works</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">Your journey to finding the perfect life partner in four simple steps.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-border z-0" />
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-3 sm:space-y-4">
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-sm border-4 sm:border-[6px] border-background">
                <UserPlus className="h-7 w-7 sm:h-10 sm:w-10" />
              </div>
              <h3 className="text-base sm:text-xl font-bold">1. Create Profile</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base px-0 sm:px-4">Register and create your detailed profile. Add photos and your partner preferences.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-3 sm:space-y-4">
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-accent/10 flex items-center justify-center text-accent shadow-sm border-4 sm:border-[6px] border-background">
                <Sparkles className="h-7 w-7 sm:h-10 sm:w-10" />
              </div>
              <h3 className="text-base sm:text-xl font-bold">2. AI & Astro Match</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base px-0 sm:px-4">Set your preferences and let our AI and astrological engine find your most compatible matches.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-3 sm:space-y-4">
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shadow-sm border-4 sm:border-[6px] border-background">
                <Search className="h-7 w-7 sm:h-10 sm:w-10" />
              </div>
              <h3 className="text-base sm:text-xl font-bold">3. Search & Discover</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base px-0 sm:px-4">Use our advanced search and intelligent matchmaking algorithms to find ideal matches.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-3 sm:space-y-4">
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shadow-sm border-4 sm:border-[6px] border-background">
                <MessageCircle className="h-7 w-7 sm:h-10 sm:w-10" />
              </div>
              <h3 className="text-base sm:text-xl font-bold">4. Connect</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base px-0 sm:px-4">Initiate conversations, share contact details securely, and take the next big step.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-12 sm:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Millions of Happy Stories</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">Read how {siteConfig.name} helped these couples find their happily ever after.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
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
          
          <div className="mt-8 sm:mt-12 text-center">
            <Link href="/success-stories" className="inline-flex items-center justify-center font-bold text-primary hover:text-primary/80 transition-colors">
              View more success stories &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-24 bg-background">
        <div className="container max-w-3xl">
          <div className="text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Find answers to common questions about {siteConfig.name}.
            </p>
          </div>

          <div className="bg-background rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-border/50 shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left font-bold text-base sm:text-lg">Is registration free on {siteConfig.name}?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm sm:text-[15px]">
                  Yes, creating a profile on {siteConfig.name} is completely free. You can register, set your preferences, and browse matches at no cost. However, to initiate conversations and view contact details, you will need to upgrade to a premium membership.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left font-bold text-base sm:text-lg">How do you verify profiles?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm sm:text-[15px]">
                  We have a strict manual verification process. Our team checks government-issued IDs, phone numbers, and cross-references data to ensure the authenticity of profiles. Look for the "Verified" badge on profiles for added security.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left font-bold text-base sm:text-lg">What is Elite Matrimony?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm sm:text-[15px]">
                  Elite Matrimony is our premium, personalized matchmaking service designed for successful professionals and high-net-worth individuals. It includes a dedicated relationship manager who handpicks matches for you.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-6 sm:mt-8 text-center">
              <Link href="/faq" className="inline-flex items-center justify-center font-bold text-primary hover:text-primary/80 transition-colors">
                View all FAQs &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Elite Banner */}
      <section className="py-12 sm:py-24 bg-muted/30">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-primary text-primary-foreground dark:bg-card dark:text-card-foreground dark:border dark:border-border px-5 py-10 sm:px-6 sm:py-16 md:px-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-background/20 dark:bg-primary/20 rounded-full blur-[80px] opacity-50" />
            
            <div className="relative z-10 space-y-4 sm:space-y-6 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs sm:text-sm font-bold">
                <Diamond className="h-4 w-4" /> Exclusive Service
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                Introducing Elite Matrimony
              </h2>
              <p className="text-base sm:text-lg text-primary-foreground/80 dark:text-muted-foreground leading-relaxed">
                A highly personalized matchmaking service tailored for successful professionals, entrepreneurs, and high-net-worth individuals.
              </p>
              <div className="pt-2 sm:pt-4">
                <Link href="/elite" className="inline-flex h-11 sm:h-12 items-center justify-center rounded-full bg-accent px-6 sm:px-8 text-sm font-bold text-accent-foreground shadow-lg transition-transform hover:scale-105">
                  Explore Elite Services
                </Link>
              </div>
            </div>

            <div className="relative z-10 hidden md:block">
              {/* Decorative element for Elite */}
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

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-background rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-muted/50 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
        {description}
      </p>
    </div>
  );
}

function TestimonialCard({ name, story }: { name: string, story: string }) {
  return (
    <div className="bg-background rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
      <div className="space-y-3 sm:space-y-4">
        <div className="flex text-accent">
          <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
          <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
          <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
          <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
          <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
        </div>
        <p className="text-muted-foreground italic leading-relaxed text-sm sm:text-[15px]">
          &ldquo;{story}&rdquo;
        </p>
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

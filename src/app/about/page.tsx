export const dynamic = "force-static";

import { siteConfig } from "@/config/site";
import { Heart, ShieldCheck, Users } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="flex-1 bg-background">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-primary text-primary-foreground dark:bg-background dark:text-foreground py-16 sm:py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary dark:from-background to-transparent" />
        
        <div className="container relative z-10 text-center max-w-3xl mx-auto space-y-4 sm:space-y-6 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight">Our Story</h1>
          <p className="text-base sm:text-xl text-primary-foreground/80 dark:text-gray-300 leading-relaxed">
            Founded with the belief that finding a life partner should be a safe, joyful, and trust-filled journey, {siteConfig.name} is dedicated to bringing hearts together across the Telugu and Marathi communities.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-24">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div className="space-y-4 sm:space-y-6 order-2 md:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Bridging Tradition & Technology</h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                In today&apos;s fast-paced world, maintaining cultural roots while embracing modern convenience is a challenge. We built {siteConfig.name} to offer a premium, technology-driven platform that deeply respects traditional values.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Our platform goes beyond superficial swiping. We focus on in-depth compatibility, verified profiles, and family-oriented matchmaking, ensuring that every connection is meaningful and secure.
              </p>
            </div>
            <div className="relative order-1 md:order-2">
              <div className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-muted">
                <img 
                  src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80" 
                  alt="Wedding Couple" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 bg-background p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl border border-border/50 max-w-[200px] sm:max-w-xs">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Heart className="h-5 w-5 sm:h-6 sm:w-6 fill-current" />
                  </div>
                  <div>
                    <div className="font-bold text-base sm:text-lg">10,000+</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Happy Marriages</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 sm:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Our Core Values</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">The principles that guide everything we do at {siteConfig.name}.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 max-w-5xl mx-auto">
            <div className="bg-background rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-border/50 text-center">
              <div className="mx-auto h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 sm:mb-6">
                <ShieldCheck className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Trust & Security</h3>
              <p className="text-muted-foreground text-sm sm:text-base">Every profile is manually verified. We provide a 100% secure platform for you and your family.</p>
            </div>
            
            <div className="bg-background rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-border/50 text-center">
              <div className="mx-auto h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-4 sm:mb-6">
                <Users className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Community First</h3>
              <p className="text-muted-foreground text-sm sm:text-base">We understand the nuances of Telugu and Marathi cultures, tailoring our matches to respect your roots.</p>
            </div>

            <div className="bg-background rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-border/50 text-center sm:col-span-2 md:col-span-1">
              <div className="mx-auto h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4 sm:mb-6">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Genuine Connections</h3>
              <p className="text-muted-foreground text-sm sm:text-base">We prioritize quality over quantity. Our algorithms are designed to find deep, lifelong compatibility.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

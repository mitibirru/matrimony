import { siteConfig } from "@/config/site";
import { Heart, ShieldCheck, Users } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="flex-1 bg-background">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#10002b] text-white py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10002b] to-transparent" />
        
        <div className="container relative z-10 text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Our Story</h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Founded with the belief that finding a life partner should be a safe, joyful, and trust-filled journey, {siteConfig.name} is dedicated to bringing hearts together across the Telugu and Marathi communities.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Bridging Tradition & Technology</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                In today's fast-paced world, maintaining cultural roots while embracing modern convenience is a challenge. We built {siteConfig.name} to offer a premium, technology-driven platform that deeply respects traditional values.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our platform goes beyond superficial swiping. We focus on in-depth compatibility, verified profiles, and family-oriented matchmaking, ensuring that every connection is meaningful and secure.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-muted">
                <img 
                  src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80" 
                  alt="Wedding Couple" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-background p-6 rounded-3xl shadow-xl border border-border/50 max-w-xs hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Heart className="h-6 w-6 fill-current" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">10,000+</div>
                    <div className="text-sm text-muted-foreground">Happy Marriages</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Core Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">The principles that guide everything we do at {siteConfig.name}.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-background rounded-3xl p-8 shadow-sm border border-border/50 text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Trust & Security</h3>
              <p className="text-muted-foreground">Every profile is manually verified. We provide a 100% secure platform for you and your family.</p>
            </div>
            
            <div className="bg-background rounded-3xl p-8 shadow-sm border border-border/50 text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community First</h3>
              <p className="text-muted-foreground">We understand the nuances of Telugu and Marathi cultures, tailoring our matches to respect your roots.</p>
            </div>

            <div className="bg-background rounded-3xl p-8 shadow-sm border border-border/50 text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Genuine Connections</h3>
              <p className="text-muted-foreground">We prioritize quality over quantity. Our algorithms are designed to find deep, lifelong compatibility.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

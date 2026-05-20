import { siteConfig } from "@/config/site";
import { Diamond, ShieldCheck, UserCheck, PhoneCall, Star, Lock, Users, Sparkles } from "lucide-react";
import Link from "next/link";

export default function EliteMatrimonyPage() {
  return (
    <div className="flex-1 bg-[#0A0A0A] text-white selection:bg-accent selection:text-black">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-32">
        {/* Luxury Background Elements */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/50 via-[#0A0A0A]/80 to-[#0A0A0A]" />
        <div className="absolute top-1/4 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative z-10 flex flex-col items-center text-center space-y-5 sm:space-y-8 max-w-4xl px-4">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold tracking-widest uppercase text-xs sm:text-sm mb-2 sm:mb-4">
            <Diamond className="h-3 w-3 sm:h-4 sm:w-4 fill-current" /> Coming Soon
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Exclusive Matchmaking for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#ffeb99]">Exceptional</span>.
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto">
            A bespoke, highly confidential service tailored for successful professionals, business families, and high-net-worth individuals.
          </p>
          
          <div className="pt-4 sm:pt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <button className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 rounded-full bg-accent text-black font-bold text-base sm:text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,189,0,0.3)]">
              Request a Consultation
            </button>
            <span className="text-gray-500 font-medium text-sm sm:text-base">or call us at +91 98765 43210</span>
          </div>
        </div>
      </section>

      {/* The Elite Difference (Features) */}
      <section className="py-12 sm:py-24 bg-[#0A0A0A] relative z-10">
        <div className="container">
          <div className="text-center mb-10 sm:mb-20 space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white">The Elite Difference</h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              We go beyond algorithms. Our service is built on deep human understanding, rigorous vetting, and absolute discretion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            <FeatureCard 
              icon={<UserCheck className="h-7 w-7 sm:h-8 sm:w-8 text-accent" />}
              title="Dedicated Relationship Manager"
              description="A senior matchmaker acts as your personal confidant. They understand your family background, lifestyle, and exacting standards to handpick the perfect matches."
            />
            <FeatureCard 
              icon={<Lock className="h-7 w-7 sm:h-8 sm:w-8 text-accent" />}
              title="100% Confidentiality"
              description="Your profile is entirely hidden from the public database. Your identity and photographs are only shared with carefully vetted prospects after your explicit consent."
            />
            <FeatureCard 
              icon={<ShieldCheck className="h-7 w-7 sm:h-8 sm:w-8 text-accent" />}
              title="Rigorous Background Vetting"
              description="Trust is paramount. Every profile in our Elite network undergoes strict verification of education, profession, financial standing, and family background."
            />
            <FeatureCard 
              icon={<Diamond className="h-7 w-7 sm:h-8 sm:w-8 text-accent" />}
              title="Curated Quality, Not Quantity"
              description="Instead of swiping through thousands of profiles, you receive a highly curated selection of matches that align perfectly with your social and cultural standing."
            />
            <FeatureCard 
              icon={<PhoneCall className="h-7 w-7 sm:h-8 sm:w-8 text-accent" />}
              title="Meeting Facilitation"
              description="Your Relationship Manager handles the logistics, bridging the gap between families and setting up secure, comfortable initial meetings."
            />
            <FeatureCard 
              icon={<Sparkles className="h-7 w-7 sm:h-8 sm:w-8 text-accent" />}
              title="Bespoke Pre-Marital Guidance"
              description="We offer exclusive access to image consultants, astrologers, and relationship experts to ensure you put your best foot forward."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-24 bg-[#121214] border-t border-b border-white/5">
        <div className="container max-w-6xl">
          <div className="text-center mb-10 sm:mb-20 space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white">The Elite Process</h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">A streamlined, stress-free journey to finding your life partner.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-24 right-24 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent z-0" />
            
            <ProcessStep 
              number="01"
              title="Consultation"
              description="An in-depth, private meeting with your Relationship Manager to understand your lifestyle and partner expectations."
            />
            <ProcessStep 
              number="02"
              title="Curation"
              description="Our experts scout our exclusive network and handpick profiles that match your specific criteria."
            />
            <ProcessStep 
              number="03"
              title="Introduction"
              description="With mutual consent, we facilitate the first conversation or meeting between the families in a refined setting."
            />
            <ProcessStep 
              number="04"
              title="Success"
              description="We support you throughout the courtship phase until you find your perfect life partner."
            />
          </div>
        </div>
      </section>

      {/* Who is it for? / Target Audience */}
      <section className="py-12 sm:py-24 bg-[#0A0A0A]">
        <div className="container max-w-5xl">
          <div className="bg-gradient-to-br from-[#1a1a1f] to-[#0A0A0A] rounded-2xl sm:rounded-[3rem] p-6 sm:p-12 md:p-16 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-accent/10 rounded-full blur-[80px]" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center relative z-10">
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">Who chooses Elite Matrimony?</h2>
                <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                  Our service is exclusively designed for individuals who value their time, privacy, and social standing. We cater to:
                </p>
                <ul className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
                  <AudienceItem text="Successful Entrepreneurs & Business Owners" />
                  <AudienceItem text="Top-Tier Corporate Executives & CEOs" />
                  <AudienceItem text="Prominent Business Families" />
                  <AudienceItem text="NRIs & Global Professionals" />
                  <AudienceItem text="Celebrities & Public Figures" />
                </ul>
              </div>
              <div className="relative h-64 sm:h-full min-h-[250px] sm:min-h-[300px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" 
                  alt="Elite Professionals" 
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8">
                  <div className="flex items-center gap-2 sm:gap-4 text-accent mb-2">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                  </div>
                  <p className="text-white text-sm sm:text-lg font-medium italic">&ldquo;The level of discretion and the quality of profiles provided were unmatched. We found the perfect match for our daughter within months.&rdquo;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-32 bg-[#121214] text-center border-t border-white/5">
        <div className="container max-w-3xl space-y-5 sm:space-y-8 px-6">
          <Diamond className="h-10 w-10 sm:h-16 sm:w-16 text-accent mx-auto" />
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white">Ready to begin?</h2>
          <p className="text-base sm:text-xl text-gray-400">
            Membership is highly exclusive. Request a callback to see if Elite Matrimony is the right fit for your search.
          </p>
          <div className="pt-4 sm:pt-8">
            <button className="w-full sm:w-auto h-13 sm:h-16 px-8 sm:px-10 py-4 rounded-full bg-white text-black font-bold text-base sm:text-xl hover:bg-accent transition-colors duration-300">
              Schedule Your Private Consultation
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-[#121214] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-white/5 hover:border-accent/30 transition-colors duration-300 group">
      <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl sm:rounded-2xl bg-accent/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
        {description}
      </p>
    </div>
  );
}

function ProcessStep({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="relative z-10 flex flex-col items-center text-center space-y-3 sm:space-y-6">
      <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-[#1A1A1E] flex items-center justify-center border-4 sm:border-8 border-[#121214] shadow-xl relative group">
        <div className="absolute inset-0 rounded-full bg-accent/20 scale-0 group-hover:scale-100 transition-transform duration-500" />
        <span className="text-lg sm:text-2xl font-bold text-accent relative z-10">{number}</span>
      </div>
      <div>
        <h3 className="text-lg sm:text-2xl font-bold text-white mb-1 sm:mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed text-xs sm:text-base px-0 sm:px-2">{description}</p>
      </div>
    </div>
  );
}

function AudienceItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 sm:gap-4">
      <div className="mt-1.5 sm:mt-1 h-2 w-2 rounded-full bg-accent shrink-0" />
      <span className="text-white font-medium text-sm sm:text-base">{text}</span>
    </li>
  );
}

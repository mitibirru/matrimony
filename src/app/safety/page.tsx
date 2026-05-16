import { siteConfig } from "@/config/site";
import { ShieldCheck, Video, PhoneOff, CreditCard, Users, AlertTriangle } from "lucide-react";

export default function SafetyTipsPage() {
  return (
    <div className="flex-1 bg-muted/20 py-10 sm:py-16 md:py-24">
      <div className="container max-w-5xl">
        <div className="text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-green-500/10 text-green-500 mb-2 sm:mb-4">
            <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">Stay Safe on {siteConfig.name}</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Your safety is our top priority. While we manually verify profiles, we encourage you to follow these essential safety guidelines during your partner search.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          <SafetyCard 
            icon={<Video className="h-5 w-5 sm:h-6 sm:w-6" />}
            title="Video Call Before Meeting"
            description="Always insist on a video call before arranging an in-person meeting. This helps confirm the identity of the person you are talking to."
          />
          <SafetyCard 
            icon={<CreditCard className="h-5 w-5 sm:h-6 sm:w-6" />}
            title="Never Send Money"
            description="Never send money or share financial information (bank details, credit cards) with anyone you meet on the platform, no matter the emergency."
          />
          <SafetyCard 
            icon={<PhoneOff className="h-5 w-5 sm:h-6 sm:w-6" />}
            title="Protect Personal Info"
            description="Do not share sensitive personal information such as your home address, workplace, or routine until you completely trust the person."
          />
          <SafetyCard 
            icon={<Users className="h-5 w-5 sm:h-6 sm:w-6" />}
            title="Involve Your Family"
            description="Involve your family early in the process. Introduce your potential match to a trusted family member or friend."
          />
          <SafetyCard 
            icon={<AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6" />}
            title="Watch for Red Flags"
            description="Be cautious if they avoid answering direct questions, profess love too quickly, or pressure you to move the conversation to another platform."
          />
          <SafetyCard 
            icon={<ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />}
            title="Report Suspicious Activity"
            description="If you notice any fake profiles, abusive behavior, or suspicious requests, use our report button immediately so our team can take action."
          />
        </div>

        <div className="mt-10 sm:mt-16 bg-background rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/50 text-center max-w-3xl mx-auto shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Meeting Offline?</h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6">
            When you decide to meet in person, always choose a public place like a coffee shop or restaurant. Inform a friend or family member about your location and arrange your own transportation.
          </p>
        </div>
      </div>
    </div>
  );
}

function SafetyCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-background rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3 sm:mb-4">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm sm:text-[15px] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

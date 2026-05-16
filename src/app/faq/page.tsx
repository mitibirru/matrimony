"use client";

import { siteConfig } from "@/config/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  return (
    <div className="flex-1 bg-muted/20 py-10 sm:py-16 md:py-24">
      <div className="container max-w-3xl">
        <div className="text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">Frequently Asked Questions</h1>
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
                We have a strict manual verification process. Our team checks government-issued IDs, phone numbers, and cross-references data to ensure the authenticity of profiles. Look for the &ldquo;Verified&rdquo; badge on profiles for added security.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-bold text-base sm:text-lg">Are my photos safe on the platform?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-sm sm:text-[15px]">
                Absolutely. We provide advanced privacy controls. You can choose to make your photos visible to everyone, only to accepted interests, or keep them completely hidden. We also disable right-click saving on photos.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-bold text-base sm:text-lg">What is Elite Matrimony?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-sm sm:text-[15px]">
                Elite Matrimony is our premium, personalized matchmaking service designed for successful professionals and high-net-worth individuals. It includes a dedicated relationship manager who handpicks matches for you.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left font-bold text-base sm:text-lg">How do I delete my profile?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-sm sm:text-[15px]">
                You can delete your profile at any time by going to Settings &gt; Account Management &gt; Delete Profile. Once deleted, your data is permanently removed from our active databases.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left font-bold text-base sm:text-lg">How does the AI & Astro matchmaking work?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-sm sm:text-[15px]">
                Our proprietary AI learns from your preferences, interactions, and stated values to suggest highly compatible profiles. The Astrological engine can also match Kundali/Jathakam criteria if you choose to enable it in your search preferences.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-left font-bold text-base sm:text-lg">Is my contact information visible to everyone?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-sm sm:text-[15px]">
                No, your privacy is paramount. Your email and phone number are hidden by default. Only premium members whose connection requests you have explicitly accepted can view your contact details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-left font-bold text-base sm:text-lg">Can I search for specific communities or sub-castes?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-sm sm:text-[15px]">
                Yes! We offer granular search filters allowing you to narrow down matches by religion, community, sub-caste, mother tongue, location, and even dietary preferences.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger className="text-left font-bold text-base sm:text-lg">How do I report a fake or abusive profile?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-sm sm:text-[15px]">
                Every profile has a &ldquo;Report Profile&rdquo; button. If you encounter inappropriate behavior or suspect a profile is fake, click it immediately. Our trust and safety team will investigate and take swift action.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger className="text-left font-bold text-base sm:text-lg">What happens if I forget my password?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-sm sm:text-[15px]">
                You can easily reset it by clicking &ldquo;Forgot Password&rdquo; on the login page. We&apos;ll send a secure reset link to your registered email or an OTP to your phone number.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

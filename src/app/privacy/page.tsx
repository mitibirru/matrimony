import { siteConfig } from "@/config/site";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex-1 bg-muted/20 py-10 sm:py-16 md:py-24">
      <div className="container max-w-4xl bg-background rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 shadow-sm border border-border/50">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6 sm:mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-5 sm:space-y-6 text-muted-foreground leading-relaxed text-sm sm:text-base">
          <p className="text-base sm:text-lg">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">1. Information We Collect</h2>
            <p>
              At {siteConfig.name}, we collect personal information to provide you with the best matchmaking experience. This includes:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 mt-3 sm:mt-4">
              <li>Information you provide during registration (name, email, phone number, gender, date of birth).</li>
              <li>Profile details (photos, education, profession, community, family background).</li>
              <li>Verification documents (ID proofs) to ensure platform safety.</li>
              <li>Usage data, including how you interact with our platform and other profiles.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">2. How We Use Your Information</h2>
            <p>
              Your information is used strictly to facilitate matchmaking and improve our services:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 mt-3 sm:mt-4">
              <li>To create and manage your account.</li>
              <li>To match you with compatible profiles based on your preferences.</li>
              <li>To verify your identity and maintain a secure environment.</li>
              <li>To communicate with you regarding account updates, matches, and promotional offers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">3. Data Security & Sharing</h2>
            <p>
              We prioritize the security of your data. We implement robust security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.
            </p>
            <p className="mt-3 sm:mt-4">
              We do not sell your personal data to third parties. Your profile information is only shared with other registered users as part of the matchmaking process, and you control the privacy settings for sensitive data like photos and contact details.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">4. Your Privacy Controls</h2>
            <p>
              You have full control over your privacy on {siteConfig.name}. You can:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 mt-3 sm:mt-4">
              <li>Hide or delete your profile at any time.</li>
              <li>Control who can view your photos (e.g., only premium members or accepted interests).</li>
              <li>Update or correct your personal information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact our Data Protection Officer at privacy@{siteConfig.name.toLowerCase()}.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

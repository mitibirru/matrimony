import { siteConfig } from "@/config/site";

export default function TermsOfServicePage() {
  return (
    <div className="flex-1 bg-muted/20 py-10 sm:py-16 md:py-24">
      <div className="container max-w-4xl bg-background rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 shadow-sm border border-border/50">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6 sm:mb-8">Terms of Service</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-5 sm:space-y-6 text-muted-foreground leading-relaxed text-sm sm:text-base">
          <p className="text-base sm:text-lg">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <p>
            Welcome to {siteConfig.name}. By accessing or using our website and services, you agree to comply with and be bound by the following Terms of Service. Please read them carefully.
          </p>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">1. Eligibility</h2>
            <p>
              To register as a member of {siteConfig.name} or use this Site, you must be legally competent and of legal marriageable age as per the laws of your country (e.g., 18 years for women and 21 years for men in India).
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">2. Account Responsibilities</h2>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 mt-3 sm:mt-4">
              <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
              <li>You agree to provide accurate, current, and complete information during registration.</li>
              <li>You are solely responsible for your interactions with other members. {siteConfig.name} reserves the right, but has no obligation, to monitor disputes between you and other members.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">3. Code of Conduct</h2>
            <p>
              By using our services, you agree NOT to:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 mt-3 sm:mt-4">
              <li>Use the service for any purpose other than finding a marriage partner (e.g., casual dating or commercial solicitation is strictly prohibited).</li>
              <li>Post any content that is abusive, defamatory, harassing, or sexually explicit.</li>
              <li>Create multiple profiles for the same person.</li>
              <li>Provide false information regarding your age, income, education, or marital status.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">4. Termination</h2>
            <p>
              {siteConfig.name} reserves the right to terminate your membership and access to the Site at any time, with or without notice, for any violation of these Terms or for any other reason deemed appropriate by management.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">5. Disclaimer of Warranties</h2>
            <p>
              {siteConfig.name} is not responsible for any incorrect or inaccurate content posted on the Site or in connection with the Service, whether caused by users or by any of the equipment or programming associated with or utilized in the Service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

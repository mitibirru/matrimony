"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Mail, Phone, ChevronLeft } from "lucide-react";

export default function RegisterPage() {
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA] dark:bg-[#0a0a0a] min-h-[90vh] relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 dark:bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[460px] relative z-10">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-foreground transition-colors mb-6 group">
          <ChevronLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>

        {/* Card */}
        <div className="bg-white dark:bg-[#141414] p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-white/5">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-[32px] leading-tight font-black text-foreground tracking-tight">
              Create an account
            </h2>
            <p className="mt-3 text-[15px] text-muted-foreground font-medium">
              Join <span className="text-primary font-bold">{siteConfig.name}</span> to find your perfect match
            </p>
          </div>

          <div className="space-y-5">
            
            {/* Google Auth - Ultra Clean */}
            <button className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-2xl bg-white dark:bg-[#1a1a1a] text-foreground font-bold text-[15px] border border-gray-200 dark:border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-gray-300 dark:hover:border-white/20 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Sign up with Google
            </button>

            {/* Divider */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-100 dark:border-white/10" />
              <span className="flex-shrink-0 px-4 text-[13px] font-bold text-muted-foreground uppercase tracking-wider">
                Or
              </span>
              <div className="flex-grow border-t border-gray-100 dark:border-white/10" />
            </div>

            {/* Segmented Control for Email / Phone */}
            <div className="flex p-1 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-white/5 relative">
              <button 
                onClick={() => setAuthMethod("email")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 font-bold transition-all text-[14px] ${authMethod === 'email' ? 'bg-white dark:bg-[#2a2a2a] text-foreground rounded-xl shadow-sm' : 'text-muted-foreground hover:text-foreground bg-transparent'}`}
              >
                <Mail className="w-4 h-4" /> Email
              </button>
              <button 
                onClick={() => setAuthMethod("phone")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 font-bold transition-all text-[14px] ${authMethod === 'phone' ? 'bg-white dark:bg-[#2a2a2a] text-foreground rounded-xl shadow-sm' : 'text-muted-foreground hover:text-foreground bg-transparent'}`}
              >
                <Phone className="w-4 h-4" /> Phone
              </button>
            </div>

            {/* Form */}
            <form className="space-y-4" action="#" method="POST">
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-[14px] font-bold text-foreground px-1">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full px-5 py-4 bg-gray-50 dark:bg-[#1a1a1a] border border-transparent rounded-2xl placeholder-gray-400 focus:bg-white dark:focus:bg-[#141414] focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-[15px]"
                  placeholder="John Doe"
                />
              </div>

              {authMethod === "email" ? (
                <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <label htmlFor="email" className="block text-[14px] font-bold text-foreground px-1">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full px-5 py-4 bg-gray-50 dark:bg-[#1a1a1a] border border-transparent rounded-2xl placeholder-gray-400 focus:bg-white dark:focus:bg-[#141414] focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-[15px]"
                    placeholder="name@example.com"
                  />
                </div>
              ) : (
                <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <label htmlFor="phone" className="block text-[14px] font-bold text-foreground px-1">
                    Mobile Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 py-4 rounded-l-2xl border border-r-0 border-transparent bg-gray-100 dark:bg-[#2a2a2a] text-muted-foreground font-bold text-[15px]">
                      +91
                    </span>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      className="block w-full px-5 py-4 bg-gray-50 dark:bg-[#1a1a1a] border border-transparent rounded-r-2xl placeholder-gray-400 focus:bg-white dark:focus:bg-[#141414] focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-[15px]"
                      placeholder="98765 43210"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-[14px] font-bold text-foreground px-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full px-5 py-4 bg-gray-50 dark:bg-[#1a1a1a] border border-transparent rounded-2xl placeholder-gray-400 focus:bg-white dark:focus:bg-[#141414] focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-[15px]"
                  placeholder="Create a strong password"
                />
              </div>

              <div className="pt-2 px-1">
                <p className="text-[13px] text-muted-foreground leading-relaxed font-medium">
                  By signing up, you agree to our{" "}
                  <Link href="/terms" className="font-bold text-primary hover:underline transition-all">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="font-bold text-primary hover:underline transition-all">Privacy Policy</Link>.
                </p>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 rounded-2xl text-[16px] font-bold text-white bg-secondary hover:bg-secondary/90 shadow-[0_4px_14px_0_rgba(255,0,84,0.39)] hover:shadow-[0_6px_20px_rgba(255,0,84,0.23)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 mt-2"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
        
        <p className="text-center text-[15px] font-medium text-muted-foreground mt-8">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-foreground hover:text-primary transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

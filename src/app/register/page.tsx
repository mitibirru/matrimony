"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { siteConfig } from "@/config/site";
import {
  Mail, Phone, ChevronLeft, Loader2, Lock, Eye, EyeOff,
  ArrowRight, Shield, Users, Sparkles, Heart, User, Zap, CheckCircle2
} from "lucide-react";

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 120 + i * 60,
            height: 120 + i * 60,
            background: i % 2 === 0
              ? "linear-gradient(135deg, var(--secondary), var(--primary))"
              : "linear-gradient(135deg, var(--primary), var(--accent))",
            opacity: 0.08,
            left: `${(i * 22 + 10) % 80}%`,
            top: `${(i * 20 + 5) % 70}%`,
          }}
        />
      ))}
    </div>
  );
}

function FeatureItem({ icon: Icon, title, desc }: {
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <div
      className="flex items-start gap-3"
    >
      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-sm font-bold text-white">{title}</p>
        <p className="text-xs text-white/50 font-medium mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

const PASSWORD_RULES = [
  { test: (p: string) => p.length >= 8, label: "At least 8 characters" },
  { test: (p: string) => /[A-Z]/.test(p), label: "One uppercase letter" },
  { test: (p: string) => /[0-9]/.test(p), label: "One number" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const passwordStrength = PASSWORD_RULES.filter(r => r.test(password)).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || " ";

      if (authMethod === "phone") {
        setError("Phone authentication is coming soon. Please use email for now.");
        setIsLoading(false);
        return;
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      router.push("/login?registered=true");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)]">

      {/* ── Left Panel: Brand ── */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] relative bg-linear-to-br from-secondary via-secondary/95 to-primary overflow-hidden">
        <FloatingOrbs />
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          <div>
            <div>
              <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-bold mb-16">
                <ChevronLeft className="w-4 h-4" /> Back to home
              </Link>
            </div>

            <div>
              <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-4">
                Begin your
                <br />
                <span className="text-accent">journey today</span>
              </h1>
              <p className="text-white/60 text-lg font-medium max-w-sm leading-relaxed">
                Create your free account and start connecting with verified profiles from your community.
              </p>
            </div>
          </div>

          <div
            className="space-y-5"
          >
            <FeatureItem icon={Shield} title="100% Verified Profiles" desc="Every profile is manually reviewed" />
            <FeatureItem icon={Zap} title="AI-Powered Matching" desc="Smart recommendations based on your preferences" />
            <FeatureItem icon={Heart} title="Family-Friendly Platform" desc="Designed for both parents and youth" />
          </div>
        </div>
      </div>

      {/* ── Right Panel: Form ── */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12 relative bg-background">
        <FloatingOrbs />

        <div className="w-full max-w-[440px] relative z-10">

          {/* Mobile back link */}
          <div
            className="lg:hidden mb-8"
          >
            <Link href="/" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-foreground transition-colors group">
              <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              Back to home
            </Link>
          </div>

          {/* Header */}
          <div
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center"
              >
                <Heart className="w-5 h-5 text-secondary" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
              Create an account
            </h2>
            <p className="mt-2 text-muted-foreground font-medium text-base">
              Join <span className="text-primary font-bold">{siteConfig.name}</span> to find your perfect match
            </p>
          </div>

          {/* Error */}
          
            {error && (
              <div
                className="mb-6"
              >
                <div className="p-4 bg-destructive/10 border-2 border-destructive/20 rounded-2xl text-sm font-bold text-destructive">
                  {error}
                </div>
              </div>
            )}
          

          <div className="space-y-5">

            {/* Google Auth */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-2xl bg-card text-foreground font-bold text-[15px] border-2 border-border shadow-sm hover:shadow-md hover:border-primary/20 transition-all"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Sign up with Google
            </button>

            {/* Divider */}
            <div
              className="relative flex items-center py-1"
            >
              <div className="grow border-t border-border" />
              <span className="shrink-0 px-4 text-xs font-black text-muted-foreground uppercase tracking-widest">Or</span>
              <div className="grow border-t border-border" />
            </div>

            {/* Segmented Control */}
            <div
              className="flex p-1 bg-muted/50 rounded-2xl border border-border relative"
            >
              {(["email", "phone"] as const).map(method => (
                <button
                  key={method}
                  onClick={() => setAuthMethod(method)}
                  type="button"
                  className={`flex-1 flex items-center justify-center gap-2 py-3 font-bold text-sm rounded-xl transition-all ${
                    authMethod === method
                      ? "bg-card text-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {method === "email" ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                  {method === "email" ? "Email" : "Phone"}
                </button>
              ))}
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>

              {/* Full Name */}
              <div
                className="space-y-1.5"
              >
                <label htmlFor="name" className="block text-sm font-black text-foreground px-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField("")}
                    className="block w-full pl-11 pr-4 py-4 bg-muted/30 border-2 border-border rounded-2xl placeholder:text-muted-foreground/60 focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-[15px] outline-none"
                    placeholder="e.g. Priya Deshmukh"
                  />
                </div>
              </div>

              {/* Email or Phone */}
              
                {authMethod === "email" ? (
                  <div
                    key="email"
                    className="space-y-1.5"
                  >
                    <label htmlFor="email" className="block text-sm font-black text-foreground px-1">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-11 pr-4 py-4 bg-muted/30 border-2 border-border rounded-2xl placeholder:text-muted-foreground/60 focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-[15px] outline-none"
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    key="phone"
                    className="space-y-1.5"
                  >
                    <label htmlFor="phone" className="block text-sm font-black text-foreground px-1">
                      Mobile Number
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-4 py-4 rounded-l-2xl border-2 border-r-0 border-border bg-muted/50 text-muted-foreground font-bold text-sm">
                        +91
                      </span>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required={authMethod === "phone"}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="block w-full px-4 py-4 bg-muted/30 border-2 border-l-0 border-border rounded-r-2xl placeholder:text-muted-foreground/60 focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-[15px] outline-none"
                        placeholder="98765 43210"
                      />
                    </div>
                  </div>
                )}
              

              {/* Password */}
              <div
                className="space-y-2"
              >
                <label htmlFor="password" className="block text-sm font-black text-foreground px-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField("")}
                    className="block w-full pl-11 pr-12 py-4 bg-muted/30 border-2 border-border rounded-2xl placeholder:text-muted-foreground/60 focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-[15px] outline-none"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength */}
                
                  {(password.length > 0 || focusedField === "password") && (
                    <div
                      className="space-y-2 pt-1"
                    >
                      <div className="flex gap-1.5">
                        {[1, 2, 3].map(i => (
                          <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-colors ${
                              passwordStrength >= i
                                ? i === 1 ? "bg-red-400" : i === 2 ? "bg-yellow-400" : "bg-green-400"
                                : "bg-border"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="space-y-1">
                        {PASSWORD_RULES.map((rule, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs font-semibold"
                          >
                            <CheckCircle2 className={`w-3 h-3 ${rule.test(password) ? "text-green-500" : "text-muted-foreground/40"}`} />
                            <span className={rule.test(password) ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}>
                              {rule.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                
              </div>

              {/* Terms */}
              <div
                className="px-1 pt-1"
              >
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                  By signing up, you agree to our{" "}
                  <Link href="/terms" className="font-bold text-primary hover:underline">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="font-bold text-primary hover:underline">Privacy Policy</Link>.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-2xl text-base font-black text-white bg-linear-to-r from-secondary to-primary shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-70 transition-all mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-sm font-medium text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-primary hover:text-primary/80 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

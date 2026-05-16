"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import {
  Mail, Phone, ChevronLeft, Loader2, CheckCircle2,
  Lock, Eye, EyeOff, ArrowRight, Shield, Users, Sparkles, Heart
} from "lucide-react";

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 120 + i * 60,
            height: 120 + i * 60,
            background: i % 2 === 0
              ? "linear-gradient(135deg, var(--primary), var(--secondary))"
              : "linear-gradient(135deg, var(--accent), var(--primary))",
            opacity: 0.08,
            left: `${(i * 25) % 80}%`,
            top: `${(i * 18) % 70}%`,
          }}
          animate={{
            y: [0, -20 - i * 5, 0, 20 + i * 5, 0],
            x: [0, 15, 0, -15, 0],
            scale: [1, 1.1, 1, 0.9, 1],
          }}
          transition={{
            duration: 10 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function TrustBadge({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <motion.div
      className="flex items-center gap-2 text-white/70"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-sm font-semibold">{text}</span>
    </motion.div>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (authMethod === "phone") {
      setError("Phone authentication is coming soon. Please use email for now.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)]">

      {/* ── Left Panel: Brand / Decorative ── */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] relative bg-linear-to-br from-primary via-primary/95 to-secondary overflow-hidden">
        <FloatingOrbs />
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-bold mb-16">
                <ChevronLeft className="w-4 h-4" /> Back to home
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-4">
                Find your
                <br />
                <span className="text-accent">perfect match</span>
              </h1>
              <p className="text-white/60 text-lg font-medium max-w-sm leading-relaxed">
                Thousands of families trust {siteConfig.name} to find meaningful, lasting alliances.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <TrustBadge icon={Shield} text="Verified profiles only" />
            <TrustBadge icon={Users} text="10,000+ families trust us" />
            <TrustBadge icon={Heart} text="500+ successful alliances" />
          </motion.div>
        </div>
      </div>

      {/* ── Right Panel: Form ── */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12 relative bg-background">
        <FloatingOrbs />

        <div className="w-full max-w-[440px] relative z-10">

          {/* Mobile back link */}
          <motion.div
            className="lg:hidden mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Link href="/" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-foreground transition-colors group">
              <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              Back to home
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
              Welcome back
            </h2>
            <p className="mt-2 text-muted-foreground font-medium text-base">
              Sign in to your <span className="text-primary font-bold">{siteConfig.name}</span> account
            </p>
          </motion.div>

          {/* Success Message */}
          <AnimatePresence>
            {registered && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <div className="p-4 bg-green-50 dark:bg-green-500/10 border-2 border-green-200 dark:border-green-500/20 rounded-2xl flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-green-800 dark:text-green-400 font-semibold">
                    Account created! Please sign in with your credentials.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <div className="p-4 bg-destructive/10 border-2 border-destructive/20 rounded-2xl text-sm font-bold text-destructive">
                  {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-5">

            {/* Google Auth */}
            <motion.button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-2xl bg-card text-foreground font-bold text-[15px] border-2 border-border shadow-sm hover:shadow-md hover:border-primary/20 transition-all"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </motion.button>

            {/* Divider */}
            <motion.div
              className="relative flex items-center py-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="grow border-t border-border" />
              <span className="shrink-0 px-4 text-xs font-black text-muted-foreground uppercase tracking-widest">Or</span>
              <div className="grow border-t border-border" />
            </motion.div>

            {/* Segmented Control */}
            <motion.div
              className="flex p-1 bg-muted/50 rounded-2xl border border-border relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              {(["email", "phone"] as const).map(method => (
                <motion.button
                  key={method}
                  onClick={() => setAuthMethod(method)}
                  type="button"
                  className={`flex-1 flex items-center justify-center gap-2 py-3 font-bold text-sm rounded-xl transition-all ${
                    authMethod === method
                      ? "bg-card text-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  whileTap={{ scale: 0.97 }}
                >
                  {method === "email" ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                  {method === "email" ? "Email" : "Phone"}
                </motion.button>
              ))}
            </motion.div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {authMethod === "email" ? (
                  <motion.div
                    key="email"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
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
                  </motion.div>
                ) : (
                  <motion.div
                    key="phone"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
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
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                className="space-y-1.5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
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
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-12 py-4 bg-muted/30 border-2 border-border rounded-2xl placeholder:text-muted-foreground/60 focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-[15px] outline-none"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center justify-between px-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <label className="flex items-center gap-2.5 cursor-pointer group select-none">
                  <div className="relative flex items-center justify-center w-5 h-5 rounded-md border-2 border-border group-hover:border-primary transition-colors">
                    <input type="checkbox" className="absolute opacity-0 w-full h-full cursor-pointer peer" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-primary scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">Remember me</span>
                </label>
                <a href="#" className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">
                  Forgot password?
                </a>
              </motion.div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-2xl text-base font-black text-white bg-linear-to-r from-primary to-secondary shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30 disabled:opacity-70 transition-all mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </div>

          <motion.p
            className="text-center text-sm font-medium text-muted-foreground mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold text-primary hover:text-primary/80 transition-colors">
              Create an account
            </Link>
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <LoginForm />
    </Suspense>
  );
}

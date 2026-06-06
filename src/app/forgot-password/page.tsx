"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Loader2, Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10" aria-hidden>
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float-slow" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-secondary/10 blur-3xl animate-float-slower" style={{ animationDelay: "1s" }} />
    </div>
  );
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to process request");
      setMessage(data.message);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center relative px-4 bg-background">
      <FloatingOrbs />

      <div className="w-full max-w-md bg-card/60 backdrop-blur-md border border-border/80 rounded-3xl p-8 shadow-xl shadow-foreground/5 relative overflow-hidden transition-all duration-300">
        <Link href="/login" className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to Sign In
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            Forgot Password?
          </h1>
          <p className="text-sm font-medium text-muted-foreground mt-2 leading-relaxed">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        {message ? (
          <div className="space-y-6 text-center py-4 animate-fade-up">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-500">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-muted-foreground leading-relaxed">
              {message}
            </p>
            <Link href="/login" className="block w-full">
              <Button className="w-full h-12 rounded-2xl font-bold bg-primary hover:bg-primary/90 text-white">
                Back to Login
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="block text-sm font-black text-foreground px-1">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 py-4 bg-muted/30 border-2 border-border rounded-2xl placeholder:text-muted-foreground/60 focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-[15px] outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {error && <p className="text-xs font-bold text-destructive px-1">{error}</p>}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-4 h-12 rounded-2xl text-base font-black text-white bg-linear-to-r from-primary to-secondary shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30 disabled:opacity-70 transition-all mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending Link...
                </>
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

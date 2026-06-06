"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Loader2, Lock, CheckCircle2, ArrowRight, Eye, EyeOff } from "lucide-react";
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

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Reset token is missing. Please check your email link or request a new one.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const res = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to reset password");
      setMessage(data.message);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-card/60 backdrop-blur-md border border-border/80 rounded-3xl p-8 shadow-xl shadow-foreground/5 relative overflow-hidden transition-all duration-300">
      <Link href="/login" className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-6">
        <ChevronLeft className="w-4 h-4" /> Back to Sign In
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
          Reset Password
        </h1>
        <p className="text-sm font-medium text-muted-foreground mt-2 leading-relaxed">
          Please enter your new password below.
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
              Go to Login
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="password" className="block text-sm font-black text-foreground px-1">
              New Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-11 pr-12 py-4 bg-muted/30 border-2 border-border rounded-2xl placeholder:text-muted-foreground/60 focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-[15px] outline-none"
                placeholder="At least 8 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword" className="block text-sm font-black text-foreground px-1">
              Confirm New Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full pl-11 pr-12 py-4 bg-muted/30 border-2 border-border rounded-2xl placeholder:text-muted-foreground/60 focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-[15px] outline-none"
                placeholder="Re-enter new password"
              />
            </div>
          </div>

          {error && <p className="text-xs font-bold text-destructive px-1">{error}</p>}

          <Button
            type="submit"
            disabled={isLoading || !token}
            className="w-full flex justify-center items-center gap-2 py-4 h-12 rounded-2xl text-base font-black text-white bg-linear-to-r from-primary to-secondary shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30 disabled:opacity-70 transition-all mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Resetting Password...
              </>
            ) : (
              <>
                Reset Password
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center relative px-4 bg-background">
      <FloatingOrbs />
      <Suspense fallback={
        <div className="w-full max-w-md bg-card/60 backdrop-blur-md border border-border/80 rounded-3xl p-8 shadow-xl text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-sm font-semibold text-muted-foreground">Loading reset page...</p>
        </div>
      }>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}

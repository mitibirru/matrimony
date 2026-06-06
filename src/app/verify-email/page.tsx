"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10" aria-hidden>
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" style={{ animationDelay: "1s" }} />
    </div>
  );
}

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your email address...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Verification token is missing. Please check the link in your email.");
      return;
    }

    const verify = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
        const res = await fetch(`${API_URL}/api/auth/verify-email?token=${token}`);
        const data = await res.json();
        
        if (res.ok) {
          setStatus("success");
          setMessage(data.message || "Your email has been verified successfully!");
        } else {
          setStatus("error");
          setMessage(data.message || "Failed to verify email. The link may have expired.");
        }
      } catch (err) {
        setStatus("error");
        setMessage("An error occurred during verification. Please try again.");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="w-full max-w-md bg-card/60 backdrop-blur-md border border-border/80 rounded-3xl p-8 shadow-xl shadow-foreground/5 relative overflow-hidden text-center transition-all duration-300">
      
      {status === "loading" && (
        <div className="py-8 space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <h2 className="text-xl font-bold text-foreground">Verifying...</h2>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      )}

      {status === "success" && (
        <div className="py-8 space-y-6 animate-fade-up">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-500">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-foreground">Email Verified!</h2>
            <p className="text-sm font-medium text-muted-foreground px-4 leading-relaxed">{message}</p>
          </div>
          <Link href="/login" className="block w-full">
            <Button className="w-full h-12 rounded-2xl font-bold bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-1.5 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
              Go to Login
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      )}

      {status === "error" && (
        <div className="py-8 space-y-6 animate-fade-up">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <XCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-foreground">Verification Failed</h2>
            <p className="text-sm font-medium text-destructive px-4 leading-relaxed">{message}</p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/login" className="block w-full">
              <Button variant="outline" className="w-full h-12 rounded-2xl font-bold">
                Back to Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center relative px-4 bg-background">
      <FloatingOrbs />
      <Suspense fallback={
        <div className="w-full max-w-md bg-card/60 backdrop-blur-md border border-border/80 rounded-3xl p-8 shadow-xl text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-sm font-semibold text-muted-foreground">Loading email verification page...</p>
        </div>
      }>
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}

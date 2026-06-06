"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { AlertTriangle, Mail, X, Loader2 } from "lucide-react";

export function EmailVerificationBanner() {
  const { data: session, status } = useSession();
  const [dismissed, setDismissed] = useState(false);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  // Don't show if: loading, not logged in, already verified, or dismissed
  if (
    status === "loading" ||
    !session?.user ||
    (session.user as any).emailVerified ||
    dismissed
  ) {
    return null;
  }

  const handleResend = async () => {
    setResending(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const res = await fetch(`${API_URL}/api/auth/verify-email/resend`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${(session as any)?.accessToken}`
        }
      });
      if (res.ok) {
        setResent(true);
      }
    } catch (err) {
      console.error("Failed to resend verification email:", err);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="relative bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
      <div className="container flex items-center gap-3 py-3 pr-10">
        <div className="shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
            Your email is not verified.{" "}
            <span className="text-amber-600 dark:text-amber-400 font-normal">
              Please check your inbox for the verification link to unlock all features.
            </span>
          </p>
        </div>
        <div className="shrink-0">
          {resent ? (
            <span className="text-xs font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              Sent!
            </span>
          ) : (
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-xs font-bold text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 underline underline-offset-2 transition-colors disabled:opacity-50 flex items-center gap-1"
            >
              {resending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Sending…
                </>
              ) : (
                "Resend email"
              )}
            </button>
          )}
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-1/2 -translate-y-1/2 right-3 p-1 rounded-lg text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

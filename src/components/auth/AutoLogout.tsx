"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function AutoLogout() {
  useEffect(() => {
    signOut({ callbackUrl: "/login?session_expired=true" });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-muted-foreground font-medium">Session expired. Logging you out...</p>
      </div>
    </div>
  );
}

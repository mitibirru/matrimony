"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { siteConfig } from "@/config/site";
import {
  Menu, X, Home, Users, Phone, Diamond, LogIn, UserPlus,
  User, Heart, Settings, LogOut, Shield, ChevronRight
} from "lucide-react";

interface MobileNavProps {
  isLoggedIn: boolean;
  user?: { name?: string | null; email?: string | null } | null;
}

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About Us", icon: Users },
  { href: "/contact", label: "Contact", icon: Phone },
  { href: "/elite", label: "Elite Matrimony", icon: Diamond, accent: true },
];

const USER_LINKS = [
  { href: "/profile", label: "My Profile", icon: User },
  { href: "/matches", label: "My Matches", icon: Heart },
  { href: "/discover/settings", label: "Settings", icon: Settings },
];

export function MobileNav({ isLoggedIn, user }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const displayName = user?.name && !user.name.includes("undefined")
    ? user.name : user?.email?.split("@")[0] || "User";

  return (
    <>
      <button onClick={() => setOpen(true)} className="p-2 text-foreground rounded-xl hover:bg-muted/50 transition-colors" aria-label="Open menu">
        <Menu className="h-6 w-6" />
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-[360px] bg-background border-l border-border shadow-2xl flex flex-col transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-5 border-b border-border">
          <span className="text-lg font-extrabold text-primary tracking-tight">{siteConfig.name}</span>
          <button onClick={() => setOpen(false)} className="p-2 rounded-xl hover:bg-muted/50 transition-colors" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isLoggedIn && user && (
            <div className="m-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{displayName}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {!isLoggedIn && (
          <nav className="p-4 space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-3 mb-2">Navigate</p>
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"}`}>
                  <Icon className={`h-5 w-5 ${link.accent ? "text-accent" : isActive ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="flex-1">{link.label}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                </Link>
              );
            })}
          </nav>
          )}

          {isLoggedIn && (
            <nav className="p-4 pt-0 space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-3 mb-2">Account</p>
              {USER_LINKS.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"}`}>
                    <Icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="flex-1">{link.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                  </Link>
                );
              })}
            </nav>
          )}

          <div className="mx-4 mt-2 mb-4">
            <Link href="/safety" className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-green-500/5 border border-green-500/10 text-sm font-semibold text-green-700 dark:text-green-400">
              <Shield className="h-5 w-5" /> Safety Tips
            </Link>
          </div>
        </div>

        <div className="p-4 border-t border-border bg-muted/20">
          {isLoggedIn ? (
            <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-500/15 transition-colors">
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          ) : (
            <div className="flex gap-3">
              <Link href="/login" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-border text-sm font-bold text-foreground hover:bg-muted/50 transition-colors">
                <LogIn className="h-4 w-4" /> Login
              </Link>
              <Link href="/register" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary text-white text-sm font-bold shadow-md hover:bg-secondary/90 transition-colors">
                <UserPlus className="h-4 w-4" /> Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

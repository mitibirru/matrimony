"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import {
  Menu, X, Home, Users, Phone, Diamond, LogIn, UserPlus,
  User, Heart, Settings, LogOut, Shield, ChevronRight
} from "lucide-react";

interface MobileNavProps {
  isLoggedIn: boolean;
  user?: {
    name?: string | null;
    email?: string | null;
  } | null;
}

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About Us", icon: Users },
  { href: "/contact", label: "Contact", icon: Phone },
  { href: "/elite", label: "Elite Matrimony", icon: Diamond, accent: true },
];

const USER_LINKS = [
  { href: "/dashboard", label: "My Profile", icon: User },
  { href: "/matches", label: "My Matches", icon: Heart },
  { href: "/settings", label: "Settings", icon: Settings },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
  exit: { x: "100%", transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.04, duration: 0.3 },
  }),
};

export function MobileNav({ isLoggedIn, user }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const displayName = user?.name && !user.name.includes("undefined")
    ? user.name
    : user?.email?.split("@")[0] || "User";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 text-foreground rounded-xl hover:bg-muted/50 transition-colors"
        aria-label="Open navigation menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-[360px] bg-background border-l border-border shadow-2xl flex flex-col"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-border">
                <span className="text-lg font-extrabold text-primary tracking-tight">
                  {siteConfig.name}
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-xl hover:bg-muted/50 transition-colors text-foreground"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                {/* User Card (if logged in) */}
                {isLoggedIn && user && (
                  <motion.div
                    className="m-4 p-4 rounded-2xl bg-primary/5 border border-primary/10"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground truncate">{displayName}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Links */}
                <nav className="p-4 space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-3 mb-2">
                    Navigate
                  </p>
                  {NAV_LINKS.map((link, i) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        custom={i + 1}
                      >
                        <Link
                          href={link.href}
                          className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-colors ${
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-muted/50"
                          }`}
                        >
                          <Icon className={`h-5 w-5 ${link.accent ? "text-accent" : isActive ? "text-primary" : "text-muted-foreground"}`} />
                          <span className="flex-1">{link.label}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* User-specific links */}
                {isLoggedIn && (
                  <nav className="p-4 pt-0 space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-3 mb-2">
                      Account
                    </p>
                    {USER_LINKS.map((link, i) => {
                      const Icon = link.icon;
                      const isActive = pathname === link.href;
                      return (
                        <motion.div
                          key={link.href}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          custom={i + NAV_LINKS.length + 1}
                        >
                          <Link
                            href={link.href}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-colors ${
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "text-foreground hover:bg-muted/50"
                            }`}
                          >
                            <Icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                            <span className="flex-1">{link.label}</span>
                            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>
                )}

                {/* Safety link */}
                <div className="mx-4 mt-2 mb-4">
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={8}
                  >
                    <Link
                      href="/safety"
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-green-500/5 border border-green-500/10 text-sm font-semibold text-green-700 dark:text-green-400"
                    >
                      <Shield className="h-5 w-5" />
                      Safety Tips
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Bottom Auth Actions */}
              <div className="p-4 border-t border-border bg-muted/20">
                {isLoggedIn ? (
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-500/15 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <Link
                      href="/login"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-border text-sm font-bold text-foreground hover:bg-muted/50 transition-colors"
                    >
                      <LogIn className="h-4 w-4" />
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary text-white text-sm font-bold shadow-md hover:bg-secondary/90 transition-colors"
                    >
                      <UserPlus className="h-4 w-4" />
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

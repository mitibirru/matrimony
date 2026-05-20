"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { User, Settings, LogOut, ChevronDown, Heart } from "lucide-react";

interface UserNavProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export function UserNav({ user }: UserNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = user.name && !user.name.includes("undefined") && user.name.trim() !== ""
    ? user.name
    : user.email?.split("@")[0] || "User";

  const initials = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pl-3 pr-2 rounded-full border border-border bg-background hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
      >
        <div className="flex flex-col text-right hidden sm:flex">
          <span className="text-sm font-bold text-foreground leading-none">{displayName.split(' ')[0]}</span>
        </div>
        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
          {initials}
        </div>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-4 border-b border-border bg-muted/20">
            <p className="text-sm font-bold text-foreground truncate">{displayName}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          
          <div className="p-2 space-y-1">
            <Link 
              href="/profile" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary rounded-xl transition-colors"
            >
              <User className="h-4 w-4" />
              My Profile
            </Link>
            <Link 
              href="/matches" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary rounded-xl transition-colors"
            >
              <Heart className="h-4 w-4" />
              My Matches
            </Link>
            <Link 
              href="/settings" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary rounded-xl transition-colors"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </div>
          
          <div className="p-2 border-t border-border">
            <button 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

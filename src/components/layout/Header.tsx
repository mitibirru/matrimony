import Link from 'next/link';
import { Menu, UserCircle, Diamond } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border shadow-sm transition-colors duration-300">
      <div className="container flex h-20 items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><circle cx="8" cy="12" r="5"/><circle cx="16" cy="12" r="5"/></svg>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold tracking-tight text-primary">
              {siteConfig.name}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
              Telugu & Marathi
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-primary">Home</Link>
          <Link href="/about" className="transition-colors hover:text-primary">About Us</Link>
          <Link href="/success-stories" className="transition-colors hover:text-primary">Success Stories</Link>
          <Link href="/contact" className="transition-colors hover:text-primary">Contact</Link>
          
          {/* Elite Link with Special Styling */}
          <Link href="/elite" className="flex items-center space-x-1.5 font-semibold text-foreground hover:text-primary transition-colors">
            <Diamond className="h-4 w-4 text-accent" fill="currentColor" />
            <span>Elite Matrimony</span>
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Link href="/login" className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2">
            <UserCircle className="h-5 w-5" />
            Login
          </Link>
          <Link href="/register" className="inline-flex h-10 items-center justify-center rounded-full bg-secondary px-6 text-sm font-semibold text-white shadow transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Register Free
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button className="p-2 text-foreground">
            <Menu className="h-6 w-6" />
          </button>
        </div>

      </div>
    </header>
  );
}

import Link from 'next/link';
import { Diamond } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function Footer() {
  return (
    <footer className="w-full bg-muted/30 border-t border-border">
      <div className="container py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Brand Section */}
          <div className="space-y-3 sm:space-y-4 col-span-2 sm:col-span-2 md:col-span-1">
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{siteConfig.name}</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Telugu & Marathi Matrimony</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium matchmaking services dedicated to uniting Telugu and Marathi families with trust, authenticity, and tradition.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/search" className="hover:text-primary transition-colors">Search Profiles</Link></li>
              <li><Link href="/success-stories" className="hover:text-primary transition-colors">Success Stories</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal & Help */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-foreground">Legal & Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/safety" className="hover:text-primary transition-colors">Safety Tips</Link></li>
            </ul>
          </div>

          {/* Elite CTA */}
          <div className="space-y-3 sm:space-y-4 bg-primary/5 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-primary/10 col-span-2 sm:col-span-1">
            <div className="flex items-center space-x-2 text-primary">
              <Diamond className="h-5 w-5" />
              <h4 className="text-base sm:text-lg font-bold">Elite Services</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Exclusive matchmaking for high-net-worth professionals and entrepreneurs.
            </p>
            <Link href="/elite" className="inline-block mt-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
              Discover Elite Matrimony &rarr;
            </Link>
          </div>

        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name} Matrimony. All rights reserved.</p>
          <div className="flex space-x-4">
            <span>Made with ❤️ for Telugu & Marathi Communities</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

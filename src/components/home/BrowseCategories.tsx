"use client";

import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Globe, MapPin, Map, Heart, BookOpen, Star } from "lucide-react";

const BROWSE_DATA = {
  caste: [
    "Reddy", "Kamma", "Kapu", "Velama", "Naidu", "Brahmin (Telugu)",
    "Vokkaliga", "Lingayat", "Gowda", "Brahmin (Kannada)",
    "Maratha", "Deshastha", "Kokanastha", "Mali", "Kunbi", "Brahmin (Marathi)",
    "Yadav", "Rajput", "Agarwal",
  ],
  language: ["Telugu", "Kannada", "Marathi"],
  city: [
    "Hyderabad", "Bangalore", "Pune", "Mumbai", "Chennai", "Vizag",
    "Nagpur", "Belgaum", "Warangal", "Aurangabad", "Mysore", "Hubli",
    "Vijayawada", "Tirupati", "Nashik", "Kolhapur",
  ],
  state: [
    "Telangana", "Andhra Pradesh", "Karnataka", "Maharashtra",
    "Tamil Nadu", "Delhi NCR", "Gujarat", "Rajasthan",
  ],
  maritalStatus: [
    "Never Married", "Divorced", "Widowed", "Second Marriage",
  ],
  motherTongue: [
    "Telugu", "Kannada", "Marathi", "Hindi", "Urdu", "Tamil", "English",
  ],
  kundali: [
    "Telugu Kundali Matching", "Kannada Kundali Matching", "Marathi Kundali Matching",
    "Mangal Dosha Check", "Guna Milan Score", "Nakshatra Matching",
  ],
};

const TABS = [
  { value: "caste", label: "Caste", icon: Users },
  { value: "language", label: "Language", icon: Globe },
  { value: "city", label: "City", icon: MapPin },
  { value: "state", label: "State", icon: Map },
  { value: "maritalStatus", label: "Marital Status", icon: Heart },
  { value: "motherTongue", label: "Mother Tongue", icon: BookOpen },
  { value: "kundali", label: "Kundali", icon: Star },
];

function ChipGrid({ items, category }: { items: string[]; category: string }) {
  return (
    <div className="flex flex-wrap gap-2.5 animate-fade-up">
      {items.map((item) => (
        <Link
          key={item}
          href={`/discover?${category}=${encodeURIComponent(item)}`}
          className="inline-flex items-center px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-medium text-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary hover:shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
        >
          {item}
        </Link>
      ))}
    </div>
  );
}

export function BrowseCategories() {
  return (
    <section className="py-12 sm:py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-8 sm:mb-12 space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Browse Matrimony Profiles
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Find profiles by caste, language, city, state, marital status, mother tongue or kundali compatibility.
          </p>
        </div>

        <Tabs defaultValue="caste" className="max-w-4xl mx-auto">
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap bg-card border border-border rounded-xl p-1 h-auto mb-6">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-lg gap-1.5 text-xs sm:text-sm px-3 py-2 whitespace-nowrap"
              >
                <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(BROWSE_DATA).map(([key, items]) => (
            <TabsContent key={key} value={key}>
              <div className="bg-card border border-border rounded-2xl p-5 sm:p-8 shadow-sm">
                <ChipGrid items={items} category={key} />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

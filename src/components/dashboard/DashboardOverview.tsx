"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UserCircle, Heart, Star, Sparkles, MapPin, Briefcase,
  GraduationCap, Eye, MessageCircle, BookmarkPlus,
  ChevronRight, Search, Bookmark, Send, Flame, Zap, Crown, Camera,
  Edit3, MoreHorizontal, Share2, Users, Clock,
  TrendingUp, ChevronDown, CheckCircle2, MessageSquare
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// ────── Stories / Recently Active ──────
function RecentlyActiveScroller() {
  const activeProfiles = [
    { name: "Priya I.", community: "Tamil", isOnline: true },
    { name: "Aarav D.", community: "Marathi", isOnline: true },
    { name: "Anjali N.", community: "Malayalam", isOnline: false },
    { name: "Kiran R.", community: "Telugu", isOnline: true },
    { name: "Meera S.", community: "Kannada", isOnline: false },
    { name: "Rohit P.", community: "Marathi", isOnline: true },
    { name: "Divya K.", community: "Telugu", isOnline: true },
  ];

  return (
    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="flex gap-4 pb-2">
        {activeProfiles.map((p, i) => (
          <button key={i}
            className="flex flex-col items-center gap-2 min-w-[72px] hover:scale-105 active:scale-95 transition-transform animate-fade-up"
            style={{ animationDelay: `${i * 60}ms` }}>
            <div className={`relative p-[3px] rounded-full ${p.isOnline ? "bg-linear-to-br from-primary via-secondary to-accent" : "bg-border"}`}>
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center ring-2 ring-background">
                <UserCircle className="w-7 h-7 text-muted-foreground/40" />
              </div>
              {p.isOnline && (
                <div className="absolute -bottom-0.5 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-background animate-pulse" />
              )}
            </div>
            <span className="text-[11px] font-semibold text-muted-foreground truncate max-w-[72px]">{p.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ────── Feed Post Card ──────
function FeedPostCard({ profile, index }: { profile: MockProfile; index: number }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const [interested, setInterested] = useState(false);

  const timeAgo = ["2h ago", "5h ago", "8h ago", "1d ago", "2d ago", "3d ago"][index % 6];
  const bioText = profile.bio || `Looking for a life partner who values family, education, and shared traditions. ${profile.community} family settled in ${profile.city}.`;

  return (
    <article className="card-entrance bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      style={{ animationDelay: `${index * 100}ms` }}>
      {/* Post Header */}
      <div className="flex items-center gap-3 p-4 pb-3">
        <div className={`relative p-[2px] rounded-full ${profile.isOnline ? "bg-linear-to-br from-primary to-secondary" : ""}`}>
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center ring-2 ring-card">
            <UserCircle className="w-7 h-7 text-muted-foreground/40" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-black text-foreground truncate">{profile.profession}</h3>
            {profile.isVerified && <CheckCircle2 className="w-4 h-4 text-primary fill-primary/20 shrink-0" />}
          </div>
          <p className="text-xs text-muted-foreground font-medium">{profile.age} yrs &bull; {profile.community} &bull; {profile.city}</p>
        </div>
        <div className="flex items-center gap-2">
          {profile.isPremium && (
            <Badge className="bg-accent/10 text-accent border-accent/20 text-[10px] font-black px-2 py-0.5 rounded-full">
              <Crown className="w-3 h-3 mr-0.5" /> Elite
            </Badge>
          )}
          <button className="p-1.5 rounded-full text-muted-foreground hover:bg-muted hover:rotate-90 transition-all duration-300"><MoreHorizontal className="w-5 h-5" /></button>
        </div>
      </div>

      {/* Compatibility */}
      <div className="mx-4 mb-3 flex items-center gap-2 px-3 py-2 bg-primary/5 dark:bg-primary/10 rounded-xl">
        <Sparkles className="w-4 h-4 text-primary shrink-0" />
        <span className="text-xs font-bold text-primary">{profile.matchScore}% compatible</span>
        <div className="flex-1" />
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`w-1.5 h-4 rounded-full transition-all duration-500 ${i < Math.round(profile.matchScore / 20) ? "bg-primary" : "bg-primary/15"}`}
              style={{ transitionDelay: `${i * 80}ms` }} />
          ))}
        </div>
      </div>

      {/* Photo Area */}
      <div className="relative aspect-4/3 bg-linear-to-br from-primary/15 via-primary/5 to-secondary/10 overflow-hidden group">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <UserCircle className="w-14 h-14 text-white/30" />
          </div>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-bold"><GraduationCap className="w-3 h-3" /> {profile.education}</span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-bold"><Star className="w-3 h-3" /> {profile.religion}</span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-bold">{profile.height} cm</span>
        </div>
        {profile.isNew && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-secondary/90 backdrop-blur-sm flex items-center gap-1 animate-pulse">
            <Zap className="w-3 h-3 text-white" />
            <span className="text-[10px] font-black text-white uppercase">New</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <button onClick={() => setLiked(!liked)} className="hover:scale-125 active:scale-90 transition-transform duration-200">
            <Heart className={`w-6 h-6 transition-colors duration-200 ${liked ? "text-secondary fill-secondary animate-pop" : "text-muted-foreground hover:text-secondary"}`} />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 active:scale-90 duration-200"><MessageSquare className="w-6 h-6" /></button>
          <button className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 active:scale-90 duration-200"><Share2 className="w-6 h-6" /></button>
        </div>
        <button onClick={() => setSaved(!saved)} className="hover:scale-125 active:scale-90 transition-transform duration-200">
          <Bookmark className={`w-6 h-6 transition-colors duration-200 ${saved ? "text-accent fill-accent animate-pop" : "text-muted-foreground hover:text-foreground"}`} />
        </button>
      </div>

      <div className="px-4 pb-1">
        <p className="text-sm font-bold text-foreground">{liked ? "You and " : ""}{12 + index * 3} families shortlisted</p>
      </div>

      <div className="px-4 pb-3">
        <p className="text-sm text-foreground/80 font-medium leading-relaxed">
          {showFullBio ? bioText : `${bioText.slice(0, 120)}...`}
        </p>
        {bioText.length > 120 && (
          <button onClick={() => setShowFullBio(!showFullBio)} className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors mt-0.5">
            {showFullBio ? "less" : "more"}
          </button>
        )}
      </div>

      <div className="px-4 pb-4 flex items-center gap-3">
        <button
          onClick={() => setInterested(!interested)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black transition-all duration-300 active:scale-[0.97] ${
            interested ? "bg-green-500/10 text-green-600 dark:text-green-400 border-2 border-green-500/20" : "bg-primary text-primary-foreground shadow-md shadow-primary/15 hover:shadow-lg hover:shadow-primary/25"
          }`}
        >
          {interested ? <><CheckCircle2 className="w-4 h-4 animate-check-pop" /> Interest Sent</> : <><Send className="w-4 h-4" /> Express Interest</>}
        </button>
        <span className="text-xs text-muted-foreground font-medium flex items-center gap-1"><Clock className="w-3 h-3" /> {timeAgo}</span>
      </div>
    </article>
  );
}

// ────── Sidebar: Profile ──────
function UserProfileSidebar({ profile, age }: { profile: Record<string, unknown>; age: string | number }) {
  const infoItems = [
    { icon: MapPin, text: `${profile.city}, ${profile.state}` },
    { icon: GraduationCap, text: profile.education as string },
    { icon: Briefcase, text: `${(profile.profession as string) || "—"}${profile.companyName ? `, ${profile.companyName}` : ""}` },
    { icon: Star, text: `${profile.religion}${profile.caste ? `, ${profile.caste}` : ""}` },
    ...(profile.familyType ? [{ icon: Users, text: `${profile.familyType} Family, ${profile.familyValues}` }] : []),
    ...(profile.diet ? [{ icon: Heart, text: `${profile.diet}${profile.smoking && profile.smoking !== "No" ? " · Smokes" : ""}${profile.drinking && profile.drinking !== "No" ? " · Drinks" : ""}` }] : []),
  ];

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm animate-fade-up">
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-3 hover:scale-105 transition-transform duration-300">
          <UserCircle className="w-10 h-10" />
        </div>
        <h3 className="text-base font-black text-foreground">{(profile.profession as string) || "Professional"}</h3>
        <p className="text-xs text-muted-foreground font-semibold mt-0.5">{age} Yrs &bull; {profile.height as number} cm &bull; {profile.community as string}</p>
        {profile.profileFor && profile.profileFor !== "Self" ? (
          <Badge variant="outline" className="mt-2 text-[10px] font-bold rounded-full animate-scale-in">Profile by {String(profile.profileFor)}</Badge>
        ) : null}
        <div className="w-full border-t border-border my-4" />
        <div className="w-full space-y-2.5 text-left stagger-children">
          {infoItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-foreground hover:translate-x-1 transition-transform duration-200">
              <item.icon className="w-4 h-4 text-primary shrink-0" />
              <span className="truncate">{item.text}</span>
            </div>
          ))}
        </div>
        <Link href="/dashboard/edit-profile" className="w-full mt-5 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary/10 text-primary font-bold text-sm hover:bg-primary/15 hover:shadow-sm active:scale-[0.97] transition-all duration-200">
          <Edit3 className="w-4 h-4" /> Edit Profile
        </Link>
      </div>
    </div>
  );
}

// ────── Sidebar: Stats ──────
function QuickStatsSidebar() {
  const stats = [
    { icon: Heart, label: "Interests Received", value: 12, color: "text-secondary" },
    { icon: Eye, label: "Profile Views", value: 48, color: "text-primary" },
    { icon: BookmarkPlus, label: "You Shortlisted", value: 6, color: "text-accent" },
    { icon: MessageCircle, label: "Connections", value: 3, color: "text-green-500" },
  ];
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm animate-fade-up" style={{ animationDelay: "100ms" }}>
      <h3 className="text-sm font-black text-foreground flex items-center gap-2 mb-4"><TrendingUp className="w-4 h-4 text-primary" /> Activity</h3>
      <div className="space-y-3 stagger-children">
        {stats.map((s, i) => (
          <div key={i} className="flex items-center justify-between hover:translate-x-1 transition-transform duration-200">
            <div className="flex items-center gap-2.5"><s.icon className={`w-4 h-4 ${s.color}`} /><span className="text-sm text-muted-foreground font-medium">{s.label}</span></div>
            <span className="text-sm font-black text-foreground">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ────── Sidebar: Suggested ──────
function SuggestedProfilesSidebar() {
  const suggestions = [
    { name: "Software Engineer", community: "Telugu", city: "Hyderabad", matchScore: 95 },
    { name: "Doctor (MBBS)", community: "Marathi", city: "Mumbai", matchScore: 92 },
    { name: "Data Scientist", community: "Tamil", city: "Chennai", matchScore: 89 },
  ];
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm animate-fade-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-black text-foreground flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" /> Suggested</h3>
        <button className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">See All</button>
      </div>
      <div className="space-y-3 stagger-children">
        {suggestions.map((s, i) => (
          <div key={i} className="flex items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-muted/50 hover:translate-x-1 transition-all duration-200 cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200"><UserCircle className="w-5 h-5 text-muted-foreground/40" /></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">{s.name}</p>
              <p className="text-[11px] text-muted-foreground font-medium">{s.community} &bull; {s.city}</p>
            </div>
            <Badge className="bg-primary/10 text-primary border-0 text-[10px] font-black px-1.5 py-0.5 rounded-full shrink-0">{s.matchScore}%</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

// ────── Sidebar: Trending ──────
function TrendingSidebar() {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm animate-fade-up" style={{ animationDelay: "100ms" }}>
      <h3 className="text-sm font-black text-foreground flex items-center gap-2 mb-4"><Flame className="w-4 h-4 text-secondary" /> Trending</h3>
      <div className="space-y-3 text-sm stagger-children">
        {["New verified profiles from Hyderabad", "Premium Telugu profiles added today", "Marathi families actively looking"].map((t, i) => (
          <button key={i} className="flex items-start gap-2 text-left text-muted-foreground hover:text-foreground hover:translate-x-1 font-medium transition-all duration-200 w-full">
            <span className="text-xs font-black text-primary mt-0.5">{i + 1}</span>
            <span className="leading-snug">{t}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ────── Profile Completion Banner ──────
function ProfileCompletionBanner() {
  return (
    <div className="relative bg-linear-to-r from-primary/5 via-primary/3 to-secondary/5 border border-primary/10 rounded-2xl p-4 flex items-center gap-4 overflow-hidden animate-fade-up">
      <div className="absolute inset-0 animate-shimmer pointer-events-none" />
      <div className="relative shrink-0">
        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="3" className="text-border" />
          <circle cx="24" cy="24" r="20" fill="none" stroke="url(#cg)" strokeWidth="3.5" strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 20} strokeDashoffset={2 * Math.PI * 20 * 0.15} className="transition-all duration-1000" />
          <defs><linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="var(--primary)" /><stop offset="100%" stopColor="var(--secondary)" /></linearGradient></defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center"><span className="text-[10px] font-black text-foreground">85%</span></div>
      </div>
      <div className="relative flex-1 min-w-0">
        <p className="text-sm font-bold text-foreground">Complete your profile to get 5x more responses</p>
        <div className="flex gap-2 mt-2">
          <button className="flex items-center gap-1 px-2.5 py-1 bg-secondary/10 text-secondary rounded-full text-[11px] font-bold hover:bg-secondary/15 hover:scale-105 active:scale-95 transition-all"><Camera className="w-3 h-3" /> Add Photos</button>
          <button className="flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-[11px] font-bold hover:bg-primary/15 hover:scale-105 active:scale-95 transition-all"><Edit3 className="w-3 h-3" /> Preferences</button>
        </div>
      </div>
    </div>
  );
}

// ────── Filter Bar ──────
function FeedFilterBar({ active, onChange }: { active: string; onChange: (v: string) => void }) {
  const filters = [
    { id: "foryou", label: "For You", icon: Sparkles },
    { id: "new", label: "New Today", icon: Zap },
    { id: "nearby", label: "Near Me", icon: MapPin },
    { id: "premium", label: "Premium", icon: Crown },
  ];
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
      {filters.map((f) => {
        const Icon = f.icon;
        const isActive = active === f.id;
        return (
          <button key={f.id} onClick={() => onChange(f.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 active:scale-95 ${
              isActive ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.03]" : "bg-card text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground hover:shadow-sm"
            }`}
          >
            <Icon className="w-3.5 h-3.5" /> {f.label}
          </button>
        );
      })}
    </div>
  );
}

// ────── Types & Data ──────
interface MockProfile { id: number; profession: string; age: number; height: number; community: string; city: string; state: string; education: string; religion: string; matchScore: number; isVerified: boolean; isNew: boolean; isPremium: boolean; isOnline: boolean; bio?: string; }

const MOCK_PROFILES: MockProfile[] = [
  { id: 1, profession: "Software Developer at Microsoft", age: 26, height: 165, community: "Telugu", city: "Hyderabad", state: "Telangana", education: "M.Tech", religion: "Hindu", matchScore: 97, isVerified: true, isNew: true, isPremium: false, isOnline: true, bio: "Looking for a life partner who values family, tradition, and growth. Software developer by profession, musician by passion. Our family is originally from Guntur, now settled in Hyderabad." },
  { id: 2, profession: "Doctor (MBBS, MD) at KEM Hospital", age: 28, height: 160, community: "Marathi", city: "Pune", state: "Maharashtra", education: "Doctorate", religion: "Hindu", matchScore: 94, isVerified: true, isNew: false, isPremium: true, isOnline: false, bio: "Marathi Brahmin family from Pune. Completed MD from KEM Hospital, Mumbai. Passionate about healthcare and community service." },
  { id: 3, profession: "Chartered Accountant at Deloitte", age: 25, height: 168, community: "Tamil", city: "Chennai", state: "Tamil Nadu", education: "CA, MBA", religion: "Hindu", matchScore: 91, isVerified: false, isNew: true, isPremium: false, isOnline: true, bio: "Tamil Iyer family based in Chennai. Qualified CA working at Deloitte. Enjoy classical music, reading, and cooking." },
  { id: 4, profession: "UX Designer at Flipkart", age: 24, height: 162, community: "Kannada", city: "Bangalore", state: "Karnataka", education: "B.Des", religion: "Hindu", matchScore: 88, isVerified: true, isNew: false, isPremium: false, isOnline: false, bio: "Creative soul working in tech. Kannada Lingayat family settled in Bangalore. Love art, design, travel." },
  { id: 5, profession: "IAS Officer, Batch 2023", age: 29, height: 172, community: "Telugu", city: "Delhi", state: "Delhi", education: "M.A., IAS", religion: "Hindu", matchScore: 85, isVerified: true, isNew: false, isPremium: true, isOnline: true, bio: "Civil servant from a well-respected Reddy family in Nellore, AP. Currently posted in Delhi." },
  { id: 6, profession: "Business Analyst at TCS", age: 27, height: 158, community: "Malayalam", city: "Kochi", state: "Kerala", education: "MBA", religion: "Christian", matchScore: 82, isVerified: false, isNew: true, isPremium: false, isOnline: false, bio: "Syro-Malabar Catholic family from Kottayam. MBA graduate working in IT." },
];

// ────── Main Dashboard ──────
export default function DashboardOverview({ profile }: { profile: Record<string, unknown> }) {
  const [activeFilter, setActiveFilter] = useState("foryou");

  const getAge = (dobString: string) => {
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const age = profile.dateOfBirth ? getAge(profile.dateOfBirth as string) : "—";
  const filteredProfiles = MOCK_PROFILES.filter(p => {
    if (activeFilter === "foryou") return true;
    if (activeFilter === "new") return p.isNew;
    if (activeFilter === "nearby") return p.city === profile.city;
    if (activeFilter === "premium") return p.isPremium;
    return true;
  });

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-muted/30">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-4 py-4 sm:py-6">

        {/* Mobile Stats */}
        <div className="lg:hidden mb-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-3 px-3 pb-2">
            {[
              { icon: Heart, label: "Interests", value: 12, color: "text-secondary" },
              { icon: Eye, label: "Views", value: 48, color: "text-primary" },
              { icon: BookmarkPlus, label: "Shortlisted", value: 6, color: "text-accent" },
              { icon: MessageCircle, label: "Connections", value: 3, color: "text-green-500" },
            ].map((s, i) => (
              <div key={i}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-card border border-border shadow-sm shrink-0 animate-fade-up hover:shadow-md transition-shadow duration-200"
                style={{ animationDelay: `${i * 60}ms` }}>
                <s.icon className={`w-4 h-4 ${s.color}`} />
                <span className="text-xs font-bold text-foreground whitespace-nowrap">{s.value} {s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_280px] gap-4 sm:gap-6">
          <aside className="hidden lg:block space-y-4 sticky top-24 self-start">
            <UserProfileSidebar profile={profile} age={age} />
            <QuickStatsSidebar />
          </aside>

          <main className="space-y-5 min-w-0">
            <div className="bg-card border border-border rounded-2xl p-4 shadow-sm animate-fade-up">
              <div className="flex items-center gap-2 mb-3"><Users className="w-4 h-4 text-primary" /><span className="text-sm font-black text-foreground">Recently Active</span></div>
              <RecentlyActiveScroller />
            </div>
            <ProfileCompletionBanner />
            <FeedFilterBar active={activeFilter} onChange={setActiveFilter} />

            <div className="space-y-5">
              {filteredProfiles.length > 0 ? (
                filteredProfiles.map((p, i) => <FeedPostCard key={p.id} profile={p} index={i} />)
              ) : (
                <div className="bg-card border border-border rounded-2xl p-12 text-center animate-scale-in">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4"><Search className="w-8 h-8 text-muted-foreground/40" /></div>
                  <h3 className="text-base font-bold text-foreground mb-1">No profiles found</h3>
                  <p className="text-sm text-muted-foreground font-medium">Try a different filter</p>
                </div>
              )}
            </div>

            {filteredProfiles.length > 0 && (
              <div className="flex justify-center py-4">
                <button className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-card text-foreground font-bold text-sm hover:bg-card/80 hover:shadow-md transition-all duration-200 border border-border shadow-sm active:scale-[0.97]">
                  Load More <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            )}
          </main>

          <aside className="hidden lg:block space-y-4 sticky top-24 self-start">
            <SuggestedProfilesSidebar />
            <TrendingSidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { format } from "date-fns";
import {
  UserCircle, MapPin, GraduationCap, Briefcase, Star, Heart,
  Edit3, Calendar, Ruler, Users, Home, Cigarette, Wine,
  Shield, BadgeCheck, Camera, Sparkles, ChevronRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { X, Crown } from "lucide-react";

function MinimalRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value?: string | number | null }) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between py-4 border-b border-border/40 last:border-0 group">
      <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
        <Icon className="w-4 h-4 opacity-70" />
        <span className="text-[13px] font-medium tracking-wide">{label}</span>
      </div>
      <div className="text-[15px] font-semibold text-foreground text-right">{String(value)}</div>
    </div>
  );
}

function SectionHeading({ title, icon: Icon }: { title: string; icon: React.ElementType }) {
  return (
    <div className="flex items-center gap-3 mb-6 mt-12">
      <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
        <Icon className="w-5 h-5" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
    </div>
  );
}

export default function MyProfileView({ profile, user }: { profile: Record<string, any>; user: any }) {
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  
  const getAge = (dob: string) => {
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const age = profile.dateOfBirth ? getAge(profile.dateOfBirth) : null;
  const dob = profile.dateOfBirth ? format(new Date(profile.dateOfBirth), "dd MMM yyyy") : null;

  const displayName = user?.name && !user.name.includes("undefined")
    ? user.name
    : user?.email?.split("@")[0] || "User";

  const hasPhotos = profile.photos && profile.photos.length > 0;
  const primaryPhoto = hasPhotos ? profile.photos[0] : null;

  return (
    <div className="pb-24 animate-in fade-in duration-1000">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Sticky Profile Card (Editorial Style) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="relative aspect-[3/4] w-full rounded-[2rem] bg-muted/20 border border-border/50 shadow-2xl overflow-hidden group">
            {primaryPhoto ? (
              <img src={primaryPhoto} alt={displayName} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/30">
                <UserCircle className="w-32 h-32 mb-4" />
                <p className="font-medium tracking-widest uppercase text-sm">No Photo</p>
              </div>
            )}

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Floating Info inside Photo */}
            <div className="absolute bottom-0 inset-x-0 p-8 text-white">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-4xl font-extrabold tracking-tight">{displayName}{age ? `, ${age}` : ""}</h1>
                <BadgeCheck className="w-8 h-8 text-blue-400 drop-shadow-md" />
              </div>
              <p className="text-lg text-white/90 font-medium tracking-wide flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> {profile.profession || "Professional"}
              </p>
              <p className="text-sm text-white/70 font-medium tracking-wide flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4" /> {profile.city ? `${profile.city}, ${profile.country}` : "Location not specified"}
              </p>
            </div>

            {/* Floating Edit Avatar Button */}
            <Link href="/discover/edit-profile" className="absolute top-6 right-6 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-2xl shadow-lg transition-colors border border-white/30">
              <Camera className="w-5 h-5 text-white" />
            </Link>
          </div>

          {/* Quick Stats Pill Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-lg">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">ID:</span>
              <span className="text-sm font-bold text-foreground">{profile.profileId}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-lg">
              <UserCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-foreground capitalize">{profile.gender}</span>
            </div>
            {profile.maritalStatus && (
              <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-lg">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-foreground capitalize">{profile.maritalStatus}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Details & Gallery */}
        <div className="lg:col-span-7 pt-4 lg:pt-0">
          
          {/* About Me */}
          {profile.about && (
            <div className="mb-12 relative">
              <Sparkles className="w-6 h-6 text-primary mb-4" />
              <p className="text-xl sm:text-2xl font-serif leading-relaxed text-foreground/90 font-medium">
                "{profile.about}"
              </p>
            </div>
          )}

          {/* Luxury Gallery */}
          {hasPhotos && profile.photos.length > 1 && (
            <div className="mb-12">
              <SectionHeading title="Gallery" icon={Camera} />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {profile.photos.slice(1).map((url: string, i: number) => (
                  <div
                    key={url}
                    className="relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-500"
                    onClick={() => setLightboxUrl(url)}
                  >
                    <img src={url} alt={`Photo ${i + 2}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Minimalist Details Lists */}
          <div className="space-y-2">
            <SectionHeading title="Basics & Lifestyle" icon={Heart} />
            <div className="bg-card rounded-[2rem] border border-border/50 p-6 sm:p-8 shadow-sm">
              <MinimalRow icon={Calendar} label="Date of Birth" value={dob} />
              <MinimalRow icon={Ruler} label="Height" value={profile.height ? `${profile.height} cm` : null} />
              <MinimalRow icon={UserCircle} label="Body Type" value={profile.bodyType} />
              <MinimalRow icon={Star} label="Diet" value={profile.diet} />
              <MinimalRow icon={Cigarette} label="Smoking" value={profile.smoking} />
              <MinimalRow icon={Wine} label="Drinking" value={profile.drinking} />
            </div>

            <SectionHeading title="Career & Education" icon={Briefcase} />
            <div className="bg-card rounded-[2rem] border border-border/50 p-6 sm:p-8 shadow-sm">
              <MinimalRow icon={GraduationCap} label="Highest Education" value={profile.education} />
              <MinimalRow icon={GraduationCap} label="Education Details" value={profile.educationDetail} />
              <MinimalRow icon={Briefcase} label="Employed In" value={profile.employedIn} />
              <MinimalRow icon={Briefcase} label="Profession" value={profile.profession} />
              <MinimalRow icon={Briefcase} label="Company Name" value={profile.companyName} />
              <MinimalRow icon={Briefcase} label="Annual Income" value={profile.annualIncome} />
            </div>

            <SectionHeading title="Background & Family" icon={Users} />
            <div className="bg-card rounded-[2rem] border border-border/50 p-6 sm:p-8 shadow-sm">
              <MinimalRow icon={Star} label="Religion" value={profile.religion} />
              <MinimalRow icon={Users} label="Community" value={profile.community} />
              <MinimalRow icon={Star} label="Mother Tongue" value={profile.motherTongue} />
              <MinimalRow icon={Star} label="Caste" value={profile.caste} />
              <MinimalRow icon={Home} label="Native Place" value={profile.nativePlace} />
              <MinimalRow icon={Users} label="Father's Occupation" value={profile.fatherOccupation} />
              <MinimalRow icon={Users} label="Mother's Occupation" value={profile.motherOccupation} />
              <MinimalRow icon={Shield} label="Family Status" value={profile.familyStatus} />
              <MinimalRow icon={Heart} label="Family Values" value={profile.familyValues} />
            </div>
          </div>
          
          <div className="mt-12 flex justify-end">
            <Link href="/discover/edit-profile">
              <Button className="rounded-full h-14 px-8 shadow-lg text-[15px] font-bold group">
                <Edit3 className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" /> Manage Profile
              </Button>
            </Link>
          </div>

        </div>
      </div>

      {/* Lightbox */}
      {lightboxUrl && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setLightboxUrl(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxUrl}
              alt="Full size preview"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl select-none"
            />
            <button
              className="absolute top-4 right-4 sm:-top-4 sm:-right-12 w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 group"
              onClick={() => setLightboxUrl(null)}
            >
              <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

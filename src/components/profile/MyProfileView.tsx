"use client";

import Link from "next/link";
import { format } from "date-fns";
import {
  UserCircle, MapPin, GraduationCap, Briefcase, Star, Heart,
  Edit3, Calendar, Ruler, Users, Home, Cigarette, Wine,
  ChevronRight, Shield, BadgeCheck
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value?: string | number | null }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-2.5">
      <Icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">{label}</p>
        <p className="text-sm font-medium text-foreground mt-0.5">{String(value)}</p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="py-4 pb-0">
        <CardTitle className="text-sm font-bold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-2 pb-4 divide-y divide-border/50">
        {children}
      </CardContent>
    </Card>
  );
}

export default function MyProfileView({ profile, user }: { profile: Record<string, any>; user: any }) {
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

  return (
    <div className="space-y-5">

      {/* Profile Header Card */}
      <Card className="rounded-2xl shadow-sm overflow-hidden">
        {/* Cover gradient */}
        <div className="h-28 sm:h-36 bg-gradient-to-br from-primary via-primary/90 to-secondary relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
        </div>
        <CardContent className="relative pt-0 pb-5 px-5">
          {/* Avatar */}
          <div className="-mt-12 sm:-mt-14 mb-3 flex items-end justify-between">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-card border-4 border-card flex items-center justify-center shadow-lg">
              <UserCircle className="w-12 h-12 sm:w-14 sm:h-14 text-muted-foreground/30" />
            </div>
            <Link href="/discover/edit-profile">
              <Button variant="outline" size="sm" className="rounded-xl font-semibold gap-1.5 shadow-sm">
                <Edit3 className="w-3.5 h-3.5" /> Edit Profile
              </Button>
            </Link>
          </div>

          {/* Name & basics */}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-foreground">{displayName}</h1>
              <BadgeCheck className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground font-medium mt-0.5">
              {profile.profession || "Professional"} {profile.companyName ? `at ${profile.companyName}` : ""}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-2.5">
              <Badge variant="outline" className="text-[11px] font-bold rounded-full">{profile.profileId}</Badge>
              {age && <Badge variant="outline" className="text-[11px] font-bold rounded-full">{age} yrs</Badge>}
              <Badge variant="outline" className="text-[11px] font-bold rounded-full">{profile.gender}</Badge>
              {profile.maritalStatus && <Badge variant="outline" className="text-[11px] font-bold rounded-full">{profile.maritalStatus}</Badge>}
            </div>
          </div>

          {/* About */}
          {profile.about && (
            <div className="mt-4 p-3.5 bg-muted/30 rounded-xl">
              <p className="text-sm text-foreground/80 font-medium leading-relaxed">{profile.about}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Personal */}
        <Section title="Personal Details">
          <InfoRow icon={Calendar} label="Date of Birth" value={dob} />
          <InfoRow icon={Ruler} label="Height" value={profile.height ? `${profile.height} cm` : null} />
          <InfoRow icon={Heart} label="Body Type" value={profile.bodyType} />
          <InfoRow icon={Star} label="Diet" value={profile.diet} />
        </Section>

        {/* Religion */}
        <Section title="Religion & Community">
          <InfoRow icon={Star} label="Religion" value={profile.religion} />
          <InfoRow icon={Users} label="Community" value={profile.community} />
          <InfoRow icon={Star} label="Mother Tongue" value={profile.motherTongue} />
          <InfoRow icon={Star} label="Caste" value={profile.caste} />
          <InfoRow icon={Star} label="Gothram" value={profile.gothram} />
          <InfoRow icon={Star} label="Manglik" value={profile.manglik} />
        </Section>

        {/* Career */}
        <Section title="Education & Career">
          <InfoRow icon={GraduationCap} label="Education" value={profile.education} />
          <InfoRow icon={GraduationCap} label="Details" value={profile.educationDetail} />
          <InfoRow icon={Briefcase} label="Employed In" value={profile.employedIn} />
          <InfoRow icon={Briefcase} label="Profession" value={profile.profession} />
          <InfoRow icon={Briefcase} label="Company" value={profile.companyName} />
          <InfoRow icon={Briefcase} label="Annual Income" value={profile.annualIncome} />
        </Section>

        {/* Location */}
        <Section title="Location & Lifestyle">
          <InfoRow icon={MapPin} label="City" value={profile.city} />
          <InfoRow icon={MapPin} label="State" value={profile.state} />
          <InfoRow icon={MapPin} label="Country" value={profile.country} />
          <InfoRow icon={Home} label="Native Place" value={profile.nativePlace} />
          <InfoRow icon={Cigarette} label="Smoking" value={profile.smoking} />
          <InfoRow icon={Wine} label="Drinking" value={profile.drinking} />
        </Section>

        {/* Family */}
        <Section title="Family Details">
          <InfoRow icon={Users} label="Father's Occupation" value={profile.fatherOccupation} />
          <InfoRow icon={Users} label="Mother's Occupation" value={profile.motherOccupation} />
          <InfoRow icon={Users} label="Brothers" value={profile.brothers != null ? `${profile.brothers} (${profile.brothersMarried || 0} married)` : null} />
          <InfoRow icon={Users} label="Sisters" value={profile.sisters != null ? `${profile.sisters} (${profile.sistersMarried || 0} married)` : null} />
          <InfoRow icon={Home} label="Family Type" value={profile.familyType} />
          <InfoRow icon={Shield} label="Family Status" value={profile.familyStatus} />
          <InfoRow icon={Heart} label="Family Values" value={profile.familyValues} />
        </Section>

        {/* Photos placeholder */}
        <Section title="Photos">
          <div className="py-4">
            <div className="grid grid-cols-3 gap-2.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="aspect-square rounded-xl border-2 border-dashed border-border bg-muted/20 flex items-center justify-center">
                  <UserCircle className="w-8 h-8 text-muted-foreground/20" />
                </div>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground font-medium mt-2">Photo upload coming soon</p>
          </div>
        </Section>
      </div>

      {/* Bottom Edit CTA */}
      <div className="flex justify-center pt-2 pb-6">
        <Link href="/discover/edit-profile">
          <Button className="rounded-xl font-semibold px-8 shadow-md gap-2 active:scale-[0.98] transition-all">
            <Edit3 className="w-4 h-4" /> Edit Full Profile <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

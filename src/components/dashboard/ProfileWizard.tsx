"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  ChevronRight, ChevronLeft, Loader2, CheckCircle2,
  Heart, Star, Briefcase, PenLine, ChevronDown, Check,
  Search, CalendarIcon, Users, MapPin, Sparkles, Phone
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// ────── Floating BG Orbs (pure CSS) ──────
function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10" aria-hidden>
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-float-slow" />
      <div className="absolute top-1/3 -right-16 w-56 h-56 rounded-full bg-secondary/5 blur-3xl animate-float-slower" />
      <div className="absolute -bottom-12 left-1/4 w-64 h-64 rounded-full bg-accent/5 blur-3xl animate-float-slow" style={{ animationDelay: "2s" }} />
    </div>
  );
}

// ────── Popover Dropdown ──────
function DropdownPicker({ value, options, onSelect, placeholder = "Select..." }: {
  value: string; options: { value: string; label: string }[]; onSelect: (val: string) => void; placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filtered = options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()));
  const selectedLabel = options.find(o => o.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox"
          className="w-full h-11 justify-between rounded-xl px-4 text-sm font-medium border hover:border-primary/50 hover:shadow-sm transition-all duration-200">
          <span className={selectedLabel ? "text-foreground" : "text-muted-foreground"}>{selectedLabel || placeholder}</span>
          <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 rounded-xl animate-scale-in" align="start">
        {options.length > 5 && (
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input autoFocus placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-9 rounded-lg border-0 bg-muted/50 focus-visible:ring-0 text-sm" />
            </div>
          </div>
        )}
        <div className="max-h-52 overflow-y-auto p-1.5 dropdown-stagger">
          {filtered.length === 0 && <p className="text-sm text-muted-foreground text-center py-3">No results</p>}
          {filtered.map(opt => (
            <button key={opt.value} onClick={() => { onSelect(opt.value); setOpen(false); setSearch(""); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                ${value === opt.value
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-muted hover:translate-x-0.5"}`}>
              <span>{opt.label}</span>
              {value === opt.value && <Check className="w-4 h-4 text-primary animate-check-pop" />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ────── Chip Selector ──────
function ChipSelector({ options, value, onSelect }: { options: string[]; value: string; onSelect: (val: string) => void }) {
  const [justSelected, setJustSelected] = useState("");

  const handleSelect = (opt: string) => {
    onSelect(opt);
    setJustSelected(opt);
    setTimeout(() => setJustSelected(""), 250);
  };

  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map(opt => (
        <Button key={opt} type="button" variant={value === opt ? "default" : "outline"} size="sm"
          onClick={() => handleSelect(opt)}
          className={`rounded-xl h-10 px-5 text-sm font-semibold transition-all duration-200
            ${value === opt ? "shadow-md shadow-primary/20 scale-[1.03]" : "hover:border-primary/40 hover:shadow-sm"}
            ${justSelected === opt ? "animate-pop" : ""}`}>
          {value === opt && <Check className="w-3.5 h-3.5 mr-1.5 animate-check-pop" />}
          {opt}
        </Button>
      ))}
    </div>
  );
}

// ────── Number Stepper ──────
function NumberStepper({ value, onChange, max = 10 }: { value: number; onChange: (v: number) => void; max?: number }) {
  const [pop, setPop] = useState(false);
  const change = (v: number) => { onChange(v); setPop(true); setTimeout(() => setPop(false), 200); };

  return (
    <div className="flex items-center gap-3">
      <Button type="button" variant="outline" size="sm" onClick={() => change(Math.max(0, value - 1))} disabled={value <= 0}
        className="rounded-xl w-10 h-10 p-0 active:scale-90 transition-transform">-</Button>
      <span className={`w-8 text-center text-base font-bold text-foreground transition-transform ${pop ? "scale-125" : "scale-100"}`}>{value}</span>
      <Button type="button" variant="outline" size="sm" onClick={() => change(Math.min(max, value + 1))} disabled={value >= max}
        className="rounded-xl w-10 h-10 p-0 active:scale-90 transition-transform">+</Button>
    </div>
  );
}

// ────── Field Label ──────
function FieldLabel({ children, optional }: { children: React.ReactNode; optional?: boolean }) {
  return (
    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
      {children}
      {optional && <Badge variant="outline" className="text-[10px] rounded-md px-1.5 py-0 font-bold normal-case tracking-normal">Optional</Badge>}
    </Label>
  );
}

// ────── Dropdown options ──────
const RASHI_OPTIONS = [
  "Mesha (Aries)", "Vrishabha (Taurus)", "Mithuna (Gemini)", "Karka (Cancer)",
  "Simha (Leo)", "Kanya (Virgo)", "Tula (Libra)", "Vrischika (Scorpio)",
  "Dhanu (Sagittarius)", "Makara (Capricorn)", "Kumbha (Aquarius)", "Meena (Pisces)",
].map(r => ({ value: r, label: r }));

const NAKSHATRA_OPTIONS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Moola", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta",
  "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
].map(n => ({ value: n, label: n }));

const STATE_OPTIONS = [
  "Andhra Pradesh", "Telangana", "Maharashtra", "Tamil Nadu", "Karnataka",
  "Kerala", "Goa", "Delhi", "Uttar Pradesh", "Madhya Pradesh", "Rajasthan",
  "Gujarat", "West Bengal", "Bihar", "Odisha", "Punjab", "Haryana",
  "Jharkhand", "Chhattisgarh", "Assam", "Other",
].map(s => ({ value: s, label: s }));

const COMMUNITY_OPTIONS = [
  "Telugu", "Marathi", "Tamil", "Kannada", "Malayalam", "Hindi",
  "Konkani", "Tulu", "Urdu", "Other",
].map(c => ({ value: c, label: c }));

// ────── Main Wizard ──────
export default function ProfileWizard({ userId }: { userId: string }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [dobDate, setDobDate] = useState<Date | undefined>(undefined);
  const [slideDir, setSlideDir] = useState<"right" | "left">("right");
  const [stepKey, setStepKey] = useState(0);

  // Phone OTP state
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");

  const handleSendOTP = async () => {
    const cleaned = formData.phone.replace(/\s/g, "");
    if (cleaned.length < 10) { setOtpError("Enter a valid 10-digit number"); return; }
    setOtpLoading(true); setOtpError("");
    try {
      const { auth, RecaptchaVerifier, signInWithPhoneNumber } = await import("@/lib/firebase");
      if (!(window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-wizard", { size: "invisible" });
      }
      const result = await signInWithPhoneNumber(auth, `+91${cleaned}`, (window as any).recaptchaVerifier);
      setConfirmationResult(result);
      setOtpSent(true);
    } catch (err: any) {
      setOtpError(err.message || "Failed to send OTP");
      if ((window as any).recaptchaVerifier) { (window as any).recaptchaVerifier.clear(); (window as any).recaptchaVerifier = null; }
    } finally { setOtpLoading(false); }
  };

  const handleVerifyOTP = async () => {
    if (otp.length < 6) { setOtpError("Enter the 6-digit OTP"); return; }
    setOtpLoading(true); setOtpError("");
    try {
      await confirmationResult.confirm(otp);
      setPhoneVerified(true);
    } catch {
      setOtpError("Invalid OTP. Please try again.");
    } finally { setOtpLoading(false); }
  };

  const [formData, setFormData] = useState({
    profileFor: "", gender: "", dateOfBirth: "", maritalStatus: "",
    height: 170, bodyType: "", diet: "",
    religion: "", community: "", motherTongue: "", caste: "",
    subCaste: "", gothram: "", manglik: "Don't Know", rashi: "", nakshatra: "",
    fatherOccupation: "", motherOccupation: "",
    brothers: 0, brothersMarried: 0, sisters: 0, sistersMarried: 0,
    familyType: "", familyStatus: "", familyValues: "",
    education: "", educationDetail: "", employedIn: "",
    profession: "", companyName: "", annualIncome: "",
    city: "", state: "", country: "India", nativePlace: "",
    smoking: "No", drinking: "No",
    about: "",
    phone: "",
  });

  const updateField = (field: string, value: string | number) => setFormData(prev => ({ ...prev, [field]: value }));

  const totalSteps = 6;
  const progressValue = (step / totalSteps) * 100;

  const stepConfig = [
    { icon: Heart, label: "Basic", title: "The Basics", desc: "Tell us about yourself" },
    { icon: Star, label: "Religion", title: "Your Roots", desc: "Religion, community & astrology" },
    { icon: Users, label: "Family", title: "Family Details", desc: "About your family background" },
    { icon: Briefcase, label: "Career", title: "Education & Career", desc: "Your qualifications and profession" },
    { icon: MapPin, label: "Location", title: "Location & Lifestyle", desc: "Where you live and lifestyle choices" },
    { icon: PenLine, label: "Bio", title: "Your Story", desc: "Let your personality shine through" },
  ];
  const cur = stepConfig[step - 1];

  const validate = (): string | null => {
    switch (step) {
      case 1:
        if (!formData.profileFor) return "Please select who this profile is for.";
        if (!formData.gender) return "Please select gender.";
        if (!formData.dateOfBirth) return "Please select date of birth.";
        if (!formData.maritalStatus) return "Please select marital status.";
        if (!formData.diet) return "Please select diet preference.";
        return null;
      case 2:
        if (!formData.religion) return "Please select religion.";
        if (!formData.community) return "Please select community.";
        if (!formData.motherTongue) return "Please select mother tongue.";
        return null;
      case 3:
        if (!formData.fatherOccupation) return "Please enter father's occupation.";
        if (!formData.motherOccupation) return "Please enter mother's occupation.";
        if (!formData.familyType) return "Please select family type.";
        if (!formData.familyStatus) return "Please select family status.";
        if (!formData.familyValues) return "Please select family values.";
        return null;
      case 4:
        if (!formData.education) return "Please select education.";
        if (!formData.employedIn) return "Please select employment type.";
        if (!formData.profession) return "Please enter profession.";
        return null;
      case 5:
        if (!formData.city) return "Please enter city.";
        if (!formData.state) return "Please select state.";
        return null;
      case 6:
        if (!formData.about || formData.about.length < 50) return "Please write at least 50 characters about yourself.";
        if (!formData.phone || formData.phone.replace(/\s/g, "").length < 10) return "Please enter your mobile number.";
        if (!phoneVerified) return "Please verify your mobile number with OTP.";
        return null;
      default:
        return null;
    }
  };

  const nextStep = () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setSlideDir("right");
    setStepKey(k => k + 1);
    setStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setError("");
    setSlideDir("left");
    setStepKey(k => k + 1);
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) { setError(err); return; }
    setIsLoading(true); setError("");
    try {
      const res = await fetch("/api/profile", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create profile");
      router.refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally { setIsLoading(false); }
  };

  return (
    <div className="relative max-w-2xl mx-auto py-8 px-4">
      <FloatingOrbs />

      {/* Step indicators */}
      <div className="flex items-center justify-between mb-2">
        {stepConfig.map((s, i) => {
          const Icon = s.icon;
          const isActive = step === i + 1;
          const isDone = step > i + 1;
          return (
            <div key={i} className="flex items-center gap-1">
              <div className={`flex items-center justify-center w-9 h-9 shrink-0 rounded-full transition-all duration-500 ${
                isActive ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-110"
                : isDone ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
              }`}>
                {isDone ? <CheckCircle2 className="w-4 h-4 animate-check-pop" /> : <Icon className="w-4 h-4" />}
              </div>
              <span className={`hidden lg:block text-[11px] font-semibold transition-colors duration-300 ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
              {i < stepConfig.length - 1 && (
                <Separator className={`w-3 sm:w-6 lg:w-8 mx-0.5 transition-colors duration-500 ${isDone ? "bg-primary/30!" : ""}`} />
              )}
            </div>
          );
        })}
      </div>
      <div className="relative mb-6">
        <Progress value={progressValue} className="h-1.5 rounded-full transition-all duration-500" />
        <div className="absolute inset-0 rounded-full animate-shimmer opacity-40 pointer-events-none" />
      </div>

      <Card className="rounded-2xl shadow-lg overflow-hidden animate-scale-in">
        <CardHeader className="relative bg-muted/20 py-5 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-primary/3 via-transparent to-secondary/3 animate-gradient-shift pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-bold rounded-md px-2 py-0.5">Step {step}/{totalSteps}</Badge>
              <Sparkles className="w-3.5 h-3.5 text-primary/40" />
            </div>
            <CardTitle className="text-xl font-bold tracking-tight">{cur.title}</CardTitle>
            <CardDescription className="text-sm">{cur.desc}</CardDescription>
          </div>
        </CardHeader>
        <Separator />

        <CardContent className="pt-6 pb-2">
          {error && (
            <div className="p-3 mb-4 bg-destructive/10 text-destructive rounded-xl text-sm font-semibold border border-destructive/20 animate-fade-up">
              {error}
            </div>
          )}

          {/* Animated step container — CSS slide based on direction */}
          <div key={stepKey} className={`stagger-children space-y-5 ${slideDir === "right" ? "animate-slide-right" : "animate-slide-left"}`}>

            {/* ── STEP 1: Basic Info ── */}
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <FieldLabel>This profile is for</FieldLabel>
                  <ChipSelector options={["Self", "Son", "Daughter", "Brother", "Sister", "Relative"]} value={formData.profileFor} onSelect={(v) => updateField("profileFor", v)} />
                </div>
                <div className="space-y-2">
                  <FieldLabel>Gender</FieldLabel>
                  <ChipSelector options={["Male", "Female"]} value={formData.gender} onSelect={(v) => updateField("gender", v)} />
                </div>
                <div className="space-y-2">
                  <FieldLabel>Marital Status</FieldLabel>
                  <DropdownPicker value={formData.maritalStatus} onSelect={(v) => updateField("maritalStatus", v)} placeholder="Select marital status"
                    options={[
                      { value: "Never Married", label: "Never Married" },
                      { value: "Divorced", label: "Divorced" },
                      { value: "Widowed", label: "Widowed" },
                      { value: "Awaiting Divorce", label: "Awaiting Divorce" },
                    ]} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FieldLabel>Date of Birth</FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={`w-full h-11 justify-start rounded-xl text-sm font-medium px-4 hover:shadow-sm transition-all ${!dobDate ? "text-muted-foreground" : ""}`}>
                          <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />{dobDate ? format(dobDate, "dd MMM yyyy") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 rounded-xl animate-scale-in" align="start">
                        <Calendar mode="single" selected={dobDate} onSelect={(date) => { setDobDate(date); if (date) updateField("dateOfBirth", date.toISOString()); }} captionLayout="dropdown" defaultMonth={new Date(2000, 0)} startMonth={new Date(1970, 0)} endMonth={new Date(2008, 11)} />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <FieldLabel>Height (cm)</FieldLabel>
                    <Input type="number" value={formData.height} onChange={(e) => updateField("height", e.target.value)} className="h-11 text-sm font-medium rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <FieldLabel>Diet</FieldLabel>
                  <ChipSelector options={["Vegetarian", "Non-Vegetarian", "Eggetarian", "Vegan"]} value={formData.diet} onSelect={(v) => updateField("diet", v)} />
                </div>
                <div className="space-y-2">
                  <FieldLabel optional>Body Type</FieldLabel>
                  <ChipSelector options={["Slim", "Average", "Athletic", "Heavy"]} value={formData.bodyType} onSelect={(v) => updateField("bodyType", v)} />
                </div>
              </>
            )}

            {/* ── STEP 2: Religion & Astrology ── */}
            {step === 2 && (
              <>
                <div className="space-y-2">
                  <FieldLabel>Religion</FieldLabel>
                  <ChipSelector options={["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist", "Other"]} value={formData.religion} onSelect={(v) => updateField("religion", v)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FieldLabel>Community</FieldLabel>
                    <DropdownPicker value={formData.community} onSelect={(v) => updateField("community", v)} placeholder="Select community" options={COMMUNITY_OPTIONS} />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel>Mother Tongue</FieldLabel>
                    <DropdownPicker value={formData.motherTongue} onSelect={(v) => updateField("motherTongue", v)} placeholder="Select language" options={COMMUNITY_OPTIONS} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FieldLabel optional>Caste</FieldLabel>
                    <Input placeholder="e.g. Reddy, Brahmin" value={formData.caste} onChange={(e) => updateField("caste", e.target.value)} className="h-11 text-sm font-medium rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel optional>Sub-Caste</FieldLabel>
                    <Input placeholder="e.g. Niyogi, Deshastha" value={formData.subCaste} onChange={(e) => updateField("subCaste", e.target.value)} className="h-11 text-sm font-medium rounded-xl" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FieldLabel optional>Gothram</FieldLabel>
                    <Input placeholder="Your Gothram" value={formData.gothram} onChange={(e) => updateField("gothram", e.target.value)} className="h-11 text-sm font-medium rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel>Manglik / Dosham</FieldLabel>
                    <ChipSelector options={["Yes", "No", "Don't Know"]} value={formData.manglik} onSelect={(v) => updateField("manglik", v)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FieldLabel optional>Rashi (Moon Sign)</FieldLabel>
                    <DropdownPicker value={formData.rashi} onSelect={(v) => updateField("rashi", v)} placeholder="Select Rashi" options={RASHI_OPTIONS} />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel optional>Nakshatra (Birth Star)</FieldLabel>
                    <DropdownPicker value={formData.nakshatra} onSelect={(v) => updateField("nakshatra", v)} placeholder="Select Nakshatra" options={NAKSHATRA_OPTIONS} />
                  </div>
                </div>
              </>
            )}

            {/* ── STEP 3: Family Details ── */}
            {step === 3 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FieldLabel>Father&apos;s Occupation</FieldLabel>
                    <Input placeholder="e.g. Retired Govt Officer" value={formData.fatherOccupation} onChange={(e) => updateField("fatherOccupation", e.target.value)} className="h-11 text-sm font-medium rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel>Mother&apos;s Occupation</FieldLabel>
                    <Input placeholder="e.g. Homemaker, Teacher" value={formData.motherOccupation} onChange={(e) => updateField("motherOccupation", e.target.value)} className="h-11 text-sm font-medium rounded-xl" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FieldLabel>Number of Brothers</FieldLabel>
                    <NumberStepper value={formData.brothers} onChange={(v) => updateField("brothers", v)} />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel>Brothers Married</FieldLabel>
                    <NumberStepper value={formData.brothersMarried} onChange={(v) => updateField("brothersMarried", v)} max={formData.brothers} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FieldLabel>Number of Sisters</FieldLabel>
                    <NumberStepper value={formData.sisters} onChange={(v) => updateField("sisters", v)} />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel>Sisters Married</FieldLabel>
                    <NumberStepper value={formData.sistersMarried} onChange={(v) => updateField("sistersMarried", v)} max={formData.sisters} />
                  </div>
                </div>
                <div className="space-y-2">
                  <FieldLabel>Family Type</FieldLabel>
                  <ChipSelector options={["Nuclear", "Joint", "Extended"]} value={formData.familyType} onSelect={(v) => updateField("familyType", v)} />
                </div>
                <div className="space-y-2">
                  <FieldLabel>Family Status</FieldLabel>
                  <ChipSelector options={["Middle Class", "Upper Middle Class", "Rich", "Affluent"]} value={formData.familyStatus} onSelect={(v) => updateField("familyStatus", v)} />
                </div>
                <div className="space-y-2">
                  <FieldLabel>Family Values</FieldLabel>
                  <ChipSelector options={["Orthodox", "Moderate", "Liberal"]} value={formData.familyValues} onSelect={(v) => updateField("familyValues", v)} />
                </div>
              </>
            )}

            {/* ── STEP 4: Education & Career ── */}
            {step === 4 && (
              <>
                <div className="space-y-2">
                  <FieldLabel>Highest Education</FieldLabel>
                  <DropdownPicker value={formData.education} onSelect={(v) => updateField("education", v)} placeholder="Select education"
                    options={[
                      { value: "High School", label: "High School" },
                      { value: "Diploma", label: "Diploma" },
                      { value: "Bachelors", label: "Bachelors (B.Tech / B.Com / BA)" },
                      { value: "Masters", label: "Masters (M.Tech / MBA / MA)" },
                      { value: "Doctorate", label: "Doctorate (PhD)" },
                      { value: "Other", label: "Other" },
                    ]} />
                </div>
                <div className="space-y-2">
                  <FieldLabel optional>College / University</FieldLabel>
                  <Input placeholder="e.g. IIT Hyderabad, Pune University" value={formData.educationDetail} onChange={(e) => updateField("educationDetail", e.target.value)} className="h-11 text-sm font-medium rounded-xl" />
                </div>
                <div className="space-y-2">
                  <FieldLabel>Employed In</FieldLabel>
                  <ChipSelector options={["Private", "Government", "Business", "Self-Employed", "Not Working"]} value={formData.employedIn} onSelect={(v) => updateField("employedIn", v)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FieldLabel>Profession / Designation</FieldLabel>
                    <Input placeholder="e.g. Software Engineer" value={formData.profession} onChange={(e) => updateField("profession", e.target.value)} className="h-11 text-sm font-medium rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel optional>Company Name</FieldLabel>
                    <Input placeholder="e.g. TCS, Infosys" value={formData.companyName} onChange={(e) => updateField("companyName", e.target.value)} className="h-11 text-sm font-medium rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <FieldLabel optional>Annual Income</FieldLabel>
                  <DropdownPicker value={formData.annualIncome} onSelect={(v) => updateField("annualIncome", v)} placeholder="Select income range"
                    options={[
                      { value: "Below 3 LPA", label: "Below 3 LPA" },
                      { value: "3-5 LPA", label: "3 - 5 LPA" },
                      { value: "5-10 LPA", label: "5 - 10 LPA" },
                      { value: "10-20 LPA", label: "10 - 20 LPA" },
                      { value: "20-50 LPA", label: "20 - 50 LPA" },
                      { value: "50+ LPA", label: "50+ LPA" },
                    ]} />
                </div>
              </>
            )}

            {/* ── STEP 5: Location & Lifestyle ── */}
            {step === 5 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FieldLabel>Current City</FieldLabel>
                    <Input placeholder="e.g. Hyderabad" value={formData.city} onChange={(e) => updateField("city", e.target.value)} className="h-11 text-sm font-medium rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel>State</FieldLabel>
                    <DropdownPicker value={formData.state} onSelect={(v) => updateField("state", v)} placeholder="Select state" options={STATE_OPTIONS} />
                  </div>
                </div>
                <div className="space-y-2">
                  <FieldLabel optional>Native Place / Hometown</FieldLabel>
                  <Input placeholder="e.g. Guntur, Kolhapur" value={formData.nativePlace} onChange={(e) => updateField("nativePlace", e.target.value)} className="h-11 text-sm font-medium rounded-xl" />
                </div>
                <div className="space-y-2">
                  <FieldLabel>Smoking</FieldLabel>
                  <ChipSelector options={["No", "Occasionally", "Yes"]} value={formData.smoking} onSelect={(v) => updateField("smoking", v)} />
                </div>
                <div className="space-y-2">
                  <FieldLabel>Drinking</FieldLabel>
                  <ChipSelector options={["No", "Occasionally", "Yes"]} value={formData.drinking} onSelect={(v) => updateField("drinking", v)} />
                </div>
              </>
            )}

            {/* ── STEP 6: About Me & Phone ── */}
            {step === 6 && (
              <>
                <div className="space-y-2">
                  <FieldLabel>About Me</FieldLabel>
                  <Textarea value={formData.about} onChange={(e) => updateField("about", e.target.value)}
                    placeholder="Write about yourself, your family background, hobbies, values, and what you look for in a life partner..."
                    className="min-h-[200px] text-sm font-medium rounded-xl leading-relaxed p-4 resize-none" />
                  <div className="flex items-center justify-between px-1">
                    <p className="text-[11px] text-muted-foreground font-medium">Detailed bios get 3x more responses. Min 50 characters.</p>
                    <span className={`text-[11px] font-bold transition-colors duration-300 ${formData.about.length >= 50 ? "text-green-600" : "text-muted-foreground"}`}>{formData.about.length} chars</span>
                  </div>
                </div>

                <div className="space-y-3 animate-fade-up" style={{ animationDelay: "100ms" }}>
                  <FieldLabel>Mobile Number {phoneVerified && <Badge className="bg-green-500 text-white text-[10px] ml-1">✓ Verified</Badge>}</FieldLabel>
                  <div className="flex gap-2">
                    <div className="flex flex-1">
                      <span className="inline-flex items-center gap-1.5 px-3.5 rounded-l-xl border-2 border-r-0 border-border bg-muted/50 text-muted-foreground font-bold text-sm">
                        <Phone className="w-3.5 h-3.5" /> +91
                      </span>
                      <Input
                        type="tel"
                        inputMode="numeric"
                        placeholder="98765 43210"
                        value={formData.phone}
                        disabled={phoneVerified}
                        onChange={(e) => { updateField("phone", e.target.value.replace(/[^\d\s]/g, "").slice(0, 12)); setOtpSent(false); setOtp(""); setOtpError(""); }}
                        className="h-11 text-sm font-medium rounded-l-none rounded-r-xl border-2 disabled:opacity-60"
                      />
                    </div>
                    {!phoneVerified && (
                      <Button type="button" variant={otpSent ? "outline" : "default"} onClick={handleSendOTP} disabled={otpLoading || formData.phone.replace(/\s/g, "").length < 10}
                        className="rounded-xl h-11 px-4 text-sm font-bold shrink-0">
                        {otpLoading && !otpSent ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}
                        {otpSent ? "Resend" : "Send OTP"}
                      </Button>
                    )}
                  </div>

                  {otpSent && !phoneVerified && (
                    <div className="space-y-2 animate-fade-up">
                      <FieldLabel>Enter OTP</FieldLabel>
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          autoFocus
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                          placeholder="● ● ● ● ● ●"
                          className="h-11 text-center text-lg font-bold tracking-[0.4em] rounded-xl border-2 flex-1"
                        />
                        <Button type="button" onClick={handleVerifyOTP} disabled={otpLoading || otp.length < 6}
                          className="rounded-xl h-11 px-5 text-sm font-bold shrink-0 bg-secondary hover:bg-secondary/90">
                          {otpLoading ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}
                          Verify
                        </Button>
                      </div>
                    </div>
                  )}

                  {otpError && <p className="text-xs font-bold text-destructive px-1">{otpError}</p>}
                  {phoneVerified
                    ? <p className="text-[11px] text-green-600 dark:text-green-400 font-bold px-1">✓ Phone verified successfully</p>
                    : <p className="text-[11px] text-muted-foreground font-medium px-1">Your number stays private. OTP verification is required to complete your profile.</p>
                  }
                  <div id="recaptcha-wizard" />
                </div>

                <Card className="bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20 rounded-xl animate-fade-up" style={{ animationDelay: "200ms" }}>
                  <CardContent className="flex items-center gap-3 py-4">
                    <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0"><CheckCircle2 className="w-5 h-5" /></div>
                    <div>
                      <p className="text-sm font-bold text-green-800 dark:text-green-300">Almost there!</p>
                      <p className="text-xs text-green-700 dark:text-green-400/80 mt-0.5">Submit to unlock photo uploads, partner preferences & matching.</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="flex items-center justify-between py-4">
          <Button variant="ghost" onClick={prevStep} disabled={step === 1}
            className="rounded-xl font-semibold hover:translate-x-[-2px] transition-all duration-200">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          {step < totalSteps ? (
            <Button onClick={nextStep}
              className="rounded-xl font-semibold px-6 shadow-md hover:shadow-lg hover:shadow-primary/20 hover:translate-x-[2px] active:scale-[0.97] transition-all duration-200">
              Continue <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isLoading}
              className="rounded-xl font-semibold px-6 bg-secondary hover:bg-secondary/90 shadow-md hover:shadow-lg hover:shadow-secondary/20 active:scale-[0.97] transition-all duration-200">
              {isLoading && <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />} Complete Profile
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

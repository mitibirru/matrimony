"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  User, Star, Users, Briefcase, MapPin, Camera, ChevronLeft,
  Check, ChevronDown, Search, CalendarIcon, Loader2, Save, ArrowLeft, Plus, Minus, Info
} from "lucide-react";
import PhotoUploader from "@/components/dashboard/PhotoUploader";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// ────── Reusable: Popover Dropdown ──────
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
        <Button variant="outline" role="combobox" className="w-full h-14 justify-between rounded-2xl px-5 text-[15px] font-medium bg-muted/30 border-transparent hover:bg-muted/50 hover:border-border transition-all duration-300">
          <span className={selectedLabel ? "text-foreground" : "text-muted-foreground"}>{selectedLabel || placeholder}</span>
          <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 rounded-2xl border-border/50 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200" align="start">
        {options.length > 4 && (
          <div className="p-3 border-b border-border/40 bg-muted/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input autoFocus placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-11 rounded-xl border-0 bg-muted/50 focus-visible:ring-1 focus-visible:ring-primary/30 text-[15px]" />
            </div>
          </div>
        )}
        <div className="max-h-64 overflow-y-auto p-2 scrollbar-thin">
          {filtered.length === 0 && <p className="text-sm text-muted-foreground text-center py-6">No results found.</p>}
          {filtered.map(opt => (
            <button key={opt.value} onClick={() => { onSelect(opt.value); setOpen(false); setSearch(""); }}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200 ${value === opt.value ? "bg-primary/5 text-primary" : "text-foreground hover:bg-muted/50"}`}>
              <span>{opt.label}</span>
              {value === opt.value && <Check className="w-5 h-5 text-primary animate-in zoom-in" />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ────── Reusable: Chip Selector ──────
function ChipSelector({ options, value, onSelect, descriptions }: { options: string[]; value: string; onSelect: (val: string) => void; descriptions?: Record<string, string> }) {
  const [justSelected, setJustSelected] = useState("");
  const handleSelect = (opt: string) => { onSelect(opt); setJustSelected(opt); setTimeout(() => setJustSelected(""), 300); };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {options.map(opt => (
          <button key={opt} type="button"
            onClick={() => handleSelect(opt)}
            className={`rounded-full h-12 px-6 text-[14px] font-bold transition-all duration-300 flex items-center
              ${value === opt 
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]" 
                : "bg-muted/30 text-foreground hover:bg-muted/60 hover:scale-[1.02]"}
              ${justSelected === opt ? "animate-pop" : ""}`}>
            {value === opt && <Check className="w-4 h-4 mr-2" />}
            {opt}
          </button>
        ))}
      </div>
      {value && descriptions && descriptions[value] && (
        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-500">
          <Info className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <p className="text-[14px] text-foreground/80 leading-relaxed font-medium">{descriptions[value]}</p>
        </div>
      )}
    </div>
  );
}

// ────── Reusable: Field Group ──────
function FieldGroup({ label, children, optional }: { label: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <div className="space-y-3 relative group">
      <Label className="text-[13px] font-bold tracking-wide text-foreground/70 flex items-center group-hover:text-primary transition-colors duration-300">
        {label} {optional && <span className="ml-2 text-[10px] uppercase tracking-widest text-muted-foreground/60 font-semibold bg-muted/50 px-2 py-0.5 rounded-full">Optional</span>}
      </Label>
      {children}
    </div>
  );
}

const RELIGION_OPTIONS = [
  "Hindu", "Muslim", "Christian", "Sikh", "Parsi", "Jain",
  "Buddhist", "Jewish", "No Religion", "Spiritual", "Other"
].map(r => ({ value: r, label: r }));

const MOTHER_TONGUE_OPTIONS = [
  "Aka", "Arabic", "Arunachali", "Assamese", "Awadhi", "Baluchi", "Bengali", "Bhojpuri", "Bhutia", "Brahui", "Brij", "Burmese", "Chattisgarhi", "Chinese", "Coorgi", "Dogri", "English", "French", "Garhwali", "Garo", "Gujarati", "Haryanavi", "Himachali/Pahari", "Hindi", "Hindko", "Kakbarak", "Kanauji", "Kannada", "Kashmiri", "Khandesi", "Khasi", "Konkani", "Koshali", "Kumaoni", "Kutchi", "Ladakhi", "Lepcha", "Magahi", "Maithili", "Malay", "Malayalam", "Manipuri", "Marathi", "Marwari", "Miji", "Mizo", "Monpa", "Nepali", "Odia", "Pashto", "Persian", "Punjabi", "Rajasthani", "Russian", "Sanskrit", "Santhali", "Seraiki", "Sindhi", "Sinhala", "Sourashtra", "Spanish", "Swedish", "Tagalog", "Tamil", "Telugu", "Tulu", "Urdu", "Other"
].map(m => ({ value: m, label: m }));

const COUNTRY_OPTIONS = [
  "India", "USA", "UK", "Canada", "Australia", "Other" // Trimmed for brevity in example
].map(c => ({ value: c, label: c }));

const STATE_OPTIONS = [
  "Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi-NCR", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttaranchal", "West Bengal"
].map(s => ({ value: s, label: s }));

const DIET_DESCRIPTIONS: Record<string, string> = {
  "Vegetarian": "No meat, poultry, fish, or eggs. Dairy is included.",
  "Non-Vegetarian": "Includes meat, poultry, fish, and other animal products.",
  "Occasionally Non-Vegetarian": "Mostly vegetarian, but occasionally eats meat or fish.",
  "Eggetarian": "Vegetarian diet that includes eggs.",
  "Vegan": "No animal products, including dairy, eggs, and honey."
};

const FAMILY_STATUS_DESCRIPTIONS: Record<string, string> = {
  "Middle Class": "Moderate income, fulfilling basic and standard lifestyle needs.",
  "Upper Middle Class": "Comfortable income with higher disposable earnings.",
  "Rich": "High income, affording a luxurious lifestyle.",
  "Affluent": "Very high net worth, generational wealth or highly successful."
};

const FAMILY_VALUES_DESCRIPTIONS: Record<string, string> = {
  "Orthodox": "Strictly adheres to traditional religious and cultural practices.",
  "Moderate": "Balances traditional values with modern perspectives.",
  "Liberal": "Open-minded, modern, and flexible in beliefs and practices."
};

function Counter({ value, onChange, label }: { value: number; onChange: (val: number) => void; label: string }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 border border-border/30 hover:bg-muted/40 transition-colors duration-300">
      <span className="text-[15px] font-semibold text-foreground/80">{label}</span>
      <div className="flex items-center gap-4 bg-background p-1.5 rounded-full shadow-sm border border-border/50">
        <button type="button" className="h-8 w-8 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors disabled:opacity-50" onClick={() => onChange(Math.max(0, value - 1))} disabled={value <= 0}>
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-4 text-center text-[15px] font-bold">{value}</span>
        <button type="button" className="h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 flex items-center justify-center transition-colors" onClick={() => onChange(value + 1)}>
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// ────── Main Component ──────
export default function EditProfileForm({ profile, accessToken }: { profile: Record<string, any>; accessToken: string }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState("basic");

  const [formData, setFormData] = useState({
    profileFor: profile.profileFor || "",
    gender: profile.gender || "",
    dateOfBirth: profile.dateOfBirth || "",
    maritalStatus: profile.maritalStatus || "",
    height: profile.height || 170,
    bodyType: profile.bodyType || "",
    diet: profile.diet || "",
    religion: profile.religion || "",
    community: profile.community || "",
    motherTongue: profile.motherTongue || "",
    caste: profile.caste || "",
    subCaste: profile.subCaste || "",
    gothram: profile.gothram || "",
    manglik: profile.manglik || "",
    rashi: profile.rashi || "",
    nakshatra: profile.nakshatra || "",
    fatherOccupation: profile.fatherOccupation || "",
    motherOccupation: profile.motherOccupation || "",
    brothers: profile.brothers ?? 0,
    brothersMarried: profile.brothersMarried ?? 0,
    sisters: profile.sisters ?? 0,
    sistersMarried: profile.sistersMarried ?? 0,
    familyType: profile.familyType || "",
    familyStatus: profile.familyStatus || "",
    familyValues: profile.familyValues || "",
    familyIncome: profile.familyIncome || "",
    education: profile.education || "",
    educationDetail: profile.educationDetail || "",
    employedIn: profile.employedIn || "",
    profession: profile.profession || "",
    companyName: profile.companyName || "",
    annualIncome: profile.annualIncome || "",
    city: profile.city || "",
    state: profile.state || "",
    country: profile.country || "India",
    nativePlace: profile.nativePlace || "",
    smoking: profile.smoking || "No",
    drinking: profile.drinking || "No",
    about: profile.about || "",
    photos: (profile.photos || []) as string[],
  });

  const [dobDate, setDobDate] = useState<Date | undefined>(
    profile.dateOfBirth ? new Date(profile.dateOfBirth) : undefined
  );

  const update = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSaveMsg(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg(null);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const res = await fetch(`${API_URL}/api/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update");
      setSaveMsg({ type: "success", text: "Profile updated successfully!" });
      router.refresh();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setSaveMsg({ type: "error", text: err.message });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSaving(false);
    }
  };

  const inputCls = "h-14 bg-muted/30 border-transparent hover:bg-muted/50 focus:bg-background focus:ring-2 focus:ring-primary/20 rounded-2xl px-5 text-[15px] font-medium transition-all duration-300";

  const tabs = [
    { id: "basic", label: "Basic Info", icon: User },
    { id: "religion", label: "Religion & Roots", icon: Star },
    { id: "family", label: "Family Details", icon: Users },
    { id: "career", label: "Education & Career", icon: Briefcase },
    { id: "location", label: "Location & Lifestyle", icon: MapPin },
    { id: "about", label: "About & Photos", icon: Camera },
  ];

  return (
    <div className="pb-24 lg:pb-0 animate-in fade-in duration-1000">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative z-10">
        <div>
          <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors mb-4 group">
            <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Back to Profile
          </button>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">Edit Profile</h1>
          <p className="text-lg text-muted-foreground font-medium mt-2">ID: {profile.profileId}</p>
        </div>
        <div className="hidden lg:block">
          <Button onClick={handleSave} disabled={saving} className="rounded-full h-14 font-bold px-8 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-[15px]">
            {saving ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
            Save Changes
          </Button>
        </div>
      </div>

      {/* Save feedback */}
      {saveMsg && (
        <div className={`mb-8 p-5 rounded-2xl text-[15px] font-semibold border flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-500 shadow-sm ${saveMsg.type === "success" ? "bg-green-50/50 text-green-700 border-green-200" : "bg-destructive/5 text-destructive border-destructive/20"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${saveMsg.type === "success" ? "bg-green-100" : "bg-destructive/10"}`}>
            {saveMsg.type === "success" ? <Check className="w-4 h-4" /> : <Info className="w-4 h-4" />}
          </div>
          {saveMsg.text}
        </div>
      )}

      {/* Luxury Layout: Sticky Sidebar + Main Content */}
      <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-start">
        
        {/* Sticky Sidebar Tabs */}
        <div className="w-full lg:w-72 shrink-0 lg:sticky lg:top-8 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
          <div className="flex lg:flex-col gap-2 min-w-max lg:min-w-0 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-[15px] transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-foreground text-background shadow-xl scale-[1.02]"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? "opacity-100" : "opacity-60"}`} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0 w-full">
          <div className="bg-card rounded-[2.5rem] border border-border/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-10 xl:p-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* ──── TAB: Basic Info ──── */}
            {activeTab === "basic" && (
              <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Basic Information</h2>
                  <p className="text-muted-foreground font-medium">Your core personal details.</p>
                </div>
                
                <div className="space-y-8">
                  <FieldGroup label="Profile Creating For">
                    <ChipSelector options={["Self", "Son", "Daughter", "Brother", "Sister", "Relative"]} value={formData.profileFor} onSelect={(v) => update("profileFor", v)} />
                  </FieldGroup>
                  <FieldGroup label="Gender">
                    <ChipSelector options={["Male", "Female"]} value={formData.gender} onSelect={(v) => update("gender", v)} />
                  </FieldGroup>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FieldGroup label="Date of Birth">
                      <Popover><PopoverTrigger asChild>
                        <Button variant="outline" className={`w-full h-14 justify-start rounded-2xl text-[15px] font-medium px-5 bg-muted/30 border-transparent hover:bg-muted/50 transition-colors ${!dobDate ? "text-muted-foreground" : ""}`}>
                          <CalendarIcon className="mr-3 h-5 w-5 opacity-50" />{dobDate ? format(dobDate, "dd MMMM yyyy") : "Select a date"}
                        </Button></PopoverTrigger>
                        <PopoverContent className="w-auto p-0 rounded-2xl border-border/50 shadow-xl" align="start">
                          <Calendar mode="single" selected={dobDate} onSelect={(d) => { setDobDate(d); if (d) update("dateOfBirth", d.toISOString()); }} captionLayout="dropdown" defaultMonth={dobDate || new Date(2000, 0)} startMonth={new Date(1970, 0)} endMonth={new Date(2008, 11)} />
                        </PopoverContent></Popover>
                    </FieldGroup>
                    <FieldGroup label="Height (cm)">
                      <Input type="number" value={formData.height} onChange={(e) => update("height", Number(e.target.value))} className={inputCls} />
                    </FieldGroup>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FieldGroup label="Marital Status">
                      <DropdownPicker value={formData.maritalStatus} onSelect={(v) => update("maritalStatus", v)} placeholder="Select status"
                        options={[{ value: "Never Married", label: "Never Married" }, { value: "Divorced", label: "Divorced" }, { value: "Widowed", label: "Widowed" }, { value: "Awaiting Divorce", label: "Awaiting Divorce" }]} />
                    </FieldGroup>
                    <FieldGroup label="Body Type" optional>
                      <DropdownPicker value={formData.bodyType} onSelect={(v) => update("bodyType", v)} placeholder="Select type"
                        options={[{ value: "Slim", label: "Slim" }, { value: "Average", label: "Average" }, { value: "Athletic", label: "Athletic" }, { value: "Heavy", label: "Heavy" }]} />
                    </FieldGroup>
                  </div>
                  
                  <FieldGroup label="Dietary Preference" optional>
                    <ChipSelector options={["Vegetarian", "Non-Vegetarian", "Occasionally Non-Vegetarian", "Eggetarian", "Vegan"]} value={formData.diet} onSelect={(v) => update("diet", v)} descriptions={DIET_DESCRIPTIONS} />
                  </FieldGroup>
                </div>
              </div>
            )}

            {/* ──── TAB: Religion ──── */}
            {activeTab === "religion" && (
              <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Religion & Roots</h2>
                  <p className="text-muted-foreground font-medium">Your cultural and astrological background.</p>
                </div>
                
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FieldGroup label="Religion">
                      <DropdownPicker value={formData.religion} onSelect={(v) => update("religion", v)} placeholder="Select religion" options={RELIGION_OPTIONS} />
                    </FieldGroup>
                    <FieldGroup label="Mother Tongue">
                      <DropdownPicker value={formData.motherTongue} onSelect={(v) => update("motherTongue", v)} placeholder="Select language" options={MOTHER_TONGUE_OPTIONS} />
                    </FieldGroup>
                  </div>
                  <FieldGroup label="Community"><Input placeholder="e.g. Telugu, Marathi" value={formData.community} onChange={(e) => update("community", e.target.value)} className={inputCls} /></FieldGroup>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FieldGroup label="Caste" optional><Input value={formData.caste} onChange={(e) => update("caste", e.target.value)} className={inputCls} /></FieldGroup>
                    <FieldGroup label="Sub-Caste" optional><Input value={formData.subCaste} onChange={(e) => update("subCaste", e.target.value)} className={inputCls} /></FieldGroup>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FieldGroup label="Gothram" optional><Input value={formData.gothram} onChange={(e) => update("gothram", e.target.value)} className={inputCls} /></FieldGroup>
                    <FieldGroup label="Manglik" optional>
                      <ChipSelector options={["Yes", "No", "Don't Know"]} value={formData.manglik} onSelect={(v) => update("manglik", v)} />
                    </FieldGroup>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FieldGroup label="Rashi" optional><Input placeholder="e.g. Mesha" value={formData.rashi} onChange={(e) => update("rashi", e.target.value)} className={inputCls} /></FieldGroup>
                    <FieldGroup label="Nakshatra" optional><Input placeholder="e.g. Ashwini" value={formData.nakshatra} onChange={(e) => update("nakshatra", e.target.value)} className={inputCls} /></FieldGroup>
                  </div>
                </div>
              </div>
            )}

            {/* ──── TAB: Family ──── */}
            {activeTab === "family" && (
              <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Family Details</h2>
                  <p className="text-muted-foreground font-medium">Tell us about your family background.</p>
                </div>
                
                <div className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FieldGroup label="Father's Occupation"><Input placeholder="e.g. Business, Govt Job" value={formData.fatherOccupation} onChange={(e) => update("fatherOccupation", e.target.value)} className={inputCls} /></FieldGroup>
                    <FieldGroup label="Mother's Occupation"><Input placeholder="e.g. Homemaker, Teacher" value={formData.motherOccupation} onChange={(e) => update("motherOccupation", e.target.value)} className={inputCls} /></FieldGroup>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-[13px] font-bold tracking-wide text-foreground/70 uppercase">Siblings</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4 p-6 rounded-3xl border border-border/40 bg-muted/10">
                        <h4 className="text-[15px] font-bold text-foreground">Brothers</h4>
                        <Counter label="Total Brothers" value={formData.brothers} onChange={(v) => update("brothers", v)} />
                        <Counter label="Married Brothers" value={formData.brothersMarried} onChange={(v) => update("brothersMarried", Math.min(formData.brothers, v))} />
                      </div>
                      <div className="space-y-4 p-6 rounded-3xl border border-border/40 bg-muted/10">
                        <h4 className="text-[15px] font-bold text-foreground">Sisters</h4>
                        <Counter label="Total Sisters" value={formData.sisters} onChange={(v) => update("sisters", v)} />
                        <Counter label="Married Sisters" value={formData.sistersMarried} onChange={(v) => update("sistersMarried", Math.min(formData.sisters, v))} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 pt-4">
                    <Label className="text-[13px] font-bold tracking-wide text-foreground/70 uppercase border-b border-border/50 pb-2 w-full block">Family Lifestyle</Label>
                    <FieldGroup label="Family Type"><ChipSelector options={["Nuclear", "Joint", "Extended"]} value={formData.familyType} onSelect={(v) => update("familyType", v)} /></FieldGroup>
                    <FieldGroup label="Family Status"><ChipSelector options={["Middle Class", "Upper Middle Class", "Rich", "Affluent"]} value={formData.familyStatus} onSelect={(v) => update("familyStatus", v)} descriptions={FAMILY_STATUS_DESCRIPTIONS} /></FieldGroup>
                    <FieldGroup label="Family Values"><ChipSelector options={["Orthodox", "Moderate", "Liberal"]} value={formData.familyValues} onSelect={(v) => update("familyValues", v)} descriptions={FAMILY_VALUES_DESCRIPTIONS} /></FieldGroup>
                    <div className="max-w-md">
                      <FieldGroup label="Family Income" optional>
                        <DropdownPicker value={formData.familyIncome} onSelect={(v) => update("familyIncome", v)} placeholder="Select family income"
                          options={[
                            "Under 1 Lakh", "1-3 Lakhs", "3-5 Lakhs", "5-7 Lakhs", "7-10 Lakhs",
                            "10-15 Lakhs", "15-20 Lakhs", "20-30 Lakhs", "30-50 Lakhs",
                            "50 Lakhs - 1 Crore", "1 Crore & Above"
                          ].map(i => ({ value: i, label: i }))} />
                      </FieldGroup>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ──── TAB: Career ──── */}
            {activeTab === "career" && (
              <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Education & Career</h2>
                  <p className="text-muted-foreground font-medium">Your professional achievements.</p>
                </div>
                
                <div className="space-y-8">
                  <FieldGroup label="Highest Education">
                    <DropdownPicker value={formData.education} onSelect={(v) => update("education", v)} placeholder="Select"
                      options={[{ value: "High School", label: "High School" }, { value: "Diploma", label: "Diploma" }, { value: "Bachelors", label: "Bachelors" }, { value: "Masters", label: "Masters" }, { value: "Doctorate", label: "Doctorate (PhD)" }, { value: "Other", label: "Other" }]} />
                  </FieldGroup>
                  <FieldGroup label="Education Details" optional><Input placeholder="e.g. B.Tech in CSE from IIT Hyderabad" value={formData.educationDetail} onChange={(e) => update("educationDetail", e.target.value)} className={inputCls} /></FieldGroup>
                  <FieldGroup label="Employed In">
                    <ChipSelector options={["Private", "Government", "Business", "Self-Employed", "Not Working"]} value={formData.employedIn} onSelect={(v) => update("employedIn", v)} />
                  </FieldGroup>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FieldGroup label="Profession"><Input placeholder="e.g. Software Engineer" value={formData.profession} onChange={(e) => update("profession", e.target.value)} className={inputCls} /></FieldGroup>
                    <FieldGroup label="Company Name" optional><Input placeholder="e.g. Google, TCS" value={formData.companyName} onChange={(e) => update("companyName", e.target.value)} className={inputCls} /></FieldGroup>
                  </div>
                  <FieldGroup label="Annual Income" optional>
                    <DropdownPicker value={formData.annualIncome} onSelect={(v) => update("annualIncome", v)} placeholder="Select range"
                      options={[{ value: "Below 3 LPA", label: "Below 3 LPA" }, { value: "3-5 LPA", label: "3 - 5 LPA" }, { value: "5-10 LPA", label: "5 - 10 LPA" }, { value: "10-20 LPA", label: "10 - 20 LPA" }, { value: "20-50 LPA", label: "20 - 50 LPA" }, { value: "50+ LPA", label: "50+ LPA" }]} />
                  </FieldGroup>
                </div>
              </div>
            )}

            {/* ──── TAB: Location ──── */}
            {activeTab === "location" && (
              <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Location & Lifestyle</h2>
                  <p className="text-muted-foreground font-medium">Where you are and how you live.</p>
                </div>
                
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FieldGroup label="City"><Input placeholder="e.g. Hyderabad" value={formData.city} onChange={(e) => update("city", e.target.value)} className={inputCls} /></FieldGroup>
                    <FieldGroup label="State">
                      <DropdownPicker value={formData.state} onSelect={(v) => update("state", v)} placeholder="Select state" options={STATE_OPTIONS} />
                    </FieldGroup>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FieldGroup label="Country">
                      <Input value="India" disabled className={`${inputCls} bg-muted/50 cursor-not-allowed opacity-70`} />
                    </FieldGroup>
                    <FieldGroup label="Native Place" optional><Input placeholder="e.g. Guntur, AP" value={formData.nativePlace} onChange={(e) => update("nativePlace", e.target.value)} className={inputCls} /></FieldGroup>
                  </div>
                  
                  <div className="space-y-8 pt-4">
                    <FieldGroup label="Smoking"><ChipSelector options={["No", "Occasionally", "Yes"]} value={formData.smoking} onSelect={(v) => update("smoking", v)} /></FieldGroup>
                    <FieldGroup label="Drinking"><ChipSelector options={["No", "Occasionally", "Yes"]} value={formData.drinking} onSelect={(v) => update("drinking", v)} /></FieldGroup>
                  </div>
                </div>
              </div>
            )}

            {/* ──── TAB: About & Photos ──── */}
            {activeTab === "about" && (
              <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">About & Photos</h2>
                  <p className="text-muted-foreground font-medium">Make your profile stand out.</p>
                </div>
                
                <div className="space-y-12">
                  <FieldGroup label="About Me">
                    <div className="relative">
                      <Textarea value={formData.about} onChange={(e) => update("about", e.target.value)}
                        placeholder="Write an engaging bio about your personality, hobbies, and what you're looking for..."
                        className="min-h-[220px] text-[15px] font-medium rounded-3xl bg-muted/20 border-border/50 hover:border-primary/30 focus-visible:ring-2 focus-visible:ring-primary/20 leading-relaxed p-6 resize-none transition-all duration-300" />
                    </div>
                  </FieldGroup>

                  <div className="pt-4 border-t border-border/40">
                    <FieldGroup label="Photo Gallery">
                      <p className="text-sm text-muted-foreground mb-4">Upload up to 6 high-quality photos. The first photo will be your primary avatar.</p>
                      <PhotoUploader
                        photos={formData.photos || []}
                        onPhotosChange={(newPhotos) => update("photos", newPhotos)}
                      />
                    </FieldGroup>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Floating Action Bar (Mobile only, desktop has top right button) */}
      <div className="lg:hidden fixed bottom-6 inset-x-0 flex justify-center z-50 px-4 pointer-events-none">
        <div className="bg-background/80 backdrop-blur-xl border border-border/50 shadow-2xl p-2 rounded-full pointer-events-auto flex items-center gap-2 animate-in slide-in-from-bottom-10">
          <Button onClick={handleSave} disabled={saving} className="rounded-full font-bold px-8 shadow-md active:scale-95 transition-all h-14 text-[15px] w-[80vw]">
            {saving ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

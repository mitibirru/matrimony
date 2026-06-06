"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  User, Star, Users, Briefcase, MapPin, Camera, ChevronLeft,
  Check, ChevronDown, Search, CalendarIcon, Loader2, Save, ArrowLeft, Plus, Minus, Info
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
        <Button variant="outline" role="combobox" className="w-full h-11 justify-between rounded-xl px-4 text-sm font-medium border hover:border-primary/50 hover:shadow-sm transition-all duration-200">
          <span className={selectedLabel ? "text-foreground" : "text-muted-foreground"}>{selectedLabel || placeholder}</span>
          <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 rounded-xl animate-scale-in" align="start">
        {options.length > 4 && (
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input autoFocus placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8 h-9 rounded-lg border-0 bg-muted/50 focus-visible:ring-0 text-sm" />
            </div>
          </div>
        )}
        <div className="max-h-52 overflow-y-auto p-1.5 dropdown-stagger">
          {filtered.length === 0 && <p className="text-sm text-muted-foreground text-center py-3">No results</p>}
          {filtered.map(opt => (
            <button key={opt.value} onClick={() => { onSelect(opt.value); setOpen(false); setSearch(""); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${value === opt.value ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted hover:translate-x-0.5"}`}>
              <span>{opt.label}</span>
              {value === opt.value && <Check className="w-4 h-4 text-primary animate-check-pop" />}
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
  const handleSelect = (opt: string) => { onSelect(opt); setJustSelected(opt); setTimeout(() => setJustSelected(""), 250); };

  return (
    <div className="space-y-3">
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
      {value && descriptions && descriptions[value] && (
        <div className="p-3 rounded-xl bg-muted/40 border border-border/50 flex items-start gap-2.5 animate-fade-in shadow-sm">
          <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground leading-relaxed">{descriptions[value]}</p>
        </div>
      )}
    </div>
  );
}

// ────── Reusable: Field Group ──────
function FieldGroup({ label, children, optional }: { label: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label} {optional && <Badge variant="outline" className="ml-1.5 text-[10px] rounded-md">Optional</Badge>}
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
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua & Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Congo (DRC)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts & Nevis", "Saint Lucia", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "USA", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
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
    <div className="flex items-center justify-between p-2.5 rounded-xl border border-input/50 bg-background/50">
      <span className="text-sm font-medium text-muted-foreground ml-1">{label}</span>
      <div className="flex items-center gap-3">
        <Button type="button" variant="outline" size="icon" className="h-7 w-7 rounded-full bg-background border-primary/20 hover:border-primary/50" onClick={() => onChange(Math.max(0, value - 1))} disabled={value <= 0}>
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-4 text-center text-sm font-bold">{value}</span>
        <Button type="button" variant="outline" size="icon" className="h-7 w-7 rounded-full bg-background border-primary/20 hover:border-primary/50" onClick={() => onChange(value + 1)}>
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

// ────── Main Component ──────
export default function EditProfileForm({ profile, accessToken }: { profile: Record<string, any>; accessToken: string }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    // Basic
    profileFor: profile.profileFor || "",
    gender: profile.gender || "",
    dateOfBirth: profile.dateOfBirth || "",
    maritalStatus: profile.maritalStatus || "",
    height: profile.height || 170,
    bodyType: profile.bodyType || "",
    diet: profile.diet || "",
    // Religion
    religion: profile.religion || "",
    community: profile.community || "",
    motherTongue: profile.motherTongue || "",
    caste: profile.caste || "",
    subCaste: profile.subCaste || "",
    gothram: profile.gothram || "",
    manglik: profile.manglik || "",
    rashi: profile.rashi || "",
    nakshatra: profile.nakshatra || "",
    // Family
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
    // Career
    education: profile.education || "",
    educationDetail: profile.educationDetail || "",
    employedIn: profile.employedIn || "",
    profession: profile.profession || "",
    companyName: profile.companyName || "",
    annualIncome: profile.annualIncome || "",
    // Location
    city: profile.city || "",
    state: profile.state || "",
    country: profile.country || "India",
    nativePlace: profile.nativePlace || "",
    smoking: profile.smoking || "No",
    drinking: profile.drinking || "No",
    // About
    about: profile.about || "",
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
    } catch (err: any) {
      setSaveMsg({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const inputCls = "h-11 text-sm font-medium rounded-xl";

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">Edit Profile</h1>
            <p className="text-xs text-muted-foreground font-medium">ID: {profile.profileId}</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving} className="rounded-xl font-semibold px-5 shadow-md active:scale-[0.98] transition-all">
          {saving ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Save className="w-4 h-4 mr-1.5" />}
          Save Changes
        </Button>
      </div>

      {/* Save feedback */}
      {saveMsg && (
        <div className={`mb-4 p-3 rounded-xl text-sm font-semibold border ${saveMsg.type === "success" ? "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20" : "bg-destructive/10 text-destructive border-destructive/20"}`}>
          {saveMsg.text}
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="basic" className="gap-4">
        <TabsList className="w-full justify-start overflow-x-auto flex-nowrap bg-card border border-border rounded-xl p-1 h-auto">
          <TabsTrigger value="basic" className="rounded-lg gap-1.5 text-xs sm:text-sm px-3 py-2"><User className="w-4 h-4" /> Basic</TabsTrigger>
          <TabsTrigger value="religion" className="rounded-lg gap-1.5 text-xs sm:text-sm px-3 py-2"><Star className="w-4 h-4" /> Religion</TabsTrigger>
          <TabsTrigger value="family" className="rounded-lg gap-1.5 text-xs sm:text-sm px-3 py-2"><Users className="w-4 h-4" /> Family</TabsTrigger>
          <TabsTrigger value="career" className="rounded-lg gap-1.5 text-xs sm:text-sm px-3 py-2"><Briefcase className="w-4 h-4" /> Career</TabsTrigger>
          <TabsTrigger value="location" className="rounded-lg gap-1.5 text-xs sm:text-sm px-3 py-2"><MapPin className="w-4 h-4" /> Location</TabsTrigger>
          <TabsTrigger value="about" className="rounded-lg gap-1.5 text-xs sm:text-sm px-3 py-2"><Camera className="w-4 h-4" /> About</TabsTrigger>
        </TabsList>

        {/* ──── TAB: Basic Info ──── */}
        <TabsContent value="basic">
          <Card className="rounded-2xl shadow-sm animate-fade-up">
            <CardHeader className="py-5"><CardTitle className="text-base font-bold">Basic Information</CardTitle><CardDescription className="text-sm">Your personal details</CardDescription></CardHeader>
            <Separator />
            <CardContent className="pt-6 space-y-5">
              <FieldGroup label="Profile For">
                <ChipSelector options={["Self", "Son", "Daughter", "Brother", "Sister", "Relative"]} value={formData.profileFor} onSelect={(v) => update("profileFor", v)} />
              </FieldGroup>
              <FieldGroup label="Gender">
                <ChipSelector options={["Male", "Female"]} value={formData.gender} onSelect={(v) => update("gender", v)} />
              </FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldGroup label="Date of Birth">
                  <Popover><PopoverTrigger asChild>
                    <Button variant="outline" className={`w-full h-11 justify-start rounded-xl text-sm font-medium px-4 ${!dobDate ? "text-muted-foreground" : ""}`}>
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />{dobDate ? format(dobDate, "dd MMM yyyy") : "Pick a date"}
                    </Button></PopoverTrigger>
                    <PopoverContent className="w-auto p-0 rounded-xl" align="start">
                      <Calendar mode="single" selected={dobDate} onSelect={(d) => { setDobDate(d); if (d) update("dateOfBirth", d.toISOString()); }} captionLayout="dropdown" defaultMonth={dobDate || new Date(2000, 0)} startMonth={new Date(1970, 0)} endMonth={new Date(2008, 11)} />
                    </PopoverContent></Popover>
                </FieldGroup>
                <FieldGroup label="Height (cm)">
                  <Input type="number" value={formData.height} onChange={(e) => update("height", Number(e.target.value))} className={inputCls} />
                </FieldGroup>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldGroup label="Marital Status">
                  <DropdownPicker value={formData.maritalStatus} onSelect={(v) => update("maritalStatus", v)} placeholder="Select"
                    options={[{ value: "Never Married", label: "Never Married" }, { value: "Divorced", label: "Divorced" }, { value: "Widowed", label: "Widowed" }, { value: "Awaiting Divorce", label: "Awaiting Divorce" }]} />
                </FieldGroup>
                <FieldGroup label="Body Type" optional>
                  <ChipSelector options={["Slim", "Average", "Athletic", "Heavy"]} value={formData.bodyType} onSelect={(v) => update("bodyType", v)} />
                </FieldGroup>
              </div>
              <FieldGroup label="Diet" optional>
                <ChipSelector options={["Vegetarian", "Non-Vegetarian", "Occasionally Non-Vegetarian", "Eggetarian", "Vegan"]} value={formData.diet} onSelect={(v) => update("diet", v)} descriptions={DIET_DESCRIPTIONS} />
              </FieldGroup>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ──── TAB: Religion ──── */}
        <TabsContent value="religion">
          <Card className="rounded-2xl shadow-sm animate-fade-up">
            <CardHeader className="py-5"><CardTitle className="text-base font-bold">Religion & Community</CardTitle><CardDescription className="text-sm">Your cultural background</CardDescription></CardHeader>
            <Separator />
            <CardContent className="pt-6 space-y-5">
              <FieldGroup label="Religion">
                <DropdownPicker value={formData.religion} onSelect={(v) => update("religion", v)} placeholder="Select religion" options={RELIGION_OPTIONS} />
              </FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldGroup label="Community"><Input placeholder="e.g. Telugu, Marathi" value={formData.community} onChange={(e) => update("community", e.target.value)} className={inputCls} /></FieldGroup>
                <FieldGroup label="Mother Tongue">
                  <DropdownPicker value={formData.motherTongue} onSelect={(v) => update("motherTongue", v)} placeholder="Select language" options={MOTHER_TONGUE_OPTIONS} />
                </FieldGroup>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldGroup label="Caste" optional><Input value={formData.caste} onChange={(e) => update("caste", e.target.value)} className={inputCls} /></FieldGroup>
                <FieldGroup label="Sub-Caste" optional><Input value={formData.subCaste} onChange={(e) => update("subCaste", e.target.value)} className={inputCls} /></FieldGroup>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldGroup label="Gothram" optional><Input value={formData.gothram} onChange={(e) => update("gothram", e.target.value)} className={inputCls} /></FieldGroup>
                <FieldGroup label="Manglik" optional>
                  <ChipSelector options={["Yes", "No", "Don't Know"]} value={formData.manglik} onSelect={(v) => update("manglik", v)} />
                </FieldGroup>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldGroup label="Rashi" optional><Input placeholder="e.g. Mesha" value={formData.rashi} onChange={(e) => update("rashi", e.target.value)} className={inputCls} /></FieldGroup>
                <FieldGroup label="Nakshatra" optional><Input placeholder="e.g. Ashwini" value={formData.nakshatra} onChange={(e) => update("nakshatra", e.target.value)} className={inputCls} /></FieldGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ──── TAB: Family ──── */}
        <TabsContent value="family">
          <Card className="rounded-2xl shadow-sm animate-fade-up">
            <CardHeader className="py-5"><CardTitle className="text-base font-bold">Family Details</CardTitle><CardDescription className="text-sm">Tell us about your family</CardDescription></CardHeader>
            <Separator />
            <CardContent className="pt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldGroup label="Father's Occupation"><Input placeholder="e.g. Business, Govt Job" value={formData.fatherOccupation} onChange={(e) => update("fatherOccupation", e.target.value)} className={inputCls} /></FieldGroup>
                <FieldGroup label="Mother's Occupation"><Input placeholder="e.g. Homemaker, Teacher" value={formData.motherOccupation} onChange={(e) => update("motherOccupation", e.target.value)} className={inputCls} /></FieldGroup>
              </div>

              <div className="space-y-4 pt-2">
                <Label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Siblings</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 rounded-2xl border border-border/50 bg-muted/10">
                  {/* Brothers */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold flex items-center gap-2 text-blue-500/80"><Users className="w-4 h-4" /> Brothers</h4>
                    <div className="space-y-2">
                      <Counter label="Total Brothers" value={formData.brothers} onChange={(v) => update("brothers", v)} />
                      <Counter label="Married Brothers" value={formData.brothersMarried} onChange={(v) => update("brothersMarried", Math.min(formData.brothers, v))} />
                    </div>
                  </div>
                  {/* Sisters */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold flex items-center gap-2 text-pink-500/80"><Users className="w-4 h-4" /> Sisters</h4>
                    <div className="space-y-2">
                      <Counter label="Total Sisters" value={formData.sisters} onChange={(v) => update("sisters", v)} />
                      <Counter label="Married Sisters" value={formData.sistersMarried} onChange={(v) => update("sistersMarried", Math.min(formData.sisters, v))} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <Label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Family Background</Label>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8 p-5 rounded-2xl border border-border/50 bg-muted/10">
                  <div className="space-y-6">
                    <FieldGroup label="Family Type"><ChipSelector options={["Nuclear", "Joint", "Extended"]} value={formData.familyType} onSelect={(v) => update("familyType", v)} /></FieldGroup>
                    <FieldGroup label="Family Status"><ChipSelector options={["Middle Class", "Upper Middle Class", "Rich", "Affluent"]} value={formData.familyStatus} onSelect={(v) => update("familyStatus", v)} descriptions={FAMILY_STATUS_DESCRIPTIONS} /></FieldGroup>
                  </div>
                  <div className="space-y-6">
                    <FieldGroup label="Family Values"><ChipSelector options={["Orthodox", "Moderate", "Liberal"]} value={formData.familyValues} onSelect={(v) => update("familyValues", v)} descriptions={FAMILY_VALUES_DESCRIPTIONS} /></FieldGroup>
                    <FieldGroup label="Family Income (Optional)">
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
            </CardContent>
          </Card>
        </TabsContent>

        {/* ──── TAB: Career ──── */}
        <TabsContent value="career">
          <Card className="rounded-2xl shadow-sm animate-fade-up">
            <CardHeader className="py-5"><CardTitle className="text-base font-bold">Education & Career</CardTitle><CardDescription className="text-sm">Your professional background</CardDescription></CardHeader>
            <Separator />
            <CardContent className="pt-6 space-y-5">
              <FieldGroup label="Highest Education">
                <DropdownPicker value={formData.education} onSelect={(v) => update("education", v)} placeholder="Select"
                  options={[{ value: "High School", label: "High School" }, { value: "Diploma", label: "Diploma" }, { value: "Bachelors", label: "Bachelors" }, { value: "Masters", label: "Masters" }, { value: "Doctorate", label: "Doctorate (PhD)" }, { value: "Other", label: "Other" }]} />
              </FieldGroup>
              <FieldGroup label="Education Details" optional><Input placeholder="e.g. B.Tech in CSE from IIT Hyderabad" value={formData.educationDetail} onChange={(e) => update("educationDetail", e.target.value)} className={inputCls} /></FieldGroup>
              <FieldGroup label="Employed In">
                <ChipSelector options={["Private", "Government", "Business", "Self-Employed", "Not Working"]} value={formData.employedIn} onSelect={(v) => update("employedIn", v)} />
              </FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldGroup label="Profession"><Input placeholder="e.g. Software Engineer" value={formData.profession} onChange={(e) => update("profession", e.target.value)} className={inputCls} /></FieldGroup>
                <FieldGroup label="Company Name" optional><Input placeholder="e.g. Google, TCS" value={formData.companyName} onChange={(e) => update("companyName", e.target.value)} className={inputCls} /></FieldGroup>
              </div>
              <FieldGroup label="Annual Income" optional>
                <DropdownPicker value={formData.annualIncome} onSelect={(v) => update("annualIncome", v)} placeholder="Select range"
                  options={[{ value: "Below 3 LPA", label: "Below 3 LPA" }, { value: "3-5 LPA", label: "3 - 5 LPA" }, { value: "5-10 LPA", label: "5 - 10 LPA" }, { value: "10-20 LPA", label: "10 - 20 LPA" }, { value: "20-50 LPA", label: "20 - 50 LPA" }, { value: "50+ LPA", label: "50+ LPA" }]} />
              </FieldGroup>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ──── TAB: Location ──── */}
        <TabsContent value="location">
          <Card className="rounded-2xl shadow-sm animate-fade-up">
            <CardHeader className="py-5"><CardTitle className="text-base font-bold">Location & Lifestyle</CardTitle><CardDescription className="text-sm">Where you live and your habits</CardDescription></CardHeader>
            <Separator />
            <CardContent className="pt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldGroup label="City"><Input placeholder="e.g. Hyderabad" value={formData.city} onChange={(e) => update("city", e.target.value)} className={inputCls} /></FieldGroup>
                <FieldGroup label="State">
                  <DropdownPicker value={formData.state} onSelect={(v) => update("state", v)} placeholder="Select state" options={STATE_OPTIONS} />
                </FieldGroup>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldGroup label="Country">
                  <Input value="India" disabled className={`${inputCls} bg-muted/50 cursor-not-allowed`} />
                </FieldGroup>
                <FieldGroup label="Native Place" optional><Input placeholder="e.g. Guntur, AP" value={formData.nativePlace} onChange={(e) => update("nativePlace", e.target.value)} className={inputCls} /></FieldGroup>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldGroup label="Smoking"><ChipSelector options={["No", "Occasionally", "Yes"]} value={formData.smoking} onSelect={(v) => update("smoking", v)} /></FieldGroup>
                <FieldGroup label="Drinking"><ChipSelector options={["No", "Occasionally", "Yes"]} value={formData.drinking} onSelect={(v) => update("drinking", v)} /></FieldGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ──── TAB: About & Photos ──── */}
        <TabsContent value="about">
          <Card className="rounded-2xl shadow-sm animate-fade-up">
            <CardHeader className="py-5"><CardTitle className="text-base font-bold">About & Photos</CardTitle><CardDescription className="text-sm">Your bio and profile photos</CardDescription></CardHeader>
            <Separator />
            <CardContent className="pt-6 space-y-5">
              <FieldGroup label="About Me">
                <Textarea value={formData.about} onChange={(e) => update("about", e.target.value)}
                  placeholder="Write about yourself, your family, hobbies, and what you look for in a partner..."
                  className="min-h-[180px] text-sm font-medium rounded-xl leading-relaxed p-4 resize-none" />
                <p className="text-[11px] text-muted-foreground font-medium px-1">Tip: Detailed bios get 3x more responses.</p>
              </FieldGroup>

              <Separator />

              {/* Photos placeholder */}
              <FieldGroup label="Photos">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-square rounded-xl border-2 border-dashed border-border bg-muted/30 flex items-center justify-center cursor-pointer hover:border-primary/30 hover:bg-muted/50 transition-colors">
                      <div className="text-center">
                        <Camera className="w-6 h-6 text-muted-foreground/40 mx-auto mb-1" />
                        <span className="text-[10px] text-muted-foreground font-semibold">{i === 0 ? "Primary" : `Photo ${i + 1}`}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-muted-foreground font-medium px-1">Photo upload coming soon. You&apos;ll be notified when it&apos;s ready.</p>
              </FieldGroup>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bottom save bar (mobile) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border z-40">
        <Button onClick={handleSave} disabled={saving} className="w-full rounded-xl font-semibold shadow-md active:scale-[0.98] transition-all">
          {saving ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Save className="w-4 h-4 mr-1.5" />}
          Save Changes
        </Button>
      </div>
    </div>
  );
}

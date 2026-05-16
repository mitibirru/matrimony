"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
  ChevronRight, ChevronLeft, Loader2, CheckCircle2,
  Heart, Star, Briefcase, PenLine, ChevronDown, Check,
  Search, CalendarIcon, Sparkles, Rocket, PartyPopper,
  User, MapPin, GraduationCap, Building2, IndianRupee,
  Zap, ArrowRight, Shield
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// ────── Animated Floating Shapes Background ──────
function FloatingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-[0.04] dark:opacity-[0.06]"
          style={{
            width: 200 + i * 80,
            height: 200 + i * 80,
            background: i % 2 === 0
              ? "var(--primary)"
              : "var(--secondary)",
            left: `${10 + (i * 15) % 70}%`,
            top: `${5 + (i * 20) % 60}%`,
          }}
          animate={{
            y: [0, -30, 0, 30, 0],
            x: [0, 20, 0, -20, 0],
            scale: [1, 1.05, 1, 0.95, 1],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ────── Confetti Burst ──────
function ConfettiBurst() {
  const colors = ["#390099", "#ff0054", "#ffbd00", "#9d4edd", "#ade8f4", "#ff6b6b"];
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-sm"
          style={{
            width: 8 + Math.random() * 8,
            height: 8 + Math.random() * 8,
            backgroundColor: colors[i % colors.length],
            left: `${40 + Math.random() * 20}%`,
            top: "40%",
          }}
          initial={{ opacity: 1, scale: 0 }}
          animate={{
            opacity: [1, 1, 0],
            scale: [0, 1, 0.5],
            x: (Math.random() - 0.5) * 600,
            y: (Math.random() - 0.5) * 600,
            rotate: Math.random() * 720,
          }}
          transition={{
            duration: 1.5 + Math.random(),
            ease: "easeOut",
            delay: Math.random() * 0.3,
          }}
        />
      ))}
    </div>
  );
}

// ────── Animated Chip Selector ──────
function AnimatedChipSelector({ options, value, onSelect, icons }: {
  options: string[];
  value: string;
  onSelect: (val: string) => void;
  icons?: Record<string, React.ReactNode>;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt, i) => (
        <motion.button
          key={opt}
          type="button"
          onClick={() => onSelect(opt)}
          className={`relative flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition-colors border-2 ${
            value === opt
              ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
              : "bg-card text-foreground border-border hover:border-primary/40"
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          {icons?.[opt] && <span className="text-base">{icons[opt]}</span>}
          {opt}
          {value === opt && (
            <motion.div
              layoutId="chip-check"
              className="ml-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <Check className="w-4 h-4" />
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  );
}

// ────── Animated Dropdown ──────
function AnimatedDropdown({
  value,
  options,
  onSelect,
  placeholder = "Select...",
}: {
  value: string;
  options: { value: string; label: string }[];
  onSelect: (val: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()));
  const selectedLabel = options.find(o => o.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <motion.button
          type="button"
          className="w-full flex items-center justify-between h-12 px-4 rounded-2xl border-2 border-border bg-card text-sm font-semibold hover:border-primary/40 transition-colors"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <span className={selectedLabel ? "text-foreground" : "text-muted-foreground"}>
            {selectedLabel || placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </motion.button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 rounded-2xl shadow-xl border-2" align="start">
        {options.length > 5 && (
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                autoFocus
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-10 rounded-xl border-0 bg-muted/50 focus-visible:ring-0 text-sm font-medium"
              />
            </div>
          </div>
        )}
        <div className="max-h-56 overflow-y-auto p-1.5">
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">No results found</p>
          )}
          {filtered.map((opt, i) => (
            <motion.button
              key={opt.value}
              onClick={() => { onSelect(opt.value); setOpen(false); setSearch(""); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                value === opt.value
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-muted"
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.02 }}
            >
              <span>{opt.label}</span>
              {value === opt.value && <Check className="w-4 h-4 text-primary" />}
            </motion.button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ────── Step Progress Ring ──────
function StepProgressRing({ step, total }: { step: number; total: number }) {
  const progress = step / total;
  const circumference = 2 * Math.PI * 38;
  const offset = circumference * (1 - progress);

  return (
    <div className="relative w-20 h-20">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="38" fill="none" stroke="currentColor" strokeWidth="3" className="text-border" />
        <motion.circle
          cx="40" cy="40" r="38"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--secondary)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-black text-foreground">{step}/{total}</span>
      </div>
    </div>
  );
}

// ────── Animated Field Wrapper ──────
function Field({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="space-y-2.5"
    >
      {children}
    </motion.div>
  );
}

// ────── Step Transition Variants ──────
const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.97,
  }),
};

// ────── Main Wizard ──────
export default function ProfileWizard({ userId }: { userId: string }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [dobDate, setDobDate] = useState<Date | undefined>(undefined);
  const [showConfetti, setShowConfetti] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    gender: "",
    dateOfBirth: "",
    maritalStatus: "",
    height: 170,
    religion: "",
    community: "",
    motherTongue: "Telugu",
    caste: "",
    gothram: "",
    manglik: "No",
    city: "",
    state: "",
    country: "India",
    education: "",
    profession: "",
    annualIncome: "",
    about: "",
  });

  const updateField = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const totalSteps = 4;

  const stepConfig = [
    {
      icon: Heart,
      emoji: "💫",
      label: "Personal",
      title: "Let's start with the basics",
      desc: "A few quick details about you",
      gradient: "from-violet-500/10 via-fuchsia-500/5 to-transparent",
    },
    {
      icon: Star,
      emoji: "🪷",
      label: "Background",
      title: "Your roots matter",
      desc: "Shared values build the strongest bonds",
      gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
    },
    {
      icon: Briefcase,
      emoji: "🚀",
      label: "Career & Location",
      title: "Where you are in life",
      desc: "Your profession and current location",
      gradient: "from-blue-500/10 via-cyan-500/5 to-transparent",
    },
    {
      icon: PenLine,
      emoji: "✨",
      label: "Your Story",
      title: "Let your personality shine",
      desc: "This is your chance to stand out",
      gradient: "from-rose-500/10 via-pink-500/5 to-transparent",
    },
  ];

  const cur = stepConfig[step - 1];

  const filledCount = () => {
    const fields = [
      formData.gender, formData.dateOfBirth, formData.maritalStatus,
      formData.religion, formData.community,
      formData.education, formData.profession, formData.city,
      formData.about,
    ];
    return fields.filter(Boolean).length;
  };

  const nextStep = () => {
    if (step === 1 && (!formData.gender || !formData.dateOfBirth || !formData.maritalStatus)) {
      setError("Fill out all fields to continue"); return;
    }
    if (step === 2 && (!formData.religion || !formData.community)) {
      setError("Religion and Community are required"); return;
    }
    setError("");
    setDirection(1);
    setStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setError("");
    setDirection(-1);
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!formData.about) { setError("Please write a short bio to continue"); return; }
    setIsLoading(true); setError("");
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create profile");
      setShowConfetti(true);
      setSubmitted(true);
      setTimeout(() => router.refresh(), 2500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally { setIsLoading(false); }
  };

  // Success screen
  if (submitted) {
    return (
      <>
        {showConfetti && <ConfettiBurst />}
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <motion.div
            className="text-center px-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <motion.div
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <PartyPopper className="w-12 h-12 text-green-500" />
            </motion.div>
            <h2 className="text-3xl font-black text-foreground mb-2">You are all set!</h2>
            <p className="text-muted-foreground font-medium text-lg max-w-sm mx-auto">
              Your profile is live. Get ready to discover meaningful connections.
            </p>
            <motion.div
              className="mt-6 flex items-center justify-center gap-2 text-primary font-bold"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading your feed...
            </motion.div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col">
      <FloatingShapes />

      <div className="relative z-10 flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-6 sm:py-10">

        {/* ── Top Bar: Progress Ring + Step Info ── */}
        <motion.div
          className="flex items-center gap-5 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StepProgressRing step={step} total={totalSteps} />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{cur.emoji}</span>
              <Badge className="bg-primary/10 text-primary border-0 text-xs font-bold px-2.5 py-0.5 rounded-full">
                Step {step} of {totalSteps}
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-tight">
              {cur.title}
            </h1>
            <p className="text-muted-foreground font-medium text-sm mt-0.5">{cur.desc}</p>
          </div>
        </motion.div>

        {/* ── Step Navigation Pills ── */}
        <div className="flex gap-2 mb-8">
          {stepConfig.map((s, i) => {
            const isActive = step === i + 1;
            const isDone = step > i + 1;
            return (
              <motion.div
                key={i}
                className={`flex-1 h-1.5 rounded-full transition-colors duration-500 ${
                  isDone ? "bg-primary" : isActive ? "bg-primary/60" : "bg-border"
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: i * 0.1 }}
              />
            );
          })}
        </div>

        {/* ── Error Banner ── */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className="p-4 bg-destructive/10 text-destructive rounded-2xl text-sm font-bold border border-destructive/20 flex items-center gap-2">
                <Zap className="w-4 h-4 shrink-0" />
                {error}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Step Content ── */}
        <div className="flex-1 relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="w-full"
            >
              {/* Gradient background for each step */}
              <div className={`absolute inset-0 bg-linear-to-br ${cur.gradient} rounded-3xl -z-10 blur-3xl`} />

              <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-6 sm:p-8 shadow-xl">

                {/* ── STEP 1: Personal ── */}
                {step === 1 && (
                  <div className="space-y-6">
                    <Field delay={0}>
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <User className="w-3.5 h-3.5" /> I am a
                      </Label>
                      <AnimatedChipSelector
                        options={["Male", "Female"]}
                        value={formData.gender}
                        onSelect={(v) => updateField("gender", v)}
                      />
                    </Field>

                    <Field delay={0.1}>
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                        Marital Status
                      </Label>
                      <AnimatedChipSelector
                        options={["Never Married", "Divorced", "Widowed", "Awaiting Divorce"]}
                        value={formData.maritalStatus}
                        onSelect={(v) => updateField("maritalStatus", v)}
                      />
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field delay={0.2}>
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                          <CalendarIcon className="w-3.5 h-3.5" /> Date of Birth
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <motion.button
                              type="button"
                              className={`w-full flex items-center gap-3 h-12 px-4 rounded-2xl border-2 border-border bg-card text-sm font-semibold hover:border-primary/40 transition-colors text-left ${!dobDate ? "text-muted-foreground" : "text-foreground"}`}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              <CalendarIcon className="w-4 h-4 text-muted-foreground shrink-0" />
                              {dobDate ? format(dobDate, "dd MMM yyyy") : "Pick a date"}
                            </motion.button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 rounded-2xl shadow-xl" align="start">
                            <Calendar
                              mode="single"
                              selected={dobDate}
                              onSelect={(date) => {
                                setDobDate(date);
                                if (date) updateField("dateOfBirth", date.toISOString());
                              }}
                              captionLayout="dropdown"
                              defaultMonth={new Date(2000, 0)}
                              startMonth={new Date(1970, 0)}
                              endMonth={new Date(2008, 11)}
                            />
                          </PopoverContent>
                        </Popover>
                      </Field>

                      <Field delay={0.25}>
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                          Height (cm)
                        </Label>
                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                          <Input
                            type="number"
                            value={formData.height}
                            onChange={(e) => updateField("height", e.target.value)}
                            placeholder="170"
                            className="h-12 text-sm font-semibold rounded-2xl border-2 px-4"
                          />
                        </motion.div>
                      </Field>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: Background ── */}
                {step === 2 && (
                  <div className="space-y-6">
                    <Field delay={0}>
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Star className="w-3.5 h-3.5" /> Religion
                      </Label>
                      <AnimatedChipSelector
                        options={["Hindu", "Muslim", "Christian", "Sikh", "Other"]}
                        value={formData.religion}
                        onSelect={(v) => updateField("religion", v)}
                      />
                    </Field>

                    <Field delay={0.1}>
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                        Community / Mother Tongue
                      </Label>
                      <AnimatedDropdown
                        value={formData.community}
                        onSelect={(v) => updateField("community", v)}
                        placeholder="Select your community"
                        options={[
                          { value: "Telugu", label: "Telugu" },
                          { value: "Marathi", label: "Marathi" },
                          { value: "Tamil", label: "Tamil" },
                          { value: "Kannada", label: "Kannada" },
                          { value: "Malayalam", label: "Malayalam" },
                          { value: "Hindi", label: "Hindi" },
                          { value: "Other", label: "Other" },
                        ]}
                      />
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field delay={0.15}>
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                          Caste
                          <Badge variant="outline" className="text-[10px] rounded-full px-2 py-0 font-bold">Optional</Badge>
                        </Label>
                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                          <Input
                            placeholder="Your caste"
                            value={formData.caste}
                            onChange={(e) => updateField("caste", e.target.value)}
                            className="h-12 text-sm font-semibold rounded-2xl border-2 px-4"
                          />
                        </motion.div>
                      </Field>

                      <Field delay={0.2}>
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                          Gothram
                          <Badge variant="outline" className="text-[10px] rounded-full px-2 py-0 font-bold">Optional</Badge>
                        </Label>
                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                          <Input
                            placeholder="Your Gothram"
                            value={formData.gothram}
                            onChange={(e) => updateField("gothram", e.target.value)}
                            className="h-12 text-sm font-semibold rounded-2xl border-2 px-4"
                          />
                        </motion.div>
                      </Field>
                    </div>
                  </div>
                )}

                {/* ── STEP 3: Career & Location ── */}
                {step === 3 && (
                  <div className="space-y-6">
                    <Field delay={0}>
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <GraduationCap className="w-3.5 h-3.5" /> Highest Education
                      </Label>
                      <AnimatedDropdown
                        value={formData.education}
                        onSelect={(v) => updateField("education", v)}
                        placeholder="Select education"
                        options={[
                          { value: "High School", label: "High School" },
                          { value: "Diploma", label: "Diploma" },
                          { value: "Bachelors", label: "Bachelors (B.Tech / B.Com / BA)" },
                          { value: "Masters", label: "Masters (M.Tech / MBA / MA)" },
                          { value: "Doctorate", label: "Doctorate (PhD)" },
                          { value: "Other", label: "Other" },
                        ]}
                      />
                    </Field>

                    <Field delay={0.1}>
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5" /> Profession
                      </Label>
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        <Input
                          placeholder="e.g. Software Engineer at Google"
                          value={formData.profession}
                          onChange={(e) => updateField("profession", e.target.value)}
                          className="h-12 text-sm font-semibold rounded-2xl border-2 px-4"
                        />
                      </motion.div>
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field delay={0.15}>
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5" /> City
                        </Label>
                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                          <Input
                            placeholder="e.g. Hyderabad"
                            value={formData.city}
                            onChange={(e) => updateField("city", e.target.value)}
                            className="h-12 text-sm font-semibold rounded-2xl border-2 px-4"
                          />
                        </motion.div>
                      </Field>

                      <Field delay={0.2}>
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                          State
                        </Label>
                        <AnimatedDropdown
                          value={formData.state}
                          onSelect={(v) => updateField("state", v)}
                          placeholder="Select state"
                          options={[
                            { value: "Andhra Pradesh", label: "Andhra Pradesh" },
                            { value: "Telangana", label: "Telangana" },
                            { value: "Maharashtra", label: "Maharashtra" },
                            { value: "Tamil Nadu", label: "Tamil Nadu" },
                            { value: "Karnataka", label: "Karnataka" },
                            { value: "Kerala", label: "Kerala" },
                            { value: "Other", label: "Other" },
                          ]}
                        />
                      </Field>
                    </div>

                    <Field delay={0.25}>
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <IndianRupee className="w-3.5 h-3.5" /> Annual Income
                        <Badge variant="outline" className="text-[10px] rounded-full px-2 py-0 font-bold">Optional</Badge>
                      </Label>
                      <AnimatedDropdown
                        value={formData.annualIncome}
                        onSelect={(v) => updateField("annualIncome", v)}
                        placeholder="Select income range"
                        options={[
                          { value: "Below 3 LPA", label: "Below 3 LPA" },
                          { value: "3-5 LPA", label: "3 - 5 LPA" },
                          { value: "5-10 LPA", label: "5 - 10 LPA" },
                          { value: "10-20 LPA", label: "10 - 20 LPA" },
                          { value: "20-50 LPA", label: "20 - 50 LPA" },
                          { value: "50+ LPA", label: "50+ LPA" },
                        ]}
                      />
                    </Field>
                  </div>
                )}

                {/* ── STEP 4: Bio ── */}
                {step === 4 && (
                  <div className="space-y-6">
                    <Field delay={0}>
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <PenLine className="w-3.5 h-3.5" /> About Me
                      </Label>
                      <motion.div whileHover={{ scale: 1.005 }}>
                        <Textarea
                          value={formData.about}
                          onChange={(e) => updateField("about", e.target.value)}
                          placeholder="Write about yourself, your family background, hobbies, and what kind of partner you are looking for..."
                          className="min-h-[180px] text-sm font-medium rounded-2xl leading-relaxed p-5 resize-none border-2"
                        />
                      </motion.div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground font-semibold">
                          Profiles with detailed bios get 3x more responses
                        </p>
                        <Badge variant="outline" className="text-xs font-bold rounded-full">
                          {formData.about.length} chars
                        </Badge>
                      </div>
                    </Field>

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-500/10 dark:to-emerald-500/10 border-2 border-green-200 dark:border-green-500/20 rounded-2xl p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
                          <Shield className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-green-800 dark:text-green-300">Almost there!</p>
                          <p className="text-xs text-green-700 dark:text-green-400/80 mt-1 font-medium leading-relaxed">
                            Your profile will be reviewed and verified. You can add photos and partner preferences after this.
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Quick Summary */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-muted/50 rounded-2xl p-5 space-y-3"
                    >
                      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5" /> Quick Summary
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {formData.gender && (
                          <div className="flex items-center gap-2 font-medium">
                            <User className="w-3.5 h-3.5 text-primary" />
                            {formData.gender}, {formData.maritalStatus}
                          </div>
                        )}
                        {formData.religion && (
                          <div className="flex items-center gap-2 font-medium">
                            <Star className="w-3.5 h-3.5 text-primary" />
                            {formData.religion}, {formData.community}
                          </div>
                        )}
                        {formData.profession && (
                          <div className="flex items-center gap-2 font-medium">
                            <Briefcase className="w-3.5 h-3.5 text-primary" />
                            {formData.profession}
                          </div>
                        )}
                        {formData.city && (
                          <div className="flex items-center gap-2 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-primary" />
                            {formData.city}, {formData.state}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Bottom Navigation ── */}
        <motion.div
          className="flex items-center justify-between pt-6 mt-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="lg"
              onClick={prevStep}
              disabled={step === 1}
              className="rounded-2xl font-bold text-base gap-2"
            >
              <ChevronLeft className="w-5 h-5" /> Back
            </Button>
          </motion.div>

          {step < totalSteps ? (
            <motion.div whileHover={{ x: 3 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={nextStep}
                className="rounded-2xl font-bold text-base px-8 shadow-lg shadow-primary/20 gap-2 bg-primary hover:bg-primary/90"
              >
                Continue <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                size="lg"
                onClick={handleSubmit}
                disabled={isLoading}
                className="rounded-2xl font-bold text-base px-8 bg-linear-to-r from-primary to-secondary text-white shadow-lg shadow-secondary/20 gap-2 border-0"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Rocket className="w-5 h-5" />
                )}
                Complete Profile
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

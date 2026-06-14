"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import {
  Eye, EyeOff, Camera, Phone, Clock, Heart, Shield, AlertTriangle,
  CheckCircle2, Loader2, X, Globe, Lock, Users, UserX
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface PrivacyState {
  profileVisibility: "Everyone" | "Premium" | "Hidden";
  photoVisibility: "Everyone" | "Premium" | "Matches Only" | "Nobody";
  showContactDetails: boolean;
  showLastSeen: boolean;
  showShortlistedBy: boolean;
}

const defaultPrivacy: PrivacyState = {
  profileVisibility: "Everyone",
  photoVisibility: "Everyone",
  showContactDetails: false,
  showLastSeen: true,
  showShortlistedBy: true,
};

export default function PrivacySettings() {
  const { data: session } = useSession();
  const accessToken = (session as any)?.accessToken;

  const [privacy, setPrivacy] = useState<PrivacyState>(defaultPrivacy);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ────── Fetch ──────
  useEffect(() => {
    if (!accessToken) return;

    const fetchPrivacy = async () => {
      try {
        const res = await fetch(`${API_URL}/api/privacy`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (res.ok) {
          const data = await res.json();
          setPrivacy(data.privacy);
        }
      } catch (err) {
        console.error("Failed to load privacy settings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacy();
  }, [accessToken]);

  // ────── Auto-save with debounce ──────
  const savePrivacy = useCallback(
    async (updates: Partial<PrivacyState>) => {
      if (!accessToken) return;

      setSaving(true);

      try {
        const res = await fetch(`${API_URL}/api/privacy`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates),
        });

        if (res.ok) {
          toast.success("Settings saved");
        } else {
          toast.error("Failed to save settings");
        }
      } catch {
        toast.error("Failed to save settings");
      } finally {
        setSaving(false);
      }
    },
    [accessToken]
  );

  const updateField = <K extends keyof PrivacyState>(field: K, value: PrivacyState[K]) => {
    setPrivacy((prev) => ({ ...prev, [field]: value }));

    // Debounce the save
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      savePrivacy({ [field]: value });
    }, 400);
  };

  // ────── Radio Option Component ──────
  const RadioOption = ({
    value,
    current,
    onChange,
    icon: Icon,
    label,
    description,
  }: {
    value: string;
    current: string;
    onChange: (val: any) => void;
    icon: React.ElementType;
    label: string;
    description: string;
  }) => (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`w-full flex items-start gap-3.5 p-3.5 rounded-xl border-2 transition-all duration-200 text-left ${
        current === value
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border hover:border-primary/30 hover:bg-muted/30"
      }`}
    >
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
          current === value ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
        }`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-bold ${current === value ? "text-primary" : "text-foreground"}`}>
          {label}
        </p>
        <p className="text-xs text-muted-foreground font-medium mt-0.5 leading-relaxed">
          {description}
        </p>
      </div>
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
          current === value ? "border-primary bg-primary" : "border-muted-foreground/30"
        }`}
      >
        {current === value && <div className="w-2 h-2 bg-white rounded-full" />}
      </div>
    </button>
  );

  // ────── Toggle Row Component ──────
  const ToggleRow = ({
    icon: Icon,
    label,
    description,
    checked,
    onChange,
  }: {
    icon: React.ElementType;
    label: string;
    description: string;
    checked: boolean;
    onChange: (val: boolean) => void;
  }) => (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-muted-foreground" />
        </div>
        <div>
          <Label className="text-sm font-bold text-foreground cursor-pointer">{label}</Label>
          <p className="text-xs text-muted-foreground font-medium mt-0.5">{description}</p>
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );

  // ────── Loading ──────
  if (loading) {
    return (
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="py-12 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">

      {/* ──── Profile Visibility ──── */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="py-5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Eye className="w-4 h-4 text-primary" /> Profile Visibility
              </CardTitle>
              <CardDescription className="text-sm mt-1">
                Control who can see your profile in search results
              </CardDescription>
            </div>
            {saving && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-5 space-y-3">
          <RadioOption
            value="Everyone"
            current={privacy.profileVisibility}
            onChange={(v) => updateField("profileVisibility", v)}
            icon={Globe}
            label="Everyone"
            description="Your profile is visible to all logged-in members"
          />
          <RadioOption
            value="Premium"
            current={privacy.profileVisibility}
            onChange={(v) => updateField("profileVisibility", v)}
            icon={Shield}
            label="Premium Members Only"
            description="Only paid/premium members can view your profile"
          />
          <RadioOption
            value="Hidden"
            current={privacy.profileVisibility}
            onChange={(v) => updateField("profileVisibility", v)}
            icon={EyeOff}
            label="Hidden (Temporarily)"
            description="Your profile won't appear in search or recommendations"
          />

          {privacy.profileVisibility === "Hidden" && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex items-start gap-2.5 animate-fade-in">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-800 dark:text-amber-300 font-medium leading-relaxed">
                Your profile is currently <span className="font-bold">hidden</span>. You won&apos;t appear in search results, daily matches, or recommendations. You can still browse other profiles. Change this back to &quot;Everyone&quot; when you&apos;re ready to be discovered.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ──── Photo Visibility ──── */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="py-5">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Camera className="w-4 h-4 text-primary" /> Photo Visibility
          </CardTitle>
          <CardDescription className="text-sm">
            Choose who can see your profile photos
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-5 space-y-3">
          <RadioOption
            value="Everyone"
            current={privacy.photoVisibility}
            onChange={(v) => updateField("photoVisibility", v)}
            icon={Globe}
            label="Everyone"
            description="All logged-in members can see your photos"
          />
          <RadioOption
            value="Premium"
            current={privacy.photoVisibility}
            onChange={(v) => updateField("photoVisibility", v)}
            icon={Shield}
            label="Premium Members Only"
            description="Only paid members can view your photos"
          />
          <RadioOption
            value="Matches Only"
            current={privacy.photoVisibility}
            onChange={(v) => updateField("photoVisibility", v)}
            icon={Users}
            label="Matches Only"
            description="Only members who you both expressed interest in"
          />
          <RadioOption
            value="Nobody"
            current={privacy.photoVisibility}
            onChange={(v) => updateField("photoVisibility", v)}
            icon={Lock}
            label="Nobody"
            description="Your photos are hidden from everyone"
          />
        </CardContent>
      </Card>

      {/* ──── Other Privacy Toggles ──── */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="py-5">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" /> Other Privacy Controls
          </CardTitle>
          <CardDescription className="text-sm">
            Fine-tune your privacy preferences
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-1 divide-y divide-border">
          <ToggleRow
            icon={Phone}
            label="Show Contact Details"
            description="Allow interested members to see your phone number and email"
            checked={privacy.showContactDetails}
            onChange={(v) => updateField("showContactDetails", v)}
          />
          <ToggleRow
            icon={Clock}
            label="Show Last Seen"
            description="Let others know when you were last active on the platform"
            checked={privacy.showLastSeen}
            onChange={(v) => updateField("showLastSeen", v)}
          />
          <ToggleRow
            icon={Heart}
            label="Shortlist Notifications"
            description="Let others know when you add them to your shortlist"
            checked={privacy.showShortlistedBy}
            onChange={(v) => updateField("showShortlistedBy", v)}
          />
        </CardContent>
      </Card>
    </div>
  );
}

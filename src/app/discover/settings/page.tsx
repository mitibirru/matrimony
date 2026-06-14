import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ActiveSessions from "@/components/settings/ActiveSessions";
import PrivacySettings from "@/components/settings/PrivacySettings";

export const metadata = {
  title: "Settings | PremaJodi",
  description: "Manage your account settings, active sessions, and privacy",
};

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-muted/30">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 animate-fade-up">
          <h1 className="text-2xl font-black text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground font-medium mt-1">
            Manage your account security and active sessions
          </p>
        </div>

        {/* Active Sessions Section */}
        <ActiveSessions />

        {/* Privacy & Visibility Section */}
        <div className="mt-10 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="mb-6">
            <h2 className="text-lg font-black text-foreground">Privacy & Visibility</h2>
            <p className="text-sm text-muted-foreground font-medium mt-1">
              Control who can see your profile, photos, and contact information
            </p>
          </div>
          <PrivacySettings />
        </div>
      </div>
    </div>
  );
}

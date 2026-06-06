import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ProfileWizard from "@/components/dashboard/ProfileWizard";
import DashboardOverview from "@/components/dashboard/DashboardOverview";

export const metadata = {
  title: "Discover | PremaJodi",
  description: "Discover compatible profiles and find your perfect match",
};

export default async function DiscoverPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const res = await fetch(`${API_URL}/api/profile`, {
    headers: {
      "Authorization": `Bearer ${session.accessToken}`,
    },
    // Next.js cache control for dynamic data
    cache: "no-store"
  });

  if (!res.ok) {
    // If unauthorized or error, maybe we need them to login again
    console.error("Failed to fetch profile");
  }

  const data = await res.json().catch(() => ({}));
  const user = data.user || null;
  const serializedProfile = data.profile || null;

  if (!serializedProfile) {
    return (
      <div className="min-h-[calc(100vh-5rem)]">
        <ProfileWizard userId={session.user.id} />
      </div>
    );
  }

  return (
    <DashboardOverview
      profile={serializedProfile}
      emailVerified={user?.emailVerified ?? false}
      email={user?.email || ""}
    />
  );
}

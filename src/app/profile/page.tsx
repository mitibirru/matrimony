import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import MyProfileView from "@/components/profile/MyProfileView";

export const metadata = {
  title: "My Profile | PremaJodi",
  description: "View and manage your matrimony profile",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const res = await fetch(`${API_URL}/api/profile`, {
    headers: {
      "Authorization": `Bearer ${session.accessToken}`,
    },
    cache: "no-store"
  });

  const data = await res.json().catch(() => ({}));
  const serializedProfile = data.profile || null;

  if (!serializedProfile) redirect("/discover");

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-muted/30">
      <div className="container max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <MyProfileView profile={serializedProfile} user={session.user} />
      </div>
    </div>
  );
}

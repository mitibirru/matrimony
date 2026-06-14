import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import EditProfileForm from "@/components/dashboard/EditProfileForm";

export const metadata = {
  title: "Edit Profile | PremaJodi",
  description: "Update your matrimony profile details",
};

export default async function EditProfilePage() {
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
      <div className="container max-w-5xl mx-auto px-4 py-6 sm:py-10">
        <EditProfileForm profile={serializedProfile} accessToken={(session as any).accessToken} />
      </div>
    </div>
  );
}

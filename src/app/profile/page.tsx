import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Profile from "@/models/Profile";
import MyProfileView from "@/components/profile/MyProfileView";

export const metadata = {
  title: "My Profile | PremaJodi",
  description: "View and manage your matrimony profile",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  await dbConnect();
  const profile = await Profile.findOne({ user: session.user.id }).lean();

  if (!profile) redirect("/discover");

  const serializedProfile = JSON.parse(JSON.stringify(profile));

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-muted/30">
      <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
        <MyProfileView profile={serializedProfile} user={session.user} />
      </div>
    </div>
  );
}

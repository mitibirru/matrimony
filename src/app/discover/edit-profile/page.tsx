import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Profile from "@/models/Profile";
import EditProfileForm from "@/components/dashboard/EditProfileForm";

export const metadata = {
  title: "Edit Profile | PremaJodi",
  description: "Update your matrimony profile details",
};

export default async function EditProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  await dbConnect();
  const profile = await Profile.findOne({ user: session.user.id }).lean();

  if (!profile) redirect("/discover");

  const serializedProfile = JSON.parse(JSON.stringify(profile));

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <EditProfileForm profile={serializedProfile} />
      </div>
    </div>
  );
}

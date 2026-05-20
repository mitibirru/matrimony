import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Profile from "@/models/Profile";
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

  await dbConnect();

  const profile = await Profile.findOne({ user: session.user.id }).lean();
  const serializedProfile = profile ? JSON.parse(JSON.stringify(profile)) : null;

  if (!serializedProfile) {
    return (
      <div className="min-h-[calc(100vh-5rem)]">
        <ProfileWizard userId={session.user.id} />
      </div>
    );
  }

  return <DashboardOverview profile={serializedProfile} />;
}

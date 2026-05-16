import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Profile from "@/models/Profile";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    await dbConnect();

    // Check if profile already exists
    const existingProfile = await Profile.findOne({ user: session.user.id });
    if (existingProfile) {
      return NextResponse.json({ message: "Profile already exists" }, { status: 400 });
    }

    // Create unique Profile ID (e.g. MAT12345)
    const profileCount = await Profile.countDocuments();
    const profileId = `MAT${10000 + profileCount + 1}`;

    const newProfile = await Profile.create({
      user: session.user.id,
      profileId,
      ...data,
    });

    // Link profile to user
    await User.findByIdAndUpdate(session.user.id, { profileId: newProfile._id });

    return NextResponse.json(
      { message: "Profile created successfully", profileId: newProfile._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Profile Creation Error:", error);
    return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
  }
}

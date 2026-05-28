import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Profile from "@/models/Profile";
import User from "@/models/User";

const REQUIRED_FIELDS = [
  "gender", "dateOfBirth", "maritalStatus", "height",
  "religion", "community", "motherTongue",
  "fatherOccupation", "motherOccupation", "familyType", "familyStatus", "familyValues",
  "education", "employedIn", "profession",
  "city", "state",
  "about",
] as const;

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    const missing = REQUIRED_FIELDS.filter(f => !data[f]);
    if (missing.length > 0) {
      return NextResponse.json(
        { message: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingProfile = await Profile.findOne({ user: session.user.id });
    if (existingProfile) {
      return NextResponse.json({ message: "Profile already exists" }, { status: 400 });
    }

    const profileCount = await Profile.countDocuments();
    const profileId = `MAT${10000 + profileCount + 1}`;

    // Extract phone before creating profile (phone belongs to User, not Profile)
    const { phone, ...profileData } = data;

    const newProfile = await Profile.create({
      user: session.user.id,
      profileId,
      country: "India",
      ...profileData,
    });

    // Update User with profileId and phone number
    await User.findByIdAndUpdate(session.user.id, {
      profileId: newProfile._id,
      ...(phone ? { phone: `+91${phone.replace(/\s/g, "")}` } : {}),
    });

    return NextResponse.json(
      { message: "Profile created successfully", profileId: newProfile._id },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Profile Creation Error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    await dbConnect();

    const profile = await Profile.findOne({ user: session.user.id });
    if (!profile) {
      return NextResponse.json({ message: "Profile not found. Complete onboarding first." }, { status: 404 });
    }

    // Prevent clearing required fields
    for (const field of REQUIRED_FIELDS) {
      if (field in data && !data[field]) {
        return NextResponse.json(
          { message: `Field "${field}" cannot be empty.` },
          { status: 400 }
        );
      }
    }

    const updated = await Profile.findOneAndUpdate(
      { user: session.user.id },
      { $set: data },
      { new: true, runValidators: true }
    ).lean();

    return NextResponse.json({ message: "Profile updated successfully", profile: JSON.parse(JSON.stringify(updated)) });
  } catch (error: unknown) {
    console.error("Profile Update Error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}


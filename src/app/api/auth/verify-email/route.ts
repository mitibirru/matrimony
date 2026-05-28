import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ message: "Verification token is required" }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired verification link." }, { status: 400 });
    }

    await User.findByIdAndUpdate(user._id, {
      emailVerified: true,
      verificationToken: null,
      verificationTokenExpiry: null,
    });

    return NextResponse.json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}

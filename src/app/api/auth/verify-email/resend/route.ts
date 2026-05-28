import { NextResponse } from "next/server";
import crypto from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { sendVerificationEmail } from "@/lib/email";
import { rateLimit, getIpAddress, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const ip = getIpAddress(req);
    if (!rateLimit(ip, 5, 60 * 1000)) {
      return rateLimitResponse();
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.emailVerified) {
      return NextResponse.json({ message: "Email is already verified" }, { status: 400 });
    }

    if (!user.email) {
      return NextResponse.json({ message: "Email address not found on account" }, { status: 400 });
    }

    // Generate new token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await User.findByIdAndUpdate(user._id, {
      verificationToken,
      verificationTokenExpiry,
    });

    await sendVerificationEmail(user.email, verificationToken);

    return NextResponse.json({ message: "Verification link sent successfully!" });
  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { sendPasswordResetEmail } from "@/lib/email";
import { rateLimit, getIpAddress, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const ip = getIpAddress(req);
    if (!rateLimit(ip, 5, 60 * 1000)) {
      return rateLimitResponse();
    }

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findOne({ email });

    // Always return success (don't reveal if email exists)
    if (!user) {
      return NextResponse.json({ message: "If an account exists with this email, you will receive a reset link." });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await User.findByIdAndUpdate(user._id, { resetToken, resetTokenExpiry });

    await sendPasswordResetEmail(email, resetToken);

    return NextResponse.json({ message: "If an account exists with this email, you will receive a reset link." });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ message: "Something went wrong. Please try again." }, { status: 500 });
  }
}

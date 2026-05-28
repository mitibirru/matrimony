import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { rateLimit, getIpAddress, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const ip = getIpAddress(req);
    if (!rateLimit(ip, 5, 60 * 1000)) {
      return rateLimitResponse();
    }

    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ message: "Token and password are required" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() }, // Token not expired
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired reset link. Please request a new one." }, { status: 400 });
    }

    // Hash new password and clear reset token
    const hashedPassword = await bcrypt.hash(password, 12);

    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    });

    return NextResponse.json({ message: "Password reset successfully. You can now log in." });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ message: "Something went wrong. Please try again." }, { status: 500 });
  }
}

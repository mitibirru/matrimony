import { NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebase-admin";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { rateLimit, getIpAddress, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const ip = getIpAddress(req);
    if (!rateLimit(ip, 5, 60 * 1000)) {
      return rateLimitResponse();
    }

    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json({ error: "Missing Firebase ID token" }, { status: 400 });
    }

    // Verify Firebase token
    const decoded = await getAdminAuth().verifyIdToken(idToken);
    const phone = decoded.phone_number;

    if (!phone) {
      return NextResponse.json({ error: "No phone number in token" }, { status: 400 });
    }

    await dbConnect();

    // Find or create user
    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({
        phone,
        email: `${phone.replace("+", "")}@phone.premajodi.com`, // placeholder email for phone-only users
        firstName: "User",
        lastName: "",
        isVerified: true,
        emailVerified: true,
      });
    }

    // Create a NextAuth-compatible JWT
    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
        name: `${user.firstName} ${user.lastName}`.trim(),
        role: user.role,
        emailVerified: true,
      },
      process.env.NEXTAUTH_SECRET!,
      { expiresIn: "30d" }
    );

    // Set the NextAuth session cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: `${user.firstName} ${user.lastName}`.trim(),
        phone: user.phone,
        isNewUser: !user.lastName, // If lastName is empty, user hasn't completed profile
      },
    });

    // Set the next-auth session token cookie
    const cookieName = process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";

    response.cookies.set(cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (error: any) {
    console.error("Phone auth error:", error);
    return NextResponse.json(
      { error: error.message || "Authentication failed" },
      { status: 401 }
    );
  }
}

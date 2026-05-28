import { NextResponse } from "next/server";

const trackers = new Map<string, number[]>();

// Clean up expired entries every 5 minutes to prevent memory leaks
if (typeof global !== "undefined" && !(global as any).rateLimitInterval) {
  (global as any).rateLimitInterval = setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of trackers.entries()) {
      const active = timestamps.filter((time) => now - time < 60 * 1000);
      if (active.length === 0) {
        trackers.delete(ip);
      } else {
        trackers.set(ip, active);
      }
    }
  }, 5 * 60 * 1000);
}

export function rateLimit(ip: string, limit = 5, windowMs = 60 * 1000): boolean {
  const now = Date.now();
  const timestamps = trackers.get(ip) || [];

  // Filter out expired timestamps
  const activeTimestamps = timestamps.filter((time) => now - time < windowMs);

  if (activeTimestamps.length >= limit) {
    return false;
  }

  activeTimestamps.push(now);
  trackers.set(ip, activeTimestamps);
  return true;
}

export function getIpAddress(req: Request): string {
  // Common headers used by reverse proxies / CDN
  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  const xRealIp = req.headers.get("x-real-ip");
  if (xRealIp) {
    return xRealIp.trim();
  }
  return "127.0.0.1"; // Fallback for local development
}

export function rateLimitResponse() {
  return NextResponse.json(
    { message: "Too many requests. Please try again in a minute." },
    { status: 429 }
  );
}

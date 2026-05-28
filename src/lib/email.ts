import { Resend } from "resend";

let resendInstance: Resend | null = null;

function getResend() {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY || "re_dummy_key_for_build";
    resendInstance = new Resend(apiKey);
  }
  return resendInstance;
}

const FROM_EMAIL = process.env.EMAIL_FROM || "PremaJodi <onboarding@resend.dev>";
const APP_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${APP_URL}/reset-password?token=${token}`;

  await getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Reset your PremaJodi password",
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; background: #ffffff;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 24px; font-weight: 800; color: #1a1a1a; margin: 0;">PremaJodi</h1>
          <p style="color: #888; font-size: 12px; margin-top: 4px;">Trusted Matrimony</p>
        </div>
        <h2 style="font-size: 20px; font-weight: 700; color: #1a1a1a; margin-bottom: 12px;">Reset your password</h2>
        <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
          We received a request to reset your password. Click the button below to create a new password. This link expires in <strong>1 hour</strong>.
        </p>
        <a href="${resetUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #7c3aed, #ec4899); color: #fff; text-decoration: none; font-weight: 700; font-size: 15px; border-radius: 12px;">
          Reset Password
        </a>
        <p style="color: #999; font-size: 13px; margin-top: 24px; line-height: 1.5;">
          If you didn't request this, you can safely ignore this email. Your password will remain unchanged.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0 16px;" />
        <p style="color: #bbb; font-size: 11px; text-align: center;">© ${new Date().getFullYear()} PremaJodi. All rights reserved.</p>
      </div>
    `,
  });
}

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${APP_URL}/verify-email?token=${token}`;

  await getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Verify your PremaJodi account",
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; background: #ffffff;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 24px; font-weight: 800; color: #1a1a1a; margin: 0;">PremaJodi</h1>
          <p style="color: #888; font-size: 12px; margin-top: 4px;">Trusted Matrimony</p>
        </div>
        <h2 style="font-size: 20px; font-weight: 700; color: #1a1a1a; margin-bottom: 12px;">Verify your email</h2>
        <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
          Welcome to PremaJodi! Please verify your email address to activate your account. This link expires in <strong>24 hours</strong>.
        </p>
        <a href="${verifyUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #7c3aed, #ec4899); color: #fff; text-decoration: none; font-weight: 700; font-size: 15px; border-radius: 12px;">
          Verify Email
        </a>
        <p style="color: #999; font-size: 13px; margin-top: 24px; line-height: 1.5;">
          If you didn't create an account, you can safely ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0 16px;" />
        <p style="color: #bbb; font-size: 11px; text-align: center;">© ${new Date().getFullYear()} PremaJodi. All rights reserved.</p>
      </div>
    `,
  });
}

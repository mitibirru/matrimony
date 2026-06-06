import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    emailVerified?: boolean;
  }

  interface Session {
    user: User & {
      id: string;
      role: string;
      emailVerified?: boolean;
    };
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    emailVerified?: boolean;
    accessToken?: string;
  }
}

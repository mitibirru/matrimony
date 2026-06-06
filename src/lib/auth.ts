import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const res = await fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Authentication failed");
        }

        return data.user;
      }
    }),
    CredentialsProvider({
      id: "phone-credentials",
      name: "Phone",
      credentials: {
        idToken: { label: "Firebase ID Token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.idToken) {
          throw new Error("Missing Firebase ID token");
        }

        const res = await fetch(`${API_URL}/api/auth/phone`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: credentials.idToken }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Phone authentication failed");
        }

        return data.user;
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        // Send to backend to create/verify user
        const res = await fetch(`${API_URL}/api/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
          }),
        });

        if (!res.ok) {
          return false;
        }

        const data = await res.json();
        // Mutate user object so it gets passed to jwt callback
        user.id = data.user.id;
        (user as any).role = data.user.role;
        (user as any).emailVerified = data.user.emailVerified;
      }
      return true;
    },
    async jwt({ token, user }) {
      // The user object is only passed on the initial sign in
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.emailVerified = !!(user as any).emailVerified;
      }

      // Generate a raw JWT for our Fastify backend
      if (!token.accessToken) {
        token.accessToken = jwt.sign(
          {
            id: token.id,
            email: token.email,
            role: token.role,
            emailVerified: token.emailVerified,
          },
          process.env.NEXTAUTH_SECRET as string,
          { expiresIn: "30d" }
        );
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.emailVerified = token.emailVerified as boolean;
        (session as any).accessToken = token.accessToken as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};


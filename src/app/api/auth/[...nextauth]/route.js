import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { systemLog, auditLog } from "@/lib/logger";

export const authOptions = {
  providers: [
    // 1. Google Account Support
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // 2. Email/Password (Credentials)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();

        // Find user in DB
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          await systemLog("WARN", `Auth failure: Non-existent identity node [${credentials.email}] tried to connect.`);
          throw new Error("No user found with this email.");
        }

        // Compare hashed passwords
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          await auditLog({
            action: "AUTH_FAILURE",
            userId: user._id,
            userEmail: user.email,
            role: user.role || "user",
            resource: "API_GATEWAY",
            status: "FAILURE"
          });
          throw new Error("Invalid password.");
        }

        await systemLog("INFO", `Identity node [${user.email}] successfully authenticated.`);
        await auditLog({
          action: "AUTH_SUCCESS",
          userId: user._id,
          userEmail: user.email,
          role: user.role || "user",
          resource: "API_GATEWAY",
          status: "SUCCESS"
        });

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // When a user signs in via OAuth (Google), ensure they are in our DB
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        await connectToDatabase();
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const newUser = await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            emailVerified: new Date(),
          });
          await systemLog("SUCCESS", `New identity established via Google OAuth: ${user.email}`);
        } else {
          await systemLog("INFO", `Google OAuth authentication: ${user.email}`);
        }
      }
      return true;
    },
    // Add custom fields to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id || user.id;
        token.role = user.role || "user";
      }
      return token;
    },
    // Add custom fields to the Session
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

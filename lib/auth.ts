import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { Plan, Role } from "@prisma/client";

import { prisma } from "@/lib/prisma";
export type UserSession = {
  id: string;
  email: string;
  name?: string | null;
  role: Role;
  plan: Plan;
};

declare module "next-auth" {
  interface User {
    id: string;
    role: Role;
    plan: Plan;
  }

  interface Session {
    user: {
      id: string;
      role: Role;
      plan: Plan;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const email =
          typeof credentials?.email === "string"
            ? credentials.email.trim().toLowerCase()
            : "";

        const password =
          typeof credentials?.password === "string"
            ? credentials.password
            : "";

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
            role: true,
            plan: true,
          },
        });

        if (!user?.password) {
          return null;
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          plan: user.plan,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.plan = user.plan;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = String(token.id);
      session.user.role = token.role as Role;
      session.user.plan = token.plan as Plan;
      return session;
    },
  },

  trustHost: true,
});

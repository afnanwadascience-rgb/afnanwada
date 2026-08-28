import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { Plan, Role } from "@prisma/client";

import { prisma } from "@/lib/prisma";

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

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: Role;
    plan: Plan;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
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
        const email = credentials?.email;
        const password = credentials?.password;

        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }

        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail || !password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: normalizedEmail,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(
          password,
          user.password,
        );

        if (!isValidPassword) {
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
});
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHub from "next-auth/providers/github";
import { db } from "./src/server/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [GitHub],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async signIn({ user, account }) {
      // If the user is signing in with oAuth Providers, we don't need to verify their email
      if (account?.provider !== "credentials") {
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
        });
        if (dbUser && !dbUser?.emailVerified) {
          await db.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() },
          });
        }
        return true;
      }
      return true;
    },
  },
});

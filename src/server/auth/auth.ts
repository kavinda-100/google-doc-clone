import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "../db";

// plugins
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  session: {
    //* session configuration (cookie) - this is required. at the beginning of auth configuration.
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds (5 minutes)
    },
  },
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
  //extend the user model.a
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
      },
    },
  },
  plugins: [openAPI()], // all the plugins are goose here.
});

/**
 *@description using this type, You can get the session in the client side using props.
 *
 *@example
 * "use client"
 *
 * export default Page(session: AuthSession){
 *   return (
 *      <div>{session}</div>
 *   )
 * }
 *
 **/
export type AuthSession = typeof auth.$Infer.Session;

import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string({ message: "DATABASE_URL is required" }).url(),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  BETTER_AUTH_SECRET: z
    .string({ message: "BETTER_AUTH_SECRET is required" })
    .min(10),
  BETTER_AUTH_URL: z.string({ message: "BETTER_AUTH_URL is required" }).url(),
  GITHUB_CLIENT_ID: z
    .string({ message: "GITHUB_CLIENT_ID is required" })
    .min(5),
  GITHUB_CLIENT_SECRET: z
    .string({ message: "GITHUB_CLIENT_SECRET is required" })
    .min(5),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error(env.error.errors);
  throw new Error("Environment validation failed:");
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

export default env;

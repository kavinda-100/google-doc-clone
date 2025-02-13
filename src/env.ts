import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string({ message: "DATABASE_URL is required" }).url(),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  AUTH_SECRET: z.string({ message: "AUTH_SECRET is required" }).min(10),
  AUTH_GITHUB_ID: z.string({ message: "AUTH_GITHUB_ID is required" }).min(5),
  AUTH_GITHUB_SECRET: z
    .string({ message: "AUTH_GITHUB_SECRET is required" })
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

import {z} from 'zod';

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),
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
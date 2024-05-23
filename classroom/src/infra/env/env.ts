import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().default(3334),
  AUTH0_AUDIENCE: z.string(),
  AUTH0_DOMAIN: z.string(),
});

export type Env = z.infer<typeof envSchema>;

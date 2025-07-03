import type { ZodObject, ZodRawShape } from "zod";

import { config } from "dotenv";
import { expand } from "dotenv-expand";
import path from "node:path";
import { z, ZodError } from "zod";

expand(
  config({
    path: path.resolve(process.cwd(), ".env"),
  }),
);

const EnvSchema = z.object({
  DATABASE_URL: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

function parseEnv<T extends ZodRawShape>(
  schema: ZodObject<T>,
  // eslint-disable-next-line node/no-process-env
  buildEnv: Record<string, string | undefined> = process.env,
) {
  try {
    const result = schema.parse(buildEnv);
    return result;
  }
  catch (error: unknown) {
    if (error instanceof ZodError) {
      throw JSON.stringify(error.formErrors.fieldErrors, null, 2);
    }

    throw error;
  }
}

export type Env = z.infer<typeof EnvSchema>;
export const env = parseEnv(EnvSchema);

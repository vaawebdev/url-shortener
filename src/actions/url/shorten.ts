"use server";

import { db } from "@/database";
import { urls } from "@/database/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import z from "zod";

const SHORTEN_PARAMS_SCHEMA = z.object({
  url: z.url(),
});

type ShortenParams = z.infer<typeof SHORTEN_PARAMS_SCHEMA>;

export const shorten = async (params: ShortenParams) => {
  const { url } = await SHORTEN_PARAMS_SCHEMA.parseAsync(params);

  return await db.transaction(async (tx) => {
    while (true) {
      const shortCode = nanoid(10);

      // Just in case of a collision do generate shortUrl in a loop
      // although probability is very low, in most cases this will cause a single query
      // @see https://github.com/ai/nanoid/issues/154#issuecomment-545757471
      const collisions = await tx
        .select({ id: urls.id })
        .from(urls)
        .where(eq(urls.shortCode, shortCode))
        .execute();

      if (collisions.length) continue;

      await tx.insert(urls).values({ url, shortCode });

      return { shortUrl: shortCode };
    }
  });
};

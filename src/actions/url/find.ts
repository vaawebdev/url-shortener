"use server";

import { db } from "@/database";
import z from "zod";

const FIND_PARAMS_SCHEMA = z.object({
  shortCode: z.string().min(1).max(100),
});

type FindParams = z.infer<typeof FIND_PARAMS_SCHEMA>;

export const find = async (params: FindParams) => {
  const { shortCode } = await FIND_PARAMS_SCHEMA.parseAsync(params);

  return await db.query.urls.findFirst({
    where: (urls, { eq }) => eq(urls.shortCode, shortCode),
  });
};

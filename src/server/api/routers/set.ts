import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const setRouter = createTRPCRouter({
  listSets: publicProcedure.query(({ ctx }) => {
    return ctx.db.set.findMany();
  }),
});

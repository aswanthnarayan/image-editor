import { query } from "./_generated/server";

export const GetAllTemplates = query({
  handler: async (ctx, args) => {
    return await ctx.db.query("templates").collect();
  }
});
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createLead = mutation({
  args: {
    name: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    grossIncome: v.string(),
    equity: v.string(),
    employmentType: v.string(),
    employedSince: v.optional(v.string()),
    investmentBudget: v.optional(v.string()),
    notes: v.optional(v.string()),
    source: v.optional(v.string()),
    sourceDetail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const leadId = await ctx.db.insert("leads", {
      ...args,
      status: "new",
      createdAt: Date.now(),
    });
    return leadId;
  },
});

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listLeads = query({
  args: {},
  handler: async (ctx) => {
    const leads = await ctx.db.query("leads").order("desc").collect();
    return leads;
  },
});

export const updateLeadStatus = mutation({
  args: {
    id: v.id("leads"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const deleteLead = mutation({
  args: { id: v.id("leads") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

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
    schufaClean: v.optional(v.string()),
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

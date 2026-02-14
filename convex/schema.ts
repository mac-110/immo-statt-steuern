import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  leads: defineTable({
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
    status: v.string(),
    createdAt: v.number(),
  }),
});

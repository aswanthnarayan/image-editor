import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// @snippet start schema
export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    subscriptionId: v.optional(v.string()),
  }), 

  designs: defineTable({
    name: v.string(),
    width: v.number(),
    height: v.number(),
    jsonTemplate:v.optional(v.any()),
    imagePreview:v.optional(v.string()),
    uid:v.id("users")
  }),

   templates: defineTable({
    name: v.string(),
    jsonData:v.any(),
    imagePreview:v.string(),
    active:v.boolean(),
    height:v.optional(v.number()),
    width:v.optional(v.number())
  }),
  
});
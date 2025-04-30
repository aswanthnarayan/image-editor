import {v} from "convex/values"
import { mutation ,query} from "./_generated/server"

export const CreateNewDesign = mutation({
    args: {
      name: v.string(),
      width: v.number(),
      height: v.number(),
      uid: v.id("users"),
      imagePreview: v.optional(v.string()),
      jsonTemplate: v.optional(v.any())
    },
    handler: async (ctx, args) => {
      const result = await ctx.db.insert('designs', {
        name: args.name,
        width: args.width,
        height: args.height,
        uid: args.uid,
        jsonTemplate: args.jsonTemplate , 
        imagePreview: args.imagePreview ?? "https://ik.imagekit.io/acy6kl72d/gallery.png?updatedAt=1745836257481" 
      })
      return result;
    }
  })

  export const UpdateDesignSettings = mutation({
  args: {
    id: v.id("designs"),
    name: v.string(),
    width: v.number(),
    height: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      name: args.name,
      width: args.width,
      height: args.height,
    });
    return { success: true };
  },
});

export const GetDesign = query({
    args: {
      id: v.id("designs")
    },
    handler: async (ctx, args) => {
      const result = await ctx.db.get(args.id)
      return result;
    }
  })

  export const saveDesign = mutation({
    args: {
      id: v.id("designs"),
      jsonDesign: v.any(),
      imagePreview: v.optional(v.string())
    },
    handler: async (ctx, args) => {
      const result = await ctx.db.patch(args.id, {
        jsonTemplate: args.jsonDesign,
        imagePreview: args.imagePreview
      })
      return result;
    }
  })

  export const GetAllDesignByUser = query({
    args: {
      uid: v.id("users")
    },
    handler: async (ctx, args) => {
      const result = await ctx.db.query('designs')
      .filter(q=>q.eq(q.field("uid"), args.uid))
      .collect()
      result.sort((a, b) => b._creationTime - a._creationTime);
      return result;
    }
  })

export const CreateDesignFromTemplate = mutation({
    args: {
      name: v.string(),
      imagePreview: v.string(),
      jsonTemplate: v.any(),
      height: v.number(),
      width: v.number(),
      uid: v.id("users")
    },
    handler: async (ctx, args) => {
      const result = await ctx.db.insert('designs', {
        name: args.name,
        width: args.width,
        height: args.height,
        jsonTemplate: args.jsonTemplate,
        imagePreview: args.imagePreview,
        uid: args.uid
      })
      return result;
    }
  })



export const deleteDesign = mutation({
  args: { id: v.id("designs") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  }
});



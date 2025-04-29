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

// export const deleteDesignAndImage = action({
//   args: {
//     id: v.id("designs"),
//     imageFileName: v.string(), // e.g. designId+'.png'
//   },
//   handler: async (ctx, args) => {
//     // 1. Delete the design from Convex using a mutation
//     await ctx.runMutation(api.design.deleteDesign, { id: args.id });

//     // 2. Delete the image from ImageKit
//     const imageKitEndpoint = process.env.IMAGEKIT_API_ENDPOINT as string; // e.g. 'https://api.imagekit.io/v1'
//     const imageKitPrivateKey = process.env.IMAGEKIT_PRIVATE_KEY as string;

//     if (!imageKitEndpoint || !imageKitPrivateKey) {
//       throw new Error("ImageKit credentials are not set in environment variables.");
//     }

//     // Get fileId from ImageKit using file name
//     type ImageKitFile = { fileId: string };
//     type ListFilesResponse = { files?: ImageKitFile[] };

//     let fileId: string | undefined;
//     try {
//       const listFilesRes = await axios.get<ListFilesResponse>(
//         `${imageKitEndpoint}/files?name=${encodeURIComponent(args.imageFileName)}`,
//         {
//           auth: { username: imageKitPrivateKey, password: "" }
//         }
//       );
//       fileId = listFilesRes.data.files?.[0]?.fileId;
//     } catch (e) {
//       // Optionally log error or ignore if file not found
//       fileId = undefined;
//     }

//     if (fileId) {
//       try {
//         await axios.delete(
//           `${imageKitEndpoint}/files/${fileId}`,
//           {
//             auth: { username: imageKitPrivateKey, password: "" }
//           }
//         );
//       } catch (e) {
//         // Optionally log error or ignore if deletion fails
//       }
//     }

//     return { success: true };
//   }
// });


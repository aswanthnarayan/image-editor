import { action } from "./_generated/server";
import { v } from "convex/values";
import axios from "axios";
import { api } from "./_generated/api";

export const deleteDesignAndImage = action({
  args: {
    id: v.id("designs"),
    imageFileName: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("🧨 Starting deleteDesignAndImage...");
    console.log("🧾 Received args:", args);

    // Delete design from DB
    try {
      await ctx.runMutation(api.design.deleteDesign, { id: args.id });
      console.log("✅ Deleted design from DB");
    } catch (err) {
      console.error("❌ Failed to delete design from DB:", err);
      throw new Error("DB delete failed");
    }

    const imageKitEndpoint = process.env.IMAGEKIT_API_ENDPOINT;
    const imageKitPrivateKey = process.env.IMAGEKIT_PRIVATE_KEY;

    if (!imageKitEndpoint || !imageKitPrivateKey) {
      console.error("❌ ImageKit credentials not set");
      throw new Error("ImageKit credentials not set");
    }

    console.log("🔐 ImageKit endpoint & credentials loaded");

    // Try to find the file
    let fileId: string | undefined;
    try {
      const res = await axios.get(`${imageKitEndpoint}/files`, {
        params: { search: args.imageFileName, limit: 10 },
        auth: { username: imageKitPrivateKey, password: "" },
      });

      console.log("📦 Search response from ImageKit:", res.data);

      const searchFileName = args.imageFileName.split("/").pop();

      const match = res.data.find((file: any) =>
        file.name === searchFileName ||
        file.filePath.endsWith(`/${searchFileName}`) ||
        file.url.includes(searchFileName)
      );

      if (match) {
        fileId = match.fileId;
        console.log("✅ Found matching file:", fileId);
      } else {
        console.warn("⚠️ No matching file found in ImageKit");
      }
    } catch (error: any) {
      console.error("❌ Error searching for file in ImageKit:", error.response?.data || error.message);
    }

    // Try to delete the image
    if (fileId) {
      try {
        await axios.delete(`${imageKitEndpoint}/files/${fileId}`, {
          auth: { username: imageKitPrivateKey, password: "" },
        });
        console.log("🗑️ Image deleted successfully from ImageKit:", fileId);
      } catch (error: any) {
        console.error("❌ Failed to delete image from ImageKit:", error.response?.data || error.message);
      }
    } else {
      console.warn("⚠️ Skipped image deletion: fileId not found");
    }

    console.log("✅ Finished deleteDesignAndImage");
    return { success: true };
  },
});

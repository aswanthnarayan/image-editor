// convex/designActions.ts
import { action, mutation ,query} from "./_generated/server"
import {v} from "convex/values"
import axios from "axios";
import { deleteDesign } from "./design"; 
import { api } from "./_generated/api";

export const deleteDesignAndImage = action({
  args: {
    id: v.id("designs"),
    imageFileName: v.string(),
  },
  handler: async (ctx, args) => {
    // First delete the DB design
    await ctx.runMutation(api.design.deleteDesign, { id: args.id });

    const imageKitEndpoint = process.env.IMAGEKIT_API_ENDPOINT as string;
    const imageKitPrivateKey = process.env.IMAGEKIT_PRIVATE_KEY as string;

    if (!imageKitEndpoint || !imageKitPrivateKey) {
      throw new Error("ImageKit credentials not set");
    }

    // Try to get fileId by file name
    let fileId: string | undefined;
    try {        
        const res = await axios.get(`${imageKitEndpoint}/files`, {
            params: { 
                search: args.imageFileName,
                limit: 10 
            },
            auth: { 
                username: imageKitPrivateKey, 
                password: "" 
            }
        });
                
        // Check if files exist and extract fileId
        if (res.data && res.data.length > 0) {
            // Extract the last part of the filename
            const searchFileName = args.imageFileName.split('/').pop();
            
            // Find exact or partial match for filename
            const exactMatch = res.data.find((file: any) => 
                file.name === searchFileName || 
                file.filePath.endsWith(`/${searchFileName}`) ||
                file.url.includes(searchFileName)
            );
            
            if (exactMatch) {
                fileId = exactMatch.fileId;
            }
        }
    } catch (error: any) {
        console.error('Error searching for file:', 
            error.response ? JSON.stringify(error.response.data) : error.message
        );
    }

    // Try to delete image if found
    if (fileId) {
        try {
            await axios.delete(`${imageKitEndpoint}/files/${fileId}`, {
                auth: { 
                    username: imageKitPrivateKey, 
                    password: "" 
                }
            });
        } catch (error: any) {
            console.error('Failed to delete image:', 
                error.response ? JSON.stringify(error.response.data) : error.message
            );
        }
    } else {
    }

    return { success: true };
  },
});
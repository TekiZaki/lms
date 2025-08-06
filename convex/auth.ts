import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const login = mutation({
  args: {
    role: v.union(v.literal("admin"), v.literal("guru"), v.literal("siswa")),
  },
  handler: async (ctx, { role }) => {
    // In a real app, you'd verify credentials.
    // Here, we just find the first user with the selected role for the demo.
    const user = await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", role))
      .first();

    if (!user) {
      throw new Error(
        `No demo user found for role: ${role}. Please seed the database.`
      );
    }

    // Return user data to be stored in the client's session.
    return {
      _id: user._id,
      name: user.name,
      role: user.role,
    };
  },
});

import { query } from "./_generated/server";
import { v } from "convex/values";

// Get all users
export const getUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

// Get data for Admin Dashboard
export const getAdminDashboardStats = query({
  handler: async (ctx) => {
    const students = await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", "siswa"))
      .collect();
    const teachers = await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", "guru"))
      .collect();
    const classes = await ctx.db.query("classes").collect();
    const activities = await ctx.db
      .query("systemActivities")
      .order("desc")
      .take(5);

    return {
      totalSiswa: students.length,
      totalGuru: teachers.length,
      totalKelas: classes.length,
      activities,
    };
  },
});

// Get data for a specific user (for account page etc.)
export const getUserById = query({
  args: { id: v.id("users") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

// Get classes
export const getClasses = query({
  handler: async (ctx) => {
    const classes = await ctx.db.query("classes").collect();
    // In a real app, you'd calculate this more efficiently
    // For the demo, this works fine
    const students = await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", "siswa"))
      .collect();

    return classes.map((c) => ({
      ...c,
      studentCount: students.filter((s) => s.class === c.name).length,
    }));
  },
});

// Generic getter for any table, useful for simple pages
export const getTable = query({
  args: { tableName: v.string() },
  handler: async (ctx, { tableName }) => {
    // This is not type-safe, but useful for a quick demo
    return await (ctx.db.query as any)(tableName).collect();
  },
});

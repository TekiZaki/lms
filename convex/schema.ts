import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    role: v.union(v.literal("admin"), v.literal("guru"), v.literal("siswa")),
    // Demo-specific fields
    nis: v.optional(v.string()),
    class: v.optional(v.string()),
    subject: v.optional(v.string()), // For teachers
    classes: v.optional(v.array(v.string())), // For teachers
    dob: v.optional(v.string()),
    address: v.optional(v.string()),
    parentName: v.optional(v.string()),
    parentContact: v.optional(v.string()),
    parentEmail: v.optional(v.string()),
  }).index("by_role", ["role"]),

  classes: defineTable({
    name: v.string(),
    homeroomTeacher: v.string(), // Teacher's name for simplicity
  }),

  tasks: defineTable({
    title: v.string(),
    subject: v.string(),
    class: v.string(),
    dueDate: v.string(),
    teacherId: v.id("users"),
    status: v.optional(v.string()), // For demo display
  }).index("by_class", ["class"]),

  submissions: defineTable({
    taskId: v.id("tasks"),
    studentId: v.id("users"),
    status: v.string(), // "Selesai", "Belum Selesai"
    score: v.optional(v.number()),
  }),

  grades: defineTable({
    studentId: v.id("users"),
    studentName: v.string(),
    class: v.string(),
    subject: v.string(),
    type: v.string(), // "Tugas", "Ujian Harian", etc.
    assignmentName: v.string(),
    score: v.optional(v.number()),
    date: v.string(),
  })
    .index("by_studentId", ["studentId"])
    .index("by_class", ["class"]),

  forumPosts: defineTable({
    authorId: v.id("users"),
    content: v.string(),
    createdAt: v.number(),
  }),

  forumComments: defineTable({
    postId: v.id("forumPosts"),
    authorId: v.id("users"),
    content: v.string(),
    createdAt: v.number(),
  }),

  systemActivities: defineTable({
    time: v.string(),
    user: v.string(),
    action: v.string(),
    detail: v.string(),
  }),
});

// convex/seed.ts
import { mutation } from "./_generated/server";
import { data } from "./seed_data";
import { DataModel } from "./_generated/dataModel";

// This is the main seeder function. It checks if data exists and only seeds if the DB is empty.
export const seedDatabase = mutation({
  handler: async (ctx) => {
    const anyUser = await ctx.db.query("users").first();
    if (anyUser) {
      console.log("Database has already been seeded. Aborting.");
      return "Database already seeded.";
    }

    console.log("Seeding database with initial data...");

    // --- Seed Users ---
    // Using {...} creates a mutable copy, solving the "readonly" array issue from `as const`.
    const adminUser = await ctx.db.insert("users", { ...data.users.admin[0] });
    const guruUser = await ctx.db.insert("users", {
      ...data.users.guru[0],
      classes: data.users.guru[0].classes.concat(),
    });

    const studentUserIds = await Promise.all(
      data.users.siswa.map((s) => ctx.db.insert("users", { ...s }))
    );
    const studentUser1Id = studentUserIds[0];

    // --- Seed Classes ---
    await Promise.all(
      data.classes.map((c) => ctx.db.insert("classes", { ...c }))
    );

    // --- Seed Tasks (linking to the created guru user ID) ---
    const taskIds = await Promise.all(
      data.tasks.map((t) =>
        ctx.db.insert("tasks", { ...t, teacherId: guruUser })
      )
    );

    // --- Seed Submissions (linking to the first task and first student) ---
    if (taskIds.length > 0 && studentUser1Id) {
      await Promise.all(
        data.submissions.map((s) =>
          ctx.db.insert("submissions", {
            ...s,
            taskId: taskIds[0],
            studentId: studentUser1Id,
          })
        )
      );
    }

    // --- Seed Grades (linking to student users) ---
    await Promise.all(
      data.grades.map((g, i) =>
        ctx.db.insert("grades", {
          ...g,
          // Alternate between a few students for variety
          studentId: studentUserIds[i % studentUserIds.length],
        })
      )
    );

    // --- Seed Forum and Activities ---
    await Promise.all(
      data.forumPosts.map((p) =>
        ctx.db.insert("forumPosts", {
          ...p,
          authorId: guruUser, // Example author ID
        })
      )
    );
    await Promise.all(
      data.systemActivities.map((a) =>
        ctx.db.insert("systemActivities", { ...a })
      )
    );

    return "Database seeded successfully!";
  },
});

// A separate, explicit mutation to clear the database.
// This is safer than bundling it with the seeder.
export const clearDatabase = mutation({
  handler: async (ctx) => {
    console.log("Clearing all data from the database...");

    // This is the corrected part.
    // `keyof DataModel` correctly resolves to a union of your table names:
    // "users" | "classes" | "tasks" | ...
    const tables: (keyof DataModel)[] = [
      "users",
      "classes",
      "tasks",
      "submissions",
      "grades",
      "forumPosts",
      "forumComments",
      "systemActivities",
    ];

    for (const tableName of tables) {
      // The `as any` is no longer strictly needed here because `query` expects `keyof DataModel`
      // but we keep it for simplicity in case of complex scenarios.
      const documents = await ctx.db.query(tableName as any).collect();
      await Promise.all(documents.map((doc) => ctx.db.delete(doc._id)));

      // This now works because TypeScript knows `tableName` is a string literal union.
      console.log(`Cleared ${documents.length} documents from ${tableName}`);
    }

    console.log("Database cleared successfully.");
    return "Database cleared.";
  },
});

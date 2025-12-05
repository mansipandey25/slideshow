import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const members = pgTable("members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  avatar: text("avatar"),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
  isActive: boolean("is_active").notNull().default(true),
});

export const exercises = pgTable("exercises", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  caloriesPerMinute: real("calories_per_minute").notNull(),
  properFormTips: text("proper_form_tips").array().notNull(),
  commonMistakes: text("common_mistakes").array().notNull(),
});

export const workoutSessions = pgTable("workout_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  memberId: varchar("member_id").notNull(),
  exerciseId: varchar("exercise_id").notNull(),
  startTime: timestamp("start_time").notNull().defaultNow(),
  endTime: timestamp("end_time"),
  duration: integer("duration"),
  reps: integer("reps").notNull().default(0),
  caloriesBurned: real("calories_burned").notNull().default(0),
  averagePostureAccuracy: real("average_posture_accuracy").notNull().default(0),
  postureScores: real("posture_scores").array().notNull().default(sql`ARRAY[]::real[]`),
  status: text("status").notNull().default('in_progress'),
});

export const insertMemberSchema = createInsertSchema(members).omit({
  id: true,
  joinedAt: true,
});

export const insertExerciseSchema = createInsertSchema(exercises).omit({
  id: true,
});

export const insertWorkoutSessionSchema = createInsertSchema(workoutSessions).omit({
  id: true,
  startTime: true,
});

export const updateWorkoutSessionSchema = z.object({
  endTime: z.date().optional(),
  duration: z.number().optional(),
  reps: z.number().optional(),
  caloriesBurned: z.number().optional(),
  averagePostureAccuracy: z.number().optional(),
  postureScores: z.array(z.number()).optional(),
  status: z.enum(['in_progress', 'completed', 'paused']).optional(),
});

export type Member = typeof members.$inferSelect;
export type InsertMember = z.infer<typeof insertMemberSchema>;

export type Exercise = typeof exercises.$inferSelect;
export type InsertExercise = z.infer<typeof insertExerciseSchema>;

export type WorkoutSession = typeof workoutSessions.$inferSelect;
export type InsertWorkoutSession = z.infer<typeof insertWorkoutSessionSchema>;
export type UpdateWorkoutSession = z.infer<typeof updateWorkoutSessionSchema>;

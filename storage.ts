import {
  type Member,
  type InsertMember,
  type Exercise,
  type InsertExercise,
  type WorkoutSession,
  type InsertWorkoutSession,
  type UpdateWorkoutSession,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getMembers(): Promise<Member[]>;
  getMember(id: string): Promise<Member | undefined>;
  getMemberByEmail(email: string): Promise<Member | undefined>;
  createMember(member: InsertMember): Promise<Member>;
  updateMember(id: string, member: Partial<Member>): Promise<Member | undefined>;

  getExercises(): Promise<Exercise[]>;
  getExercise(id: string): Promise<Exercise | undefined>;
  createExercise(exercise: InsertExercise): Promise<Exercise>;
  updateExercise(id: string, exercise: Partial<Exercise>): Promise<Exercise | undefined>;

  getSessions(): Promise<WorkoutSession[]>;
  getSession(id: string): Promise<WorkoutSession | undefined>;
  getSessionsByMember(memberId: string): Promise<WorkoutSession[]>;
  createSession(session: InsertWorkoutSession): Promise<WorkoutSession>;
  updateSession(id: string, session: UpdateWorkoutSession): Promise<WorkoutSession | undefined>;
}

export class MemStorage implements IStorage {
  private members: Map<string, Member>;
  private exercises: Map<string, Exercise>;
  private sessions: Map<string, WorkoutSession>;

  constructor() {
    this.members = new Map();
    this.exercises = new Map();
    this.sessions = new Map();
    this.seedData();
  }

  private seedData() {
    const member1: Member = {
      id: randomUUID(),
      name: "Alex Johnson",
      email: "alex@example.com",
      avatar: "",
      joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      isActive: true,
    };
    const member2: Member = {
      id: randomUUID(),
      name: "Sarah Chen",
      email: "sarah@example.com",
      avatar: "",
      joinedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      isActive: true,
    };
    const member3: Member = {
      id: randomUUID(),
      name: "Mike Williams",
      email: "mike@example.com",
      avatar: "",
      joinedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      isActive: true,
    };

    this.members.set(member1.id, member1);
    this.members.set(member2.id, member2);
    this.members.set(member3.id, member3);

    const exercise1: Exercise = {
      id: randomUUID(),
      name: "Push-ups",
      description: "A classic upper body exercise that targets chest, shoulders, and triceps",
      category: "strength",
      difficulty: "beginner",
      caloriesPerMinute: 7.0,
      properFormTips: [
        "Keep your body in a straight line",
        "Lower until chest nearly touches the ground",
        "Push back up to starting position",
      ],
      commonMistakes: [
        "Sagging hips",
        "Flared elbows",
        "Not going deep enough",
      ],
    };

    const exercise2: Exercise = {
      id: randomUUID(),
      name: "Squats",
      description: "Lower body exercise targeting quads, hamstrings, and glutes",
      category: "strength",
      difficulty: "beginner",
      caloriesPerMinute: 8.0,
      properFormTips: [
        "Feet shoulder-width apart",
        "Lower until thighs are parallel to ground",
        "Keep chest up and core engaged",
      ],
      commonMistakes: [
        "Knees caving inward",
        "Heels lifting off ground",
        "Leaning too far forward",
      ],
    };

    const exercise3: Exercise = {
      id: randomUUID(),
      name: "Burpees",
      description: "Full body cardio exercise combining squat, plank, and jump",
      category: "cardio",
      difficulty: "intermediate",
      caloriesPerMinute: 12.0,
      properFormTips: [
        "Start in standing position",
        "Drop to plank position",
        "Do a push-up, then jump feet to hands",
        "Jump up explosively",
      ],
      commonMistakes: [
        "Skipping the push-up",
        "Poor plank form",
        "Landing heavily on jump",
      ],
    };

    const exercise4: Exercise = {
      id: randomUUID(),
      name: "Plank",
      description: "Core strengthening isometric exercise",
      category: "strength",
      difficulty: "beginner",
      caloriesPerMinute: 5.0,
      properFormTips: [
        "Maintain straight line from head to heels",
        "Engage core muscles",
        "Keep elbows under shoulders",
      ],
      commonMistakes: [
        "Hips sagging",
        "Hips too high",
        "Holding breath",
      ],
    };

    const exercise5: Exercise = {
      id: randomUUID(),
      name: "Lunges",
      description: "Lower body exercise for legs and glutes",
      category: "strength",
      difficulty: "intermediate",
      caloriesPerMinute: 6.5,
      properFormTips: [
        "Step forward with one leg",
        "Lower hips until both knees at 90 degrees",
        "Push back to starting position",
      ],
      commonMistakes: [
        "Front knee over toes",
        "Leaning forward too much",
        "Short range of motion",
      ],
    };

    this.exercises.set(exercise1.id, exercise1);
    this.exercises.set(exercise2.id, exercise2);
    this.exercises.set(exercise3.id, exercise3);
    this.exercises.set(exercise4.id, exercise4);
    this.exercises.set(exercise5.id, exercise5);

    const now = new Date();
    const session1: WorkoutSession = {
      id: randomUUID(),
      memberId: member1.id,
      exerciseId: exercise1.id,
      startTime: new Date(now.getTime() - 3 * 60 * 60 * 1000),
      endTime: new Date(now.getTime() - 2.5 * 60 * 60 * 1000),
      duration: 1800,
      reps: 50,
      caloriesBurned: 210,
      averagePostureAccuracy: 87,
      postureScores: [85, 88, 86, 89, 87],
      status: "completed",
    };

    const session2: WorkoutSession = {
      id: randomUUID(),
      memberId: member2.id,
      exerciseId: exercise2.id,
      startTime: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      endTime: new Date(now.getTime() - 1.5 * 60 * 60 * 1000),
      duration: 1500,
      reps: 40,
      caloriesBurned: 200,
      averagePostureAccuracy: 92,
      postureScores: [90, 93, 91, 94, 92],
      status: "completed",
    };

    const session3: WorkoutSession = {
      id: randomUUID(),
      memberId: member3.id,
      exerciseId: exercise3.id,
      startTime: new Date(now.getTime() - 1 * 60 * 60 * 1000),
      endTime: new Date(now.getTime() - 0.5 * 60 * 60 * 1000),
      duration: 1200,
      reps: 30,
      caloriesBurned: 240,
      averagePostureAccuracy: 78,
      postureScores: [75, 80, 77, 79, 78],
      status: "completed",
    };

    this.sessions.set(session1.id, session1);
    this.sessions.set(session2.id, session2);
    this.sessions.set(session3.id, session3);
  }

  async getMembers(): Promise<Member[]> {
    return Array.from(this.members.values());
  }

  async getMember(id: string): Promise<Member | undefined> {
    return this.members.get(id);
  }

  async getMemberByEmail(email: string): Promise<Member | undefined> {
    return Array.from(this.members.values()).find((m) => m.email === email);
  }

  async createMember(insertMember: InsertMember): Promise<Member> {
    const id = randomUUID();
    const member: Member = {
      id,
      name: insertMember.name,
      email: insertMember.email,
      avatar: insertMember.avatar || null,
      joinedAt: new Date(),
      isActive: insertMember.isActive ?? true,
    };
    this.members.set(id, member);
    return member;
  }

  async updateMember(id: string, updates: Partial<Member>): Promise<Member | undefined> {
    const member = this.members.get(id);
    if (!member) return undefined;
    
    const updated = { ...member, ...updates };
    this.members.set(id, updated);
    return updated;
  }

  async getExercises(): Promise<Exercise[]> {
    return Array.from(this.exercises.values());
  }

  async getExercise(id: string): Promise<Exercise | undefined> {
    return this.exercises.get(id);
  }

  async createExercise(insertExercise: InsertExercise): Promise<Exercise> {
    const id = randomUUID();
    const exercise: Exercise = {
      ...insertExercise,
      id,
    };
    this.exercises.set(id, exercise);
    return exercise;
  }

  async updateExercise(id: string, updates: Partial<Exercise>): Promise<Exercise | undefined> {
    const exercise = this.exercises.get(id);
    if (!exercise) return undefined;
    
    const updated = { ...exercise, ...updates };
    this.exercises.set(id, updated);
    return updated;
  }

  async getSessions(): Promise<WorkoutSession[]> {
    return Array.from(this.sessions.values());
  }

  async getSession(id: string): Promise<WorkoutSession | undefined> {
    return this.sessions.get(id);
  }

  async getSessionsByMember(memberId: string): Promise<WorkoutSession[]> {
    return Array.from(this.sessions.values()).filter((s) => s.memberId === memberId);
  }

  async createSession(insertSession: InsertWorkoutSession): Promise<WorkoutSession> {
    const id = randomUUID();
    const session: WorkoutSession = {
      id,
      memberId: insertSession.memberId,
      exerciseId: insertSession.exerciseId,
      startTime: new Date(),
      endTime: null,
      duration: null,
      reps: insertSession.reps ?? 0,
      caloriesBurned: insertSession.caloriesBurned ?? 0,
      averagePostureAccuracy: insertSession.averagePostureAccuracy ?? 0,
      postureScores: [],
      status: insertSession.status ?? "in_progress",
    };
    this.sessions.set(id, session);
    return session;
  }

  async updateSession(id: string, updates: UpdateWorkoutSession): Promise<WorkoutSession | undefined> {
    const session = this.sessions.get(id);
    if (!session) return undefined;
    
    const updated = { ...session, ...updates };
    this.sessions.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();

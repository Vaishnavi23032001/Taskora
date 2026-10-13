import mongoose from "mongoose";

// TODO: Define Skill schema with topics, milestones, and sessions
const skillSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: "general",
    },
    currentLevel: {
      type: String,
      default: "Beginner",
    },
    targetLevel: {
      type: String,
      default: "Advanced",
    },
    targetDate: {
      type: Date,
    },
    weeklyTargetHours: {
      type: Number,
      default: 5,
    },
    status: {
      type: String,
      enum: ["active", "paused", "archived", "completed"],
      default: "active",
    },
    topics: [
      {
        title: { type: String, required: true },
        isCompleted: { type: Boolean, default: false },
      },
    ],
    milestones: [
      {
        title: { type: String, required: true },
        dueDate: { type: Date },
        isCompleted: { type: Boolean, default: false },
      },
    ],
    sessions: [
      {
        date: { type: Date, default: Date.now },
        durationMinutes: { type: Number, required: true },
        notes: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);

import mongoose from "mongoose";

// TODO: Define Habit schema with user reference, name, category, icon, frequency, target, streaks, XP
const habitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: "general",
    },
    icon: {
      type: String,
      default: "🌱",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly"],
      default: "daily",
    },
    targetDaysPerWeek: {
      type: Number,
      default: 7,
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
    longestStreak: {
      type: Number,
      default: 0,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    checkIns: [
      {
        date: { type: String, required: true }, // YYYY-MM-DD
        completedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Habit", habitSchema);

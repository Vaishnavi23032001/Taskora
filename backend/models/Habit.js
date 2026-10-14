import mongoose from "mongoose";

const checkInSchema = new mongoose.Schema(
  {
    date: {
      type: String, // YYYY-MM-DD format
      required: true,
      trim: true,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

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
      required: [true, "Habit name is required"],
      trim: true,
      minlength: [1, "Habit name cannot be empty"],
      maxlength: [100, "Habit name cannot exceed 100 characters"],
    },
    type: {
      type: String,
      enum: {
        values: ["positive", "negative"],
        message: "Habit type must be either 'positive' or 'negative'",
      },
      default: "positive",
      index: true,
    },
    category: {
      type: String,
      default: "general",
      trim: true,
    },
    icon: {
      type: String,
      default: "🌱",
      trim: true,
    },
    frequency: {
      type: String,
      enum: {
        values: ["daily", "weekly"],
        message: "Frequency must be 'daily' or 'weekly'",
      },
      default: "daily",
    },
    targetDaysPerWeek: {
      type: Number,
      default: 7,
      min: [1, "Target days must be at least 1"],
      max: [7, "Target days cannot exceed 7"],
    },
    color: {
      type: String,
      default: "#6366f1",
      trim: true,
    },
    currentStreak: {
      type: Number,
      default: 0,
      min: 0,
    },
    longestStreak: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalCompletions: {
      type: Number,
      default: 0,
      min: 0,
    },
    isArchived: {
      type: Boolean,
      default: false,
      index: true,
    },
    checkIns: [checkInSchema],
  },
  {
    timestamps: true,
  }
);

// Compound index for user habit queries
habitSchema.index({ user: 1, isArchived: 1, type: 1 });
habitSchema.index({ user: 1, "checkIns.date": 1 });

const Habit = mongoose.model("Habit", habitSchema);

export default Habit;

import mongoose from "mongoose";

// TODO: Define Achievement schema for shared badge milestones
const achievementSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    badgeKey: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    icon: {
      type: String,
      default: "🏆",
    },
    module: {
      type: String,
      enum: ["habits", "skills", "journal", "general"],
      default: "general",
    },
    unlockedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Achievement", achievementSchema);

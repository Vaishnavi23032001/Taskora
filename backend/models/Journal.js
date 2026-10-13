import mongoose from "mongoose";

// TODO: Define Journal schema with title, text, date, mood, gratitude, and tags
const journalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
    },
    mood: {
      type: Number,
      min: 1,
      max: 5, // 1 to 5 scale
      required: true,
    },
    gratitude: [
      {
        type: String,
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    entryDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Journal", journalSchema);

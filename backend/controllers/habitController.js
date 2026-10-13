import Habit from "../models/Habit.js";

// @desc    Get all habits for current user
// @route   GET /api/habits
export const getHabits = async (req, res, next) => {
  try {
    const habits = await Habit.find({ user: req.user._id, isArchived: false });
    res.status(200).json({ success: true, data: habits });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new habit
// @route   POST /api/habits
export const createHabit = async (req, res, next) => {
  try {
    // TODO: Validate and create habit for req.user._id
    res.status(201).json({ success: true, message: "Habit created" });
  } catch (error) {
    next(error);
  }
};

// @desc    Check-in / toggle habit completion
// @route   POST /api/habits/:id/checkin
export const checkInHabit = async (req, res, next) => {
  try {
    // TODO: Update streaks, completions, and XP
    res.status(200).json({ success: true, message: "Habit check-in recorded" });
  } catch (error) {
    next(error);
  }
};

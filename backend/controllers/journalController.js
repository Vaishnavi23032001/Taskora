import Journal from "../models/Journal.js";

// @desc    Get all journal entries for current user
// @route   GET /api/journal
export const getJournalEntries = async (req, res, next) => {
  try {
    const entries = await Journal.find({ user: req.user._id }).sort({ entryDate: -1 });
    res.status(200).json({ success: true, data: entries });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new journal entry or mood check-in
// @route   POST /api/journal
export const createJournalEntry = async (req, res, next) => {
  try {
    // TODO: Create journal entry for req.user._id
    res.status(201).json({ success: true, message: "Journal entry created" });
  } catch (error) {
    next(error);
  }
};

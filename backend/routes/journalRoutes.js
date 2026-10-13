import express from "express";
import { getJournalEntries, createJournalEntry } from "../controllers/journalController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getJournalEntries).post(createJournalEntry);

export default router;

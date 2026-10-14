import express from "express";
import {
  getHabits,
  getHabitById,
  createHabit,
  updateHabit,
  deleteHabit,
  checkInHabit,
  getHabitOverview,
  getHabitAnalytics,
  getHabitCalendar,
} from "../controllers/habitController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Require authentication for all habit operations
router.use(protect);

// Overview, Analytics, and Calendar endpoints (placed before :id param)
router.get("/overview", getHabitOverview);
router.get("/analytics", getHabitAnalytics);
router.get("/calendar", getHabitCalendar);

// Habit collection CRUD
router.route("/").get(getHabits).post(createHabit);

// Habit individual operations
router
  .route("/:id")
  .get(getHabitById)
  .put(updateHabit)
  .delete(deleteHabit);

// Toggle check-in / complete habit
router.route("/:id/checkin").post(checkInHabit);

export default router;

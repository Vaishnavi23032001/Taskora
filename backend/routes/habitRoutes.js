import express from "express";
import { getHabits, createHabit, checkInHabit } from "../controllers/habitController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // Ensure user is authenticated

router.route("/").get(getHabits).post(createHabit);
router.route("/:id/checkin").post(checkInHabit);

export default router;

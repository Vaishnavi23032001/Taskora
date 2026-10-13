import express from "express";
import { getSkills, createSkill } from "../controllers/skillController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getSkills).post(createSkill);

export default router;

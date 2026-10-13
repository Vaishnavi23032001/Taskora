import Skill from "../models/Skill.js";

// @desc    Get all skills for current user
// @route   GET /api/skills
export const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find({ user: req.user._id });
    res.status(200).json({ success: true, data: skills });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new skill
// @route   POST /api/skills
export const createSkill = async (req, res, next) => {
  try {
    // TODO: Create skill for req.user._id
    res.status(201).json({ success: true, message: "Skill created" });
  } catch (error) {
    next(error);
  }
};

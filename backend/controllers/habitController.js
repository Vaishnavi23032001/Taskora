import Habit from "../models/Habit.js";
import User from "../models/User.js";

// Helper: Calculate streak info
export const calculateHabitStreaks = (checkIns = [], anchorDateStr = null) => {
  if (!checkIns || checkIns.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // Deduplicate and sort dates ascending
  const uniqueDates = Array.from(new Set(checkIns.map((c) => c.date))).sort();

  if (uniqueDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // Calculate all-time longest streak
  let longestStreak = 1;
  let runningStreak = 1;

  for (let i = 1; i < uniqueDates.length; i++) {
    const prev = new Date(uniqueDates[i - 1] + "T00:00:00Z");
    const curr = new Date(uniqueDates[i] + "T00:00:00Z");
    const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      runningStreak += 1;
    } else {
      runningStreak = 1;
    }

    if (runningStreak > longestStreak) {
      longestStreak = runningStreak;
    }
  }

  // Calculate current streak relative to anchorDateStr (or today)
  const now = anchorDateStr ? new Date(anchorDateStr + "T00:00:00Z") : new Date();
  const todayStr = anchorDateStr || now.toISOString().split("T")[0];

  const yesterdayDate = new Date(now);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayStr = yesterdayDate.toISOString().split("T")[0];

  const lastDate = uniqueDates[uniqueDates.length - 1];

  let currentStreak = 0;
  if (lastDate === todayStr || lastDate === yesterdayStr) {
    currentStreak = 1;
    for (let i = uniqueDates.length - 1; i > 0; i--) {
      const curr = new Date(uniqueDates[i] + "T00:00:00Z");
      const prev = new Date(uniqueDates[i - 1] + "T00:00:00Z");
      const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        currentStreak += 1;
      } else {
        break;
      }
    }
  }

  return {
    currentStreak,
    longestStreak: Math.max(longestStreak, currentStreak),
  };
};

// Helper: Calculate garden stage & thresholds
export const calculateGardenInfo = (xp = 0) => {
  const stages = [
    { name: "Seed", minXP: 0, maxXP: 99, icon: "🌰" },
    { name: "Sprout", minXP: 100, maxXP: 249, icon: "🌱" },
    { name: "Sapling", minXP: 250, maxXP: 499, icon: "🌿" },
    { name: "Blooming", minXP: 500, maxXP: 999, icon: "🌸" },
    { name: "Garden Sanctuary", minXP: 1000, maxXP: Infinity, icon: "🌺" },
  ];

  const current = stages.find((s) => xp >= s.minXP && xp <= s.maxXP) || stages[0];
  const nextStage = stages[stages.indexOf(current) + 1] || null;

  let progressPercent = 100;
  if (nextStage && nextStage.minXP !== Infinity) {
    const stageSpan = nextStage.maxXP - current.minXP + 1;
    const earnedInStage = xp - current.minXP;
    progressPercent = Math.min(100, Math.max(0, Math.round((earnedInStage / stageSpan) * 100)));
  }

  return {
    xp,
    stage: current.name,
    icon: current.icon,
    nextStage: nextStage ? nextStage.name : null,
    nextStageAt: nextStage ? nextStage.minXP : null,
    progressToNextStage: progressPercent,
  };
};

// @desc    Get all habits for current user (with date completion status)
// @route   GET /api/habits
export const getHabits = async (req, res, next) => {
  try {
    const userId = req.user.userId || req.user._id;
    const { date, type, category, search } = req.query;
    const targetDate = date || new Date().toISOString().split("T")[0];

    const filter = {
      user: userId,
      isArchived: false,
    };

    if (type && ["positive", "negative"].includes(type)) {
      filter.type = type;
    }

    if (category) {
      filter.category = category;
    }

    if (search && search.trim()) {
      filter.name = { $regex: search.trim(), $options: "i" };
    }

    const habits = await Habit.find(filter).sort({ createdAt: -1 });

    const formattedHabits = habits.map((habit) => {
      const isCompleted = habit.checkIns.some((c) => c.date === targetDate);
      return {
        _id: habit._id,
        name: habit.name,
        type: habit.type,
        category: habit.category,
        icon: habit.icon,
        frequency: habit.frequency,
        targetDaysPerWeek: habit.targetDaysPerWeek,
        color: habit.color,
        currentStreak: habit.currentStreak,
        longestStreak: habit.longestStreak,
        totalCompletions: habit.totalCompletions || habit.checkIns.length,
        isCompleted,
        createdAt: habit.createdAt,
        updatedAt: habit.updatedAt,
      };
    });

    res.status(200).json({
      success: true,
      count: formattedHabits.length,
      targetDate,
      data: formattedHabits,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single habit by ID
// @route   GET /api/habits/:id
export const getHabitById = async (req, res, next) => {
  try {
    const userId = req.user.userId || req.user._id;
    const habit = await Habit.findOne({ _id: req.params.id, user: userId });

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: "Habit not found",
      });
    }

    res.status(200).json({
      success: true,
      data: habit,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new habit
// @route   POST /api/habits
export const createHabit = async (req, res, next) => {
  try {
    const userId = req.user.userId || req.user._id;
    console.log("POST /api/habits received for user:", userId, "body:", req.body);
    const {
      name,
      type = "positive",
      category = "general",
      icon = "🌱",
      frequency = "daily",
      targetDaysPerWeek = 7,
      color = "#6366f1",
    } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Habit name is required",
      });
    }

    if (!["positive", "negative"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Habit type must be 'positive' or 'negative'",
      });
    }

    const habit = await Habit.create({
      user: userId,
      name: name.trim(),
      type,
      category: category.trim(),
      icon,
      frequency,
      targetDaysPerWeek: Number(targetDaysPerWeek) || 7,
      color,
      currentStreak: 0,
      longestStreak: 0,
      totalCompletions: 0,
      checkIns: [],
    });

    res.status(201).json({
      success: true,
      message: "Habit created successfully",
      data: habit,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a habit
// @route   PUT /api/habits/:id
export const updateHabit = async (req, res, next) => {
  try {
    const userId = req.user.userId || req.user._id;
    const habit = await Habit.findOne({ _id: req.params.id, user: userId });

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: "Habit not found",
      });
    }

    const {
      name,
      type,
      category,
      icon,
      frequency,
      targetDaysPerWeek,
      color,
      isArchived,
    } = req.body;

    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Habit name cannot be empty",
        });
      }
      habit.name = name.trim();
    }

    if (type !== undefined) {
      if (!["positive", "negative"].includes(type)) {
        return res.status(400).json({
          success: false,
          message: "Habit type must be 'positive' or 'negative'",
        });
      }
      habit.type = type;
    }

    if (category !== undefined) habit.category = category.trim();
    if (icon !== undefined) habit.icon = icon;
    if (frequency !== undefined) habit.frequency = frequency;
    if (targetDaysPerWeek !== undefined) {
      habit.targetDaysPerWeek = Math.max(1, Math.min(7, Number(targetDaysPerWeek) || 7));
    }
    if (color !== undefined) habit.color = color;
    if (isArchived !== undefined) habit.isArchived = Boolean(isArchived);

    await habit.save();

    res.status(200).json({
      success: true,
      message: "Habit updated successfully",
      data: habit,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a habit (soft or hard)
// @route   DELETE /api/habits/:id
export const deleteHabit = async (req, res, next) => {
  try {
    const userId = req.user.userId || req.user._id;
    const habit = await Habit.findOne({ _id: req.params.id, user: userId });

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: "Habit not found",
      });
    }

    const soft = req.query.soft === "true";

    if (soft) {
      habit.isArchived = true;
      await habit.save();
    } else {
      await Habit.deleteOne({ _id: habit._id });
    }

    res.status(200).json({
      success: true,
      message: soft ? "Habit archived successfully" : "Habit deleted permanently",
      deletedId: habit._id,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle habit check-in for a specific date (add or remove)
// @route   POST /api/habits/:id/checkin
export const checkInHabit = async (req, res, next) => {
  try {
    const userId = req.user.userId || req.user._id;
    const habit = await Habit.findOne({ _id: req.params.id, user: userId });

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: "Habit not found",
      });
    }

    const todayStr = new Date().toISOString().split("T")[0];
    const targetDate = req.body.date || todayStr;

    // Validate YYYY-MM-DD
    if (!/^\d{4}-\d{2}-\d{2}$/.test(targetDate)) {
      return res.status(400).json({
        success: false,
        message: "Date must be in YYYY-MM-DD format",
      });
    }

    const existingIndex = habit.checkIns.findIndex((c) => c.date === targetDate);
    let isCompleted = false;
    let xpDelta = 0;

    if (existingIndex > -1) {
      // Toggle off (uncheck)
      habit.checkIns.splice(existingIndex, 1);
      habit.totalCompletions = Math.max(0, habit.totalCompletions - 1);
      isCompleted = false;
      xpDelta = -10;
    } else {
      // Toggle on (complete)
      habit.checkIns.push({
        date: targetDate,
        completedAt: new Date(),
      });
      habit.totalCompletions = (habit.totalCompletions || 0) + 1;
      isCompleted = true;
      xpDelta = 10;
    }

    // Recalculate streak
    const { currentStreak, longestStreak } = calculateHabitStreaks(habit.checkIns);
    habit.currentStreak = currentStreak;
    habit.longestStreak = Math.max(habit.longestStreak || 0, longestStreak);

    // Streak bonus if completed and reached milestone (e.g., 7 days)
    if (isCompleted && currentStreak > 0 && currentStreak % 7 === 0) {
      xpDelta += 25; // Milestone streak bonus
    }

    await habit.save();

    // Update user XP & garden stage
    let userXp = 0;
    let gardenInfo = calculateGardenInfo(0);

    const user = await User.findById(userId);
    if (user) {
      user.xp = Math.max(0, (user.xp || 0) + xpDelta);
      gardenInfo = calculateGardenInfo(user.xp);
      user.gardenStage = gardenInfo.stage;
      await user.save();
      userXp = user.xp;
    }

    res.status(200).json({
      success: true,
      message: isCompleted ? "Habit marked complete" : "Habit completion removed",
      isCompleted,
      currentStreak: habit.currentStreak,
      longestStreak: habit.longestStreak,
      totalCompletions: habit.totalCompletions,
      xpDelta,
      userXp,
      garden: gardenInfo,
      data: habit,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard summary / overview statistics
// @route   GET /api/habits/overview
export const getHabitOverview = async (req, res, next) => {
  try {
    const userId = req.user.userId || req.user._id;
    const targetDate = req.query.date || new Date().toISOString().split("T")[0];

    const habits = await Habit.find({ user: userId, isArchived: false });

    const totalHabits = habits.length;
    const completedHabits = habits.filter((h) =>
      h.checkIns.some((c) => c.date === targetDate)
    );
    const completedToday = completedHabits.length;
    const leftToday = Math.max(0, totalHabits - completedToday);
    const todayProgress = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

    const positiveHabits = habits.filter((h) => h.type === "positive");
    const negativeHabits = habits.filter((h) => h.type === "negative");

    const currentStreak = habits.length > 0
      ? Math.max(...habits.map((h) => h.currentStreak || 0), 0)
      : 0;

    const longestStreak = habits.length > 0
      ? Math.max(...habits.map((h) => h.longestStreak || 0), 0)
      : 0;

    const totalCompletions = habits.reduce(
      (acc, h) => acc + (h.totalCompletions || h.checkIns.length || 0),
      0
    );

    const user = await User.findById(userId);
    const userXp = user?.xp || 0;
    const gardenInfo = calculateGardenInfo(userXp);

    res.status(200).json({
      success: true,
      targetDate,
      summary: {
        todayProgress,
        activeHabits: totalHabits,
        completedToday,
        leftToday,
        positiveCount: positiveHabits.length,
        negativeCount: negativeHabits.length,
        currentStreak,
        longestStreak,
        totalCompletions,
      },
      garden: gardenInfo,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get progress chart analytics over time (weekly, monthly, yearly)
// @route   GET /api/habits/analytics
export const getHabitAnalytics = async (req, res, next) => {
  try {
    const userId = req.user.userId || req.user._id;
    const { timeframe = "weekly", habitId = "all", date } = req.query;

    const anchorDate = date ? new Date(date + "T00:00:00Z") : new Date();

    const habitFilter = { user: userId, isArchived: false };
    if (habitId && habitId !== "all") {
      habitFilter._id = habitId;
    }

    const habits = await Habit.find(habitFilter);

    const positiveHabits = habits.filter((h) => h.type === "positive");
    const negativeHabits = habits.filter((h) => h.type === "negative");

    const totalCompletions = habits.reduce(
      (acc, h) => acc + (h.totalCompletions || h.checkIns.length || 0),
      0
    );
    const currentStreak = habits.length > 0
      ? Math.max(...habits.map((h) => h.currentStreak || 0), 0)
      : 0;
    const longestStreak = habits.length > 0
      ? Math.max(...habits.map((h) => h.longestStreak || 0), 0)
      : 0;

    let chartData = [];

    if (timeframe === "weekly") {
      // 7 consecutive days ending on anchorDate
      const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(anchorDate);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split("T")[0];
        const dayLabel = daysOfWeek[d.getUTCDay()];

        const completedPositive = positiveHabits.filter((h) =>
          h.checkIns.some((c) => c.date === dateStr)
        ).length;
        const completedNegative = negativeHabits.filter((h) =>
          h.checkIns.some((c) => c.date === dateStr)
        ).length;
        const totalCompleted = completedPositive + completedNegative;

        const posRate = positiveHabits.length > 0
          ? Math.round((completedPositive / positiveHabits.length) * 100)
          : 0;
        const negRate = negativeHabits.length > 0
          ? Math.round((completedNegative / negativeHabits.length) * 100)
          : 0;
        const overallRate = habits.length > 0
          ? Math.round((totalCompleted / habits.length) * 100)
          : 0;

        chartData.push({
          date: dateStr,
          day: dayLabel,
          completionRate: overallRate,
          positiveRate: posRate,
          negativeRate: negRate,
          completedCount: totalCompleted,
          totalHabits: habits.length,
        });
      }
    } else if (timeframe === "monthly") {
      // 4 weeks breakdown
      for (let w = 3; w >= 0; w--) {
        const endDay = new Date(anchorDate);
        endDay.setDate(endDay.getDate() - w * 7);
        const startDay = new Date(endDay);
        startDay.setDate(startDay.getDate() - 6);

        const startStr = startDay.toISOString().split("T")[0];
        const endStr = endDay.toISOString().split("T")[0];

        let weekCompletions = 0;
        let expectedCompletions = habits.length * 7;

        for (let d = new Date(startDay); d <= endDay; d.setDate(d.getDate() + 1)) {
          const dStr = d.toISOString().split("T")[0];
          weekCompletions += habits.filter((h) =>
            h.checkIns.some((c) => c.date === dStr)
          ).length;
        }

        const rate = expectedCompletions > 0
          ? Math.min(100, Math.round((weekCompletions / expectedCompletions) * 100))
          : 0;

        chartData.push({
          label: `Week ${4 - w}`,
          startDate: startStr,
          endDate: endStr,
          completionRate: rate,
          completedCount: weekCompletions,
        });
      }
    } else if (timeframe === "yearly") {
      // 12 months of current year
      const year = anchorDate.getUTCFullYear();
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ];

      for (let m = 0; m < 12; m++) {
        const prefix = `${year}-${String(m + 1).padStart(2, "0")}`;
        let monthCompletions = 0;

        habits.forEach((h) => {
          monthCompletions += h.checkIns.filter((c) => c.date.startsWith(prefix)).length;
        });

        // Approximate 30 days per month
        const daysInMonth = new Date(year, m + 1, 0).getDate();
        const expected = habits.length * daysInMonth;
        const rate = expected > 0
          ? Math.min(100, Math.round((monthCompletions / expected) * 100))
          : 0;

        chartData.push({
          month: monthNames[m],
          year,
          completionRate: rate,
          completedCount: monthCompletions,
        });
      }
    }

    res.status(200).json({
      success: true,
      timeframe,
      filterHabitId: habitId,
      stats: {
        currentStreak,
        longestStreak,
        totalCompletions,
      },
      chartData,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get monthly calendar completion grid
// @route   GET /api/habits/calendar
export const getHabitCalendar = async (req, res, next) => {
  try {
    const userId = req.user.userId || req.user._id;
    const now = new Date();
    const month = parseInt(req.query.month, 10) || now.getUTCMonth() + 1; // 1-12
    const year = parseInt(req.query.year, 10) || now.getUTCFullYear();

    const habits = await Habit.find({ user: userId, isArchived: false });
    const totalHabits = habits.length;

    const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
    const days = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const completedHabits = habits.filter((h) =>
        h.checkIns.some((c) => c.date === dateStr)
      );
      const completedCount = completedHabits.length;
      const completionRate = totalHabits > 0
        ? Math.round((completedCount / totalHabits) * 100)
        : 0;

      days.push({
        date: dateStr,
        day,
        totalHabits,
        completedCount,
        completionRate,
        isCompleted: completedCount > 0,
      });
    }

    res.status(200).json({
      success: true,
      month,
      year,
      totalHabits,
      days,
    });
  } catch (error) {
    next(error);
  }
};

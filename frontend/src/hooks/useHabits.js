import { useState, useEffect, useCallback } from "react";
import habitService from "../services/habitService.js";

export function useHabits(initialDate = new Date().toISOString().split("T")[0]) {
  const [habits, setHabits] = useState([]);
  const [overview, setOverview] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [calendarData, setCalendarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeframe, setTimeframe] = useState("weekly");
  const [selectedHabitId, setSelectedHabitId] = useState("all");

  // Fetch all habits for the selected date and search filter
  const fetchHabits = useCallback(async (date = selectedDate, search = searchQuery) => {
    try {
      const res = await habitService.getHabits({ date, search });
      if (res.data?.success) {
        setHabits(res.data.data || []);
      }
      return res.data?.data || [];
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to load habits");
      return [];
    }
  }, [selectedDate, searchQuery]);

  // Fetch summary overview & garden info
  const fetchOverview = useCallback(async (date = selectedDate) => {
    try {
      const res = await habitService.getOverview(date);
      if (res.data?.success) {
        setOverview(res.data);
      }
      return res.data;
    } catch (err) {
      console.error("Failed to load overview:", err);
      return null;
    }
  }, [selectedDate]);

  // Fetch chart analytics over time
  const fetchAnalytics = useCallback(async (tf = timeframe, hId = selectedHabitId, date = selectedDate) => {
    try {
      const res = await habitService.getAnalytics({
        timeframe: tf,
        habitId: hId,
        date,
      });
      if (res.data?.success) {
        setAnalytics(res.data);
      }
      return res.data;
    } catch (err) {
      console.error("Failed to load analytics:", err);
      return null;
    }
  }, [timeframe, selectedHabitId, selectedDate]);

  // Fetch calendar month data
  const fetchCalendar = useCallback(async (month, year) => {
    try {
      const res = await habitService.getCalendar({ month, year });
      if (res.data?.success) {
        setCalendarData(res.data);
      }
      return res.data;
    } catch (err) {
      console.error("Failed to load calendar data:", err);
      return null;
    }
  }, []);

  // Reload everything
  const reloadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([
        fetchHabits(),
        fetchOverview(),
        fetchAnalytics(),
      ]);
    } finally {
      setLoading(false);
    }
  }, [fetchHabits, fetchOverview, fetchAnalytics]);

  // Initial load or when selectedDate / timeframe / selectedHabitId changes
  useEffect(() => {
    reloadAll();
  }, [selectedDate, timeframe, selectedHabitId]);

  // Create habit
  const createHabit = async (data) => {
    setActionLoading(true);
    setError(null);
    try {
      const res = await habitService.createHabit(data);
      if (res.data?.success) {
        await reloadAll();
        return { success: true, data: res.data.data };
      }
      return { success: false, message: res.data?.message || "Failed to create habit" };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to create habit";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setActionLoading(false);
    }
  };

  // Update habit
  const updateHabit = async (id, data) => {
    setActionLoading(true);
    setError(null);
    try {
      const res = await habitService.updateHabit(id, data);
      if (res.data?.success) {
        await reloadAll();
        return { success: true, data: res.data.data };
      }
      return { success: false, message: res.data?.message || "Failed to update habit" };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to update habit";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setActionLoading(false);
    }
  };

  // Delete habit
  const deleteHabit = async (id, permanent = true) => {
    setActionLoading(true);
    setError(null);
    try {
      const res = await habitService.deleteHabit(id, { soft: !permanent });
      if (res.data?.success) {
        await reloadAll();
        return { success: true };
      }
      return { success: false, message: res.data?.message || "Failed to delete habit" };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to delete habit";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setActionLoading(false);
    }
  };

  // Toggle habit completion check-in
  const toggleCheckIn = async (id, date = selectedDate) => {
    // Optimistic UI update
    setHabits((prev) =>
      prev.map((h) => {
        if (h._id === id) {
          const nextCompleted = !h.isCompleted;
          const streakDelta = nextCompleted ? 1 : Math.max(0, h.currentStreak - 1);
          return {
            ...h,
            isCompleted: nextCompleted,
            currentStreak: nextCompleted ? h.currentStreak + 1 : streakDelta,
          };
        }
        return h;
      })
    );

    try {
      const res = await habitService.toggleCheckIn(id, date);
      if (res.data?.success) {
        // Refresh overview and analytics in background
        fetchOverview();
        fetchAnalytics();
        return { success: true, data: res.data };
      }
      // Revert if response unsuccessful
      await fetchHabits();
      return { success: false };
    } catch (err) {
      // Revert on failure
      await fetchHabits();
      const msg = err.response?.data?.message || err.message || "Failed to check in habit";
      setError(msg);
      return { success: false, message: msg };
    }
  };

  return {
    habits,
    overview,
    analytics,
    calendarData,
    loading,
    actionLoading,
    error,
    setError,
    selectedDate,
    setSelectedDate,
    searchQuery,
    setSearchQuery,
    timeframe,
    setTimeframe,
    selectedHabitId,
    setSelectedHabitId,
    fetchHabits,
    fetchOverview,
    fetchAnalytics,
    fetchCalendar,
    reloadAll,
    createHabit,
    updateHabit,
    deleteHabit,
    toggleCheckIn,
  };
}

export default useHabits;

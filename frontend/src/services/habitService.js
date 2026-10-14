import api from "./api";

export const habitService = {
  // Habit CRUD
  getHabits: (params = {}) => api.get("/habits", { params }),
  getHabitById: (id) => api.get(`/habits/${id}`),
  createHabit: (data) => api.post("/habits", data),
  updateHabit: (id, data) => api.put(`/habits/${id}`, data),
  deleteHabit: (id, params = {}) => api.delete(`/habits/${id}`, { params }),

  // Daily check-in / toggle completion
  toggleCheckIn: (id, date) => api.post(`/habits/${id}/checkin`, { date }),

  // Dashboard overview & metrics (today's progress, active, streak, garden XP)
  getOverview: (date) => api.get("/habits/overview", { params: { date } }),

  // Progress charts over time (timeframe: 'weekly' | 'monthly' | 'yearly', habitId: 'all' | id)
  getAnalytics: (params = {}) => api.get("/habits/analytics", { params }),

  // Monthly calendar completion grid
  getCalendar: (params = {}) => api.get("/habits/calendar", { params }),
};

export default habitService;

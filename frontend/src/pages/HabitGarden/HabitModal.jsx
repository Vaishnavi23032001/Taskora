import React, { useState, useEffect } from "react";
import Modal from "../../components/common/Modal.jsx";
import Button from "../../components/common/Button.jsx";

const PRESET_ICONS = {
  positive: ["💧", "📖", "🏃", "🧘", "🥗", "💤", "🎯", "🌿", "🧠", "🍎", "✍️", "💪"],
  negative: ["🚭", "🍷", "📱", "☕", "🍔", "🎮", "🛑", "🕒", "🍬", "🧂"],
};

export default function HabitModal({
  isOpen,
  onClose,
  initialData = null,
  defaultType = "positive",
  onSubmit,
  onDelete,
  loading = false,
}) {
  const isEditMode = Boolean(initialData && initialData._id);

  const [formData, setFormData] = useState({
    name: "",
    type: defaultType,
    category: "general",
    icon: "🌱",
    frequency: "daily",
    targetDaysPerWeek: 7,
  });

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        type: initialData.type || "positive",
        category: initialData.category || "general",
        icon: initialData.icon || (initialData.type === "negative" ? "🚭" : "🌱"),
        frequency: initialData.frequency || "daily",
        targetDaysPerWeek: initialData.targetDaysPerWeek || 7,
      });
    } else {
      setFormData({
        name: "",
        type: defaultType,
        category: defaultType === "negative" ? "quit" : "routine",
        icon: defaultType === "negative" ? "🚭" : "🌱",
        frequency: "daily",
        targetDaysPerWeek: 7,
      });
    }
    setConfirmDelete(false);
    setValidationError("");
  }, [initialData, defaultType, isOpen]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (validationError) setValidationError("");
  };

  const handleTypeChange = (newType) => {
    setFormData((prev) => ({
      ...prev,
      type: newType,
      icon:
        prev.icon === "🌱" && newType === "negative"
          ? "🚭"
          : prev.icon === "🚭" && newType === "positive"
          ? "🌱"
          : prev.icon,
    }));
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!formData.name || !formData.name.trim()) {
      setValidationError("Please enter a habit title");
      return;
    }
    const payload = {
      ...formData,
      name: formData.name.trim(),
      targetDaysPerWeek: Number(formData.targetDaysPerWeek) || 7,
    };
    const res = await onSubmit(payload);
    if (res?.success) {
      console.log("Habit saved successfully:", res);
      onClose();
    } else {
      setValidationError(res?.message || "Failed to save habit. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    if (onDelete && initialData?._id) {
      const res = await onDelete(initialData._id);
      if (res?.success) {
        onClose();
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Habit" : "Create New Habit"}
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {validationError && (
          <div className="rounded-2xl bg-red-50 p-3 text-xs font-semibold text-red-600 border border-red-200">
            {validationError}
          </div>
        )}

        {/* Habit Type Switcher */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Habit Type
          </label>
          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-purple-50/50 p-1 border border-purple-100">
            <button
              type="button"
              onClick={() => handleTypeChange("positive")}
              className={`rounded-xl py-2 text-xs font-bold transition-all ${
                formData.type === "positive"
                  ? "bg-white text-emerald-700 shadow-xs"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              🌱 Positive Habit (Build)
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange("negative")}
              className={`rounded-xl py-2 text-xs font-bold transition-all ${
                formData.type === "negative"
                  ? "bg-white text-purple-700 shadow-xs"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              🚫 Negative Habit (Break)
            </button>
          </div>
        </div>

        {/* Habit Name */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Habit Title
          </label>
          <input
            type="text"
            required
            placeholder={
              formData.type === "positive"
                ? "e.g., Drink Glass Of Water, Read Books"
                : "e.g., Stop Smoking, Stop Drinking"
            }
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full rounded-2xl border border-purple-100 bg-purple-50/30 px-4 py-2.5 text-sm text-gray-800 placeholder-purple-300 outline-none transition focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-200"
          />
        </div>

        {/* Icon & Category Row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Icon Emoji
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                maxLength={4}
                value={formData.icon}
                onChange={(e) => handleChange("icon", e.target.value)}
                className="h-10 w-12 text-center rounded-2xl border border-purple-100 bg-purple-50/30 text-lg outline-none focus:border-purple-400 focus:bg-white"
              />
              <span className="text-[11px] text-gray-400">Pick below or type</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full rounded-2xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-xs text-gray-700 outline-none focus:border-purple-400 focus:bg-white"
            >
              <option value="routine">Routine</option>
              <option value="health">Health & Wellness</option>
              <option value="fitness">Fitness & Exercise</option>
              <option value="learning">Learning & Books</option>
              <option value="mindfulness">Mindfulness</option>
              <option value="quit">Break Habit</option>
              <option value="general">General</option>
            </select>
          </div>
        </div>

        {/* Quick Emoji Presets */}
        <div>
          <label className="block text-[11px] font-semibold text-gray-500 mb-1">
            Suggested Icons
          </label>
          <div className="flex flex-wrap gap-1.5">
            {(PRESET_ICONS[formData.type] || PRESET_ICONS.positive).map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => handleChange("icon", emoji)}
                className={`flex h-8 w-8 items-center justify-center rounded-xl text-sm transition ${
                  formData.icon === emoji
                    ? "bg-purple-100 ring-2 ring-purple-400 scale-105"
                    : "bg-purple-50/60 hover:bg-purple-100/70"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Frequency & Target Days */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Frequency
            </label>
            <select
              value={formData.frequency}
              onChange={(e) => handleChange("frequency", e.target.value)}
              className="w-full rounded-2xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-xs text-gray-700 outline-none focus:border-purple-400 focus:bg-white"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Target (Days per week)
            </label>
            <select
              value={formData.targetDaysPerWeek}
              onChange={(e) => handleChange("targetDaysPerWeek", e.target.value)}
              className="w-full rounded-2xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-xs text-gray-700 outline-none focus:border-purple-400 focus:bg-white"
            >
              <option value={7}>7 days (Everyday)</option>
              <option value={6}>6 days / week</option>
              <option value={5}>5 days / week (5/7)</option>
              <option value={4}>4 days / week</option>
              <option value={3}>3 days / week (3x)</option>
              <option value={2}>2 days / week</option>
              <option value={1}>1 day / week</option>
            </select>
          </div>
        </div>

        {/* Edit Mode Stats Info */}
        {isEditMode && (
          <div className="flex items-center justify-between rounded-2xl bg-purple-50/50 p-3 text-xs border border-purple-100/70">
            <span className="text-gray-500">
              Current Streak:{" "}
              <b className="text-purple-700">{initialData.currentStreak || 0} days</b>
            </span>
            <span className="text-gray-500">
              Longest:{" "}
              <b className="text-purple-700">{initialData.longestStreak || 0} days</b>
            </span>
            <span className="text-gray-500">
              Completed:{" "}
              <b className="text-purple-700">{initialData.totalCompletions || 0} times</b>
            </span>
          </div>
        )}

        {/* Modal Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-purple-50">
          {isEditMode ? (
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className={`rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
                confirmDelete
                  ? "bg-red-600 text-white shadow-md hover:bg-red-700"
                  : "text-red-500 hover:bg-red-50"
              }`}
            >
              {confirmDelete ? "Click to Confirm Delete" : "Delete Habit"}
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading
                ? "Saving..."
                : isEditMode
                ? "Save Changes"
                : "Create Habit"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}


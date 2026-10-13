import { useState, useEffect } from "react";
// import habitService from "../services/habitService";

export function useHabits() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: Implement habit fetching and mutation logic

  return { habits, loading, error, setHabits };
}

export default useHabits;

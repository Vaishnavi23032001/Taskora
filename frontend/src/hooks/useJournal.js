import { useState, useEffect } from "react";
// import journalService from "../services/journalService";

export function useJournal() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: Implement journal entries and mood check-in logic

  return { entries, loading, error, setEntries };
}

export default useJournal;

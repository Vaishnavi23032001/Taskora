import { useState, useEffect } from "react";
// import skillService from "../services/skillService";

export function useSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: Implement skill fetching and tracking logic

  return { skills, loading, error, setSkills };
}

export default useSkills;


import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../services/authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearSession = useCallback(() => {
    sessionStorage.removeItem("bloomspace_token");
    setUser(null);
  }, []);

  const saveSession = useCallback((data) => {
    if (!data?.token || !data?.user) {
      throw new Error("The server returned an invalid authentication response.");
    }

    sessionStorage.setItem("bloomspace_token", data.token);
    setUser(data.user);
  }, []);

  const register = useCallback(async (formData) => {
    const data = await registerUser(formData);
    saveSession(data);
    return data.user;
  }, [saveSession]);

  const login = useCallback(async (formData) => {
    const data = await loginUser(formData);
    saveSession(data);
    return data.user;
  }, [saveSession]);

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  useEffect(() => {
    let cancelled = false;

    const restoreSession = async () => {
      const token = sessionStorage.getItem("bloomspace_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getCurrentUser();

        if (!cancelled) {
          setUser(data.user);
        }
      } catch {
        if (!cancelled) {
          clearSession();
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, [clearSession]);

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

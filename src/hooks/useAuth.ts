import { useState, useEffect, useCallback } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

interface AuthUser {
  _id: Id<"users">;
  name: string;
  role: "admin" | "guru" | "siswa";
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const loginMutation = useMutation(api.auth.login);

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem("lms_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from session storage", error);
      sessionStorage.removeItem("lms_user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async (role: "admin" | "guru" | "siswa") => {
      try {
        const loggedInUser = await loginMutation({ role });
        if (loggedInUser) {
          setUser(loggedInUser);
          sessionStorage.setItem("lms_user", JSON.stringify(loggedInUser));
        }
      } catch (error) {
        console.error("Login failed:", error);
        alert(
          "Login Gagal! Pastikan database sudah di-seed dengan data pengguna."
        );
      }
    },
    [loginMutation]
  );

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("lms_user");
  }, []);

  return { user, login, logout, isLoading };
};

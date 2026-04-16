import { useState, createContext, useContext, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  company: string;
  industry: "Pharma" | "Food" | "Water" | "Cosmetics" | "Industrial" | "OilGas";
  isLoggedIn: boolean;
}

const MOCK_USER: User = {
  id: "u-123",
  name: "Ahmed Al-Farsi",
  company: "Saudi BioTech LLC",
  industry: "Pharma",
  isLoggedIn: true,
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("gl_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, pass: string) => {
    // Mock login delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(MOCK_USER);
    localStorage.setItem("gl_user", JSON.stringify(MOCK_USER));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("gl_user");
  };

  return { user, login, logout, isLoggedIn: !!user };
}

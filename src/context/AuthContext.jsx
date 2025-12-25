import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔹 Load user from localStorage on refresh
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  // 🔹 Signup
  const signup = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // 🔹 Login (FIXED + SAFE)
  const login = (email, password) => {
    const saved = JSON.parse(localStorage.getItem("user"));

    if (!saved) return false;

    if (saved.email === email && saved.password === password) {
      setUser(saved);
      localStorage.setItem("user", JSON.stringify(saved)); // ✅ persist login
      return true;
    }

    return false;
  };

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

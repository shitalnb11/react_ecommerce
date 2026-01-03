import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  // 🔹 SIGNUP
  const signup = (userData) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = {
      id: Date.now(), // ✅ UNIQUE ID
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: "user",
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  };

  // 🔹 LOGIN
  const login = (email, password) => {
    // 👑 ADMIN
    if (email === "admin@gmail.com" && password === "admin123") {
      const adminUser = {
        id: 0, // ✅ ADMIN ID
        name: "Admin",
        email: "admin@gmail.com",
        role: "admin",
      };

      setUser(adminUser);
      localStorage.setItem("currentUser", JSON.stringify(adminUser));
      return adminUser;
    }

    // 👤 USER
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      return foundUser;
    }

    return null;
  };

  // 🔹 LOGOUT
  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

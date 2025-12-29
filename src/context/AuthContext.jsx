import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔹 Load logged-in user
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  // 🔹 SIGNUP (Normal User)
  const signup = (userData) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = {
      ...userData,
      role: "user",
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  };

  const login = (email, password) => {

  // 👑 ADMIN LOGIN (HARDCODED)
  if (email === "admin" && password === "admin123") {
    const adminUser = {
      name: "Admin",
      email: "admin",
      role: "admin",
    };

    setUser(adminUser);
    localStorage.setItem("currentUser", JSON.stringify(adminUser));
    return adminUser;
  }

  // 👤 USER LOGIN
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

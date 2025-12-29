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

  // 🔹 LOGIN (ADMIN + USER)
  const login = (email, password) => {
    // 👑 ADMIN LOGIN
    const admin = JSON.parse(localStorage.getItem("admin"));

    if (
      admin &&
      admin.email === email &&
      admin.password === password
    ) {
      setUser(admin);
      localStorage.setItem("currentUser", JSON.stringify(admin));
      return admin;
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

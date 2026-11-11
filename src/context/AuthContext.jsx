/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser"));
  });

  const register = (userData) => {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find(
      (user) => user.email === userData.email
    );

    if (userExists) {
      return false;
    }

    users.push(userData);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    return true;
  };

  const login = (email, password) => {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (user) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
      );

      setCurrentUser(user);

      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
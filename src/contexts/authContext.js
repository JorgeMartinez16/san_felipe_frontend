import React, { createContext, useEffect, useState } from "react";
import LoginPage from "../auth/LoginPage";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function saveInLocal(user) {
    localStorage.setItem("username", user);
  }

  function getFromLocal() {
    return localStorage.getItem("username");
  }
  function deleteFromlocal() {
    localStorage.removeItem("username");
  }

  useEffect(() => {
    const localUser = getFromLocal();
    if (localUser) setCurrentUser(localUser);
  }, []);

  useEffect(() => {
    currentUser ? saveInLocal(currentUser) : deleteFromlocal();
  }, [currentUser]);
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {currentUser ? children : <LoginPage setCurrentUser={setCurrentUser} />}
    </AuthContext.Provider>
  );
}

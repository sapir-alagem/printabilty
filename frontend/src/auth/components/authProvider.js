import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // Load 'auth' from localStorage only if 'persist' is true
  const storedPersist = JSON.parse(localStorage.getItem("persist")) || false;
  const storedAuth = storedPersist
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  const [auth, setAuth] = useState(storedAuth);
  const [persist, setPersist] = useState(storedPersist);

  useEffect(() => {
    // Save 'auth' state to localStorage only if 'persist' is true
    if (persist) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth, persist]);

  useEffect(() => {
    // Save 'persist' state to localStorage whenever it changes
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

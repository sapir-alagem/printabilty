import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const storedPersist = JSON.parse(localStorage.getItem("persist")) || false;
  const storedAuth = storedPersist
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  const [auth, setAuth] = useState(storedAuth);
  const [persist, setPersist] = useState(storedPersist);

  useEffect(() => {
    if (persist) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth, persist]);

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

import React, { useState } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({ name: "", auth: false });

  const login = (name: string,jwt: string) => {
    setUser({
        name: name,
        auth: true
    });

    localStorage.setItem("jwt",jwt);
  };

  const logout = () => {
      setUser((user) => ({
          name: "",
          auth: false
      }))

      localStorage.removeItem("jwt");
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

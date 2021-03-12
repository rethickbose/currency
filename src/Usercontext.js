import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    });

    const setValue = (value) => {
      try {
        const valueToStore = value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    };
    return [storedValue, setValue];
  }

  const [auth, setAuth] = useLocalStorage("currentUser", {
    isAuthenticated: false,
    name: "",
  });

  const setAuthenticated = (name) => {
    setAuth({
      isAuthenticated: true,
      name: name,
    });
  };

  const setLoggedOut = () => {
    setAuth({
      isAuthenticated: false,
      name: "",
    });
  };

  const [userList, setUserList] = useLocalStorage("allEntry", []);
  const createUser = (name, email, password) => {
    setUserList([...userList, { name, email, password }]);
    setAuthenticated(name);
  };

  const verifyUser = (email, password) => {
    const user = userList.find((e) => {
      return e.email === email && e.password === password;
    });
    if (user !== undefined) {
      setAuthenticated({
        isAuthenticated: true,
        name: user.name,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        userList,
        setLoggedOut,
        createUser,
        setAuthenticated,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

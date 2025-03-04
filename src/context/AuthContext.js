import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

import React from 'react';
const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [inpfil, setFilter] = useState([]);
  // create acccount
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign in
  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // logout
  const logout = () => {
    return signOut(auth);
  };
  // get status
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (curUser) => {
      //    console.log(curUser);
      setUser(curUser);
    });
    return () => {
      unSub();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ createUser, signin, user, logout, setFilter, inpfil }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
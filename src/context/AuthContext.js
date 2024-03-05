"use client";
import { createContext, useState, useEffect, useContext, useRef } from "react";
import { auth, db } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (data) => {
    let { fullName, email, password } = data;

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(userCredential.user, { displayName: fullName });
    setCurrentUser(user);
    return user;
  };

  const login = async (data) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const { displayName, email, uid } = userCredential.user;
    const user = { displayName, email, uid };
    setCurrentUser(user);
    return user;
  };

  const logout = async () => {
    setCurrentUser(null);
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

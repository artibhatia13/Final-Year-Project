import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, firestore } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [role, setRole] = useState("");

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).catch((error) => {
      // Handle the error here
      alert("Invalid login credentials");
      throw new Error("Invalid login credentials");
    });
  };

  const logout = () => {
    return signOut(auth);
  };

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "users"));
      querySnapshot.forEach((doc) => {
        if (user.email === doc.data().email) {
          setRole(doc.data().role);
        }
        console.log(doc.data().user);
      });
    } catch (error) {
      console.error(error);
    }
    return role;
  };

  fetchData();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};

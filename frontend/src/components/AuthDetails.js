import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import {useNavigate} from 'react-router-dom';


const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed Out Successfully");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const navigateToLogIn = () => {
      navigate('/signin')
  };
  return (
    <div>
      {authUser ? (
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
          <button onClick={userSignOut}>Sign Out</button>
        </>
      ) : (
        <>
          <p>Signed Out</p>
          <button onClick={navigateToLogIn}>Log In</button>
        </>
      )}
    </div>
  );
};

export default AuthDetails;

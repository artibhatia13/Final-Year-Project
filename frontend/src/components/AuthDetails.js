import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Button, Box, Text } from "@chakra-ui/react";
import { firestore } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const AuthDetails = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getDocs(collection(firestore, "users")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (user.email === doc.data().email) {
          setRole(doc.data().role)
        }
        console.log(doc.data().user);
      });
    }, []);
  });

  return (
    <Box>
      <Text fontSize="5xl">Your Profile</Text>
      <Text fontSize="lg" mt="2em">
        <span id="text_bold">User Email:</span> {user && user.email}
      </Text>

      <Text fontSize="lg" mt="2em">
        <span id="text_bold">Role: </span> {role}
      </Text>

      <Button
        bg="#99627A"
        color="white"
        mt="1em"
        size="md"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default AuthDetails;

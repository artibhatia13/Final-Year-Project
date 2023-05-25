import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Button, Box, Text, Flex } from "@chakra-ui/react";

const AuthDetails = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };
  const navigateToLogIn = () => {
    navigate("/signin");
  };
  return (
    <Box>
      <Text fontSize="5xl">Your Profile</Text>
      <Text fontSize="lg" mt="2em">
        <span id="text_bold">User Email:</span> {user && user.email}
      </Text>
      <Button
        onClick={handleLogout}
        bg="#99627A"
        color="white"
        mt="1em"
        size="md"
      >
        Logout
      </Button>
    </Box>
  );
};

export default AuthDetails;

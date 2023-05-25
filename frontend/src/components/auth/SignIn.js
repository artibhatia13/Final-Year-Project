import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Input,
  Flex,
  FormControl,
  FormLabel,
  Text,
  Select,
} from "@chakra-ui/react";
import { UserAuth } from "../../context/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };
  return (
    <Flex justify="center" mt="-2em">
      <Box boxShadow="lg" pt="2em" pb="3em" px="4em" borderRadius="lg">
        <Text fontSize="3xl" fontWeight="500">
          Log In
        </Text>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired mt="2em">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email"
              size="lg"
              w="25em"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FormControl>

          <FormControl isRequired mt="6">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              size="lg"
              w="25em"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button
            type="submit"
            bg="#99627A"
            color="white"
            mt="2em"
            mb="10px"
            size="lg"
            w="100%"
          >
            Log In
          </Button>
          <p>
            Don't have an account yet?{" "}
            <Link to="/signup">
              <button style={{ textDecorationLine: "underline" }}>
                Sign Up
              </button>
            </Link>
          </p>
        </form>
      </Box>
    </Flex>
  );
};

export default SignIn;

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

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log(email, password);
    try {
      await createUser(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(error);
    }
  };
  return (
    <>
      <Flex justify="center" mt="-2em">
        <Box boxShadow="lg" pt="2em" pb="3em" px="4em" borderRadius="lg">
          <Text fontSize="3xl" fontWeight="500">
            Create an Account
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
              <FormLabel>Role</FormLabel>
              <Select
                placeholder="Select Role"
                size="lg"
                w="28em"
                onChange={(e) => setRole(e.target.value)}
              >
                <option>Gemstone Producer</option>
                <option>Retail Store Owner</option>
                <option>Certificate Authority</option>
                <option>Customer</option>
              </Select>
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
              Register
            </Button>
          </form>
          <p>
            Already have an account?{" "}
            <Link to="/signin">
              <button style={{ textDecorationLine: "underline" }}>
                Sign In
              </button>
            </Link>
          </p>
        </Box>
      </Flex>
    </>
  );
};

export default SignUp;

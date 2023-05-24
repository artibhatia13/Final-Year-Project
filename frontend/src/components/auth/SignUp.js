import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
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
    try {
      await createUser(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter your role"
          onChange={(e) => setRole(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit">Register</Button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/signin">
          <button style={{ textDecorationLine: "underline" }}>Sign In</button>
        </Link>
      </p>
    </div>
  );
};

export default SignUp;

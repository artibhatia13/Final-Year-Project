import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { UserAuth } from '../../context/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/account')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Log In</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Log In</Button>
      <p>
        Don't have an account yet?{" "}
        <Link to="/signup">
          <button style={{ textDecorationLine: "underline" }}>Sign Up</button>
        </Link>
      </p>
    </form>
  );
};

export default SignIn;

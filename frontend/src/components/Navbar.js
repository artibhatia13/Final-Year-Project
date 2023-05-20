import React from 'react';
import { Flex, Spacer, Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
      <div>
        <Flex p="5" boxShadow="lg">
          <Link to="/">
            <Image src="/logo-main.svg" alt="logo" height="30px" m='2' />
          </Link>
          <Spacer />

          <Flex gap="5" align="center">
            <Link to="/auction">Auction</Link>
            <Link to="/verification">Verification</Link>
            <Spacer />
            <Button bg="#99627A" color="white">
              Sign Up
            </Button>
            <Button bg="#99627A" color="white">
              Log in
            </Button>
          </Flex>
        </Flex>
      </div>
    );
}

export default Navbar;

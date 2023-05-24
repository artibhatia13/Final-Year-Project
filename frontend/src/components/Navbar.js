import React from "react";
import { Flex, Spacer, Button, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Flex px="5em" py="5" boxShadow="lg">
        <Link to="/">
          <Image src="/logo-main.svg" alt="logo" height="35px" m="2" />
        </Link>
        <Spacer />

        <Flex gap="7" align="center">
          <Link to="/auction">
            <Text fontSize="lg">Auction</Text>
          </Link>
          <Link to="/verification">
            <Text fontSize="lg">Verification</Text>
          </Link>
          <Link to="/retailstore">
            <Text fontSize="lg">Retail Store</Text>
          </Link>
          <Spacer />
          <Link to="/signup">
            <Button bg="#99627A" color="white" size="lg">
              Sign Up
            </Button>
          </Link>
          <Link to="/signin">
            <Button bg="#99627A" color="white" size="lg">
              Log in
            </Button>
          </Link>
        </Flex>
      </Flex>
    </div>
  );
};

export default Navbar;

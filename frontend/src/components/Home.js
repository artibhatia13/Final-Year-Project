import React from "react";
import { Link } from "react-router-dom";
import { Text, Image, Flex, Box, Button } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box p="3em" color="#212121" w="80em">
      <Text fontSize="5xl">
        <Flex align="center">
          Welcome to
          <Image
            src="/logo-main.svg"
            alt="logo"
            height="40px"
            mt="4"
            ml="8"
            mr="2"
          />
        </Flex>
      </Text>
      <Text fontSize="2xl" mt="1em">
        We bring together the timeless beauty of gemstones and the cutting-edge
        technology of blockchain and NFTs to revolutionize the way you own and
        certify your precious jewelry. As you step into our world of gemstone
        classification, prepare to embark on a journey that merges tradition
        with innovation.
      </Text>
      <Link to="/classify">
        <Button
          bg="#E46BBB"
          color="white"
          mt="2em"
          size="lg"
          px="2.4em"
          id="btn_gradient"
        >
          Get Started
        </Button>
      </Link>
    </Box>
  );
};

export default Home;

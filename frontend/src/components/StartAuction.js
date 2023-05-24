import React from "react";
import {
  Text,
  Button,
  Box,
  Input,
  Flex,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const StartAuction = () => {
  return (
    <Box>
      <Flex>
        <Box>
          <Text fontSize="2xl" as="b">
            Gemstone Description
          </Text>
          <FormControl isRequired mt="5">
            <FormLabel>Gemstone Name</FormLabel>
            <Input size="lg" w="20em" placeholder="Gemstone Name" />
          </FormControl>
          <FormControl isRequired mt="4">
            <FormLabel>Gem weight</FormLabel>
            <Input size="lg" w="20em" placeholder="Gem weight" />
          </FormControl>
          <FormControl isRequired mt="4">
            <FormLabel>Color/ Clarity</FormLabel>
            <Input size="lg" w="20em" placeholder="Color/ Clarity" />
          </FormControl>
        </Box>

        <Box ml="4em">
          <Text fontSize="2xl" as="b">
            Auction Details
          </Text>
          <FormControl isRequired mt="5">
            <FormLabel>Start Time</FormLabel>
            <Input size="lg" w="20em" placeholder="Start Time" />
          </FormControl>
          <FormControl isRequired mt="4">
            <FormLabel>End Time</FormLabel>
            <Input size="lg" w="20em" placeholder="End Time" />
          </FormControl>
          <FormControl isRequired mt="4">
            <FormLabel>Minimun Bid Amount</FormLabel>
            <Input size="lg" w="20em" placeholder="Minimun Bid Amount" />
          </FormControl>
        </Box>
      </Flex>
      <Link to="/auction">
        <Button bg="#99627A" color="white" mt="2em" size="lg">
          Start Auction
        </Button>
      </Link>
    </Box>
  );
};

export default StartAuction;

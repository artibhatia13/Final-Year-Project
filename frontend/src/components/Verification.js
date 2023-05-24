import React from "react";
import {
  FormControl,
  FormLabel,
  Button,
  Box,
  Input,
  Flex,
  Text,
} from "@chakra-ui/react";

const Verification = () => {
  return (
    <Flex justifyContent="center">
      <Box display="inline-block" boxShadow="lg" rounded="lg" p="3em">
        <Flex justifyContent="center">
          <Text fontSize="2xl" as="b">
            Submit your Jewelry peice for Verification
          </Text>
        </Flex>
        <Flex mt="2em">
          <Box>
            <FormControl isRequired mt="4">
              <FormLabel>Description</FormLabel>
              <Input size="lg" w="20em" placeholder="Description" />
            </FormControl>
            <FormControl isRequired mt="4">
              <FormLabel>Gemstone Used</FormLabel>
              <Input size="lg" w="20em" placeholder="Gemstone Used" />
            </FormControl>
            <FormControl isRequired mt="4">
              <FormLabel>Gross weight</FormLabel>
              <Input size="lg" w="20em" placeholder="Gross weight" />
            </FormControl>
          </Box>
          <Box ml="4em">
            <FormControl isRequired mt="4">
              <FormLabel>Metal Used</FormLabel>
              <Input size="lg" w="20em" placeholder="Metal Used" />
            </FormControl>
            <FormControl isRequired mt="4">
              <FormLabel>Solitaire Shape</FormLabel>
              <Input size="lg" w="20em" placeholder="Solitaire Shape" />
            </FormControl>
            <FormControl isRequired mt="4">
              <FormLabel>Solitaire Color/ Clarity</FormLabel>
              <Input
                size="lg"
                w="20em"
                placeholder="Solitaire Color/ Clarity"
              />
            </FormControl>
          </Box>
        </Flex>
        <Flex justifyContent="center">
          <Button bg="#99627A" color="white" mt="2em" px="1.5em">
            Send Jewelry for Certification
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Verification;

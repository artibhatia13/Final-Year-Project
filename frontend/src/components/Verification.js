import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Button,
  Box,
  Input,
  Flex,
  Text,
} from "@chakra-ui/react";
import GenerateCertificate from "./GenerateCertificate";

const Verification = () => {
  const [description, setDescription] = useState("");
  const [carat, setCarat] = useState("");
  const [gemstoneUsed, setGemstoneUsed] = useState("");
  const [weight, setWeight] = useState("");
  const [solitaireShape, setsolitaireShape] = useState("");
  const [color, setColor] = useState("");
  const [location, setLocation] = useState("");
  // const [generateCertificate, setGenerateCertificate] = useState(false);

  const combinedState = [
    description,
    gemstoneUsed,
    weight,
    solitaireShape,
    carat,
    color,
    location,
  ];

  // const writeStatesToFile = (states, filename) => {
  //   const data = states.join("\n"); // Combine the states with newline separator
  //   const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
  //   saveAs(blob, filename);
  // };

  const isFormFilled =
    description &&
    carat &&
    gemstoneUsed &&
    weight &&
    solitaireShape &&
    color &&
    location;

  const handleClick = () => {
    if (isFormFilled) {
      // writeStatesToFile(combinedState, "certificateData.txt");
      // setGenerateCertificate(true);
      alert('Jewelery sent for verification')
    } else alert("Missing fields in the form");
  };

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
              <Input
                size="lg"
                w="20em"
                placeholder="Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired mt="4">
              <FormLabel>Gemstone Used</FormLabel>
              <Input
                size="lg"
                w="20em"
                placeholder="Gemstone Used"
                onChange={(e) => {
                  setGemstoneUsed(e.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired mt="4">
              <FormLabel>Gemstone Mined Location</FormLabel>
              <Input
                size="lg"
                w="20em"
                placeholder="Gemstone Mined Location"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired mt="4">
              <FormLabel>Gross weight</FormLabel>
              <Input
                size="lg"
                w="20em"
                placeholder="Gross weight"
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
              />
            </FormControl>
          </Box>
          <Box ml="4em">
            <FormControl isRequired mt="4">
              <FormLabel>Solitaire Carat</FormLabel>
              <Input
                size="lg"
                w="20em"
                placeholder="Solitaire Carat"
                onChange={(e) => {
                  setCarat(e.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired mt="4">
              <FormLabel>Solitaire Shape</FormLabel>
              <Input
                size="lg"
                w="20em"
                placeholder="Solitaire Shape"
                onChange={(e) => {
                  setsolitaireShape(e.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired mt="4">
              <FormLabel>Solitaire Color/ Clarity</FormLabel>
              <Input
                size="lg"
                w="20em"
                placeholder="Solitaire Color/ Clarity"
                onChange={(e) => {
                  setColor(e.target.value);
                }}
              />
            </FormControl>
          </Box>
        </Flex>
        <Flex justifyContent="center">
          <Button
            bg="#99627A"
            color="white"
            mt="2em"
            px="1.5em"
            onClick={handleClick}
            disabled={!isFormFilled}
          >
            Send Jewelry for Certification
          </Button>
        </Flex >
        <Flex justifyContent="center" padding={7}>
          {<GenerateCertificate combinedState={combinedState} />}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Verification;

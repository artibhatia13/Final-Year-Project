import React, { useState } from "react";
import { Text, Box, Image, Flex, Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";

const Classify = () => {
  const [prediction, setPrediction] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const uploadImage = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    axios
      .post("http://localhost:5000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setPrediction(response.data.prediction);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box w="70em">
      <Text fontSize="3xl">Unlock the Secrets of Your Gemstone:</Text>
      <Text fontSize="4xl" color="#994e6f">
        Discover, Classify, and Delight with Cutting-Edge AI!
      </Text>
      <Text fontSize="xl" mt="1.5em">
        Capture the beauty of your gemstone and let our advanced machine
        learning algorithm unravel its true identity. Upload an image of your
        gemstone below, and our powerful classification system will harness the
        power of artificial intelligence to determine its precise gemstone
        class.
      </Text>
      <Box>
        <input type="file" onChange={uploadImage} id="file_upload" />

        {imagePreview && (
          <Box mt="2em">
            <Text fontSize="lg">Uploaded Image:</Text>
            <Flex boxShadow="base" align="center" borderRadius="lg" w="44em">
              <Image
                src={imagePreview}
                alt="uploaded image"
                boxSize="12em"
                objectFit="cover"
                border="1px"
                borderColor="gray.200"
                borderRadius="lg"
              />
              <Box p="1em">
                <Text fontSize="lg" mt="-2.5em">
                  Behold, the moment of revelation: Your extraordinary gemstone
                  has been predicted as...
                </Text>
              </Box>
            </Flex>
          </Box>
        )}
        {prediction && (
          <>
            <Text fontSize="xl" id="text_bold" mt="-4em" ml="10.4em">
              {prediction}!
            </Text>
            <Flex justify="end">
              <Link to="/startauction">
                <Button
                  rightIcon={<ArrowForwardIcon />}
                  bg="#ae6f8a"
                  color="white"
                  size="lg"
                  mr="23.1em"
                  mt="2px"
                  borderTopRightRadius="none"
                  borderBottomLeftRadius="none"
                >
                  Start Auction
                </Button>
              </Link>
            </Flex>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Classify;

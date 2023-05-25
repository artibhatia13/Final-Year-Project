import React, { useState } from "react";
import {
  Text,
  Box,
  Image,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import axios from "axios";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import StartAuction from "./StartAuction";

const Classify = () => {
  const [prediction, setPrediction] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [url, setURL] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onPrediction = async () => {
    if (prediction) {
      try {
        const imageRef = ref(storage, `gemstone_images/${prediction + v4()}`);
        const uploadTaskSnapshot = await uploadBytes(imageRef, imageUpload);
        alert("Image Uploaded to Firebase Storage");

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
        console.log("Download URL:", downloadURL);
        setURL(downloadURL);
        // Perform any further actions with the download URL
      } catch (error) {
        console.error("Error uploading image or getting download URL:", error);
      }
    }
  };

  const uploadImage = async (event) => {
    if (imageUpload == null) return;
    const formData = new FormData();
    formData.append("file", imageUpload);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(imageUpload);

    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPrediction(response.data.prediction);
      console.log(prediction);
    } catch (error) {
      console.error(error);
    }

    onPrediction();
  };

  const handleStartAuction = () => {
    // Define the props to pass to the "Start Auction" component
    const auctionProps = {
      // Your props here
    };

    // Open the modal and pass the props
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // Close the modal
    setIsModalOpen(false);
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
      <Box mt="2em">
        <input
          type="file"
          onChange={(e) => {
            setImageUpload(e.target.files[0]);
          }}
        />
        <br />
        <Button
          onClick={uploadImage}
          mt="1em"
          bg="#99627A"
          color="white"
          size="lg"
        >
          Upload Image{" "}
        </Button>

        {imagePreview && (
          <Box mt="2em">
            {/* <Text fontSize="lg">Uploaded Image:</Text> */}
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
              {/* <Link to="/startauction"> */}
              <Button
                rightIcon={<ArrowForwardIcon />}
                bg="#ae6f8a"
                color="white"
                size="lg"
                mr="23.1em"
                mt="2px"
                borderTopRightRadius="none"
                borderBottomLeftRadius="none"
                onClick={handleStartAuction}
              >
                Start Auction
              </Button>
              {/* </Link> */}
            </Flex>
            <Modal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              size="xl"
              scrollBehavior="inside"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Detials Form</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <StartAuction prediction={prediction} url={url} />
                </ModalBody>
                {/* <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
                    Close
                  </Button>
                </ModalFooter> */}
              </ModalContent>
            </Modal>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Classify;

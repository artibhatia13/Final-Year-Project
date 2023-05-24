import React, { useState } from "react";
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
import { UserAuth } from "../context/AuthContext";

const StartAuction = ({ prediction, url }) => {
  const { user } = UserAuth();
  const [gemstoneAuction, setGemstoneAuction] = useState({
    gemName:{prediction},
    gemWeight: "",
    gemColor: "",
    auctionStart: "",
    auctionEnd: "",
    minBidAmount: "",
    gemLocation: "",
  });

  let name, value;

  const postData = (e) => {
    name = e.target.name;
    value = e.target.value;
    setGemstoneAuction({ ...gemstoneAuction, [name]: value });
  };

  const saveToDatabase = async (e) => {
    e.preventDefault();
    const {
      gemName,
      gemWeight,
      gemColor,
      auctionStart,
      auctionEnd,
      minBidAmount,
      gemLocation
    } = gemstoneAuction;
    const email = user.email;
    const isAuctioned = false;
    const bids=0;
    if (
      gemName &&
      gemWeight &&
      gemColor &&
      auctionStart &&
      auctionEnd &&
      minBidAmount &&
      gemLocation
    ) {
      const res = fetch(
        "https://gemstone-ee3f0-default-rtdb.firebaseio.com/gemstoneAuctionRecords.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            gemName,
            gemWeight,
            gemColor,
            gemLocation,
            url,
            auctionStart,
            auctionEnd,
            minBidAmount,
            isAuctioned,
            bids
          }),
        }
      );
      if (res) {
        alert("Auction and gemstone details stored");
      } else {
        alert("Please fill the data");
      }
    } else {
      alert("Please fill the data");
    }
  };

  return (
    <Box>
      <Flex>
        <form method="POST">
          <Box>
            <Text fontSize="2xl" as="b">
              Gemstone Description
            </Text>
            <FormControl isRequired mt="5">
              <FormLabel>Gemstone Name</FormLabel>
              <Input
                size="lg"
                w="20em"
                placeholder="Gemstone Name"
                name="gemName"
                value={prediction}
                onChange={postData}
              />
            </FormControl>
            <FormControl isRequired mt="4">
              <FormLabel>Gem weight</FormLabel>
              <Input
                size="lg"
                w="20em"
                placeholder="Gem weight"
                value={gemstoneAuction.gemWeight}
                onChange={postData}
                name="gemWeight"
              />
            </FormControl>
            <FormControl isRequired mt="4">
              <FormLabel>Color/ Clarity</FormLabel>
              <Input
                size="lg"
                w="20em"
                placeholder="Color/ Clarity"
                value={gemstoneAuction.gemColor}
                onChange={postData}
                name="gemColor"
              />
            </FormControl>
            <FormControl isRequired mt="4">
              <FormLabel>Gem mined location</FormLabel>
              <Input
                size="lg"
                w="20em"
                placeholder="Location"
                value={gemstoneAuction.gemLocation}
                onChange={postData}
                name="gemLocation"
              />
            </FormControl>
          </Box>

          <Box ml="4em">
            <Text fontSize="2xl" as="b">
              Auction Details
            </Text>
            <FormControl isRequired mt="5">
              <FormLabel>Start Time</FormLabel>
              <Input
                size="lg"
                w="20em"
                placeholder="Start Time"
                name="auctionStart"
                value={gemstoneAuction.auctionStart}
                onChange={postData}
              />
            </FormControl>
            <FormControl isRequired mt="4">
              <FormLabel>End Time</FormLabel>
              <Input
                size="lg"
                w="20em"
                placeholder="End Time"
                name="auctionEnd"
                value={gemstoneAuction.auctionEnd}
                onChange={postData}
              />
            </FormControl>
            <FormControl isRequired mt="4">
              <FormLabel>Minimun Bid Amount</FormLabel>
              <Input
                size="lg"
                w="20em"
                placeholder="Minimun Bid Amount"
                name="minBidAmount"
                value={gemstoneAuction.minBidAmount}
                onChange={postData}
              />
            </FormControl>
          </Box>
        </form>
      </Flex>
      <Link to="/auction">
        <Button
          bg="#99627A"
          color="white"
          mt="2em"
          size="lg"
          onClick={saveToDatabase}
        >
          Start Auction
        </Button>
      </Link>
    </Box>
  );
};

export default StartAuction;

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
import { v4 } from "uuid";
import {set, ref} from "firebase/database";
import {db} from "../firebase";

const StartAuction = ({ prediction, url }) => {
  const { user } = UserAuth();
  const [gemstoneAuction, setGemstoneAuction] = useState({
    gemName: prediction,
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
      gemLocation,
    } = gemstoneAuction;
    const email = user.email;
    const isAuctioned = false;
    const bids = 0;
    const highest_bid = 0;
    const id = v4();
    const maxbiduser = "";
    const isGemstone = true;
    const metalUsed = "";
    const grossWt = "";
    const jewelleryUrl = "";
    if (
      gemName &&
      gemWeight &&
      gemColor &&
      auctionStart &&
      auctionEnd &&
      minBidAmount &&
      gemLocation
    ) try {
      set(ref(db, "gemstoneAuctionRecords/" + id), {
        id,
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
        bids,
        highest_bid,
        maxbiduser,
        isGemstone,
        metalUsed,
        grossWt,
        jewelleryUrl
      });
      alert("Auction and gemstone details stored");
    } catch(e) {
      alert(e);
    }
  };

  return (
    <Box ml="3em">
      <form method="POST">
        {/* <Text fontSize="2xl" as="b">
          Gemstone Description
        </Text> */}
        <FormControl isRequired>
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

        {/* <Text fontSize="2xl" as="b" pt="3em">
          Auction Details
        </Text> */}
        <FormControl isRequired mt="5">
          <FormLabel>Auction Start Time</FormLabel>
          {/* <Input
            placeholder="Date and Time"
            size="lg"
            w="20em"
            type="datetime-local"
            name="auctionStart"
            value={gemstoneAuction.auctionStart}
            onChange={postData}
          /> */}
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
          <FormLabel>Auction End Time</FormLabel>
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
      </form>
      <Link to="/auction">
        <Button
          bg="#99627A"
          color="white"
          my="2em"
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

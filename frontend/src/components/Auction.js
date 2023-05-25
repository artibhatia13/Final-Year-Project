import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Image,
  Flex,
  Text,
  Divider,
  Button,
  Spacer,
} from "@chakra-ui/react";
import "../App.css";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

const Card = (item, index) => {
  const {
    auctionEnd,
    auctionStart,
    bids,
    email,
    gemColor,
    gemLocation,
    gemName,
    gemWeight,
    highest_bid,
    id,
    isAuctioned,
    minBidAmount,
    url,
  } = item;

  return (
    <Box boxShadow="lg" borderRadius="lg" key={id} mr="4em">
      <Flex justifyContent="right">
        <Link to={"/auction/" + id}>
          <Button
            bg="#C88EA7"
            color="white"
            size="lg"
            mb="-20px"
            borderBottomEndRadius="none"
          >
            Join Auction
          </Button>
        </Link>
      </Flex>
      <Image
        src={url}
        alt="gem_img"
        w="24em"
        h="20em"
        mt="-1.6em"
        objectFit="cover"
        borderTopRadius="lg"
      />
      <Text fontSize="xl" fontWeight="bold" p="3">
        {gemName.prediction}
      </Text>
      <Divider />
      <Flex p="1em">
        <Box>
          <Text fontSize="xs" as="b">
            {bids} BIDS
          </Text>
          <br />
          <Text fontSize="lg" as="b" color="#643843">
            ${highest_bid}
          </Text>
        </Box>
        <Spacer />
        <Box>
          <Text fontSize="xs" as="b">
            End Time
          </Text>
          <br />
          <Text fontSize="lg" as="b" color="#b71c1c">
            {auctionEnd} hrs
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

const Auction = () => {
  const [gadata, setGAData] = useState([]);

  useEffect(() => {
    const query = ref(db, "gemstoneAuctionRecords/");
    return onValue(
      query,
      (snapshot) => {
        const data = snapshot.val();
        if (snapshot.exists()) {
          console.log(data);
          Object.values(data).map((ga)=>{
            setGAData((gadata)=>[...gadata,ga]);
          })
        } else {
          console.log("Data not found");
        }
      },
    );
  }, []);

  return (
    <Box>
      Auction
      <Flex>{gadata.map((item, index) => Card(item, index))}</Flex>
    </Box>
  );
};

export default Auction;

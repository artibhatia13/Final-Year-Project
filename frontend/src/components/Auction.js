import React from "react";
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

const gem_List = [
  {
    id: 1,
    img: "/gem1.jpg",
    name: "Aventurine Yellow",
    no_of_bid: "12",
    high_bid: "2,00,000",
    time_left: "1:52",
  },
  {
    id: 2,
    img: "/gem2.jpg",
    name: "Benitoite",
    no_of_bid: "35",
    high_bid: "5,40,000",
    time_left: "6:12",
  },
  {
    id: 3,
    img: "/gem3.jpg",
    name: "Carnelian",
    no_of_bid: "28",
    high_bid: "1,93,000",
    time_left: "4:38",
  },
];

const Card = (item) => {
  return (
    <Box boxShadow="lg" borderRadius="lg" key={item.id} mr="4em">
      <Flex justifyContent="right">
        <Link to={"/auction/" + item.id}>
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
        src={item.img}
        alt="gem_img"
        w="24em"
        h="20em"
        mt="-1.6em"
        objectFit="cover"
        borderTopRadius="lg"
      />
      <Text fontSize="xl" fontWeight="bold" p="3">
        {item.name}
      </Text>
      <Divider />
      <Flex p="1em">
        <Box>
          <Text fontSize="xs" as="b">
            {item.no_of_bid} BIDS
          </Text>
          <br />
          <Text fontSize="lg" as="b" color="#643843">
            ${item.high_bid}
          </Text>
        </Box>
        <Spacer />
        <Box>
          <Text fontSize="xs" as="b">
            Time Left
          </Text>
          <br />
          <Text fontSize="lg" as="b" color="#b71c1c">
            {item.time_left} mins
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

const Auction = () => {
  return (
    <Box>
      <Flex>{gem_List.map((item) => Card(item))}</Flex>
    </Box>
  );
};

export default Auction;

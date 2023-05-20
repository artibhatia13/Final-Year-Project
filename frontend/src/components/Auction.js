import React from 'react';
import { Box, Image, Flex, Text, Divider, Button, Spacer } from "@chakra-ui/react";
import '../App.css'

const gem_List = [
  {
    id: 1,
    img: "/gem1.jpg",
    name: "Aventurine Yellow",
    high_bid: "2,00,000",
    time_left: "1:52",
  },
  {
    id: 2,
    img: "/gem2.jpg",
    name: "Benitoite",
    high_bid: "5,40,000",
    time_left: "6:12",
  },
  {
    id: 3,
    img: "/gem3.jpg",
    name: "Carnelian",
    high_bid: "1,93,000",
    time_left: "4:38",
  },
];

const Card = (item) => {
    return (
    <Box boxShadow="lg" w='20em' borderRadius="lg" key={item.id} mx='2em'>
      <Flex justifyContent="right">
        <Button
          bg="#C88EA7"
          color="white"
          size="lg"
          mb="-45px"
          borderBottomEndRadius="none"
        >
          Join Auction
        </Button>
      </Flex>
      <Image
        src={item.img}
                alt="gem_img"
                height='15em'
        objectFit="cover"
        borderTopRadius="lg"
      />
      <Text fontSize="xl" fontWeight="bold" p="3">
        {item.name}
      </Text>
      <Divider />
      <Flex p="3">
        <Box>
          <Text fontSize="xs" as="b">
            12 BIDS
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
}

const Auction = () => {
    return (
      <Box p="5em">
        <Flex>{gem_List.map((item) => Card(item))}</Flex>
      </Box>
    );
}

export default Auction;

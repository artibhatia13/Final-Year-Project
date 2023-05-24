import React from "react";
import { useParams } from "react-router-dom";
import { Box, Image, Flex, Text, Input, Button } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";

const Product = () => {
  const { id } = useParams();

  // Fetch product details based on the ID or use static data
  const product = {
    id: id,
    img: "/gem2.jpg",
    name: "Carnelian",
    weight: "1.2 gm",
    color: "E-F / WS ",
    no_of_bid: "28",
    high_bid: "1,93,000",
    time_left: "3d 6hr 23min",
  };

  return (
    <Box>
      <Flex>
        <Image
          src={product.img}
          alt="gem img"
          boxSize="31em"
          objectFit="cover"
          borderRadius="lg"
          border="1px"
          borderColor="gray.200"
        />
        <Box ml="4em">
          <Text fontSize="5xl" fontWeight="700" mb="1em">
            {product.name}, {product.weight}, {product.color}
          </Text>

          <div id="line"></div>
          <Flex align="center" p="3">
            <TimeIcon boxSize="15px" />
            <Text fontSize="md" fontWeight="600" ml="3">
              Time Left :
              <span style={{ marginLeft: "8px" }}>{product.time_left}</span>
            </Text>
            <Text fontSize="xl" fontWeight="700" ml="3">
              |
            </Text>
            <Text fontSize="md" fontWeight="600" ml="3">
              Bids :
              <span style={{ marginLeft: "8px" }}>{product.no_of_bid}</span>
            </Text>
          </Flex>
          <div id="line"></div>

          <Flex justifyContent="space-between" mt="3em">
            <Text fontSize="xl" fontWeight="700">
              Current Price:
            </Text>
            <Text fontSize="xl" fontWeight="700">
              ${product.high_bid}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" mt="1.5em">
            <Text fontSize="xl">Minimum Bid:</Text>
            <Text fontSize="xl">$98,000</Text>
          </Flex>
          <Flex justifyContent="space-between" mt="2em">
            <Text fontSize="xl">Set Your Maximum Bid:</Text>
            <Input placeholder="Amount" w="15em" size="md" />
          </Flex>

          <Button
            bg="#C88EA7"
            color="white"
            fontSize="2xl"
            fontWeight="700"
            w="100%"
            mt="2em"
            py="1.3em"
          >
            Place My Bid
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Product;

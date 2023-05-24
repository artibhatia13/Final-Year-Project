import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import "../App.css";

const RetailOwnerHomePage = () => {
  return (
    <Box mx="-3em">
      <Text fontSize="3xl">
        Welcome to our exclusive platform for Retail Store Owners!
      </Text>

      <Text fontSize="xl" mt="2" w="70%">
        With our innovative features, you can unlock a world of possibilities
        for your jewelry business. Seamlessly navigate through three remarkable
        tasks:
      </Text>

      <Flex mt="2em">
        <Link to="/auction">
          <Box
            flex="1"
            boxShadow="base"
            borderRadius="lg"
            m="1em"
            ml="0"
            p="2em"
            id="card_hover"
          >
            <Text fontSize="xl" color="#803656" as="b">
              PURCHASE GEMSTONE
            </Text>
            <Text fontSize="xl" mt="3">
              Browse and select the perfect gemstone directly from Gemstone
              Miners, all from the comfort of your fingertips.
            </Text>
            <Flex justifyContent="end">
              <ArrowForwardIcon boxSize={8} color="#994e6f" />
            </Flex>
          </Box>
        </Link>
        <Link to="/verification">
          <Box
            flex="1"
            boxShadow="base"
            m="1em"
            p="2em"
            borderRadius="lg"
            id="card_hover"
          >
            <Text fontSize="xl" color="#994e6f" as="b">
              VERIFY & GET NFTs
            </Text>
            <Text fontSize="xl" mt="3">
              Get your jewelry pieces verified by leading certificate
              authorities and transform your creation into one-of-a-kind digital
              asset.
            </Text>
            <Flex justifyContent="end">
              <ArrowForwardIcon boxSize={8} color="#994e6f" />
            </Flex>
          </Box>
        </Link>
        <Link to="/startauction">
          <Box
            flex="1"
            boxShadow="base"
            m="1em"
            p="2em"
            borderRadius="lg"
            id="card_hover"
          >
            <Text fontSize="xl" color="#994e6f" as="b">
              AUCTION JEWELRY
            </Text>
            <Text fontSize="xl" mt="3">
              Experience the thrill of connecting with a global audience of
              enthusiastic buyers, all vying for your extraordinary jewelry.
            </Text>
            <Flex justifyContent="end">
              <ArrowForwardIcon boxSize={8} color="#994e6f" />
            </Flex>
          </Box>
        </Link>
      </Flex>
    </Box>
  );
};

export default RetailOwnerHomePage;

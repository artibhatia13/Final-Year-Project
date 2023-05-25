import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Image, Flex, Text, Input, Button } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";

const Product = () => {
  const { id } = useParams();
  const [record, setRecord] = useState(null);

  useEffect(() => {
    const getRecordByUniqueField = async (id) => {
      const response = await fetch(
        `https://gemstone-ee3f0-default-rtdb.firebaseio.com/gemstoneAuctionRecords.json?${id}"`
      );
      const data = await response.json();
      const recordId = Object.keys(data)[0];
      const recordData = data[recordId];
      setRecord(recordData);
    };
    getRecordByUniqueField(id);
  }, [id]);

  useEffect(() => {
    if (record) {
      console.log("record", record, record.url);
    }
  }, [record]);

  return (
    <Box>
      {record && (
        <Flex>
          <Image
            src={record.url}
            alt="gem img"
            boxSize="31em"
            objectFit="cover"
            borderRadius="lg"
            border="1px"
            borderColor="gray.200"
          />
          <Box ml="4em">
            <Text fontSize="5xl" fontWeight="700" mb="1em">
              {record.gemName}, {record.gemWeight}, {record.gemColor}
            </Text>

            <div id="line"></div>
            <Flex align="center" p="3">
              <TimeIcon boxSize="15px" />
              <Text fontSize="md" fontWeight="600" ml="3">
                End Time :
                <span style={{ marginLeft: "8px" }}>{record.auctionEnd}</span>
              </Text>
              <Text fontSize="xl" fontWeight="700" ml="3">
                |
              </Text>
              <Text fontSize="md" fontWeight="600" ml="3">
                Bids :
                <span style={{ marginLeft: "8px" }}>{record.bids}</span>
              </Text>
            </Flex>
            <div id="line"></div>

            <Flex justifyContent="space-between" mt="3em">
              <Text fontSize="xl" fontWeight="700">
                Current Price:
              </Text>
              <Text fontSize="xl" fontWeight="700">
                ${record.high_bid}
              </Text>
            </Flex>
            <Flex justifyContent="space-between" mt="1.5em">
              <Text fontSize="xl">Minimum Bid:</Text>
              <Text fontSize="xl">$ {record.minBidAmount}</Text>
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
      )}
    </Box>
  );
};

export default Product;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Image, Flex, Text, Input, Button, useComponentStyles__unstable } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { ref, update, child, get } from "firebase/database";

const Product = () => {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [currentBid, setCurrentBid] = useState(0);
  const { user } = UserAuth();
  const [eAuction, seteAuction] = useState(false);

  useEffect(() => {
    const getRecordByUniqueField = async (id) => {
      const response = await fetch(
        `https://gemstone-ee3f0-default-rtdb.firebaseio.com/gemstoneAuctionRecords.json?${id}"`
      );
      const data = await response.json();
      const recordData = Object.values(data).find((record) => record.id === id);
      setRecord(recordData);
    };
    getRecordByUniqueField(id);
  }, [id]);

  useEffect(() => {
    if (record) {
      console.log("record", record);
    }
  }, [record]);

  const updateRTDB = async () => {
    if (!eAuction) {
      console.log(user.email);
      const newBids = record.bids + 1;
      const gemRef = ref(db, `gemstoneAuctionRecords/${id}`);
      const updates = {
        bids: newBids,
      };
      try {
        await update(gemRef, updates);
        console.log("Bids field updated successfully");
        setRecord((prevRecord) => ({ ...prevRecord, bids: newBids }));
      } catch (error) {
        console.log("Error updating bids field:", error.message);
      }
      const newMaxBid = Math.max(record.highest_bid, currentBid);
      if (newMaxBid === currentBid) {
        const newMaxBidUser = user.email;
        const updates = {
          maxbiduser: newMaxBidUser,
          highest_bid: newMaxBid,
        };
        try {
          await update(gemRef, updates);
          console.log("Max bid details updated successfully");
          setRecord((prevRecord) => ({
            ...prevRecord,
            highest_bid: newMaxBid,
          }));
        } catch (error) {
          console.log("Error updating bids field:", error.message);
        }
      }
    }else{
      alert("Auction for this gemstone has ended");
    }
  };

  const endAuction = () => {
    const gemRef = ref(db);
    get(child(gemRef, `gemstoneAuctionRecords/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (data.email === user.email) {
            seteAuction(true);
          }else{
            alert("You do not have the permission to end the auction")
          }
          console.log(snapshot.val());
        } else {
          console.log("Cannot end auction");
        }
      }) 
      .catch((error) => {
        console.error(error);
      });
  };

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
                Bids :<span style={{ marginLeft: "8px" }}>{record.bids}</span>
              </Text>
            </Flex>
            <div id="line"></div>

            <Flex justifyContent="space-between" mt="3em">
              <Text fontSize="xl" fontWeight="700">
                Current Highest Bid:
              </Text>
              <Text fontSize="xl" fontWeight="700">
                ${record.highest_bid}
              </Text>
            </Flex>
            <Flex justifyContent="space-between" mt="1.5em">
              <Text fontSize="xl">Minimum Bid:</Text>
              <Text fontSize="xl">$ {record.minBidAmount}</Text>
            </Flex>
            <Flex justifyContent="space-between" mt="2em">
              <Text fontSize="xl">Set Your Maximum Bid:</Text>
              <Input
                placeholder="Amount"
                w="15em"
                size="md"
                onChange={(e) => {
                  setCurrentBid(e.target.value);
                }}
              />
            </Flex>

            <Button
              bg="#C88EA7"
              color="white"
              fontSize="2xl"
              fontWeight="700"
              w="100%"
              mt="2em"
              py="1.3em"
              onClick={updateRTDB}
            >
              Place My Bid
            </Button>

            <Button
              bg="blue"
              color="white"
              fontSize="2xl"
              fontWeight="700"
              w="100%"
              mt="2em"
              py="1.3em"
              onClick={endAuction}
            >
              End Auction
            </Button>
            {eAuction && <h1>Auction has ended</h1>}
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default Product;

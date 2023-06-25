import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Button, Box, Text, Flex } from "@chakra-ui/react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

const AuthDetails = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const query = ref(db, "gemstoneAuctionRecords/");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        console.log(data);
        const currentUserRecords = Object.values(data).filter((record) => record.maxbiduser === user.email );
        console.log("currentUserRecords", currentUserRecords);
        Object.values(data).map((ga) => {
          setRecords((records) => [...records, ga]);
        });
      } else {
        console.log("Data not found");
      }
    });
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Box>
      <Text fontSize="5xl">Your Profile</Text>
      <Text fontSize="lg" mt="2em">
        <span id="text_bold">User Email:</span> {user && user.email}
      </Text>
      <Text>Auctions you have won</Text>

      {records.map((record) => (
        <Flex key={record.id} alignItems="center" mt="1em">
          <Text>{record.gemName}</Text>
          <Text>{record.maxbiduser}</Text>
          {/* Render other properties as needed */}
        </Flex>
      ))}

      <Button
        bg="#99627A"
        color="white"
        mt="1em"
        size="md"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default AuthDetails;

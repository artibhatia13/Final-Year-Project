import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Box, Text, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const data = [
  {
    id: 1,
    role: "Welcome to our exclusive platform for Retail Store Owners!",
    welcomeText:
      "With our innovative features, you can unlock a world of possibilities for your jewelry business. Seamlessly navigate through three remarkable tasks:",
    cards: [
      {
        id: 51,
        link: "/auction",
        title: "PURCHASE GEMSTONE",
        text: "Browse and select the perfect gemstone directly from Gemstone Miners, all from the comfort of your fingertips.",
      },
      {
        id: 52,
        link: "/verification",
        title: "VERIFY & GET NFTs",
        text: "Get your jewelry pieces verified by leading certificate authorities and transform your creation into one-of-a-kind digital asset.",
      },
      {
        id: 53,
        link: "/auction",
        title: "AUCTION JEWELRY",
        text: "Experience the thrill of connecting with a global audience of enthusiastic buyers, all vying for your extraordinary jewelry.",
      },
    ],
  },
  {
    id: 2,
    role: "Welcome to the Gemstone Producers' Hub!",
    welcomeText:
      "Unleash the power of cutting-edge technology and the allure of exquisite gemstones. Join us as we revolutionize the way gemstones are classified and traded.",
    cards: [
      {
        id: 51,
        link: "/classify",
        title: "CLASSIFY GEM",
        text: "Harness the potential of our machine learning model to classify your gemstones with precision and efficiency.",
      },
      {
        id: 52,
        link: "/auction",
        title: "AUCTION GEM",
        text: "Let the world discover the true value of your gemstones and indulge in the excitement of competitive bidding.",
      },
    ],
  },
  {
    id: 3,
    role: "Welcome to the World of Authenticity and Digital Transformation!",
    welcomeText:
      "As a Certificate Authority Officer, you hold the key to unlocking the true essence of jewelry pieces and ushering them into the digital realm. Join us as we embark on a journey to verify, authenticate, and immortalize these precious treasures.",
    cards: [
      {
        id: 51,
        link: "/cao",
        title: "VIEW JEWELRY",
        text: "Explore a curated list of requested jewelry pieces, each brimming with artistry and charm. Immerse yourself in their intricate details.",
      },
      {
        id: 52,
        link: "/",
        title: "MINT NFT",
        text: "Embrace the power of innovation and mint these exceptional jewelry pieces as unique NFTs. Fuse the realms of physical beauty and digital artistry.",
      },
    ],
  },
  {
    id: 4,
    role: "Welcome to our NFT Auction House and Jewelry Time Capsule!",
    welcomeText:
      "Discover the allure of exclusive NFTs and delve into the captivating journey of each exquisite jewelry piece. Seamlessly navigate through the following remarkable functions:",
    cards: [
      {
        id: 51,
        link: "/auction",
        title: "PURCHASE NFTs",
        text: "Buy NFTs through our thrilling auctions, where artistry meets digital innovation. Own an artistic masterpiece, all at your fingertips.",
      },
      {
        id: 52,
        link: "/",
        title: "TRACE ORIGIN",
        text: "Trace back the captivating story behind every jewelry piece you acquire. Unveil the hidden tale of its creation.",
      },
    ],
  },
  {
    id: 5,
    role: "Undefined Role",
  },
];

const DisplayCards = (card) => {
  return (
    <Link to={card.link} key={card.id}>
      <Box
        w="28em"
        h="15em"
        boxShadow="base"
        borderRadius="lg"
        mr="2em"
        p="2em"
        id="card_hover"
      >
        <Text fontSize="xl" color="#803656" as="b">
          {card.title}
        </Text>
        <Text fontSize="xl" mt="3">
          {card.text}
        </Text>
        <Flex justifyContent="end">
          <ArrowForwardIcon boxSize={8} color="#994e6f" />
        </Flex>
      </Box>
    </Link>
  );
};

const AuthDetails = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  // useEffect(() => {
  //   getDocs(collection(firestore, "users")).then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       if (user.email === doc.data().email) {
  //         setRole(doc.data().role);
  //       }
  //       // console.log(doc.data().user);
  //     });
  //   }, []);
  // });

  const GetData = () => {
    if (user.email === "producer@gmail.com") return data[1];
    else if (user.email === "retail@gmail.com") return data[0];
    else if (user.email === "ca_officer@gmail.com") return data[2];
    else if (user.email === "customer@gmail.com") return data[3];
    else return data[1];
  };

  const content = GetData();

  return (
    <Box>
      {/* <Text fontSize="5xl">Your Profile</Text>
      <Text fontSize="lg" mt="2em">
        <span id="text_bold">User Email:</span> {user && user.email}
      </Text>
      <Text fontSize="lg" mt="2em">
        <span id="text_bold">Role: </span> {role}
      </Text> */}
      <Flex justify="end" m="-3em">
        <Button
          bg="#99627A"
          color="white"
          mt="1em"
          size="sm"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Flex>

      <Box my="4em">
        <Text fontSize="3xl">{content.role}</Text>

        <Text fontSize="xl" mt="2" w="70%">
          {content.welcomeText}
        </Text>

        <Flex mt="3em">{content.cards.map((item) => DisplayCards(item))}</Flex>
      </Box>
    </Box>
  );
};

export default AuthDetails;
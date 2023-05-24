import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import "./App.css";
import Home from "./components/Home.js";
import Auction from "./components/Auction.js";
import Classify from "./components/Classify.js";
import Verification from "./components/Verification.js";
import Navbar from "./components/Navbar.js";
import CertificateComponent from "./components/GenerateCertificate";
import Product from "./components/Product.js";
import StartAuction from "./components/StartAuction.js";
import RetailOwnerHomePage from "./components/RetailOwnerHomePage.js";

function App() {
  return (
    <>
      <Navbar />
      <Box my="6em" mx="12em">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classify" element={<Classify />} />
          <Route path="/auction" element={<Auction />} />
          <Route path="/auction/:id" element={<Product />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/startauction" element={<StartAuction />} />
          <Route path="/retailstore" element={<RetailOwnerHomePage />} />
          <Route
            path="/generatecertificate"
            element={<CertificateComponent />}
          />
        </Routes>
      </Box>
    </>
  );
}

export default App;

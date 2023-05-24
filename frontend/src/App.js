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
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import AuthDetails from "./components/AuthDetails";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <Navbar />
      <Box my="6em" mx="12em">
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/account" element={<AuthDetails />} />
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
        </AuthContextProvider>
      </Box>
    </>
  );
}

export default App;

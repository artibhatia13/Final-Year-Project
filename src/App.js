import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home.js";
import Auction from "./components/Auction.js";
import Classify from "./components/Classify.js";
import Verification from "./components/Verification.js";
import Navbar from "./components/Navbar.js";



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classify" element={<Classify />} />
        <Route path="/auction" element={<Auction />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>
    </>
  );
}

export default App;

import React, { useState } from "react";
import axios from "axios";
import { Image, Button } from "@chakra-ui/react";

const GenerateCertificate = (props) => {
  // const [certificateImage, setCertificateImage] = useState(null);
  const [serverImageLoaded, setServerImageLoaded] = useState(false);
  const combinedState = props.combinedState;

  const generateCertificate = async () => {
    axios
      .post("http://localhost:5000/generatecertificate", combinedState, {
        headers: {
          "Content-Type":'application/json'
        },
        responseType: "arraybuffer", // Specify response type as blob
      })
      .then((response) => {
        console.log(response.data)
        const blob = new Blob([response.data], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(blob);
        console.log(imageUrl);
        // setCertificateImage(imageUrl);
        setServerImageLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div>
      <Button colorScheme="pink" variant="outline" onClick={generateCertificate}>
        Generate Certificate
      </Button>
      {/* {certificateImage && serverImageLoaded ? (
        <img src={`data:image/jpeg;base64,${certificateImage}`} alt="Generated Certificate" />
      ) : (
        <p>No certificate image available.</p>
      )} */}
      {serverImageLoaded && (
        <Image src={process.env.PUBLIC_URL + "/certificate.jpg"} alt="Generated Certificate" />
      )}
    </div>
  );
};

export default GenerateCertificate;

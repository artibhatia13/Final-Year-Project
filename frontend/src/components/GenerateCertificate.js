import React, {useState} from "react";
import axios from "axios";

const CertificateComponent = () => {
    const [certificateImage, setCertificateImage] = useState(null);
    const generateCertificate = async () => {
    axios
      .post("http://localhost:5000/generatecertificate",{
        responseType: "arraybuffer", // Specify response type as blob
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(blob);
        console.log(imageUrl)
        setCertificateImage(imageUrl);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <button onClick={generateCertificate}>Generate Certificate</button>
      {certificateImage ? (
        <img src={certificateImage} alt="Generated Certificate" />
      ) : (
        <p>No certificate image available.</p>
      )}
    </div>
  );
};

export default CertificateComponent;

import React, { useState } from "react";
import { Text, Box } from "@chakra-ui/react";
import axios from "axios";

const Classify = () => {
  const [prediction, setPrediction] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const uploadImage = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    axios
      .post("http://localhost:5000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setPrediction(response.data.prediction);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box padding={20}>
      <Text fontSize="xl">
        Capture the beauty of your gemstone and let our advanced machine learning
        algorithm unravel its true identity. Upload an image of your gemstone
        below, and our powerful classification system will harness the power of
        artificial intelligence to determine its precise gemstone class.
      </Text>
      <Box padding={10}>
        <input type="file" onChange={uploadImage} />
        {imagePreview && (
          <div>
            <h3>Uploaded Image:</h3>
            <img src={imagePreview} alt="Uploaded" style={{ maxWidth: "100%" }} />
          </div>
        )}
        {prediction && <p>Prediction: {prediction}</p>}
      </Box>
    </Box>
  );
};

export default Classify;

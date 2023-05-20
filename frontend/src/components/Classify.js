import React from "react";
import axios from "axios";

class Classify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prediction: null,
    };
    this.uploadImage = this.uploadImage.bind(this);
  }

  uploadImage(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:5000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        this.setState({ prediction: response.data.prediction });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { prediction } = this.state;

    return (
      <div>
        <input type="file" onChange={this.uploadImage} />
        {prediction && <p>Prediction: {prediction}</p>}
      </div>
    );
  }
}

export default Classify;

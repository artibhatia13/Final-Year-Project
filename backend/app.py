from flask import Flask, render_template, request, jsonify, send_file
from flask_cors import CORS

import cv2
import numpy as np
import subprocess
from tensorflow.keras.models import load_model

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads/'

# Load the trained model
model = load_model('model_gemstones.h5')
classes = ['Quartz Smoky', 'Coral', 'Bixbite', 'Lapis Lazuli', 'Blue Lace Agate', 'Tanzanite',
           'Malachite', 'Spodumene', 'Quartz Lemon', 'Kyanite', 'Pearl', 'Andradite',
           'Tourmaline', 'Prehnite', 'Aquamarine', 'Citrine', 'Onyx Red', 'Chrysoprase',
           'Alexandrite', 'Zoisite', 'Cats Eye', 'Amber', 'Topaz', 'Sapphire Pink',
           'Rhodochrosite', 'Variscite', 'Rhodonite', 'Fluorite', 'Hiddenite', 'Amethyst',
           'Turquoise', 'Andalusite', 'Moonstone', 'Goshenite', 'Chrysoberyl', 'Onyx Green',
           'Spinel', 'Tigers Eye', 'Chalcedony', 'Sapphire Blue', 'Chrome Diopside', 'Spessartite',
           'Larimar', 'Sphene', 'Emerald', 'Iolite', 'Peridot', 'Diaspore', 'Chrysocolla',
           'Pyrite', 'Jade', 'Aventurine Green', 'Danburite', 'Scapolite', 'Sapphire Yellow',
           'Ruby', 'Ametrine', 'Sodalite', 'Onyx Black', 'Hessonite', 'Zircon', 'Grossular',
           'Garnet Red', 'Chalcedony Blue', 'Sapphire Purple', 'Sunstone', 'Beryl Golden',
           'Morganite', 'Diamond', 'Jasper', 'Pyrope', 'Rhodolite', 'Carnelian',
           'Tsavorite', 'Labradorite', 'Dumortierite', 'Amazonite', 'Serpentine',
           'Aventurine Yellow', 'Almandine', 'Benitoite', 'Quartz Rose', 'Quartz Beer',
           'Quartz Rutilated', 'Opal', 'Bloodstone', 'Kunzite']

# Define the preprocessing function
def preprocess_image(img):
    img_w, img_h = 220, 220
    try:
        edges = cv2.Canny(img, img_w, img_h)
        if np.count_nonzero(edges) > edges.size / 10000:
            pts = np.argwhere(edges > 0)
            y1, x1 = pts.min(axis=0)
            y2, x2 = pts.max(axis=0)
            new_img = img[y1:y2, x1:x2]
            new_img = cv2.resize(new_img, (img_w, img_h))
        else:
            new_img = cv2.resize(img, (img_w, img_h))
    except:
        new_img = cv2.resize(img, (img_w, img_h))
    return new_img

# Define the route for the home page
@app.route('/')
def home():
    return render_template('i.html')

# Define the route for the prediction result page
@app.route('/predict', methods=['POST'])
def predict():
    # Get the uploaded file from the request
    file = request.files['file']
    # Save the file to the upload folder
    filename = file.filename
    file.save(app.config['UPLOAD_FOLDER'] + filename)
    # Read the image file
    img = cv2.imread(app.config['UPLOAD_FOLDER'] + filename)
    # Preprocess the image
    img = preprocess_image(img)
    x = np.expand_dims(img, axis=0)
    x = x / 255.0
    # Predict the class probabilities
    preds = model.predict(x)[0]
    # Get the class label with the highest probability
    pred_class = classes[np.argmax(preds)]
    # Return the predicted class label as JSON response
    print(pred_class)
    return jsonify({'prediction': pred_class})

@app.route('/generatecertificate', methods=['POST','GET'])
def certificate():
    if request.method == 'POST':
        data = request.get_json()
        newList = []
        for item in data:
            newList.append(item)
        
        template = cv2.imread(
            "CertificateGeneration/certificate.png")

        cv2.putText(template, newList[0], (735, 300),
                    cv2.FONT_HERSHEY_COMPLEX, 0.4, (0, 0, 0), 1, cv2.LINE_AA)
        cv2.putText(template, newList[1], (735, 330),
                    cv2.FONT_HERSHEY_COMPLEX, 0.4, (0, 0, 0), 1, cv2.LINE_AA)
        cv2.putText(template, newList[2], (735, 360),
                    cv2.FONT_HERSHEY_COMPLEX, 0.4, (0, 0, 0), 1, cv2.LINE_AA)
        cv2.putText(template, newList[3], (735, 390),
                    cv2.FONT_HERSHEY_COMPLEX, 0.4, (0, 0, 0), 1, cv2.LINE_AA)
        cv2.putText(template, newList[4], (735, 420),
                    cv2.FONT_HERSHEY_COMPLEX, 0.4, (0, 0, 0), 1, cv2.LINE_AA)
        cv2.putText(template, newList[5], (735, 450),
                    cv2.FONT_HERSHEY_COMPLEX, 0.4, (0, 0, 0), 1, cv2.LINE_AA)
        cv2.putText(template, newList[6], (735, 480),
                    cv2.FONT_HERSHEY_COMPLEX, 0.4, (0, 0, 0), 1, cv2.LINE_AA)
        cv2.imwrite(
            './CertificateGeneration/GeneratedCertificates/certificate.jpg', template)

        subprocess.call(['./script.sh'])
        return send_file("./CertificateGeneration/GeneratedCertificates/certificate.jpg", mimetype="image/jpeg")

    else:
        print('GET REQUEST')
        template = cv2.imread(
            "CertificateGeneration/certificate.png")
        def get_coordinates(event, x, y, flags, param):
            if event == cv2.EVENT_LBUTTONDOWN:
                print(f"Clicked coordinates: ({x}, {y})")


        # Create a window and set mouse callback function
        cv2.namedWindow("Template Image")
        cv2.setMouseCallback("Template Image", get_coordinates)

        # Display the template image and wait for a mouse click
        cv2.imshow("Template Image", template)
        cv2.waitKey(0)

        return jsonify({'message': 'No certificate to return'})

if __name__ == '__main__':
    app.run(host='localhost', port=5000,debug=True)

CORS(app)  # Enable CORS to allow cross-origin requests

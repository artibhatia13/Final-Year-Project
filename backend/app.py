from flask import Flask, render_template, request
import cv2
import numpy as np
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
            'Larimar','Sphene', 'Emerald', 'Iolite', 'Peridot', 'Diaspore', 'Chrysocolla', 
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
    # Render the result page with the predicted class label
    return render_template('res.html', filename=filename, pred_class=pred_class)

if __name__ == '__main__':
    app.run(debug=True)








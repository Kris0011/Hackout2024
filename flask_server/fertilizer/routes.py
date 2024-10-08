from flask import Flask, request, jsonify , Blueprint
import pandas as pd
import numpy as np
from sklearn.naive_bayes import GaussianNB
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from flask_cors import CORS , cross_origin




fertilizer = Blueprint('fertilizer', __name__)

# Load your data
df = pd.read_csv('fertilizer/f2.csv')

# Initialize LabelEncoders
le_soil = LabelEncoder()
le_crop = LabelEncoder()
le_fertilizer = LabelEncoder()

# Fit and transform the data
df['Soil_Type'] = le_soil.fit_transform(df['Soil_Type'])
df['Crop_Type'] = le_crop.fit_transform(df['Crop_Type'])
df['Fertilizer'] = le_fertilizer.fit_transform(df['Fertilizer'])

# Features and target variable
X = df[['Temparature', 'Humidity', 'Moisture', 'Soil_Type', 'Crop_Type', 'Nitrogen', 'Potassium', 'Phosphorous']]
y = df['Fertilizer']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Initialize and train the model
gnb = GaussianNB()
gnb.fit(X_train, y_train)

# Flask route to predict fertilizer
@fertilizer.route('/predict', methods=['POST'])
@cross_origin(supports_credentials=True)
def predict_fertilizer():
    data = request.json
    
    # Extract data from the request
    temperature = int(data['temperature'])
    
    humidity = int(data['humidity'])
    moisture = int(data['moisture'])
    soil_type_str = data['soil_type']
    crop_type_str = data['crop_type']
    nitrogen = int(data['nitrogen'])
    potassium = int(data['potassium'])
    phosphorous = int(data['phosphorous'])

    # Convert soil and crop types to their respective indices
    soil_type_index = le_soil.transform([soil_type_str])[0]
    crop_type_index = le_crop.transform([crop_type_str])[0]

    # Create input data array for prediction
    user_data = np.array([[temperature, humidity, moisture, soil_type_index, crop_type_index, nitrogen, potassium, phosphorous]])

    # Predict the fertilizer
    predicted_fertilizer_encoded = gnb.predict(user_data)

    # Decode the predicted fertilizer
    predicted_fertilizer = le_fertilizer.inverse_transform(predicted_fertilizer_encoded)[0]

    # Return the prediction as a JSON response
    return jsonify({'predicted_fertilizer': predicted_fertilizer})

# Flask route to test the model accuracy
@fertilizer.route('/accuracy', methods=['GET'])
def get_accuracy():
    y_pred = gnb.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred)
    return jsonify({'accuracy': accuracy, 'report': report})

@fertilizer.route('/',methods=['GET'])
def home():
    return jsonify({ 'message' : "Welcome to Fertilizer Prediction API" })



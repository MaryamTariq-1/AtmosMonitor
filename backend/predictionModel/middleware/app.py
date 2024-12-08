# Dependencies
from flask import Flask, request, jsonify, render_template
import xgboost as xgb
import pandas as pd

app = Flask(__name__)

# Load the pre-trained model
model = xgb.Booster()
model.load_model("xgboost_model.json")

# Function to preprocess input data into DMatrix format
def preprocess_input(longitude, latitude):
    data = pd.DataFrame({'longitude': [longitude], 'latitude': [latitude]})
    return xgb.DMatrix(data)

@app.route('/')
def index():
    return render_template('predictionModel.html')

@app.route('/predict', methods=['GET'])
def predict():
    # Extract query parameters
    longitude = float(request.args.get('longitude'))
    latitude = float(request.args.get('latitude'))

    # Create a DMatrix for prediction
    dmatrix = preprocess_input(longitude, latitude)

    # Make prediction
    prediction = model.predict(dmatrix)

    # Return the predicted AQI
    return jsonify({"predicted_aqi": float(prediction[0])})





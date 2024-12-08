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





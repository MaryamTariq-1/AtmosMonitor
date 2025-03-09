from flask import Flask, request, jsonify, render_template
import pandas as pd
import numpy as np
import joblib
from flask_cors import CORS
import os # For path correction

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__)) # Adjusting Paths
MODEL_PATH = os.path.join(BASE_DIR, "traffic_random_forest.pkl")
DATASET_PATH = os.path.join(BASE_DIR, "traffic_pollution_faisalabad_large_2023.csv")


# Load model & dataset
try:
    model_data = joblib.load(MODEL_PATH)
    model = model_data["model"]
    feature_columns = model_data["features"]
    df = pd.read_csv(DATASET_PATH)
    print("Model loaded successfully.")
except FileNotFoundError:
    print("Error: Model file not found. Train and save the model first!")
    model, df, feature_columns = None, None, None

@app.route("/")
def home():
    """Serve the frontend page."""
    return render_template("trafficFrontend.html")

@app.route("/predict", methods=["POST"])
def predict():
    """Handles traffic congestion prediction based on user input."""
    if model is None or df is None:
        return jsonify({"Error": "Model is not loaded. Please train it first."}), 500

    data = request.json
    if not data:
        return jsonify({"Error": "Invalid input data"}), 400

    current_location = data.get("current_location")
    destination = data.get("destination")
    hour = int(data.get("hour", -1))

    if current_location not in df["Location"].unique() or destination not in df["Location"].unique():
        return jsonify({"Error": "One or both locations not found in dataset."}), 404

    filtered_data = df[(df["Location"] == current_location) & (df["Hour"] == hour)]
    if filtered_data.empty:
        filtered_data = df[df["Location"] == current_location]

    input_data = {
        "Vehicle_Count": filtered_data["Vehicle_Count"].mean(),
        "NO2_Emissions": filtered_data["NO2_Emissions"].mean(),
        "Traffic_Flow_Speed": filtered_data["Traffic_Flow_Speed"].mean(),
        "Hour": hour,
        "Day_of_Week": filtered_data["Day_of_Week"].mode()[0],
        "Rush_Hour_Indicator": int(7 <= hour <= 9 or 17 <= hour <= 19)
    }

    congestion_factor = 1.8 if input_data["Rush_Hour_Indicator"] else 1

    for feature in feature_columns:
        if feature not in input_data and feature.startswith("Weather_Conditions_"):
            input_data[feature] = 0

    input_df = pd.DataFrame([input_data])
    input_df = input_df.reindex(columns=feature_columns, fill_value=0)

    congestion_probability = model.predict_proba(input_df)[0][1] * congestion_factor
    is_congested = congestion_probability > 0.5

    if is_congested:
        alternative_routes = df[df["Location"] == current_location]["Suggested_Route_Adjustment"].dropna()
        valid_routes = alternative_routes[~alternative_routes.isin(["No change needed", ""])].tolist()
        suggested_route = np.random.choice(valid_routes) if valid_routes else "Take small connecting roads"
        return jsonify({
            "Congestion": "High",
            "Congestion_Probability": round(congestion_probability * 100, 2),
            "Suggested_Alternative_Route": suggested_route
        })
    else:
        return jsonify({
            "Congestion": "Low",
            "Congestion_Probability": round(congestion_probability * 100, 2),
            "Suggested_Route": "Your selected route is fine."
        })

if __name__ == "__main__":
    app.run(debug=True)

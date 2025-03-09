import pandas as pd
import numpy as np
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib # Importing joblib Library to create pickle and model files
import os

DATASET_PATH = "traffic_pollution_faisalabad_large_2023.csv"
MODEL_PATH = "traffic_random_forest.pkl"

def preprocess_and_train_model():
    try:
        df = pd.read_csv(DATASET_PATH)
    except FileNotFoundError:
        print(f"Error: File {DATASET_PATH} not found.")
        return

    df["Timestamp"] = pd.to_datetime(df["Timestamp"])
    df["Hour"] = df["Timestamp"].dt.hour
    df["Day_of_Week"] = df["Timestamp"].dt.dayofweek
    df["Rush_Hour_Indicator"] = ((df["Hour"].between(7, 9)) | (df["Hour"].between(17, 19))).astype(int)

    df = pd.get_dummies(df, columns=["Weather_Conditions"], drop_first=True)

    df["High_Congestion"] = ((df["Vehicle_Count"] > df["Vehicle_Count"].median()) &
                            (df["Traffic_Flow_Speed"] < df["Traffic_Flow_Speed"].median())).astype(int)

    df = df.drop(columns=["Timestamp", "Latitude", "Longitude"], errors="ignore")

    X = df.drop(columns=["Location", "Suggested_Route_Adjustment", "High_Congestion"], errors='ignore')
    y = df["High_Congestion"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(n_estimators=200, max_depth=10, min_samples_split=5, random_state=42)
    model.fit(X_train, y_train)

    # Save model and feature columns
    joblib.dump({"model": model, "features": X_train.columns}, MODEL_PATH)
    print(f"Model saved successfully at {os.path.abspath(MODEL_PATH)}")

if __name__ == "__main__":
    preprocess_and_train_model()

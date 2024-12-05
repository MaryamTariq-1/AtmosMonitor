import json
import pandas as pd
import xgboost as xgb
import joblib  # Importing joblib for saving the model

# Load the JSON data
with open('aqidata.json', 'r') as file:
    data = json.load(file)

# Extract attributes and create a DataFrame
features = data['features']
data_list = [
    {
        'OBJECTID': feature['attributes']['OBJECTID'],
        'density': feature['attributes']['density'],
        'longitude': feature['attributes']['long'],
        'latitude': feature['attributes']['lat'],
        'AQI': feature['attributes']['AQI']
    }
    for feature in features
]

# Create a DataFrame
df = pd.DataFrame(data_list)

# Define features and target variable
X = df[['longitude', 'latitude']]
y = df['AQI']

# Split the data into training and testing sets
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Convert the data to DMatrix format for XGBoost
dtrain = xgb.DMatrix(X_train, label=y_train)
dtest = xgb.DMatrix(X_test, label=y_test)
dfull = xgb.DMatrix(X, label=y)

# Set parameters for XGBoost
params = {
    'objective': 'reg:squarederror',  # For regression tasks
    'max_depth': 6,
    'eta': 0.1,
    'eval_metric': 'rmse'
}

# Train the XGBoost model
num_rounds = 100
bst = xgb.train(params, dtrain, num_rounds)

# Save the model as a pickle file
joblib.dump(bst, 'aqi_predictor_model.pkl')  # Save the trained model

print("Model saved as aqi_predictor_model.pkl")

# Optionally, make predictions and evaluate the model
y_pred = bst.predict(dtest)
y_full_pred = bst.predict(dfull)

from sklearn.metrics import mean_squared_error
rmse = mean_squared_error(y_test, y_pred, squared=False)
print(f'Root Mean Squared Error: {rmse:.2f}')
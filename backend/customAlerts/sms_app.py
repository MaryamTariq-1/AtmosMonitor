import os
from flask import Flask, request, jsonify
from twilio.rest import Client
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)


# Twilio credentials (store in .env for security)
TWILIO_SID = os.getenv("TWILIO_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")

client = Client(TWILIO_SID, TWILIO_AUTH_TOKEN)

@app.route("/", methods=["GET"])
def home():
    return "✅ Flask SMS API is running!"

@app.route("/send-sms", methods=["POST"])
def send_sms():
    data = request.json
    phone_number = data.get("phoneNumber")
    message = data.get("message")

    if not phone_number or not message:
        return jsonify({"success": False, "error": "Missing phone number or message"}), 400

    try:
        msg = client.messages.create(
            body=message,
            from_=TWILIO_PHONE_NUMBER,
            to=phone_number
        )
        return jsonify({"success": True, "message": "SMS sent!", "sid": msg.sid})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)

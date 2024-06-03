from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the model
model = joblib.load('model.pkl')

@app.route('/')
def home():
    return 'Welcome to the Machine Learning Model API!'

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data from request
        input_data = request.json
        
        # Make prediction using the model
        prediction = make_prediction(model, input_data)
        
        # Return prediction as JSON response
        return jsonify({'prediction': prediction.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

def make_prediction(model, data):
    # Assuming 'data' is a list of dictionaries containing the input features
    input_data = pd.DataFrame(data)
    prediction = model.predict(input_data)
    return prediction

# Add CORS headers
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://127.0.0.1:5500'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'POST'
    return response

if __name__ == '__main__':
    app.run(debug=True)

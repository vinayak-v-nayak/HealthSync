from flask import Flask, request, jsonify
import pickle
import numpy as np

# Load model and scaler from Cloud Storage (or locally for now)
with open('random_forest_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

with open('scaler.pkl', 'rb') as scaler_file:
    scaler = pickle.load(scaler_file)

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse incoming JSON
        data = request.get_json()

        # Ensure the features key exists and is not empty
        if 'features' not in data or not data['features']:
            return jsonify({'error': 'Missing or empty "features" data'}), 400

        # Extract features and ensure it's a valid list/array
        features = data['features']
        if not isinstance(features, list) or len(features) != 10:  # Assuming 10 features based on your earlier example
            return jsonify({'error': 'Features should be a list of length 10'}), 400

        # Convert to numpy array
        features = np.array([features])

        # Scale the features
        scaled_features = scaler.transform(features)

        # Make prediction
        prediction = model.predict(scaled_features)

        # Return the predicted fitness score
        print('predicted_fitness_score',prediction[0])
        return jsonify({'predicted_fitness_score': prediction[0]})

    except Exception as e:
        return jsonify({'error': f'Error during prediction: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)

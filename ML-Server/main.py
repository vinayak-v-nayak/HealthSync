from flask import Flask, request, jsonify
import pickle
import numpy as np

# Load model and scaler from Cloud Storage (or locally for now)
with open('random_forest_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

# Only load scaler for Random Forest model here
with open('scaler.pkl', 'rb') as scaler_file:
    scaler = pickle.load(scaler_file)

# Load KNN model and its relevant objects
with open('knn_model.pkl', 'rb') as file:
    saved_objects = pickle.load(file)

knn_model = saved_objects['model']
knn_scaler = saved_objects['scaler']  # Ensure correct scaler for KNN
processed_data = saved_objects['data']

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
        if not isinstance(features, list) or len(features) != 10:  # Assuming 10 features
            return jsonify({'error': 'Features should be a list of length 10'}), 400

        # Convert to numpy array
        features = np.array([features])

        # Scale the features
        scaled_features = scaler.transform(features)

        # Make prediction
        prediction = model.predict(scaled_features)

        # Return the predicted fitness score
        print('Predicted fitness score:', prediction[0])
        return jsonify({'predicted_fitness_score': prediction[0]})

    except Exception as e:
        return jsonify({'error': f'Error during prediction: {str(e)}'}), 500

def recommend_policies(fitness_score, model, data, scaler,salary):
    """
    Recommend health insurance policies based on the given fitness score.
    """
    # Assuming fitness score is used as the 5th feature in the input
    input_features = [fitness_score,salary]  # Adjust if more features are required
    normalized_input = scaler.transform([input_features])[0]

    # Get nearest neighbors
    distances, indices = model.kneighbors([normalized_input])

    # Retrieve recommended policies
    recommendations = data.iloc[indices[0]]
    return recommendations[['Brand_Name','Policy_Name', 'Coverage_Amount','Cashless_Hospitals', 'Monthly_Premium', 
                            'Annual_Premium', 'Claim_Settlement_Ratio','Policy_URL']]

@app.route('/recommend', methods=['POST'])
def recommend():
    """
    API endpoint to recommend policies based on fitness score.
    """
    try:
        # Parse incoming JSON data
        request_data = request.get_json()

        # Validate input
        if 'fitness_score' not in request_data:
            return jsonify({'error': 'Missing "fitness_score" in the request'}), 400

        fitness_score = request_data['fitness_score']
        salary = request_data['salary']
        if not isinstance(fitness_score, (int, float)) or not (0 <= fitness_score <= 100):
            return jsonify({'error': '"fitness_score" must be a number between 0 and 100'}), 400

        # Generate recommendations
        recommendations = recommend_policies(fitness_score, knn_model, processed_data, knn_scaler,salary)

        # Convert DataFrame to JSON
        recommendations_json = recommendations.to_dict(orient='records')

        return jsonify({'recommendations': recommendations_json})

    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)

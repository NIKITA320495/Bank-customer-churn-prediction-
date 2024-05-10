document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('prediction-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get input data from form and map to expected keys
        const formData = new FormData(form);
        const inputData = {
            'CreditScore': formData.get('credit-score'),
            'Gender': formData.get('gender'),
            'Age': formData.get('age'),
            'Tenure': formData.get('tenure'),
            'Balance': formData.get('balance'),
            'NumOfProducts': formData.get('num-of-products'),
            'HasCrCard': formData.get('has-cr-card'),
            'IsActiveMember': formData.get('is-active-member'),
            'Geography_Germany': formData.get('geography-germany'),
            'Geography_Spain': formData.get('geography-spain')
        };

        // Apply MinMax scaling to 'Tenure' and 'NumOfProducts'
        inputData['Tenure'] = (inputData['Tenure'] - 0) / (10);
        inputData['NumOfProducts'] = (inputData['NumOfProducts'] - 1) / (3);

        // Apply standard scaling to 'CreditScore', 'Age', and 'Balance'
        inputData['CreditScore'] = (inputData['CreditScore'] - 656.484745	) / 80.277631	;
        inputData['Age'] = (inputData['Age'] - 38.112173) / 8.832951;
        inputData['Balance'] = (inputData['Balance'] -55543.233967) / 	62783.983783	;

        // Send POST request to Flask API
        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputData)
        })
        .then(response => response.json())
        .then(data => {
            // Display prediction result
            const predictionResult = document.getElementById('prediction-result');
            predictionResult.textContent = `Prediction: ${data.prediction}`;
        })
        .catch(error => console.error('Error:', error));
    });
});

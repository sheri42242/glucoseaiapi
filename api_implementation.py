


import json
import requests


url = 'http://127.0.0.1:8000/diabetes_prediction'


input_data_for_model = {
    
    'pregnancies' : 4,
    'Glucose' : 150,
    'BloodPressure' : 72,
    'SkinThickness' : 0,
    'Insulin' : 80,
    'BMI' : 23.8,
    'DiabetesPedigreeFunction' : 0.28,
    'Age' : 60
    
    }

input_json = json.dumps(input_data_for_model)

response = requests.post(url, data=input_json)
print(response.text)



from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins='*')

patients_data = [
    {
        "patientID": 1,
        "firstName": "Michael",
        "lastName": "Garcia",
        "dateOfBirth": "1985-08-21",
        "address": "123 Main St, Anytown, CA",
        "phoneNumber": "(555) 555-1212",
        "insuranceID": "ID-789-123"
    },
    {
        "patientID": 2,
        "firstName": "Emily",
        "lastName": "Johnson",
        "dateOfBirth": "1992-10-03",
        "address": "456 Elm St, Springfield, IL",
        "phoneNumber": "(555) 555-3434",
        "insuranceID": "NULL"
    },
    {
        "patientID": 3,
        "firstName": "Christopher",
        "lastName": "Lee",
        "dateOfBirth": "1978-02-14",
        "address": "789 Oak Ave, Seattle, WA",
        "phoneNumber": "(555) 555-5656",
        "insuranceID": "ID-123-456"
    }
]

@app.route("/api/patients", methods=['GET'])
def patients():
    return jsonify(patients_data)


if __name__ == "__main__":
    app.run(debug=True, port=9112)

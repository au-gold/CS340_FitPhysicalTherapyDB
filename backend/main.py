from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route("/patients", methods=['GET'])
def patients():
    return jsonify(
        {
            "patientID": [1, 2, 3],
            "firstName": ["Michael", "Emily", "Christopher"]
        }
    )


if __name__ == "__main__":
    app.run(debug=True, port=9112)

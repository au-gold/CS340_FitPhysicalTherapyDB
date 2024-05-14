from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/patients", methods=['GET'])
def patients():
    return jsonify(
        {
            "patientID": [1, 2, 3],
            "First Name": ["Michael", "Emily", "Christopher"]
        }
    )


if __name__ == "__main__":
    app.run(debug=True, port=9112)

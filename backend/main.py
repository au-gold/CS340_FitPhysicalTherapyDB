from flask import Flask, json, request, jsonify
from flask_cors import CORS
import database.db_connector as db

app = Flask(__name__)
cors = CORS(app, origins='*')
db_connection = db.connect_to_database()


@app.route("/api/patients", methods=['POST', 'GET'])
def patients():

    if request.method == 'GET':
        query = """
            SELECT
                p.patientID,
                p.firstName,
                p.lastName,
                p.dateOfBirth,
                p.address,
                p.phoneNumber,
                IFNULL(i.insCardNum, 'NULL') AS insCardNum
                FROM
                    Patients AS p
                LEFT JOIN
                    Insurances as i ON p.insuranceID = i.insuranceID;
                """
        cursor = db.execute_query(db_connection=db_connection, query=query)
        results = json.dumps(cursor.fetchall())

        # Sends the results back to the web browser.
        return results


@app.route("/api/insurances", methods=['POST', 'GET'])
def insurances():
    if request.method == 'POST':
        try:
            newInsurance = request.json
            # print(newInsurance)
            subscriberName = newInsurance['subscriberName']
            insCardNum = newInsurance['insCardNum']
            insGroupNum = newInsurance['insGroupNum']

            query = f"""
                INSERT INTO Insurances
                            (subscriberName, insCardNum, insGroupNum)
                VALUES ('{subscriberName}', '{insCardNum}', '{insGroupNum}')
            """
            cursor = db.execute_query(db_connection=db_connection, query=query)

            db_connection.commit()

            return jsonify(message="Insurance created successfully"), 201

        except Exception as e:
            # Handle errors appropriately
            print("Error creating insurance:", str(e))
            return jsonify(error="Error creating insurance"), 500

    if request.method == 'GET':
        query = "SELECT * FROM Insurances;"
        cursor = db.execute_query(db_connection=db_connection, query=query)

        results = json.dumps(cursor.fetchall())

        return results


@app.route("/api/insurances/<int:id>", methods=['DELETE'])
def delete_insurance(id):
    try:
        query = f"DELETE FROM Insurances WHERE insuranceID = '{id}';"
        db.execute_query(db_connection=db_connection, query=query)
        db_connection.commit()

        return jsonify(message="Insurance deleted successfully"), 204
    except Exception as e:
        # Handle errors appropriately
        print("Error creating insurance:", str(e))
        # If the insurance with the given ID is not found, return a 404 error
        return jsonify(message="Insurance not found"), 404


@app.route("/api/insurances/<int:id>", methods=['PUT'])
def edit_insurance(id):
    newInsurance = request.json
    # print(newInsurance)
    subscriberName = newInsurance['subscriberName']
    insCardNum = newInsurance['insCardNum']
    insGroupNum = newInsurance['insGroupNum']
    try:
        query = f"""
        UPDATE Insurances
        SET subscriberName = '{subscriberName}', insCardNum = '{insCardNum}',
                                insGroupNum = '{insGroupNum}'
        WHERE insuranceID = '{id}';
        """
        db.execute_query(db_connection=db_connection, query=query)
        db_connection.commit()

        return jsonify(message="Insurance updated successfully."), 200

    except Exception as e:
        # Handle errors appropriately
        print("Error creating insurance:", str(e))
        # If the insurance with the given ID is not found, return a 404 error
        return jsonify(message="Insurance not found"), 404


if __name__ == "__main__":
    app.run(debug=True, port=58888)

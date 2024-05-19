from flask import Flask, json, request, jsonify, redirect
from flask_cors import CORS
import database.db_connector as db

app = Flask(__name__)
cors = CORS(app, origins='*')
db_connection = db.connect_to_database()


@app.route("/api/patients", methods=['POST', 'GET'])
def patients():
    
    if request.method == 'POST':
        # fire off if user presses the Add Person button
        try:
            newInsurance = request.json
            subscriberName = newInsurance['subscriberName']
            insCardNum = newInsurance['insCardNum']
            insGroupNum = newInsurance['insGroupNum']

            query = f"""
                INSERT INTO Insurances (subscriberName, insCardNum, insGroupNum)
                VALUES ({subscriberName}, {insCardNum}, {insGroupNum})
            """
            cursor = db.execute_query(db_connection=db_connection, query=query)

            db_connection.commit()

            return redirect("/people")

        except Exception as e:
            # Handle errors appropriately
            print("Error creating insurance:", str(e))
            return jsonify(error="Error creating insurance"), 500

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


@app.route("/api/insurances", methods=['GET'])
def insurances():
    
    query = "SELECT * FROM Insurances;"
    cursor = db.execute_query(db_connection=db_connection, query=query)

    results = json.dumps(cursor.fetchall())

    return results


if __name__ == "__main__":
    app.run(debug=True, port=58888)

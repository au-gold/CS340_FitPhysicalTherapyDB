from flask import Flask, json, request, jsonify
from flask_cors import CORS
import database.db_connector as db
from route_handlers.insurance_routes import create_insurances, read_insurances, update_insurances, delete_insurances
from time import sleep

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
def insurances_post_get():
    if request.method == 'GET':
        return read_insurances()

    if request.method == 'POST':
        newInsurance = request.json
        return create_insurances(newInsurance)     


@app.route("/api/insurances/<int:id>", methods=['DELETE', 'PUT'])
def insurances_del_put(id):
    if request.method == 'DELETE':
        return delete_insurances(id)

    if request.method == "PUT":
        newInsurance = request.json
        return update_insurances(id, newInsurance)


@app.route("/api/exercises", methods=['POST', 'GET'])
def exercises_post_get():

    if request.method == 'GET':
        query = "SELECT * FROM Exercises"
        cursor = db.execute_query(db_connection=db_connection, query=query)
        results = json.dumps(cursor.fetchall())

        # Sends the results back to the web browser.
        return results


@app.route("/api/treatmentPlans", methods=['POST', 'GET'])
def treatmentPlans_post_get():

    if request.method == 'GET':
        query = "SELECT * FROM TreatmentPlans"
        cursor = db.execute_query(db_connection=db_connection, query=query)
        results = json.dumps(cursor.fetchall())

        # Sends the results back to the web browser.
        return results


@app.route("/api/treatmentPlansExercises", methods=['POST', 'GET'])
def treatmentPlansExercises_post_get():
    sleep(0.2)
    if request.method == 'GET':
        query = """SELECT
                        treatmentExerciseID, treatmentPlanID,
                        TreatmentExercises.exerciseID,
                        Exercises.exerciseName, sets, reps
                    FROM TreatmentExercises
                    INNER JOIN
                        Exercises ON Exercises.exerciseID =
                            TreatmentExercises.exerciseID;
        """
        cursor = db.execute_query(db_connection=db_connection, query=query)
        results = json.dumps(cursor.fetchall())

        # Sends the results back to the web browser.
        return results


if __name__ == "__main__":
    app.run(debug=True, port=58888)

from flask import Flask, jsonify, request
from flask_cors import CORS
import database.db_connector as db
from route_handlers.insurance_routes import create_insurances, read_insurances, update_insurances, delete_insurances
from time import sleep
import logging
from custom_json_encoder import CustomJSONEncoder, jsonify_with_encoder

app = Flask(__name__)
app.json_encoder = CustomJSONEncoder  # Set the custom encoder
cors = CORS(app, origins='*')
# db_connection = db.connect_to_database()

# Configure logging
if __name__ != '__main__':
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)


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
        db_connection = db.connect_to_database()
        cursor = db.execute_query(db_connection=db_connection, query=query)
        results = cursor.fetchall()

        # Sends the results back to the web browser.
        return jsonify_with_encoder(results)


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
        db_connection = db.connect_to_database()
        cursor = db.execute_query(db_connection=db_connection, query=query)
        results = cursor.fetchall()

        # Sends the results back to the web browser.
        return jsonify_with_encoder(results)


@app.route("/api/treatmentPlans", methods=['POST', 'GET'])
def treatmentPlans_post_get():
    if request.method == 'GET':
        query = "SELECT * FROM TreatmentPlans"
        db_connection = db.connect_to_database()
        cursor = db.execute_query(db_connection=db_connection, query=query)
        results = cursor.fetchall()

        # Sends the results back to the web browser.
        return jsonify_with_encoder(results)


@app.route("/api/treatmentPlansExercises", methods=['POST', 'GET'])
def treatmentPlansExercises_post_get():
    sleep(0.2)
    if request.method == 'GET':
        query = """
            SELECT
                treatmentExerciseID, treatmentPlanID,
                TreatmentExercises.exerciseID,
                Exercises.exerciseName, sets, reps
            FROM TreatmentExercises
            INNER JOIN
                Exercises ON Exercises.exerciseID = TreatmentExercises.exerciseID;
        """
        db_connection = db.connect_to_database()
        cursor = db.execute_query(db_connection=db_connection, query=query)
        results = cursor.fetchall()

        # Sends the results back to the web browser.
        return jsonify_with_encoder(results)


@app.route("/api/therapists", methods=['POST', 'GET'])
def therapist_post_get():
    if request.method == 'GET':
        query = "SELECT * FROM Therapists;"
        try:
            cursor = db.execute_query(db_connection=db_connection, query=query)
            results = cursor.fetchall()
            app.logger.info(f"Results: {results}")
            return jsonify_with_encoder(results)
        except Exception as e:
            app.logger.error(f"Error fetching therapists: {str(e)}")
            return jsonify({"error": "Error fetching therapists"}), 500


@app.route("/api/appointments", methods=['POST', 'GET'])
def appointments_post_get():
    if request.method == 'GET':
        query = """
            SELECT
                Appointments.appointmentID,
                Appointments.appointmentDate,
                Appointments.appointmentTime,
                Patients.patientID,
                Patients.firstName AS patientFirstName,
                Patients.lastName AS patientLastName,
                Therapists.therapistID,
                Therapists.firstName AS therapistFirstName,
                Therapists.lastName AS therapistLastName,
                TreatmentPlans.treatmentPlanID,
                TreatmentPlans.duration,
                TreatmentPlans.frequency
            FROM Appointments
            INNER JOIN Patients ON Appointments.patientID = Patients.patientID
            INNER JOIN Therapists ON Appointments.therapistID = Therapists.therapistID
            INNER JOIN TreatmentPlans ON Appointments.treatmentPlanID = TreatmentPlans.treatmentPlanID;
        """
        db_connection = db.connect_to_database()
        cursor = db.execute_query(db_connection=db_connection, query=query)
        results = cursor.fetchall()

        # Sends the results back to the web browser.
        return jsonify_with_encoder(results)



if __name__ == "__main__":
    app.run(debug=True, port=58888)

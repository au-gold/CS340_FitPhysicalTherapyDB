# Based on flask starter app
# modified to work with our db and react frontend.
# URL:https://github.com/osu-cs340-ecampus/flask-starter-app

from flask import Flask, jsonify, request
from flask_cors import CORS
import database.db_connector as db
from route_handlers.insurance_routes import create_insurances, read_insurances, update_insurances, delete_insurances
from route_handlers.appointment_routes import create_appointments, read_appointments, update_appointments, delete_appointments
from route_handlers.therapist_routes import create_therapists, read_therapists, update_therapists, delete_therapists
from route_handlers.patient_routes import create_patients, read_patients, update_patients, delete_patients
from route_handlers.treatment_routes import create_treatment, read_treatment, update_treatmentPlan, delete_treatmentPlan
from route_handlers.treatmentPE_routes import create_treatmentPE, read_treatmentPE, update_treatmentPE, delete_treatmentPE
from route_handlers.exercise_routes import *
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
def patients_post_get():
    if request.method == 'GET':
        return read_patients()

    if request.method == 'POST':
        newPatient = request.json
        return create_patients(newPatient)
    
@app.route("/api/patients/<int:id>", methods = ['DELETE', 'PUT'])
def patients_del_put(id):
    if request.method == 'DELETE':
        return delete_patients(id)

    if request.method == 'PUT':
        newPatient = request.json
        return update_patients(id, newPatient)

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
        return read_exercises()

    if request.method == 'POST':
        newExercise = request.json
        return create_exercises(newExercise)


@app.route("/api/exercises/<int:id>", methods=['DELETE', 'PUT'])
def exercises_del_put(id):
    if request.method == 'DELETE':
        return delete_exercises(id)  

    if request.method == 'PUT':
        newExercise = request.json
        return update_exercises(id, newExercise)


@app.route("/api/treatmentPlans", methods=['POST', 'GET'])
def treatmentPlans_post_get():
    if request.method == 'GET':
        return read_treatment()

    if request.method == 'POST':
        newTreatmentPlan = request.json
        return create_treatment(newTreatmentPlan)


@app.route("/api/treatmentPlans/<int:id>", methods=['DELETE', 'PUT'])
def treatmentPlan_del_put(id):
    if request.method == 'DELETE':
        return delete_treatmentPlan(id)

    if request.method == "PUT":
        newTreatmentPlan = request.json
        return update_treatmentPlan(id, newTreatmentPlan)


@app.route("/api/treatmentPlansExercises", methods=['POST', 'GET'])
def treatmentPlansExercises_post_get():
    if request.method == 'GET':
        return read_treatmentPE()

    if request.method == 'POST':
        newTreatmentPlan = request.json
        return create_treatmentPE(newTreatmentPlan)


@app.route("/api/treatmentPlansExercises/<int:id>", methods=['DELETE', 'PUT'])
def treatmentPlansExercises_del_put(id):
    if request.method == 'DELETE':
        return delete_treatmentPE(id)

    if request.method == "PUT":
        newTreatmentPlan = request.json
        return update_treatmentPE(id, newTreatmentPlan)

@app.route("/api/therapists", methods=['POST', 'GET'])
def therapists_post_get():
    if request.method == 'GET':
        return read_therapists()
    if request.method == 'POST':
        newTherapist = request.json
        return create_therapists(newTherapist)

@app.route("/api/therapists/<int:id>", methods=['DELETE', 'PUT'])
def therapists_del_put(id):
    if request.method == 'DELETE':
        return delete_therapists(id)
    if request.method == 'PUT':
        newTherapist = request.json
        return update_therapists(id, newTherapist)


@app.route("/api/appointments", methods=['POST', 'GET'])
def appointments_post_get():
    if request.method == 'GET':
        return read_appointments()
    if request.method == 'POST':
        newAppointment = request.json
        return create_appointments(newAppointment)


@app.route("/api/appointments/<int:id>", methods=['DELETE', 'PUT'])
def appointments_del_put(id):
    if request.method == 'DELETE':
        return delete_appointments(id)
    if request.method == 'PUT':
        newAppointment = request.json
        return update_appointments(id, newAppointment)


if __name__ == "__main__":
    app.run(debug=True, port=58888)

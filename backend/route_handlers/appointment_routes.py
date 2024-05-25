from flask import jsonify
import database.db_connector as db
from custom_json_encoder import jsonify_with_encoder


def create_appointments(newAppointment):
    try:
        patientID = newAppointment['patientID']
        therapistID = newAppointment['therapistID']
        treatmentPlanID = newAppointment['treatmentPlanID']
        appointmentDate = newAppointment['appointmentDate']
        appointmentTime = newAppointment['appointmentTime']

        query = f"""
            INSERT INTO Appointments
                        (patientID, therapistID, treatmentPlanID, appointmentDate, appointmentTime)
            VALUES ('{patientID}', '{therapistID}', '{treatmentPlanID}', '{appointmentDate}', '{appointmentTime}')
        """
        db_connection = db.connect_to_database()
        db.execute_query(db_connection=db_connection, query=query)
        db_connection.commit()

        return jsonify(message="Appointment created successfully"), 201

    except Exception as e:
        print("Error creating appointment:", str(e))
        return jsonify(error="Error creating appointment"), 500


def read_appointments():
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

    return jsonify_with_encoder(results)


def update_appointments(id, newAppointment):
    patientID = newAppointment['patientID']
    therapistID = newAppointment['therapistID']
    treatmentPlanID = newAppointment['treatmentPlanID']
    appointmentDate = newAppointment['appointmentDate']
    appointmentTime = newAppointment['appointmentTime']

    try:
        query = f"""
        UPDATE Appointments
        SET patientID = '{patientID}', therapistID = '{therapistID}',
            treatmentPlanID = '{treatmentPlanID}', appointmentDate = '{appointmentDate}',
            appointmentTime = '{appointmentTime}'
        WHERE appointmentID = '{id}';
        """
        db_connection = db.connect_to_database()
        db.execute_query(db_connection=db_connection, query=query)
        db_connection.commit()

        return jsonify(message="Appointment updated successfully."), 200

    except Exception as e:
        print("Error updating appointment:", str(e))
        return jsonify(message="Appointment not found"), 404


def delete_appointments(id):
    try:
        query = f"DELETE FROM Appointments WHERE appointmentID = '{id}';"
        db_connection = db.connect_to_database()
        db.execute_query(db_connection=db_connection, query=query)
        db_connection.commit()

        return jsonify(message="Appointment deleted successfully"), 204
    except Exception as e:
        print("Error deleting appointment:", str(e))
        return jsonify(message="Appointment not found"), 404

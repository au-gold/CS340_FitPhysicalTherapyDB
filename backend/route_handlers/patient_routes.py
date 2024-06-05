# Based on flask starter app
# modified to include our SQL queries with DB
# Modified to work with out react frontend
# URL:https://github.com/osu-cs340-ecampus/flask-starter-app

from flask import jsonify
import database.db_connector as db


def create_patients(newPatient):
    db_connection = db.connect_to_database()

    try:
        firstName = newPatient['firstName']
        lastName = newPatient['lastName']
        dateOfBirth = newPatient['dateOfBirth']
        address = newPatient['address']
        phoneNumber = newPatient['phoneNumber']
        insuranceID = newPatient['insuranceID']

        if insuranceID in ("", "None"):
            insuranceID = None

        print(f"insurance id is {insuranceID}")

        query_patient = """
            INSERT INTO Patients (firstName, lastName, dateOfBirth, address,
            phoneNumber, insuranceID)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        q_params = (firstName, lastName, dateOfBirth, address, phoneNumber,
                    insuranceID)
        db.execute_query(db_connection, query_patient, q_params)
        db_connection.commit()

        return jsonify(message="Patient created successfully"), 201

    except Exception as e:
        print("Error creating patient:", str(e))
        return jsonify(error="Error creating patient"), 500

    finally:
        db_connection.close()


def read_patients():
    db_connection = db.connect_to_database()

    try:
        query = """
            SELECT Patients.patientID, Patients.firstName, Patients.lastName,
                Patients.dateOfBirth, Patients.address, Patients.phoneNumber,
                Insurances.insCardNum
            FROM Patients
            LEFT JOIN 
                Insurances ON Patients.insuranceID = Insurances.insuranceID
        """

        cursor = db.execute_query(db_connection=db_connection, query=query)
        results = cursor.fetchall()
        print(results)
        return jsonify(results)
    except Exception as e:
        print("Error reading patients:", str(e))
        return jsonify(error="Error reading patients"), 500
    finally:
        db_connection.close()


def update_patients(id, newPatient):
    db_connection = db.connect_to_database()

    try:
        firstName = newPatient['firstName']
        lastName = newPatient['lastName']
        dateOfBirth = newPatient['dateOfBirth']
        address = newPatient['address']
        phoneNumber = newPatient['phoneNumber']
        insuranceID = newPatient['insuranceID']

        if insuranceID in ("", "None"):
            insuranceID = None

        query_patient = """
        UPDATE Patients
        SET firstName = %s, lastName = %s,
        dateOfBirth = %s, address = %s,
        phoneNumber = %s, insuranceID = %s
        WHERE patientID = %s;
        """
        q_params = (firstName, lastName, dateOfBirth, address, phoneNumber,
                    insuranceID, id)
        db.execute_query(db_connection, query_patient, q_params)
        db_connection.commit()

        return jsonify(message="Patient updated successfully."), 200

    except Exception as e:
        print("Error updating patient:", str(e))
        return jsonify(error="Error updating patient"), 500
    finally:
        db_connection.close()


def delete_patients(id):
    db_connection = db.connect_to_database()
    try:
        query = "DELETE FROM Patients WHERE patientID = %s;"

        db.execute_query(db_connection, query, tuple([id]))
        db_connection.commit()

        return jsonify(message="Patient deleted successfully"), 204
    except Exception as e:
        print("Error deleting patient:", str(e))
        return jsonify(error="Error deleting patient"), 500
    finally:
        db_connection.close()

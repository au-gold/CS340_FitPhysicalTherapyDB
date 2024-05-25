from flask import jsonify, request
import database.db_connector as db


def create_therapists(newTherapist):
    try:
        firstName = newTherapist['firstName']
        lastName = newTherapist['lastName']
        licenseNum = newTherapist['licenseNum']

        query = f"""
            INSERT INTO Therapists (firstName, lastName, licenseNum)
            VALUES ('{firstName}', '{lastName}', '{licenseNum}')
        """
        db_connection = db.connect_to_database()
        db.execute_query(db_connection=db_connection, query=query)
        db_connection.commit()

        return jsonify(message="Therapist created successfully"), 201

    except Exception as e:
        print("Error creating therapist:", str(e))
        return jsonify(error="Error creating therapist"), 500


def read_therapists():
    query = "SELECT * FROM Therapists;"
    db_connection = db.connect_to_database()
    cursor = db.execute_query(db_connection=db_connection, query=query)
    results = cursor.fetchall()

    return jsonify(results)


def update_therapists(id, newTherapist):
    firstName = newTherapist['firstName']
    lastName = newTherapist['lastName']
    licenseNum = newTherapist['licenseNum']

    try:
        query = f"""
        UPDATE Therapists
        SET firstName = '{firstName}', lastName = '{lastName}', licenseNum = '{licenseNum}'
        WHERE therapistID = {id};
        """
        db_connection = db.connect_to_database()
        db.execute_query(db_connection=db_connection, query=query)
        db_connection.commit()

        return jsonify(message="Therapist updated successfully."), 200

    except Exception as e:
        print("Error updating therapist:", str(e))
        return jsonify(error="Error updating therapist"), 500


def delete_therapists(id):
    try:
        query = f"DELETE FROM Therapists WHERE therapistID = {id};"
        db_connection = db.connect_to_database()
        db.execute_query(db_connection=db_connection, query=query)
        db_connection.commit()

        return jsonify(message="Therapist deleted successfully"), 204
    except Exception as e:
        print("Error deleting therapist:", str(e))
        return jsonify(error="Error deleting therapist"), 500

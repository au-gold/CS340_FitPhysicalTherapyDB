from flask import json, jsonify
import database.db_connector as db


db_connection = db.connect_to_database()


def create_insurances(newInsurance):
    try:
        # print(newInsurance)
        subscriberName = newInsurance['subscriberName']
        insCardNum = newInsurance['insCardNum']
        insGroupNum = newInsurance['insGroupNum']

        query = f"""
            INSERT INTO Insurances
                        (subscriberName, insCardNum, insGroupNum)
            VALUES ('{subscriberName}', '{insCardNum}', '{insGroupNum}')
        """
        db.execute_query(db_connection=db_connection, query=query)

        db_connection.commit()

        return jsonify(message="Insurance created successfully"), 201

    except Exception as e:
        # Handle errors appropriately
        print("Error creating insurance:", str(e))
        return jsonify(error="Error creating insurance"), 500


def read_insurances():
    query = "SELECT * FROM Insurances;"
    cursor = db.execute_query(db_connection=db_connection, query=query)

    results = json.dumps(cursor.fetchall())

    return results


def update_insurances(id, newInsurance):
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


def delete_insurances(id):
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

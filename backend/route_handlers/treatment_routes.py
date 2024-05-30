from flask import jsonify
import database.db_connector as db
from time import sleep


def create_treatment(newTreatmentPlan):
    db_connection = db.connect_to_database()

    try:
        duration = newTreatmentPlan['duration']
        frequency = newTreatmentPlan['frequency']
        treatmentGoalDesc = newTreatmentPlan['treatmentGoalDesc']

        query_treat = """
            INSERT INTO TreatmentPlans (duration, frequency, treatmentGoalDesc)
            VALUES (%s, %s, %s)
        """
        q_params = (duration, frequency, treatmentGoalDesc)
        db.execute_query(db_connection, query_treat, q_params)
        db_connection.commit()

        return jsonify(message="TreatmentPlan created successfully"), 201

    except Exception as e:
        print("Error creating TreatmentPlan:", str(e))
        return jsonify(error="Error creating TreatmentPlan"), 500

    finally:
        db_connection.close()


def read_treatment():
    db_connection = db.connect_to_database()

    try:
        query = "SELECT * FROM TreatmentPlans"
        cursor = db.execute_query(db_connection=db_connection, query=query)
        results = cursor.fetchall()

        return jsonify(results)

    except Exception as e:
        print("Error reading treatment plans:", str(e))
        return jsonify(error="Error reading treatmentPlanExercises"), 500
    finally:
        db_connection.close()


def update_treatmentPlan(id, newTreatmentPlan):
    db_connection = db.connect_to_database()

    try:
        duration = newTreatmentPlan['duration']
        frequency = newTreatmentPlan['frequency']
        treatmentGoalDesc = newTreatmentPlan['treatmentGoalDesc']

        query_treat = """
            UPDATE TreatmentPlans
                SET duration = %s, frequency = %s, treatmentGoalDesc = %s
            WHERE treatmentPlanID = %s;
        """
        q_params = (duration, frequency, treatmentGoalDesc, id)
        db.execute_query(db_connection, query_treat, q_params)
        db_connection.commit()

        return jsonify(message="Treatment Plan updated successfully."), 200

    except Exception as e:
        print("Error updating Treatment Plan:", str(e))
        return jsonify(error="Error updating Treatment Plan"), 500

    finally:
        db_connection.close()


def delete_treatmentPlan(id):
    db_connection = db.connect_to_database()
    try:
        query = "DELETE FROM TreatmentPlans WHERE treatmentPlanID = %s;"

        db.execute_query(db_connection, query, tuple([id]))
        db_connection.commit()

        return jsonify(message="TreatmentPlan deleted successfully"), 204
    except Exception as e:
        print("Error deleting TreatmentPlan:", str(e))
        return jsonify(error="Error deleting TreatmentPlan"), 500
    finally:
        db_connection.close()

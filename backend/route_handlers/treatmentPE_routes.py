from flask import jsonify
import database.db_connector as db
from time import sleep


def create_treatmentPE(newTreatmentPlan):
    db_connection = db.connect_to_database()

    try:
        treatmentPlanID = newTreatmentPlan['treatmentPlanID']
        exerciseID = newTreatmentPlan['exerciseID']
        sets = newTreatmentPlan['sets']
        reps = newTreatmentPlan['reps']

        query_treat = """
            INSERT INTO
                TreatmentExercises (treatmentPlanID, exerciseID, sets, reps)
            VALUES (%s, %s, %s, %s)
        """
        q_params = (treatmentPlanID, exerciseID, sets, reps)
        db.execute_query(db_connection, query_treat, q_params)
        db_connection.commit()

        return jsonify(message="Assigned an exercise successfully"), 201

    except Exception as e:
        print("Error assigning Exercise:", str(e))
        return jsonify(error="Error assigning Exercise"), 500

    finally:
        db_connection.close()


def read_treatmentPE():
    sleep(0.1)
    db_connection = db.connect_to_database()

    try:
        query = """
            SELECT
                treatmentExerciseID, treatmentPlanID,
                TreatmentExercises.exerciseID,
                Exercises.exerciseName, sets, reps
            FROM TreatmentExercises
            INNER JOIN
                Exercises ON Exercises.exerciseID =
                                TreatmentExercises.exerciseID;
        """

        cursor = db.execute_query(db_connection=db_connection, query=query)
        results = cursor.fetchall()

        return jsonify(results)
    except Exception as e:
        print("Error reading treatmentPlanExercises:", str(e))
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


def delete_treatmentPE(id):
    db_connection = db.connect_to_database()
    try:
        query = """DELETE FROM TreatmentExercises
                    WHERE treatmentExerciseID = %s;"""

        db.execute_query(db_connection, query, tuple([id]))
        db_connection.commit()

        return jsonify(message="TreatmentPlan/Exercise deleted"), 204
    except Exception as e:
        print("Error deleting TreatmentPlan:", str(e))
        return jsonify(error="Error deleting TreatmentPlan"), 500
    finally:
        db_connection.close()

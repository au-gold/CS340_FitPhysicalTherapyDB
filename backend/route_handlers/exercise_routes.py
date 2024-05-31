from flask import jsonify
import database.db_connector as db


def create_exercises(newExercise):
    db_connection = db.connect_to_database()

    try:
        exerciseName = newExercise['exerciseName']
        targetMuscleGroup = newExercise['targetMuscleGroup']
        description = newExercise['description']


        query_exercise = """
            INSERT INTO Exercises (exerciseName, targetMuscleGroup, description)
            VALUES (%s, %s, %s)
        """
        q_params = (exerciseName, targetMuscleGroup, description)
        db.execute_query(db_connection, query_exercise, q_params)
        db_connection.commit()

        return jsonify(message="Exercise created successfully"), 201

    except Exception as e:
        print("Error creating exercise:", str(e))
        return jsonify(error="Error creating exercise"), 500

    finally:
        db_connection.close()


def read_exercises():
    db_connection = db.connect_to_database()

    try:
        query = "SELECT * FROM Exercises;"
        cursor = db.execute_query(db_connection=db_connection, query=query)
        results = cursor.fetchall()
        return jsonify(results)
    except Exception as e:
        print("Error reading exercises:", str(e))
        return jsonify(error="Error reading exercises"), 500
    finally: 
        db_connection.close()


def update_exercises(id, newExercise):
    db_connection = db.connect_to_database()

    try:
        exerciseName = newExercise['exerciseName']
        targetMuscleGroup = newExercise['targetMuscleGroup']
        description = newExercise['description']

        query_exercise = """
        UPDATE Exercises
        SET exerciseName = %s, targetMuscleGroup = %s,
        description = %s
        WHERE exerciseID = %s
        """
        q_params = (exerciseName, targetMuscleGroup, description, id)
        db.execute_query(db_connection, query_exercise, q_params)
        db_connection.commit()

        return jsonify(message="Exercise updated successfully."), 200

    except Exception as e:
        print("Error updating exercise:", str(e))
        return jsonify(error="Error updating exercise"), 500
    finally:
        db_connection.close()

def delete_exercises(id):
    db_connection = db.connect_to_database()
    try:
        query = "DELETE FROM Exercises WHERE exerciseID = %s;"

        db.execute_query(db_connection, query, tuple([id]))
        db_connection.commit()

        return jsonify(message="Exercise deleted successfully"), 204
    except Exception as e:
        print("Error deleting Exercise:", str(e))
        return jsonify(error="Error deleting Exercise"), 500
    finally:
        db_connection.close()

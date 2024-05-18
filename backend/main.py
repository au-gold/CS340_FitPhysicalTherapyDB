from flask import Flask, jsonify, json
from flask_cors import CORS
import database.db_connector as db

app = Flask(__name__)
cors = CORS(app, origins='*')
db_connection = db.connect_to_database()


@app.route("/api/patients", methods=['GET'])
def patients():
    
    query = "SELECT * FROM Patients;"
    # The way the interface between MySQL and Flask works is by using an
    # object called a cursor. Think of it as the object that acts as the
    # person typing commands directly into the MySQL command line and
    # reading them back to you when it gets results
    cursor = db.execute_query(db_connection=db_connection, query=query)

    # The cursor.fetchall() function tells the cursor object to return all
    # the results from the previously executed
    #
    # The json.dumps() function simply converts the dictionary that was
    # returned by the fetchall() call to JSON so we can display it on the
    # page.
    results = json.dumps(cursor.fetchall())

    # Sends the results back to the web browser.
    return results


@app.route("/api/insurances", methods=['GET'])
def insurances():
    
    query = "SELECT * FROM Insurances;"
    cursor = db.execute_query(db_connection=db_connection, query=query)

    results = json.dumps(cursor.fetchall())

    return results


if __name__ == "__main__":
    app.run(debug=True, port=58888)

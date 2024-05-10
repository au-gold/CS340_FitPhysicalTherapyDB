-- PATIENT QUERIES
-- Display patient info
SELECT * FROM Patients WHERE patientID = :patientID;

-- Adds a new patient
INSERT INTO Patients (firstName, lastName, dateOfBirth, address, phoneNumber, insuranceID) 
VALUES (:firstName, :lastName, :dateOfBirth, :address, :phoneNumber, :insuranceID);

-- Update a patient's info
UPDATE Patients 
SET firstName = :firstName, lastName = :lastName, dateOfBirth = :dateOfBirth, address = :address, phoneNumber = :phoneNumber, insuranceID = :insuranceID 
WHERE patientID = :patientID;

-- Deletes a patient
DELETE FROM Patients WHERE patientID = :patientID;


-- THERAPIST QUERIES
-- Display therapist info
SELECT * FROM Therapists WHERE therapistID = :therapistID;

-- Adds a new therapist
INSERT INTO Therapists (firstName, lastName, licenseNum) 
VALUES (:firstName, :lastName, :licenseNum);

-- Updates therapist info
UPDATE Therapists 
SET firstName = :firstName, lastName = :lastName, licenseNum = :licenseNum 
WHERE therapistID = :therapistID;

-- Deletes a therapist
DELETE FROM Therapists WHERE therapistID = :therapistID;


--INSURANCE QUERIES 
-- Displays insurance info
SELECT * FROM Insurances WHERE insuranceID = :insuranceID;

-- Adds new insurance information
INSERT INTO Insurances (subscriberName, insCardNum, insGroupNum) 
VALUES (:subscriberName, :insCardNum, :insGroupNum);

-- Updates existing insurance information
UPDATE Insurances
SET subscriberName = :subscriberName, insCardNum = :insCardNum, insGroupNum = :insGroupNum 
WHERE insuranceID = :insuranceID;

-- Deletes insurance info
DELETE FROM Insurances WHERE insuranceID = :insuranceID;


--APPOINTMENT QUERIES 
-- Displays appointment
SELECT * FROM Appointments WHERE appointmentID = :appointmentID;

-- Adds a new appointment
INSERT INTO Appointments (patientID, therapistID, treatmentPlanID, date, time) 
VALUES (:patientID, :therapistID, :treatmentPlanID, :date, :time);

-- Updates exising appointments
UPDATE Appointments 
SET patientID = :patientID, therapistID = :therapistID, treatmentPlanID = :treatmentPlanID, date = :date, time = :time 
WHERE appointmentID = :appointmentID;

-- Deletes an appointment
DELETE FROM Appointments WHERE appointmentID = :appointmentID;


-- EXERCISE QUERIES
-- Displays exercise
SELECT * FROM exercises WHERE exerciseID = :exerciseID;

-- Adds to exercises
INSERT INTO exercises (exerciseName, targetMuscleGroup, description) 
VALUES (:name, :targetMuscleGroup, :description);

-- Update an exercise
UPDATE exercises 
SET name = :exerciseName, targetMuscleGroup = :targetMuscleGroup, description = :description
WHERE exerciseID = :exerciseID;

-- Deletes an exercise
DELETE FROM exercises WHERE exerciseID = :exerciseID;


-- Treatment Plan QUERIES
-- Displays Treatment Plan Only
SELECT * FROM TreatmentPlans WHERE treatmentPlanID = :treatmentPlanID;

-- Adds to Treatment Plan
INSERT INTO TreatmentPlans (duration, frequency, treatmentGoalDesc) 
VALUES (:duration, :frequency, :treatmentGoalDesc);

-- Update an TreatmentPlan
UPDATE TreatmentPlans 
SET duration = :duration, frequency = :frequency, treatmentGoalDesc = :treatmentGoalDesc
WHERE treatmentPlanID = :treatmentPlanID;

-- Deletes a TreatmentPlan
DELETE FROM TreatmentPlans WHERE treatmentPlanID = :treatmentPlanID;


-- TreatmentExercises intersection table QUERIEs
-- Displays TreatmentExercises Table
SELECT treatmentPlanID, TreatmentExercises.exerciseID, Exercises.exerciseName, sets, reps FROM TreatmentExercises
INNER JOIN Exercises ON Exercises.exerciseID = TreatmentExercises.exerciseID;

-- Adds to TreatmentExercises
INSERT INTO TreatmentExercises (treatmentPlanID, exerciseID, sets, reps) 
VALUES (:treatmentPlanID, (SELECT exerciseID FROM Exercises WHERE exerciseName = :exerciseNamefromDropDown), :sets, :reps);

-- Update an TreatmentExercises
UPDATE TreatmentExercises 
SET treatmentPlanID = :treatmentPlanID, exerciseID = :exerciseID, sets = :sets, reps = :reps
WHERE treatmentExerciseID = :treatmentExerciseID;

-- Deletes an TreatmentExercises
DELETE FROM TreatmentExercises WHERE treatmentExerciseID = :treatmentExerciseID;




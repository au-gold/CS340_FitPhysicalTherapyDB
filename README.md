# CS340 Portfolio Project Group 88: Fit Physical Therapy Database

## Authors
- Mintae Kim & Emmanuel Acheampong

## Citation
Based on:
- [CS340 Flask Starter App](https://github.com/osu-cs340-ecampus/flask-starter-app)
- [CS340 React Starter App](https://github.com/osu-cs340-ecampus/react-starter-app)

### Highlighted Modifications to Source Code
- Added dropdown menu for handling selection of foreign keys (e.g., adding a new patient with a dropdown menu for insurances)
- Added confirmation prompt before deleting entries
- Created a webpage to handle many-to-many relationships

## Overview
Fit Physical Therapy (FPT) is a local clinic that requires an optimized database system. The database helps manage patient information, insurances, appointments, treatment plans, exercises, and employee details, streamlining documentation, appointments, and patient interactions with the FPT website.

### Database Outline

1. **Patients**
    - **Fields**: patientID (PK), firstName, lastName, dateOfBirth, address, phoneNumber, insuranceID (FK)
    - **Relationships**:
        - Patient to Appointment: 0:M
        - Patient to Insurance: 1:M

2. **Insurances**
    - **Fields**: insuranceID (PK), subscriberName, insCardNum, insGroupNum
    - **Relationships**:
        - Insurance to Patient: 1:M

3. **Therapists**
    - **Fields**: therapistID (PK), firstName, lastName, licenseNum
    - **Relationships**:
        - Therapist to Appointment: 0:M

4. **Appointments**
    - **Fields**: appointmentID (PK), patientID (FK), therapistID (FK), treatmentPlanID (FK), appointmentDate, appointmentTime
    - **Relationships**:
        - Appointment to Therapist: 0:M
        - Appointment to Patient: 0:M
        - Appointment to Treatment Plan: 0:M

5. **Exercises**
    - **Fields**: exerciseID (PK), exerciseName, description, targetMuscleGroup
    - **Relationships**:
        - Exercise to Treatment Plan: M:M

6. **Treatment Plans**
    - **Fields**: treatmentPlanID (PK), treatmentGoalDesc, duration, frequency
    - **Relationships**:
        - Treatment Plan to Exercises: M:M

7. **Treatment Exercises (Intersection Entity)**
    - **Fields**: treatmentExerciseID (PK), treatmentPlanID (FK), exerciseID (FK), sets, reps


## Contact Information
For questions or suggestions, please contact:
- [Mintae Kim](mailto:kimmint@oregonstate.edu)
- [Emmanuel Acheampong](mailto:acheampe@oregonstate.edu)


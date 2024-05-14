-- MySQL Dump
-- Mintae Kim
-- Emmanuel Acheampong
-- Group 88
-- Fit Physical Therapy

-- -----------------------------------------------------
-- Schema cs340_kimmint
-- -----------------------------------------------------
SET foreign_key_checks = 0;


-- -----------------------------------------------------
-- Table Insurances`
-- -----------------------------------------------------
CREATE OR REPLACE TABLE `Insurances` (
  `insuranceID` INT NOT NULL AUTO_INCREMENT,
  `subscriberName` VARCHAR(100) NULL,
  `insCardNum` VARCHAR(50) NULL,
  `insGroupNum` VARCHAR(50) NULL,
  PRIMARY KEY (`insuranceID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table Patients`
-- -----------------------------------------------------
CREATE OR REPLACE TABLE `Patients` (
  `patientID` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(50) NULL,
  `lastName` VARCHAR(50) NULL,
  `dateOfBirth` DATE NULL,
  `address` VARCHAR(100) NULL,
  `phoneNumber` VARCHAR(50) NULL,
  `insuranceID` INT NULL,
  PRIMARY KEY (`patientID`),
  INDEX `fk_Patients_Insurances1_idx` (`insuranceID` ASC) VISIBLE,
  CONSTRAINT `fk_Patients_Insurances1`
    FOREIGN KEY (`insuranceID`)
    REFERENCES `Insurances` (`insuranceID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Therapists`
-- -----------------------------------------------------
CREATE OR REPLACE TABLE `Therapists` (
  `therapistID` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(50) NULL,
  `lastName` VARCHAR(50) NULL,
  `licenseNum` VARCHAR(50) NULL,
  PRIMARY KEY (`therapistID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TreatmentPlans`
-- -----------------------------------------------------
CREATE OR REPLACE TABLE `TreatmentPlans` (
  `treatmentPlanID` INT NOT NULL AUTO_INCREMENT,
  `treatmentGoalDesc` TEXT(500) NULL,
  `duration` VARCHAR(50) NULL,
  `frequency` VARCHAR(50) NULL,
  PRIMARY KEY (`treatmentPlanID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Appointments`
-- -----------------------------------------------------
CREATE OR REPLACE TABLE `Appointments` (
  `appointmentID` INT NOT NULL AUTO_INCREMENT,
  `appointmentDate` DATE NULL,
  `appointmentTime` TIME NULL,
  `patientID` INT NOT NULL,
  `therapistID` INT NOT NULL,
  `treatmentPlanID` INT NOT NULL,
  PRIMARY KEY (`appointmentID`, `patientID`, `therapistID`, `treatmentPlanID`),
  INDEX `fk_Appointments_Patients1_idx` (`patientID` ASC) VISIBLE,
  INDEX `fk_Appointments_Therapists1_idx` (`therapistID` ASC) VISIBLE,
  INDEX `fk_Appointments_Treatment_Plans1_idx` (`treatmentPlanID` ASC) VISIBLE,
  CONSTRAINT `fk_Appointments_Patients1`
    FOREIGN KEY (`patientID`)
    REFERENCES `Patients` (`patientID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Appointments_Therapists1`
    FOREIGN KEY (`therapistID`)
    REFERENCES `Therapists` (`therapistID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Appointments_Treatment_Plans1`
    FOREIGN KEY (`treatmentPlanID`)
    REFERENCES `TreatmentPlans` (`treatmentPlanID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Exercises`
-- -----------------------------------------------------
CREATE OR REPLACE TABLE `Exercises` (
  `exerciseID` INT NOT NULL AUTO_INCREMENT,
  `exerciseName` VARCHAR(50) NULL,
  `targetMuscleGroup` VARCHAR(50) NULL,
  `description` TEXT(500) NULL,
  PRIMARY KEY (`exerciseID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TreatmentExercises`
-- -----------------------------------------------------
CREATE OR REPLACE TABLE `TreatmentExercises` (
  `treatmentExerciseID` INT NOT NULL AUTO_INCREMENT,
  `treatmentPlanID` INT NOT NULL,
  `exerciseID` INT NOT NULL,
  `sets` INT NULL,
  `reps` INT NULL,
  INDEX `fk_Treatment_Exercise_Treatment_Plans1_idx` (`treatmentPlanID` ASC) VISIBLE,
PRIMARY KEY (`treatmentExerciseID`, `treatmentPlanID`, `exerciseID`),
  CONSTRAINT `fk_Treatment_Exercise_Treatment_Plans1`
    FOREIGN KEY (`treatmentPlanID`)
    REFERENCES `TreatmentPlans` (`treatmentPlanID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Treatment_Exercise_Exercises1`
    FOREIGN KEY (`exerciseID`)
    REFERENCES `Exercises` (`exerciseID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;



-- Adding data to Insurance
INSERT INTO Insurances (
    subscriberName,
    insCardNum,
    insGroupNum
)
VALUES 
(
    "Michael Garcia",
    "ID-789-123",
    "7GRP123"
),
(
    "Christopher Lee",
    "ID-123-456",
    "6UW012"
),
(
    "David Miller",
    "ID-567-777",
    "8CN123"
);

-- Adding data to Patients
INSERT INTO Patients (
    firstName,
    lastName,
    dateOfBirth,
    address,
    phoneNumber,
    insuranceID
)
VALUES 
(
    "Michael",
    "Garcia",
    "1985-08-21",
    "123 Main St, Anytown, CA",
    "(555) 555-1212",
    (SELECT insuranceID FROM Insurances WHERE subscriberName = "Michael Garcia")
),
(
    "Emily",
    "Johnson",
    "1992-10-03",
    "456 Elm St, Springfield, IL",
    "(555) 555-3434",
    NULL
),
(
    "Christopher",
    "Lee",
    "1978-02-14",
    "789 Oak Ave, Seattle, WA",
    "(555) 555-5656",
    (SELECT insuranceID FROM Insurances WHERE subscriberName = "Christopher Lee")
),
(
    "Amanda",
    "Lee",
    "2000-06-27",
    "789 Oak Ave, Seattle, WA",
    "(555) 555-7878",
    (SELECT insuranceID FROM Insurances WHERE subscriberName = "Christopher Lee")
),
(
    "David",
    "Miller",
    "1982-09-12",
    "1212 Pine Blvd, Chicago, IL",
    "(555) 555-0101",
    (SELECT insuranceID FROM Insurances WHERE subscriberName = "David Miller")
);


-- Adding data to Therapists

INSERT INTO Therapists (
    firstName,
    lastName,
    licenseNum
)
VALUES 
(
    "Emily",
    "Miller",
    "PT-94491"
),
(
    "Christopher",
    "Johnson",
    "PT-50712"
),
(
    "David",
    "Bowie",
    "PT-45711"
);

INSERT INTO TreatmentPlans (
    duration,
    frequency,
    treatmentGoalDesc
)
VALUES 
(
    "12",
    "2",
    "Recover from knee injury and strengthen both legs"
),
(
    "8",
    "1",
    "Recover from foot injury and patient wants to play tennis again."
),
(
    "6",
    "2",
    "Reduce back pain and strengthen core."
),
(
    "10",
    "3",
    "Reduce shoulder pain and increase flexibility."
),
(
    "9",
    "3",
    "Reduce elbow pain and increase range of motion."
);

-- Adding data to Appointments

INSERT INTO Appointments (appointmentID, patientID, therapistID, treatmentPlanID, appointmentDate, appointmentTime) VALUES
(1, 2, 3, 1, '2024-04-15', '09:00'),
(2, 3, 2, 3, '2024-04-16', '11:00'),
(3, 1, 1, 2, '2024-04-17', '10:00'),
(4, 4, 2, 5, '2024-04-17', '03:30'),
(5, 2, 1, 1, '2024-04-17', '14:00');

-- Adding data to Appointments
INSERT INTO Exercises (
    exerciseName,
    targetMuscleGroup,
    description
)
VALUES 
(
    "Sit Ups",
    "Core",
    "Bring torso up from a lying position."
),
(
    "Push Ups",
    "Chest",
    "Start in a plank position, then lower the chest to the ground before pressing back up."
),
(
    "Pull Ups",
    "Back",
    "Hang from a bar and pull self up."
),
(
    "Leg Extension",
    "Quadriceps",
    "Use leg extension machine"
),
(
    "Laterial Raise",
    "Shoulder",
    "Lift dumbbells out to the sides."
);

-- Adding data to TreatmentExercises

INSERT INTO TreatmentExercises (TreatmentExerciseID, treatmentPlanID, exerciseID, sets, reps) 
VALUES
(1, 1, 4, 3, 8),
(2, 1, 1, 2, 10),
(3, 2, 2, 3, 8),
(4, 2, 4, 2, 10),
(5, 3, 2, 3, 5),
(6, 4, 3, 3, 10),
(7, 5, 1, 2, 5);


SET foreign_key_checks = 1;

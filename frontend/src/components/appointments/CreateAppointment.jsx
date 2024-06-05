// Citation for following code
// Based on CS340 react starter app
// Changed to handle our appointments entity
// Added dropdown menu for patients, etc, thus dont have to type in foreign keys.
// source: https://github.com/osu-cs340-ecampus/react-starter-app/


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateAppointment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientID: "",
    therapistID:"",
    treatmentPlanID:"",
    appointmentDate: "",
    appointmentTime: "",
  });
  
  // Getting the list of patients, therapists and treatmentPlans to show in dropdown list.
  const [patients, setPatients] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [treatmentPlans, setTreatmentPlans] = useState([]);

  // Store the data into variables to later populate the dropdown
  useEffect(() => {
    // Fetch patients
    axios.get(import.meta.env.VITE_API_URL + "patients")
      .then(response => setPatients(response.data))
      .catch(error => console.error("Error fetching patients:", error));

    // Fetch therapists
    axios.get(import.meta.env.VITE_API_URL + "therapists")
      .then(response => setTherapists(response.data))
      .catch(error => console.error("Error fetching therapists:", error));

    // Fetch treatment plans
    axios.get(import.meta.env.VITE_API_URL + "treatmentPlans")
      .then(response => setTreatmentPlans(response.data))
      .catch(error => console.error("Error fetching treatment plans:", error));
  }, []);



  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new appointment object from the formData
    const newAppointment = {
      patientID: formData.patientID,
      therapistID: formData.therapistID,
      treatmentPlanID: formData.treatmentPlanID,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "appointments";
      const response = await axios.post(URL, newAppointment);
      if (response.status === 201) {
        alert(response.data.message);
        navigate("/appointments");
      } else {
        alert("Error creating appointment");
      }
    } catch (error) {
      alert("Error creating appointment");
      console.error("Error creating appointment:", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      patientID: "default",
      therapistID:"default",
      treatmentPlanID:"default",
      appointmentDate: "",
      appointmentTime: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <h2>Create an Appointment</h2>
      <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="patientID">Patient</label>
          <select
            name="patientID"
            value={formData.patientID}
            onChange={handleInputChange}
            required
          >
            <option value="default" selected>Select a patient</option>
            {patients.map((patient) => (
              <option key={patient.patientID} value={patient.patientID}>
                {patient.firstName} {patient.lastName} (ID: {patient.patientID})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="therapistID">Therapist</label>
          <select
            name="therapistID"
            value={formData.therapistID}
            onChange={handleInputChange}
            required
          >
            <option value="default" selected>Select a therapist</option>
            {therapists.map((therapist) => (
              <option key={therapist.therapistID} value={therapist.therapistID}>
                {therapist.firstName} {therapist.lastName} (ID: {therapist.therapistID})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="treatmentPlanID">Treatment Plan</label>
          <select
            name="treatmentPlanID"
            value={formData.treatmentPlanID}
            onChange={handleInputChange}
            required
          >
            <option value="default" selected>Select a treatment plan</option>
            {treatmentPlans.map((treatmentPlan) => (
              <option key={treatmentPlan.treatmentPlanID} value={treatmentPlan.treatmentPlanID}>
                {treatmentPlan.treatmentPlanID} (Goal: {treatmentPlan.treatmentGoalDesc})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="appointmentDate">Appointment Date</label>
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="appointmentTime">Appointment Time</label>
          <input
            type="time"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleInputChange}
          />
        </div>
        
        <button type="submit">Create an Appointment</button>
        <button type="button" onClick={() => navigate("/appointments")}>
          Cancel
        </button>
      </form>
      </div>
    </>

  );
}

export default CreateAppointment;
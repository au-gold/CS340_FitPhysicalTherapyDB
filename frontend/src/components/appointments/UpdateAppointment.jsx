// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevAppointment = location.state.appointment;

  // To set the previous date and time to the form with correct format.
  const prevTime = new Date('1/1/1980 ' + prevAppointment.appointmentTime).toString().substring(16,21);
  const prevDate = new Date(prevAppointment.appointmentDate).toISOString().substring(0,10);


  const [formData, setFormData] = useState({
    patientID: prevAppointment.patientID || '',
    therapistID: prevAppointment.therapistID || '',
    treatmentPlanID: prevAppointment.treatmentPlanID || '',
    appointmentDate: prevDate || '',
    appointmentTime: prevTime || '',
  });
  
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  function isUpdate() {
    // Check if formData is equal to prevAppointment
    if (JSON.stringify(formData) === JSON.stringify({
      patientID: prevAppointment.patientID || '',
      therapistID: prevAppointment.therapistID || '',
      treatmentPlanID: prevAppointment.treatmentPlanID || '',
      appointmentDate: prevAppointment.appointmentDate || '',
      appointmentTime: prevAppointment.appointmentTime || '',
    })) {
      alert("No changes made.");
      return false;
    }
    return true;
  }

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


  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevAppointment
    if (isUpdate()) {
      try {
        const URL = import.meta.env.VITE_API_URL + "appointments/" + id;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating appointment");
        } else {
          alert(response.data.message);
          // Redirect to appointments page
          navigate("/appointments");
        }
      } catch (err) {
        console.log("Error updating appointment:", err);
      }
    }
  };

  return (
    <div>
      <h2>Update Appointment</h2>
      <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Patient:</label>
          <select
            name="patientID"
            value={formData.patientID}
            onChange={handleInputChange}
            required
            defaultValue={prevAppointment.patientID}
          >
            {/* <option value="default" selected>Select a patient</option> */}
            {patients.map((patient) => (
              <option key={patient.patientID} value={patient.patientID}>
                {patient.firstName} {patient.lastName} (ID: {patient.patientID})
              </option>
            ))}
          </select>
        </div>
       
        <div className="form-group">
          <label>Therapist:</label>
          <select
            name="therapistID"
            value={formData.therapistID}
            onChange={handleInputChange}
            required
            defaultValue={prevAppointment.therapistID}
          >
            {therapists.map((therapist) => (
              <option key={therapist.therapistID} value={therapist.therapistID}>
                {therapist.firstName} {therapist.lastName} (ID: {therapist.therapistID})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Treatment Plan:</label>
          <select
            name="treatmentPlanID"
            value={formData.treatmentPlanID}
            onChange={handleInputChange}
            required
            defaultValue={prevAppointment.treatmentPlanID}
          >
            {treatmentPlans.map((treatmentPlan) => (
              <option key={treatmentPlan.treatmentPlanID} value={treatmentPlan.treatmentPlanID}>
                {treatmentPlan.treatmentPlanID} (Goal: {treatmentPlan.treatmentGoalDesc})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Appointment Date:</label>
          <input
            type="date"
            name="appointmentDate"
            onChange={handleInputChange}
            required
            defaultValue={prevDate}
          />
        </div>
        <div className="form-group">
          <label>Appointment Time:</label>
          <input
            type="time"
            name="appointmentTime"
            onChange={handleInputChange}
            required
            defaultValue={prevTime}
          />
        </div>
        
        <button type="submit">Update</button>
        <button type="button" onClick={() => navigate("/appointments")}>
          Cancel
        </button>
      </form>
      </div>
    </div>
  );
};

export default UpdateAppointment;

// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevAppointment = location.state.appointment;

  const [formData, setFormData] = useState({
    patientID: prevAppointment.patientID || '',
    patientFirstName: prevAppointment.patientFirstName || '',
    patientLastName: prevAppointment.patientLastName || '',
    therapistID: prevAppointment.therapistID || '',
    therapistFirstName: prevAppointment.therapistFirstName || '',
    therapistLastName: prevAppointment.therapistLastName || '',
    treatmentPlanID: prevAppointment.treatmentPlanID || '',
    appointmentDate: prevAppointment.appointmentDate || '',
    appointmentTime: prevAppointment.appointmentTime || '',
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
      patientFirstName: prevAppointment.patientFirstName || '',
      patientLastName: prevAppointment.patientLastName || '',
      therapistID: prevAppointment.therapistID || '',
      therapistFirstName: prevAppointment.therapistFirstName || '',
      therapistLastName: prevAppointment.therapistLastName || '',
      treatmentPlanID: prevAppointment.treatmentPlanID || '',
      appointmentDate: prevAppointment.appointmentDate || '',
      appointmentTime: prevAppointment.appointmentTime || '',
    })) {
      alert("No changes made.");
      return false;
    }
    return true;
  }

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevAppointment
    if (isUpdate()) {
      try {
        const URL = import.meta.env.VITE_API_URL + "appointments/" + id;
        // const URL = "http://127.0.0.1:9112/api/appointments";
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
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Patient ID:</label>
          <input
            type="text"
            name="patientID"
            onChange={handleInputChange}
            required
            defaultValue={prevAppointment.patientID}
          />
        </div>
        <div className="form-group">
          <label>Patient's First Name:</label>
          <input
            type="text"
            name="patientFirstName"
            onChange={handleInputChange}
            required
            defaultValue={prevAppointment.patientFirstName}
          />
        </div>
        <div className="form-group">
          <label>Patient's Last Name:</label>
          <input
            type="text"
            name="patientLastName"
            onChange={handleInputChange}
            required
            defaultValue={prevAppointment.patientLastName}
          />
        </div>
        <div className="form-group">
          <label>Therapist ID:</label>
          <input
            type="text"
            name="therapistID"
            onChange={handleInputChange}
            required
            defaultValue={prevAppointment.therapistID}
          />
        </div>
        <div className="form-group">
          <label>Therapist's First Name:</label>
          <input
            type="text"
            name="therapistFirstName"
            onChange={handleInputChange}
            required
            defaultValue={prevAppointment.therapistFirstName}
          />
        </div>
        <div className="form-group">
          <label>Therapist's Last Name:</label>
          <input
            type="text"
            name="therapistLastName"
            onChange={handleInputChange}
            required
            defaultValue={prevAppointment.therapistLastName}
          />
        </div>
        <div className="form-group">
          <label>Treatment Plan ID:</label>
          <input
            type="text"
            name="treatmentPlanID"
            onChange={handleInputChange}
            required
            defaultValue={prevAppointment.treatmentPlanID}
          />
        </div>
        <div className="form-group">
          <label>Appointment Date:</label>
          <input
            type="date"
            name="appointmentDate"
            onChange={handleInputChange}
            required
            defaultValue={prevAppointment.appointmentDate}
          />
        </div>
        <div className="form-group">
          <label>Appointment Time:</label>
          <input
            type="time"
            name="appointmentTime"
            onChange={handleInputChange}
            required
            defaultValue={prevAppointment.appointmentTime}
          />
        </div>
        
        <button type="submit">Update</button>
        <button type="button" onClick={() => navigate("/appointments")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateAppointment;

// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateAppointment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientID: "",
    patientfirstName: "",
    patientlastName: "",
    therapistID:"",
    therapistfirstName: "",
    therapistlastName: "",
    treatmentPlanID:"",
    appointmentDate: "",
    appointmentTime: "",
  });
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new appointment object from the formData
    const newAppointment = {
      patientID: formData.patientID,
      patientfirstName: formData.patientfirstName,
      patientlastName: formData.patientlastName,
      therapistID: formData.therapistID,
      therapistfirstName: formData.therapistfirstName,
      therapistlastName: formData.therapistlastName,
      treatmentPlanID: formData.treatmentPlanID,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "appointments";
      // const URL = "http://127.0.0.1:9112/api/appointments";
      const response = await axios.post(URL, newAppointment);
      if (response.status === 201) {
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
      patientID: "",
      patientfirstName: "",
      patientlastName: "",
      therapistID:"",
      therapistfirstName: "",
      therapistlastName: "",
      treatmentPlanID:"",
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
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="patientID">Patient ID</label>
          <input
            type="text"
            name="patientID"
            value={formData.patientID}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="patientfirstName">Patient's First Name</label>
          <input
            type="text"
            name="patientfirstName"
            value={formData.patientfirstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="patientlastName">Patient's Last Name</label>
          <input
            type="text"
            name="patientlastName"
            value={formData.patientlastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="therapistID">Therapist ID</label>
          <input
            type="text"
            name="therapistID"
            value={formData.therapistID}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="therapistfirstName">Therapist's First Name</label>
          <input
            type="text"
            name="therapistfirstName"
            value={formData.therapistfirstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="therapistlastName">Therapist's Last Name</label>
          <input
            type="text"
            name="therapistlastName"
            value={formData.therapistlastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="treatmentPlanID">Treatment Plan ID</label>
          <input
            type="text"
            name="treatmentPlanID"
            value={formData.treatmentPlanID}
            onChange={handleInputChange}
          />
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
      </form>
    </>

  );
}

export default CreateAppointment;
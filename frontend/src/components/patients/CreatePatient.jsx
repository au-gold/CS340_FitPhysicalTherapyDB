// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreatePatient() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    insuranceID: "",
  });
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new patient object from the formData
    const newPatient = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
      insuranceID: formData.insuranceID,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "patients";
      // const URL = "http://127.0.0.1:9112/api/patients";
      const response = await axios.post(URL, newPatient);
      if (response.status === 201) {
        navigate("/patients");
      } else {
        alert("Error creating patient");
      }
    } catch (error) {
      alert("Error creating patient");
      console.error("Error creating patient:", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      address: "",
      phoneNumber: "",
      insuranceID: "",
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
      <h2>Create a Patient</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          defaultValue={formData.firstName}
          onChange={handleInputChange}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          defaultValue={formData.lastName}
          onChange={handleInputChange}
        />
        <label htmlFor="dateOfBirth">Date of birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
        />
        <label htmlFor="address">Address</label>
        <input 
          type="text" 
          name="address" 
          value={formData.address} 
          onChange={handleInputChange} 
        />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input 
          type="text" 
          name="phoneNumber" 
          value={formData.phoneNumber} 
          onChange={handleInputChange} 
        />
        <label htmlFor="insuranceID">Insurance ID</label>
        <input 
          type="text" 
          name="insuranceID" 
          value={formData.insuranceID} 
          onChange={handleInputChange} 
        />
        <button type="submit">Create a Patient</button>
      </form>
    </>
  );
}

export default CreatePatient;
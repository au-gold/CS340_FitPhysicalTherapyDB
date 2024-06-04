// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { useState, useEffect } from "react";
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

  const [insurances, setInsurances] = useState([]);

  // Fetch insurance records
  useEffect(() => {
    const fetchInsurances = async () => {
      try {
        const URL = import.meta.env.VITE_API_URL + "insurances";
        const response = await axios.get(URL);
        setInsurances(response.data);
      } catch (error) {
        alert("Error fetching insurances from the server.");
        console.error("Error fetching insurances:", error);
      }
    };
    fetchInsurances();
  }, []);

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
      <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input 
            type="text" 
            name="address" 
            value={formData.address} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input 
            type="text" 
            name="phoneNumber" 
            value={formData.phoneNumber} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="insuranceID">Insurance Card Number</label>  
          <select 
            name="insuranceID"
            value={formData.insuranceID}
            onChange={handleInputChange}
          >
            <option value="">Select an Insurance</option>
            <option value="None">No Insurance</option>
            {insurances.map((insurance) => (
              <option key={insurance.insuranceID} value={insurance.insuranceID}>
                {insurance.insCardNum} - {insurance.subscriberName}  {/* Display both insCardNum and subscriberName */}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create a Patient</button>
        <button type="button" onClick={() => navigate("/patients")}>
          Cancel
        </button>
      </form>
      </div>
    </>
  );
}

export default CreatePatient;

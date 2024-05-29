// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdatePatient = () => {
  const { id } = useParams();
  console.log("Patient ID:", id);  // Debug log to check patient ID
  const navigate = useNavigate();
  const location = useLocation();
  const prevPatient = location.state.patient;

  const [formData, setFormData] = useState({
    firstName: prevPatient.firstName || '',
    lastName: prevPatient.lastName || '',
    dateOfBirth: prevPatient.dateOfBirth || '',
    address: prevPatient.address || '',
    phoneNumber: prevPatient.phoneNumber || '',
    insCardNum: prevPatient.insCardNum || '',  // Changed from insuranceID to insuranceCardNum
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function isUpdate(){
    // Check if formData is equal to prevPatient
    if (JSON.stringify(formData) === JSON.stringify({
      firstName: prevPatient.firstName || '',
      lastName: prevPatient.lastName || '',
      dateOfBirth: prevPatient.dateOfBirth || '',
      address: prevPatient.address || '',
      phoneNumber: prevPatient.phoneNumber || '',
      insCardNum: prevPatient.insCardNum || '',  
    })) {
      alert("No changes made.");
      return false;
    }
    return true;
  }

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevPatient
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "patients/" + id;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating patient");
        } else {
          alert(response.data.message);
          // Redirect to patients page
          navigate("/patients");
        }
      } catch (err) {
        console.log("Error updating patient:", err);
      }
    }
  };

  return (
    <div>
      <h2>Update Patient</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            onChange={handleInputChange}
            required
            defaultValue={prevPatient.firstName}
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            onChange={handleInputChange}
            required
            defaultValue={prevPatient.lastName}
          />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            onChange={handleInputChange}
            defaultValue={prevPatient.dateOfBirth}
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            onChange={handleInputChange}
            required
            defaultValue={prevPatient.address}
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            onChange={handleInputChange}
            required
            defaultValue={prevPatient.phoneNumber}
          />
        </div>
        <div className="form-group">
          <label>Insurance Card Number:</label>  
          <select 
            name="insCardNum"
            value={formData.insCardNum}
            onChange={handleInputChange}
          >
            <option value="">Select Insurance</option>
            {insurances.map((insurance) => (
              <option key={insurance.insuranceID} value={insurance.insCardNum}>
                {insurance.insCardNum}   {/* Display both insCardNum and subscriberName */}
              </option>
            ))}
          </select>
        </div>
        <button type="button" onClick={() => navigate("/patients")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdatePatient;

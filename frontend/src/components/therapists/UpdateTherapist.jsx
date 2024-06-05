// Citation for following code
// Based on CS340 react starter app
// Changed to handle our therapist entity
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateTherapist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevTherapist = location.state.therapist;

  const [formData, setFormData] = useState({
    firstName: prevTherapist.firstName || '',
    lastName: prevTherapist.lastName || '',
    licenseNum: prevTherapist.licenseNum || '',
  });

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
      firstName: prevTherapist.firstName || '',
      lastName: prevTherapist.lastName || '',
      licenseNum: prevTherapist.licenseNum || '',
    })) {
      alert("No changes made.");
      return false;
    }
    return true
  }

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevPatient
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "therapists/" + id;
        // const URL = "http://127.0.0.1:9112/api/therapists";
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating therapist");
        } else {
          alert(response.data.message);
          // Redirect to therapists page
          navigate("/therapists");
        }
      } catch (err) {
        console.log("Error updating therapist:", err);
      }
    }
  };

  return (
    <div>
      <h2>Update Therapist</h2>
      <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            onChange={handleInputChange}
            required
            defaultValue={prevTherapist.firstName}
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            onChange={handleInputChange}
            required
            defaultValue={prevTherapist.lastName}
          />
        </div>
        <div className="form-group">
          <label>License Number:</label>
          <input
            type="text"
            name="licenseNum"
            onChange={handleInputChange}
            defaultValue={prevTherapist.licenseNum}
          />
        </div>
        <button type="button" onClick={() => navigate("/therapists")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
      </div>
    </div>
  );
};

export default UpdateTherapist;

// Citation for following code
// Based on CS340 react starter app
// Changed to handle our therapist entity
// source: https://github.com/osu-cs340-ecampus/react-starter-app/


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateTherapist() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    licenseNum: "",
  });
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new therapist object from the formData
    const newTherapist = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      licenseNum: formData.licenseNum,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "therapists";
      const response = await axios.post(URL, newTherapist);
      if (response.status === 201) {
        alert("Therapist created successfully");
        navigate("/therapists");
      } else {
        alert("Error creating therapist");
      }
    } catch (error) {
      alert("Error creating therapist");
      console.error("Error creating therapist:", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      firstName: "",
      lastName: "",
      licenseNum: "",
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
      <h2>Create a Therapist</h2>
      <div className="form-container">
      <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          defaultValue={formData.firstName}
          onChange={handleInputChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          defaultValue={formData.lastName}
          onChange={handleInputChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="licenseNum">License Number</label>
        <input
          type="text"
          name="licenseNum"
          value={formData.licenseNum}
          onChange={handleInputChange}
        />
        </div>
        <button type="button" onClick={() => navigate("/therapists")}>
          Cancel
        </button>
        <button type="submit">Create a Therapist</button>
      </form>
      </div>
    </>
  );
}

export default CreateTherapist;
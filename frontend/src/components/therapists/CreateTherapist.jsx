// Citation for following code
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
      // const URL = "http://127.0.0.1:9112/api/therapists";
      const response = await axios.post(URL, newTherapist);
      if (response.status === 201) {
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
        
        <button type="submit">Create a Therapist</button>
      </form>
    </>
  );
}

export default CreateTherapist;
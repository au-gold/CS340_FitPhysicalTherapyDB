// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateTreatmentPlan() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    duration: "",
    frequency: "",
    treatmentGoalDesc: "",
  });
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new exercise object from the formData
    const newTreatmentPlan = {
      duration: formData.duration,
      frequency: formData.frequency,
      treatmentGoalDesc: formData.treatmentGoalDesc,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "treatmentPlans";
      const response = await axios.post(URL, newTreatmentPlan);
      if (response.status === 201) {
        alert("TreatmentPlan created successfully");
        navigate("/treatmentPlans");
      } else {
        alert("Error creating exercise");
      }
    } catch (error) {
      alert("Error creating exercise");
      console.error("Error creating exercise:", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      duration: "",
      frequency: "",
      treatmentGoalDesc: "",
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
      <h2>Create a TreatmentPlan</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit} >
          <div className="form-group">
            <label htmlFor="duration">Duration in Weeks </label>
            <input
              type="text"
              name="duration"
              defaultValue={formData.duration}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="frequency">Frequency per Week </label>
            <input 
              type="text" 
              name="frequency" 
              defaultValue={formData.frequency} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="treatmentGoalDesc">Treatment Goal Description </label>
            <textarea 
              name="treatmentGoalDesc" 
              defaultValue={formData.treatmentGoalDesc} 
              onChange={handleInputChange} 
            />
          </div>
          <button type="submit">Create a TreatmentPlan</button>
          <button type="button" onClick={() => navigate("/treatmentPlans")}>
          Cancel
        </button>
        </form>
        </div>
    </>
  );
}

export default CreateTreatmentPlan;
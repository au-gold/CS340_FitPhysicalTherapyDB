// Citation for following code
// Based on CS340 react starter app
// Changed to handle our treatment entity
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateTreatmentPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevTreatmentPlan = location.state.treatmentPlan;

  const [formData, setFormData] = useState({
    duration: prevTreatmentPlan.duration || '',
    frequency: prevTreatmentPlan.frequency || '',
    treatmentGoalDesc: prevTreatmentPlan.treatmentGoalDesc || '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function isUpdate(){
    // Check if formData is equal to prevTreatmentPlan
    if (JSON.stringify(formData) === JSON.stringify({
      duration: prevTreatmentPlan.duration || '',
      frequency: prevTreatmentPlan.frequency || '',
      treatmentGoalDesc: prevTreatmentPlan.treatmentGoalDesc || '',
    })) {
      alert("No changes made.");
      return false;
    }
    return true
  }

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevTreatmentPlan
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "treatmentPlans/" + id;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating treatmentPlan");
        } else {
          alert(response.data.message);
          // Redirect to treatmentPlans page
          navigate("/treatmentPlans");
        }
      } catch (err) {
        console.log("Error updating treatmentPlan:", err);
      }
    }
  };

  return (
    <div>
      <h2>Update Treatment Plan</h2>
      <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Duration in Weeks:</label>
          <input
            type="text"
            name="duration"
            onChange={handleInputChange}
            required
            defaultValue={prevTreatmentPlan.duration}
          />
        </div>
        <div className="form-group">
            <label>Frequency per Week:</label>
            <input 
              type="text" 
              name="frequency" 
              onChange={handleInputChange}
              required
             defaultValue={prevTreatmentPlan.frequency}
          />
        </div>
        <div className="form-group">
            <label>Treatment Goal Description:</label>
            <textarea  
              name="treatmentGoalDesc" 
              onChange={handleInputChange}
              required
              defaultValue={prevTreatmentPlan.treatmentGoalDesc}
          />
        </div>

        <button type="submit">Update</button>
        <button type="button" onClick={() => navigate("/treatmentPlans")}>
          Cancel
        </button>
      </form>
      </div>
    </div>
  );
};

export default UpdateTreatmentPlan;

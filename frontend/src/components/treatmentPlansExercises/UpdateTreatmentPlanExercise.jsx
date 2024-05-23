// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateTreatmentPlanExercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevTreatmentPlan = location.state.treatmentPlan;

  const [formData, setFormData] = useState({
    treatmentPlanID: prevTreatmentPlan.treatmentPlanID || '',
    exerciseName: prevTreatmentPlan.exerciseName || '',
    sets: prevTreatmentPlan.sets || '',
    reps: prevTreatmentPlan.reps || '',
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
      treatmentPlanID: prevTreatmentPlan.treatmentPlanID || '',
      exerciseName: prevTreatmentPlan.exerciseName || '',
      sets: prevTreatmentPlan.sets || '',
      reps: prevTreatmentPlan.reps || '',
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
        const URL = import.meta.env.VITE_API_URL + "edit_t_and_e/" + id;
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
      <h2>Update Treatment Plan Exercise</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Treatment Plan ID:</label>
          <input
            type="text"
            name="treatmentPlanID"
            onChange={handleInputChange}
            required
            defaultValue={prevTreatmentPlan.treatmentPlanID}
          />
        </div>
        <div className="form-group">
          <label>Exercise Name:</label>
          <input
            type="text"
            name="exerciseName"
            onChange={handleInputChange}
            required
            defaultValue={prevTreatmentPlan.exerciseName}
          />
        </div>
        <div className="form-group">
            <label>Sets:</label>
            <input 
              type="number" 
              name="sets" 
              onChange={handleInputChange}
              required
              defaultValue={prevTreatmentPlan.sets}
              step="1"
              min="0"
          />
        </div>
        <div className="form-group">
            <label>Reps:</label>
            <input 
              type="number" 
              name="reps" 
              onChange={handleInputChange}
              required
              defaultValue={prevTreatmentPlan.reps}
              step="1"
              min="0"
          />
        </div>

        <button type="button" onClick={() => navigate("/treatmentPlans")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateTreatmentPlanExercise;

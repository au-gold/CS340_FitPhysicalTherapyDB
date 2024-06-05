// Citation for following code
// Based on CS340 react starter app
// Changed input form to have dropdown menu to allow exercises to be selected.
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { useState, useEffect } from "react";
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
    exerciseID: prevTreatmentPlan.exerciseID || '',
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
      exerciseID: prevTreatmentPlan.exerciseID || '',
      sets: prevTreatmentPlan.sets || '',
      reps: prevTreatmentPlan.reps || '',
    })) {
      alert("No changes made.");
      return false;
    }
    return true
  }


  // Getting the list of Exercises and treatmentPlans to show in dropdown list.
  const [treatmentPlans, setTreatmentPlans] = useState([]);
  const [exercises, setExercises] = useState([]);

  // Store the data into variables to later populate the dropdown
  useEffect(() => {
    // Fetch treatment plans
    axios.get(import.meta.env.VITE_API_URL + "treatmentPlans")
      .then(response => setTreatmentPlans(response.data))
      .catch(error => console.error("Error fetching treatment plans:", error));

    // Fetch exercises
    axios.get(import.meta.env.VITE_API_URL + "exercises")
    .then(response => setExercises(response.data))
    .catch(error => console.error("Error fetching exercises:", error));
  }, []);


  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevTreatmentPlan
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "treatmentPlansExercises/" + id;
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
      <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Treatment Plan ID:</label>
          <select
            name="treatmentPlanID"
            value={formData.treatmentPlanID}
            onChange={handleInputChange}
            required
          >
            <option value="" selected>Select a treatment plan</option>
            {treatmentPlans.map((treatmentPlan) => (
              <option key={treatmentPlan.treatmentPlanID} value={treatmentPlan.treatmentPlanID}>
                {treatmentPlan.treatmentPlanID}: {treatmentPlan.treatmentGoalDesc}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Exercise Name:</label>
          <select
            name="exerciseID"
            value={formData.exerciseID}
            onChange={handleInputChange}
            required
          >
            <option value="" selected>Select an exercise</option>
            {exercises.map((exercise) => (
              <option key={exercise.exerciseID} value={exercise.exerciseID}>
                {exercise.exerciseID}: {exercise.exerciseName}
              </option>
            ))}
          </select>
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

        
        <button type="submit">Update</button>
        <button type="button" onClick={() => navigate("/treatmentPlans")}>
          Cancel
        </button>
      </form>
      </div>
    </div>
  );
};

export default UpdateTreatmentPlanExercise;

// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateTreatmentPlanExercise() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    treatmentPlanID: "",
    exerciseID: "",
    sets: "",
    reps: "",
  });
  
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

  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new exercise object from the formData
    const newTreatmentPlan = {
      treatmentPlanID: formData.treatmentPlanID,
      exerciseID: formData.exerciseID,
      sets: formData.sets,
      reps: formData.reps,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "treatmentPlansExercises";
      const response = await axios.post(URL, newTreatmentPlan);
      if (response.status === 201) {
        alert("Assigned exercise to a treatmentPlan successfully");
        navigate("/treatmentPlans");
      } else {
        alert("Error assigning exercise");
      }
    } catch (error) {
      alert("Error assigning exercise");
      console.error("Error assigning exercise:", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      treatmentPlanID: "",
      exerciseID: "",
      sets: "",
      reps: "",
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
      <h2>Assign an Exercise to a Treatment Plan </h2>
      <div className="form-container">
        <form onSubmit={handleSubmit} >
          <div className="form-group">
            <label htmlFor="treatmentPlanID">Treatment Plan ID </label>
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
            <label htmlFor="exerciseID">Exercise Name </label>
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
            <label htmlFor="sets">Sets </label>
            <input 
              type="text" 
              name="sets" 
              defaultValue={formData.sets} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="reps">Reps </label>
            <input 
              type="text" 
              name="reps" 
              defaultValue={formData.reps} 
              onChange={handleInputChange} 
            />
          </div>
          <button type="submit">Assign an Exercise to a Treatment Plan</button>
          <button type="button" onClick={() => navigate("/treatmentPlans")}>
          Cancel
        </button>
        </form>
        </div>
    </>
  );
}

export default CreateTreatmentPlanExercise;
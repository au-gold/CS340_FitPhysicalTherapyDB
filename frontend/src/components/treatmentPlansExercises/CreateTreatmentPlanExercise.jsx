// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateTreatmentPlanExercise() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    treatmentPlanID: "",
    exerciseName: "",
    sets: "",
    reps: "",
  });
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new exercise object from the formData
    const newTreatmentPlan = {
      treatmentPlanID: formData.treatmentPlanID,
      exerciseName: formData.exerciseName,
      sets: formData.sets,
      reps: formData.reps,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "treatmentPlans/add_t_and_e";
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
      treatmentPlanID: "",
      exerciseName: "",
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
        <form onSubmit={handleSubmit} >
          <div className="form-group">
            <label htmlFor="treatmentPlanID">Treatment Plan ID </label>
            <input
              type="text"
              name="treatmentPlanID"
              defaultValue={formData.treatmentPlanID}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exerciseName">Exercise Name </label>
            <input
              type="text"
              name="exerciseName"
              defaultValue={formData.exerciseName}
              onChange={handleInputChange}
            />
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
        </form>
    </>
  );
}

export default CreateTreatmentPlanExercise;
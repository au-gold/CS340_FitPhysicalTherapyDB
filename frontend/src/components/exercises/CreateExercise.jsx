// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateExercise() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    exerciseName: "",
    targetMuscleGroup: "",
    description: "",
  });
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new exercise object from the formData
    const newExercise = {
      exerciseName: formData.exerciseName,
      targetMuscleGroup: formData.targetMuscleGroup,
      description: formData.description,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "exercises";
      // const URL = "http://127.0.0.1:9112/api/exercises";
      const response = await axios.post(URL, newExercise);
      if (response.status === 201) {
        alert("Exercise created successfully");
        navigate("/exercises");
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
      exerciseName: "",
      targetMuscleGroup: "",
      description: "",
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
      <h2>Create an Exercise</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit} >
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
            <label htmlFor="targetMuscleGroup">Target Muscle Group </label>
            <input
              type="text"
              name="targetMuscleGroup"
              defaultValue={formData.targetMuscleGroup}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Exercise Description </label>
            <textarea 
              // type="text" 
              name="description" 
              // row="10"
              // cols="5"
              value={formData.description} 
              onChange={handleInputChange} 
            />
          </div>
          <button type="button" onClick={() => navigate("/exercises")}>
          Cancel
        </button>
          <button type="submit">Create an Exercise</button>
        </form>
        </div>
    </>
  );
}

export default CreateExercise;
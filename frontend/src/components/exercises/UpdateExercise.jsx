// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateExercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevExercise = location.state.exercise;

  const [formData, setFormData] = useState({
    exerciseName: prevExercise.exerciseName || '',
    targetMuscleGroup: prevExercise.targetMuscleGroup || '',
    description: prevExercise.description || '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function isUpdate(){
    // Check if formData is equal to prevExercise
    if (JSON.stringify(formData) === JSON.stringify({
      exerciseName: prevExercise.exerciseName || '',
      targetMuscleGroup: prevExercise.targetMuscleGroup || '',
      description: prevExercise.description || '',
    })) {
      alert("No changes made.");
      return false;
    }
    return true
  }

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevExercise
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "exercises/" + id;
        // const URL = "http://127.0.0.1:9112/api/exercises";
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating exercise");
        } else {
          alert(response.data.message);
          // Redirect to exercises page
          navigate("/exercises");
        }
      } catch (err) {
        console.log("Error updating exercise:", err);
      }
    }
  };

  return (
    <div>
      <h2>Update Exercise</h2>
      <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Exercise Name:</label>
          <input
            type="text"
            name="exerciseName"
            onChange={handleInputChange}
            required
            defaultValue={prevExercise.exerciseName}
          />
        </div>
        <div className="form-group">
          <label>Target Muscle Group:</label>
          <input
            type="text"
            name="targetMuscleGroup"
            onChange={handleInputChange}
            required
            defaultValue={prevExercise.targetMuscleGroup}
          />
        </div>
        <div className="form-group">
          <label>Exercise Descriptionr:</label>
          <textarea
            type="text"
            name="description"
            onChange={handleInputChange}
            required
            defaultValue={prevExercise.description}
          />
        </div>

        <button type="button" onClick={() => navigate("/exercises")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
      </div>
    </div>
  );
};

export default UpdateExercise;

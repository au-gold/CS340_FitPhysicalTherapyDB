// Citation for following code
// Based on CS340 react starter app
// Changed to handle our exercise entity
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./ExerciseTableRow";
import axios from "axios";

const ExerciseTable = () => {
  const [exercises, setExercises] = useState([]);

  const fetchExercises = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "exercises";
      console.debug(URL)
      // const URL = "http://127.0.0.1:9112/api/exercises";
      const response = await axios.get(URL);
      setExercises(response.data);
    } catch (error) {
      alert("Error fetching exercises from the server.");
      console.error("Error fetching exercises:", error);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <div>
      <h2>Exercises Table</h2>
      {exercises.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No exercises found.</p>
        </div>
      ) : (
        <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Exercise ID</th>
              <th>Exercise Name</th>
              <th>Target Muscle Group</th>
              <th>Exercise Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise) => (
              <TableRow 
                key={exercise.exerciseID} 
                exercise={exercise} 
                fetchExercises={fetchExercises} />
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default ExerciseTable;
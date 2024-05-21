// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ exercise, fetchExercises }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit exercise page
  const handleEdit = () => {
    // We can access the id (and query the exercise) with useParams() in the UpdateExercise component
    navigate("/exercises/edit/" + exercise.exerciseID, { state: { exercise } });
  };

  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "exercises/" + exercise.exerciseID;
      // const URL = "http://127.0.0.1:9112/api/exercises";
      const response = await axios.delete(URL);
      // Ensure that the exercise was deleted successfully
      if (response.status === 204) {
        alert("Exercise deleted successfully");
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting exercise");
      console.log(err);
    }
    fetchExercises();
  };

  return (
    <tr key={exercise.exerciseID}>
      <td>{exercise.exerciseID}</td>
      <td>{exercise.exerciseName}</td>
      <td>{exercise.targetMuscleGroup}</td>
      <td>{exercise.description}</td>
      <td>
        <BiEditAlt onClick={handleEdit} size={25} style={{ cursor: "pointer" }} />
      </td>
      <td>
        <BsTrash onClick={deleteRow} size={25} style={{ cursor: "pointer" }} />
      </td>
    </tr>
  );
};

export default TableRow;
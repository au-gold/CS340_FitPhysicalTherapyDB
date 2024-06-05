// Citation for following code
// Based on CS340 react starter app
// Changed to handle our treatment entity
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ treatmentPlan, fetchTreatmentPlans }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit treatmentPlan page
  const handleEdit = () => {
    // We can access the id (and query the treatmentPlan) with useParams() in the UpdateTreatmentPlan component
    navigate("/treatmentPlans/edit_t_and_e/" + treatmentPlan.treatmentExerciseID, { state: { treatmentPlan } });
  };

  const deleteRow = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this treatment plan?");
    if (!confirmed) {
      return; // Exit the function if the user cancels the action
    }

    try {
      const URL = import.meta.env.VITE_API_URL + "treatmentPlansExercises/" + treatmentPlan.treatmentExerciseID;
      const response = await axios.delete(URL);
      // Ensure that the treatmentPlan was deleted successfully
      if (response.status === 204) {
        alert("TreatmentPlan/Exercise deleted successfully");
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting treatmentPlan");
      console.log(err);
    }
    fetchTreatmentPlans();
  };

  return (
    <tr key={treatmentPlan.treatmentExerciseID}>
      <td>{treatmentPlan.treatmentPlanID}</td>
      <td>{treatmentPlan.exerciseID}</td>
      <td>{treatmentPlan.exerciseName}</td>
      <td>{treatmentPlan.sets}</td>
      <td>{treatmentPlan.reps}</td>
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
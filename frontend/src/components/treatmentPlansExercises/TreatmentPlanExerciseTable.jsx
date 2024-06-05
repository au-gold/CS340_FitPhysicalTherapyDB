// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { useState, useEffect } from "react";
import { FaRegHourglassHalf } from "react-icons/fa6";
import TableRow from "./TreatmentPlanExerciseTableRow";
import axios from "axios";

const TreatmentPlanExeriseTable = () => {
  const [treatmentPlans, setTreatmentPlans] = useState([]);

  const fetchTreatmentPlans = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "treatmentPlansExercises";
      console.debug(URL)
      const response = await axios.get(URL);
      setTreatmentPlans(response.data);
    } catch (error) {
      alert("Error fetching treatmentPlans from the server.");
      console.error("Error fetching treatmentPlans:", error);
    }
  };

  useEffect(() => {
    fetchTreatmentPlans();
  }, []);

  return (
    <div>
      <h2>Treatment Plans with Exercises Table</h2>
      {treatmentPlans.length === 0 ? (
        <div>
          <FaRegHourglassHalf size={70} color="#ccc" />
          <p>Loading...</p>
        </div>
      ) : (
        <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Treatment Plan ID</th>
              <th>Exercises ID</th>
              <th>Exercise Name</th>
              <th>Sets</th>
              <th>Reps</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {treatmentPlans.map((treatmentPlan) => (
              <TableRow 
                key={treatmentPlan.treatmentExerciseID} 
                treatmentPlan={treatmentPlan} 
                fetchTreatmentPlans={fetchTreatmentPlans} />
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default TreatmentPlanExeriseTable;
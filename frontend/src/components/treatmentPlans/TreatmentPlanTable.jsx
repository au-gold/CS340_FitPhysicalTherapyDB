// Citation for following code
// Based on CS340 react starter app
// Changed to handle our treatment entity
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./TreatmentPlanTableRow";
import axios from "axios";

const TreatmentPlanTable = () => {
  const [treatmentPlans, setTreatmentPlans] = useState([]);

  const fetchTreatmentPlans = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "treatmentPlans";
      console.debug(URL)
      // const URL = "http://127.0.0.1:9112/api/treatmentPlans";
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
      <h2>Treatment Plans Table</h2>
      {treatmentPlans.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No Treatment Plans found.</p>
        </div>
      ) : (
        <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Treatment Plan ID</th>
              <th>Duration in Weeks</th>
              <th>Frequency per Week</th>
              <th>Treatment Goal Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {treatmentPlans.map((treatmentPlan) => (
              <TableRow 
                key={treatmentPlan.treatmentPlanID} 
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

export default TreatmentPlanTable;
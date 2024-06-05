// Citation for following code
// Based on CS340 react starter app
// Changed to handle our insurance entity
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./InsuranceTableRow";
import axios from "axios";

const InsuranceTable = () => {
  const [insurances, setInsurances] = useState([]);

  const fetchInsurances = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "insurances";
      console.debug(URL)
      // const URL = "http://127.0.0.1:9112/api/insurances";
      const response = await axios.get(URL);
      setInsurances(response.data);
    } catch (error) {
      alert("Error fetching insurances from the server.");
      console.error("Error fetching insurances:", error);
    }
  };

  useEffect(() => {
    fetchInsurances();
  }, []);

  return (
    <div>
      <h2>Insurances Table</h2>
      {insurances.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No insurances found.</p>
        </div>
      ) : (
        <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Insurance ID</th>
              <th>Subscriber Name</th>
              <th>Insurance Card Number</th>
              <th>Insurance Group Number</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {insurances.map((insurance) => (
              <TableRow 
                key={insurance.insuranceID} 
                insurance={insurance} 
                fetchInsurances={fetchInsurances} />
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default InsuranceTable;
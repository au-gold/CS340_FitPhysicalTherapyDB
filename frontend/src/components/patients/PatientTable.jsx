// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./PatientTableRow";
import axios from "axios";

const PatientTable = () => {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "patients";
      console.debug(URL)
      const response = await axios.get(URL);
      setPatients(response.data);
    } catch (error) {
      alert("Error fetching patients from the server.");
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div>
      <h2>Patients Table</h2>
      {patients.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No patients found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Insurance Card Number</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <TableRow key={patient.patientID} 
              patient={{ 
                ...patient, 
                dateOfBirth: formatDate(patient.dateOfBirth),
              }}
              fetchPatients={fetchPatients} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientTable;
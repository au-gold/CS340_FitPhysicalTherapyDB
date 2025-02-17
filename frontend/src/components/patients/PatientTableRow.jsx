// Citation for following code
// Based on CS340 react starter app
// Changed to handle our patient entity
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ patient, fetchPatients }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit patient page
  const handleEdit = () => {
    // We can access the id (and query the patient) with useParams() in the UpdatePatient component
    navigate("/patients/edit/" + patient.patientID, { state: { patient } });
  };

  const deleteRow = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this patient?");
    if (!confirmed) {
      return; // Exit the function if the user cancels the action
    }

    try {
      const URL = import.meta.env.VITE_API_URL + "patients/" + patient.patientID;
      const response = await axios.delete(URL);
      // Ensure that the patient was deleted successfully
      if (response.status === 204) {
        alert("Patient deleted successfully");
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting patient");
      console.log(err);
    }
    fetchPatients();
  };

  return (
    <tr key={patient.patientID}>
      <td>{patient.patientID}</td>
      <td>{patient.firstName}</td>
      <td>{patient.lastName}</td>
      <td>{patient.dateOfBirth}</td>
      <td>{patient.address}</td>
      <td>{patient.phoneNumber}</td>
      <td>{patient.insCardNum || "Cash Pay"} </td> {/* Handle NULL values */}
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
// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ therapist, fetchTherapists }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();

  // Redirect to edit therapist page
  const handleEdit = () => {
    // We can access the id (and query the therapist) with useParams() in the UpdateTherapist component
    navigate(`/therapists/edit/${therapist.therapistID}`, { state: { therapist } });
  };

  const deleteRow = async () => {

    const confirmed = window.confirm("Are you sure you want to delete this patient?");
    if (!confirmed) {
      return; // Exit the function if the user cancels the action
    }
    
    try {
      const URL = import.meta.env.VITE_API_URL + "therapists/" + therapist.therapistID;
      const response = await axios.delete(URL);
      // Ensure that the therapist was deleted successfully
      if (response.status === 204) {
        alert("Therapist deleted successfully");
        fetchTherapists();
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error deleting therapist");
      console.log(err);
    }
  };

  return (
    <tr key={therapist.therapistID}>
      <td>{therapist.therapistID}</td>
      <td>{therapist.firstName}</td>
      <td>{therapist.lastName}</td>
      <td>{therapist.licenseNum}</td>
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

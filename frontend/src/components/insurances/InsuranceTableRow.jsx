// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ insurance, fetchInsurances }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit insurance page
  const handleEdit = () => {
    // We can access the id (and query the insurance) with useParams() in the UpdateInsurance component
    navigate("/insurances/edit/" + insurance.insuranceID, { state: { insurance } });
  };

  const deleteRow = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this patient?");
    if (!confirmed) {
      return; // Exit the function if the user cancels the action
    }
    
    try {
      const URL = import.meta.env.VITE_API_URL + "insurances/" + insurance.insuranceID;
      // const URL = "http://127.0.0.1:9112/api/insurances";
      const response = await axios.delete(URL);
      // Ensure that the insurance was deleted successfully
      if (response.status === 204) {
        alert("Insurance deleted successfully");
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting insurance");
      console.log(err);
    }
    fetchInsurances();
  };

  return (
    <tr key={insurance.insuranceID}>
      <td>{insurance.insuranceID}</td>
      <td>{insurance.subscriberName}</td>
      <td>{insurance.insCardNum}</td>
      <td>{insurance.insGroupNum}</td>
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